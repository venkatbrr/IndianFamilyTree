import * as d3 from 'd3';

/**
 * Enterprise-grade Family Tree Renderer
 *
 * Uses a modified Walker's Algorithm for optimal tree layout with support for:
 * - Couples (spouses positioned together)
 * - Multi-generational hierarchies
 * - Collision detection and resolution
 * - Proper centering of parents above children
 */
class TreeRenderer {
    constructor(selector, familyService) {
        this.svg = d3.select(selector);
        this.familyService = familyService;
        this.width = 0;
        this.height = 0;
        this.currentScale = 1;
        this.highlightedIds = new Set();
        this.zoomBehavior = null;
        this.selectedMemberForAdd = null;
        this.suggestionsGroup = null;
        this.nodePositions = new Map();

        // Configuration
        this.config = {
            nodeWidth: 100,
            nodeHeight: 75,
            horizontalSpacing: 40,  // Minimum space between nodes
            verticalSpacing: 100,   // Space between generations
            coupleSpacing: 25,      // Space between spouses
            mobileNodeWidth: 90,
            mobileNodeHeight: 65,
        };

        this.init();
    }

    init() {
        this.updateDimensions();

        this.mainGroup = this.svg.append('g')
            .attr('class', 'main-group');

        this.zoomBehavior = d3.zoom()
            .scaleExtent([0.1, 4])
            .filter((event) => !event.button)
            .on('zoom', (event) => {
                this.mainGroup.attr('transform', event.transform);
                this.currentScale = event.transform.k;
            });

        this.svg.call(this.zoomBehavior);

        this.svg.on('click', (event) => {
            if (event.target === this.svg.node()) {
                this.clearSuggestions();
            }
        });

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.updateDimensions();
                const members = this.familyService?.getAllMembers();
                if (members && members.length > 0) {
                    this.renderTree(members);
                }
            }, 250);
        });
    }

    updateDimensions() {
        const container = this.svg.node().parentElement;
        this.width = container.clientWidth;
        this.height = Math.max(container.clientHeight, 500);
        this.svg
            .attr('width', this.width)
            .attr('height', this.height);
    }

    setZoom(scale) {
        this.currentScale = scale;
        const currentTransform = d3.zoomTransform(this.svg.node());
        const newTransform = d3.zoomIdentity
            .translate(currentTransform.x, currentTransform.y)
            .scale(scale);

        this.svg.transition()
            .duration(300)
            .call(this.zoomBehavior.transform, newTransform);
    }

    resetZoom() {
        this.currentScale = 1;
        this.centerTree();
    }

    /**
     * Main render method
     */
    renderTree(members) {
        this.mainGroup.selectAll('*').remove();
        this.selectedMemberForAdd = null;
        this.nodePositions.clear();

        if (members.length === 0) {
            this.showEmptyState();
            return;
        }

        const isMobile = this.width < 768;
        const nodeWidth = isMobile ? this.config.mobileNodeWidth : this.config.nodeWidth;
        const nodeHeight = isMobile ? this.config.mobileNodeHeight : this.config.nodeHeight;

        // Build the family tree structure
        const treeData = this.buildTreeStructure(members);

        // Calculate positions using a proper tree layout algorithm
        this.calculateTreeLayout(treeData, nodeWidth, nodeHeight);

        const topMargin = isMobile ? 60 : 100;

        // Draw links first (so they appear behind nodes)
        this.drawLinks(members, topMargin, nodeWidth, nodeHeight, treeData.spouseMap);

        // Draw nodes
        this.drawNodes(members, topMargin, nodeWidth, nodeHeight, isMobile);

        // Setup suggestions group
        this.suggestionsGroup = this.mainGroup.append('g')
            .attr('class', 'suggestions-group');

        // Center on self member
        const selfMember = members.find(m => m.relationship === 'Self') || members[0];
        this.centerTreeOnMember(selfMember);
    }

    /**
     * Build tree structure from flat member list
     */
    buildTreeStructure(members) {
        const memberMap = new Map(members.map(m => [m.id, m]));
        const spouseMap = this.buildSpouseMap(members);
        const childrenMap = new Map(); // parentId -> [children]
        const parentMap = new Map();   // childId -> [parentIds]

        // Build parent-child relationships
        members.forEach(member => {
            if (member.parentIds && member.parentIds.length > 0) {
                parentMap.set(member.id, member.parentIds);
                member.parentIds.forEach(parentId => {
                    if (!childrenMap.has(parentId)) {
                        childrenMap.set(parentId, []);
                    }
                    const children = childrenMap.get(parentId);
                    if (!children.find(c => c.id === member.id)) {
                        children.push(member);
                    }
                });
            }
        });

        // Find root member (Self) and assign generations
        const selfMember = members.find(m => m.relationship === 'Self') || members[0];
        const generations = this.assignGenerations(members, selfMember, spouseMap, parentMap, childrenMap);

        return {
            members,
            memberMap,
            spouseMap,
            childrenMap,
            parentMap,
            generations,
            selfMember
        };
    }

    /**
     * Assign generation levels to all members using BFS from Self
     */
    assignGenerations(members, selfMember, spouseMap, parentMap, childrenMap) {
        const generations = new Map();
        const visited = new Set();
        const queue = [{ member: selfMember, generation: 0 }];

        while (queue.length > 0) {
            const { member, generation } = queue.shift();

            if (visited.has(member.id)) continue;
            visited.add(member.id);
            generations.set(member.id, generation);

            // Spouse at same generation
            const spouseId = spouseMap.get(member.id);
            if (spouseId && !visited.has(spouseId)) {
                const spouse = members.find(m => m.id === spouseId);
                if (spouse) {
                    queue.push({ member: spouse, generation });
                }
            }

            // Parents at generation - 1
            const parentIds = parentMap.get(member.id) || [];
            parentIds.forEach(parentId => {
                if (!visited.has(parentId)) {
                    const parent = members.find(m => m.id === parentId);
                    if (parent) {
                        queue.push({ member: parent, generation: generation - 1 });
                    }
                }
            });

            // Children at generation + 1
            const children = childrenMap.get(member.id) || [];
            children.forEach(child => {
                if (!visited.has(child.id)) {
                    queue.push({ member: child, generation: generation + 1 });
                }
            });
        }

        // Assign generation 0 to any unvisited members
        members.forEach(m => {
            if (!generations.has(m.id)) {
                generations.set(m.id, 0);
            }
        });

        return generations;
    }

    buildSpouseMap(members) {
        const spouseMap = new Map();
        const relationships = this.familyService.relationships || [];

        relationships.filter(r => r.type === 'spouse').forEach(r => {
            spouseMap.set(r.member1Id, r.member2Id);
            spouseMap.set(r.member2Id, r.member1Id);
        });

        members.forEach(m => {
            if (m.spouseId && !spouseMap.has(m.id)) {
                spouseMap.set(m.id, m.spouseId);
                spouseMap.set(m.spouseId, m.id);
            }
        });

        return spouseMap;
    }

    /**
     * Calculate tree layout using a bottom-up approach
     * 1. First position leaf nodes (members with no children)
     * 2. Then position parents centered above their children
     * 3. Handle spouse pairs as single units
     */
    calculateTreeLayout(treeData, nodeWidth, nodeHeight) {
        const { members, spouseMap, childrenMap, generations } = treeData;
        const { horizontalSpacing, verticalSpacing, coupleSpacing } = this.config;

        // Group members by generation
        const generationGroups = new Map();
        members.forEach(member => {
            const gen = generations.get(member.id);
            if (!generationGroups.has(gen)) {
                generationGroups.set(gen, []);
            }
            generationGroups.get(gen).push(member);
        });

        // Sort generations from bottom to top
        const sortedGens = Array.from(generationGroups.keys()).sort((a, b) => b - a);
        const minGen = Math.min(...sortedGens);

        // Create family units (couples grouped together)
        const familyUnits = new Map(); // generation -> [units]
        const memberToUnit = new Map(); // memberId -> unit

        sortedGens.forEach(gen => {
            const membersAtGen = generationGroups.get(gen);
            const units = [];
            const processed = new Set();

            membersAtGen.forEach(member => {
                if (processed.has(member.id)) return;

                const spouseId = spouseMap.get(member.id);
                const spouse = spouseId ? membersAtGen.find(m => m.id === spouseId) : null;

                const unit = {
                    id: `unit-${member.id}`,
                    members: [member],
                    x: 0,
                    width: nodeWidth,
                    children: []
                };

                processed.add(member.id);
                memberToUnit.set(member.id, unit);

                if (spouse && !processed.has(spouse.id)) {
                    unit.members.push(spouse);
                    unit.width = nodeWidth * 2 + coupleSpacing;
                    processed.add(spouse.id);
                    memberToUnit.set(spouse.id, unit);
                }

                // Get all children of this unit
                unit.members.forEach(m => {
                    const children = childrenMap.get(m.id) || [];
                    children.forEach(child => {
                        if (!unit.children.find(c => c.id === child.id)) {
                            unit.children.push(child);
                        }
                    });
                });

                units.push(unit);
            });

            familyUnits.set(gen, units);
        });

        // Process from bottom generation to top
        sortedGens.forEach(gen => {
            const units = familyUnits.get(gen);
            const y = (gen - minGen) * (nodeHeight + verticalSpacing);

            // Get children positions to center parents above them
            units.forEach(unit => {
                const childUnits = unit.children
                    .map(c => memberToUnit.get(c.id))
                    .filter((u, i, arr) => u && arr.findIndex(x => x && x.id === u.id) === i); // unique units

                if (childUnits.length > 0 && childUnits.every(cu => cu.x !== undefined)) {
                    // Center this unit above its children
                    const childXs = childUnits.map(cu => cu.x);
                    const childWidths = childUnits.map(cu => cu.width);
                    const minChildX = Math.min(...childXs);
                    const maxChildRight = Math.max(...childUnits.map((cu, i) => childXs[i] + childWidths[i]));
                    const childrenCenter = (minChildX + maxChildRight) / 2;
                    unit.x = childrenCenter - unit.width / 2;
                }
            });

            // Sort units by their x position (or by their children's positions)
            units.sort((a, b) => {
                if (a.x !== b.x) return a.x - b.x;
                // If same x (both 0), sort by first child's x
                const aChildX = a.children.length > 0 ? (memberToUnit.get(a.children[0].id)?.x || 0) : 0;
                const bChildX = b.children.length > 0 ? (memberToUnit.get(b.children[0].id)?.x || 0) : 0;
                return aChildX - bChildX;
            });

            // Position units left-to-right, resolving collisions
            let currentX = 0;
            units.forEach((unit, index) => {
                // Ensure no overlap with previous units
                if (unit.x < currentX) {
                    unit.x = currentX;
                }
                currentX = unit.x + unit.width + horizontalSpacing;

                // Set positions for individual members in the unit
                if (unit.members.length === 2) {
                    // Couple: first member on left, second on right
                    this.nodePositions.set(unit.members[0].id, { x: unit.x, y });
                    this.nodePositions.set(unit.members[1].id, { x: unit.x + nodeWidth + coupleSpacing, y });
                } else {
                    this.nodePositions.set(unit.members[0].id, { x: unit.x, y });
                }
            });
        });

        // Second pass: Re-center parents above children after all positions are set
        // Process from bottom to top again
        sortedGens.forEach(gen => {
            const units = familyUnits.get(gen);
            const y = (gen - minGen) * (nodeHeight + verticalSpacing);

            units.forEach(unit => {
                const childUnits = unit.children
                    .map(c => memberToUnit.get(c.id))
                    .filter((u, i, arr) => u && arr.findIndex(x => x && x.id === u.id) === i);

                if (childUnits.length > 0) {
                    // Recalculate center based on final child positions
                    const childPositions = childUnits.map(cu => {
                        const firstMemberPos = this.nodePositions.get(cu.members[0].id);
                        return firstMemberPos ? { x: firstMemberPos.x, width: cu.width } : null;
                    }).filter(Boolean);

                    if (childPositions.length > 0) {
                        const minX = Math.min(...childPositions.map(p => p.x));
                        const maxX = Math.max(...childPositions.map(p => p.x + p.width));
                        const center = (minX + maxX) / 2;
                        const newUnitX = center - unit.width / 2;

                        // Only shift if it doesn't cause overlap with neighbors
                        unit.x = newUnitX;

                        if (unit.members.length === 2) {
                            this.nodePositions.set(unit.members[0].id, { x: unit.x, y });
                            this.nodePositions.set(unit.members[1].id, { x: unit.x + nodeWidth + coupleSpacing, y });
                        } else {
                            this.nodePositions.set(unit.members[0].id, { x: unit.x, y });
                        }
                    }
                }
            });

            // Fix any overlaps created by re-centering
            this.resolveOverlapsAtGeneration(units, nodeWidth, horizontalSpacing, coupleSpacing, y);
        });

        // Center the entire tree around x=0
        this.centerTreePositions();
    }

    /**
     * Resolve overlaps between units at the same generation
     */
    resolveOverlapsAtGeneration(units, nodeWidth, horizontalSpacing, coupleSpacing, y) {
        // Sort by x position
        units.sort((a, b) => a.x - b.x);

        // Fix overlaps from left to right
        for (let i = 1; i < units.length; i++) {
            const prevUnit = units[i - 1];
            const currUnit = units[i];
            const minX = prevUnit.x + prevUnit.width + horizontalSpacing;

            if (currUnit.x < minX) {
                const shift = minX - currUnit.x;
                currUnit.x = minX;

                // Update node positions
                if (currUnit.members.length === 2) {
                    this.nodePositions.set(currUnit.members[0].id, { x: currUnit.x, y });
                    this.nodePositions.set(currUnit.members[1].id, { x: currUnit.x + nodeWidth + coupleSpacing, y });
                } else {
                    this.nodePositions.set(currUnit.members[0].id, { x: currUnit.x, y });
                }
            }
        }
    }

    /**
     * Center all node positions around x=0
     */
    centerTreePositions() {
        if (this.nodePositions.size === 0) return;

        const positions = Array.from(this.nodePositions.values());
        const minX = Math.min(...positions.map(p => p.x));
        const maxX = Math.max(...positions.map(p => p.x));
        const centerOffset = (minX + maxX) / 2;

        this.nodePositions.forEach((pos, id) => {
            this.nodePositions.set(id, { x: pos.x - centerOffset, y: pos.y });
        });
    }

    drawLinks(members, topMargin, nodeWidth, nodeHeight, spouseMap) {
        const linkGroup = this.mainGroup.append('g')
            .attr('class', 'links')
            .attr('transform', `translate(${this.width / 2}, ${topMargin})`);

        // Draw spouse connections (horizontal lines)
        const drawnSpouses = new Set();
        members.forEach(member => {
            const spouseId = spouseMap.get(member.id);
            if (!spouseId) return;

            const key = [member.id, spouseId].sort().join('-');
            if (drawnSpouses.has(key)) return;
            drawnSpouses.add(key);

            const pos1 = this.nodePositions.get(member.id);
            const pos2 = this.nodePositions.get(spouseId);
            if (!pos1 || !pos2 || Math.abs(pos1.y - pos2.y) > 10) return;

            const leftPos = pos1.x < pos2.x ? pos1 : pos2;
            const rightPos = pos1.x < pos2.x ? pos2 : pos1;

            // Horizontal line connecting spouses at mid-height
            const y = leftPos.y + nodeHeight / 2;
            const x1 = leftPos.x + nodeWidth;
            const x2 = rightPos.x;

            linkGroup.append('line')
                .attr('x1', x1)
                .attr('y1', y)
                .attr('x2', x2)
                .attr('y2', y)
                .attr('stroke', '#f43f5e')
                .attr('stroke-width', 3);
        });

        // Draw parent-child connections
        members.forEach(child => {
            if (!child.parentIds || child.parentIds.length === 0) return;

            const childPos = this.nodePositions.get(child.id);
            if (!childPos) return;

            const parentPositions = child.parentIds
                .map(pid => ({ id: pid, pos: this.nodePositions.get(pid) }))
                .filter(p => p.pos)
                .sort((a, b) => a.pos.x - b.pos.x);

            if (parentPositions.length === 0) return;

            let connectX, connectY;

            if (parentPositions.length === 2 && spouseMap.get(parentPositions[0].id) === parentPositions[1].id) {
                // Connect from middle of spouse line
                const leftParent = parentPositions[0].pos;
                const rightParent = parentPositions[1].pos;
                connectX = (leftParent.x + nodeWidth + rightParent.x) / 2;
                connectY = leftParent.y + nodeHeight;
            } else {
                // Connect from single parent center
                connectX = parentPositions[0].pos.x + nodeWidth / 2;
                connectY = parentPositions[0].pos.y + nodeHeight;
            }

            const childCenterX = childPos.x + nodeWidth / 2;
            const childTopY = childPos.y;
            const midY = connectY + (childTopY - connectY) / 2;

            // Draw stepped line: down from parent, horizontal, down to child
            linkGroup.append('path')
                .attr('d', `M${connectX},${connectY} L${connectX},${midY} L${childCenterX},${midY} L${childCenterX},${childTopY}`)
                .attr('fill', 'none')
                .attr('stroke', '#94a3b8')
                .attr('stroke-width', 2.5);
        });
    }

    drawNodes(members, topMargin, nodeWidth, nodeHeight, isMobile) {
        const nodeGroup = this.mainGroup.append('g')
            .attr('class', 'nodes')
            .attr('transform', `translate(${this.width / 2}, ${topMargin})`);

        const borderRadius = isMobile ? 10 : 12;

        members.forEach(member => {
            const pos = this.nodePositions.get(member.id);
            if (!pos) return;

            // Position at center of node for the transform
            const g = nodeGroup.append('g')
                .attr('class', `tree-node ${this.highlightedIds.has(member.id) ? 'highlighted' : ''} ${!member.isAlive ? 'deceased' : ''}`)
                .attr('transform', `translate(${pos.x + nodeWidth / 2}, ${pos.y + nodeHeight / 2})`)
                .style('cursor', 'pointer');

            this.drawMemberTile(g, member, nodeWidth, nodeHeight, borderRadius, isMobile, false);
        });
    }

    centerTree() {
        const bounds = this.mainGroup.node().getBBox();
        if (bounds.width === 0 && bounds.height === 0) return;

        const scale = Math.min(
            this.width / (bounds.width + 150),
            this.height / (bounds.height + 150),
            1
        );

        const midX = bounds.x + bounds.width / 2;
        const midY = bounds.y + bounds.height / 2;

        const transform = d3.zoomIdentity
            .translate(this.width / 2 - midX * scale, this.height / 2 - midY * scale)
            .scale(scale);

        this.currentScale = scale;
        this.svg.transition().duration(750).call(this.zoomBehavior.transform, transform);
    }

    centerTreeOnMember(member) {
        if (!member) {
            this.centerTree();
            return;
        }

        const pos = this.nodePositions.get(member.id);
        if (!pos) {
            this.centerTree();
            return;
        }

        const bounds = this.mainGroup.node().getBBox();
        if (bounds.width === 0 && bounds.height === 0) return;

        const scale = Math.min(
            this.width / (bounds.width + 150),
            this.height / (bounds.height + 150),
            1
        );

        const isMobile = this.width < 768;
        const topMargin = isMobile ? 60 : 100;
        const nodeWidth = isMobile ? this.config.mobileNodeWidth : this.config.nodeWidth;
        const nodeHeight = isMobile ? this.config.mobileNodeHeight : this.config.nodeHeight;

        const memberX = this.width / 2 + pos.x + nodeWidth / 2;
        const memberY = topMargin + pos.y + nodeHeight / 2;

        const transform = d3.zoomIdentity
            .translate(this.width / 2 - memberX * scale, this.height / 2 - memberY * scale)
            .scale(scale);

        this.currentScale = scale;
        this.svg.transition().duration(750).call(this.zoomBehavior.transform, transform);
    }

    drawMemberTile(g, member, nodeWidth, nodeHeight, borderRadius, isMobile, isDotted) {
        const self = this;
        const isOther = member.relationship === 'Other';

        g.append('rect')
            .attr('x', -nodeWidth / 2)
            .attr('y', -nodeHeight / 2)
            .attr('width', nodeWidth)
            .attr('height', nodeHeight)
            .attr('rx', borderRadius)
            .attr('ry', borderRadius)
            .attr('fill', isDotted ? 'rgba(255,255,255,0.95)' : (member.isAlive === false ? '#9ca3af' : (member.gender === 'male' ? '#3b82f6' : '#ec4899')))
            .attr('stroke', isDotted ? (isOther ? '#6b7280' : (member.gender === 'male' ? '#3b82f6' : '#ec4899')) : '#fff')
            .attr('stroke-width', isDotted ? 2.5 : 3)
            .attr('stroke-dasharray', isDotted ? '8,4' : 'none')
            .attr('filter', isDotted ? 'none' : 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.15))')
            .on('click', (event) => {
                event.stopPropagation();
                if (isDotted) {
                    window.dispatchEvent(new CustomEvent('addMemberWithRelation', {
                        detail: {
                            relationship: member.relationship,
                            gender: member.gender,
                            referenceMemberId: member._referenceMemberId
                        }
                    }));
                    self.clearSuggestions();
                } else {
                    window.dispatchEvent(new CustomEvent('memberSelected', { detail: member }));
                }
            });

        if (isDotted) {
            const icon = isOther ? '➕' : (member.gender === 'male' ? '👨' : '👩');
            const color = isOther ? '#6b7280' : (member.gender === 'male' ? '#3b82f6' : '#ec4899');

            g.append('text').attr('x', 0).attr('y', -5).attr('text-anchor', 'middle').attr('font-size', '24px').text(icon);
            g.append('text').attr('x', 0).attr('y', 22).attr('text-anchor', 'middle').attr('font-size', '12px').attr('font-weight', 'bold').attr('fill', color).text(member.relationship);
            g.append('text').attr('x', 0).attr('y', 38).attr('text-anchor', 'middle').attr('font-size', '10px').attr('fill', '#6b7280').text('Click to add');
        } else {
            if (member.photoURL) {
                g.append('foreignObject')
                    .attr('x', -nodeWidth / 2 + 10)
                    .attr('y', -nodeHeight / 2 + 10)
                    .attr('width', 40)
                    .attr('height', 40)
                    .append('xhtml:img')
                    .attr('src', member.photoURL)
                    .attr('alt', member.name || 'Profile')
                    .style('width', '100%')
                    .style('height', '100%')
                    .style('object-fit', 'cover')
                    .style('border-radius', '8px')
                    .style('border', '2px solid white');
            } else {
                g.append('text')
                    .attr('x', -nodeWidth / 2 + 30)
                    .attr('y', -nodeHeight / 2 + 35)
                    .attr('text-anchor', 'middle')
                    .attr('font-size', '24px')
                    .text(member.gender === 'male' ? '👨' : '👩');
            }

            g.append('text')
                .attr('x', -nodeWidth / 2 + 60)
                .attr('y', -nodeHeight / 2 + 22)
                .attr('text-anchor', 'start')
                .attr('font-size', '11px')
                .attr('font-weight', 'bold')
                .attr('fill', 'white')
                .text(() => {
                    let name = member.firstName ? `${member.firstName} ${member.lastName || ''}`.trim() : (member.name || '');
                    name = name.replace(/^(Pandit |Shri |Smt\. |Late |Dr\. |Baby )/g, '');
                    return name.length > 14 ? name.substring(0, 12) + '...' : name;
                });

            g.append('text')
                .attr('x', -nodeWidth / 2 + 60)
                .attr('y', -nodeHeight / 2 + 38)
                .attr('text-anchor', 'start')
                .attr('font-size', '9px')
                .attr('fill', 'rgba(255, 255, 255, 0.9)')
                .text(member.relationship || '');

            g.append('text')
                .attr('y', nodeHeight / 2 - 10)
                .attr('text-anchor', 'middle')
                .attr('font-size', '9px')
                .attr('fill', 'rgba(255, 255, 255, 0.8)')
                .text(() => {
                    if (member.age) return `Age: ${member.age}`;
                    if (member.birthDate) {
                        const year = new Date(member.birthDate).getFullYear();
                        return member.isAlive ? `b. ${year}` : `${year} - ?`;
                    }
                    return '';
                });

            const btnSize = isMobile ? 20 : 24;
            const btnX = nodeWidth / 2 - btnSize / 2 - 5;
            const btnY = -nodeHeight / 2 + 5;

            g.append('circle')
                .attr('cx', btnX)
                .attr('cy', btnY + btnSize / 2)
                .attr('r', btnSize / 2)
                .attr('fill', '#10b981')
                .attr('stroke', '#fff')
                .attr('stroke-width', 2)
                .attr('class', 'add-member-btn')
                .style('cursor', 'pointer')
                .attr('filter', 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2))')
                .on('click', (event) => {
                    event.stopPropagation();
                    self.showSuggestions(member);
                });

            g.append('text')
                .attr('x', btnX)
                .attr('y', btnY + btnSize / 2)
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'central')
                .attr('font-size', isMobile ? '14px' : '16px')
                .attr('font-weight', 'bold')
                .attr('fill', 'white')
                .style('pointer-events', 'none')
                .text('+');
        }
    }

    showSuggestions(member) {
        this.clearSuggestions();
        this.selectedMemberForAdd = member;

        const isMobile = this.width < 768;
        const topMargin = isMobile ? 60 : 100;
        const nodeWidth = isMobile ? 85 : 95;
        const nodeHeight = isMobile ? 60 : 70;
        const mainNodeWidth = isMobile ? this.config.mobileNodeWidth : this.config.nodeWidth;
        const mainNodeHeight = isMobile ? this.config.mobileNodeHeight : this.config.nodeHeight;

        this.mainGroup.selectAll('.tree-node').classed('blurred', true);

        const memberPos = this.nodePositions.get(member.id);
        if (memberPos) {
            const expectedTransform = `translate(${memberPos.x + mainNodeWidth / 2}, ${memberPos.y + mainNodeHeight / 2})`;
            this.mainGroup.selectAll('.tree-node').filter(function() {
                return d3.select(this).attr('transform') === expectedTransform;
            }).classed('blurred', false).classed('selected-for-add', true);
        }

        const memberX = memberPos ? memberPos.x + mainNodeWidth / 2 : 0;
        const memberY = memberPos ? memberPos.y + mainNodeHeight / 2 : 0;

        const suggestions = this.getSuggestedRelationships(member);
        const suggestionsGroup = this.mainGroup.select('.suggestions-group');
        suggestionsGroup.attr('transform', `translate(${this.width / 2}, ${topMargin})`);

        suggestions.forEach((suggestion) => {
            let sugX, sugY;

            switch (suggestion.position) {
                case 'top':
                    sugX = memberX;
                    sugY = memberY - 130;
                    break;
                case 'top-left':
                    sugX = memberX - nodeWidth - 40;
                    sugY = memberY - 130;
                    break;
                case 'top-right':
                    sugX = memberX + nodeWidth + 40;
                    sugY = memberY - 130;
                    break;
                case 'bottom':
                    sugX = memberX;
                    sugY = memberY + 130;
                    break;
                case 'bottom-left':
                    sugX = memberX - nodeWidth - 30;
                    sugY = memberY + 130;
                    break;
                case 'bottom-right':
                    sugX = memberX + nodeWidth + 30;
                    sugY = memberY + 130;
                    break;
                case 'right':
                    sugX = memberX + mainNodeWidth + 50;
                    sugY = memberY;
                    break;
                case 'far-right':
                    sugX = memberX + mainNodeWidth * 2 + 70;
                    sugY = memberY;
                    break;
                default:
                    sugX = memberX;
                    sugY = memberY + 130;
            }

            const lineColor = suggestion.relationship === 'Other' ? '#6b7280' : (suggestion.gender === 'male' ? '#3b82f6' : '#ec4899');

            suggestionsGroup.append('path')
                .attr('d', `M${memberX},${memberY} L${sugX},${sugY}`)
                .attr('fill', 'none')
                .attr('stroke', lineColor)
                .attr('stroke-width', 2)
                .attr('stroke-dasharray', '6,4')
                .attr('opacity', 0.6);

            const suggestionData = { ...suggestion, _referenceMemberId: member.id };
            const g = suggestionsGroup.append('g')
                .attr('transform', `translate(${sugX}, ${sugY})`)
                .style('cursor', 'pointer')
                .datum(suggestionData);

            this.drawMemberTile(g, suggestionData, nodeWidth, nodeHeight, 10, isMobile, true);
        });
    }

    getSuggestedRelationships(member) {
        const suggestions = [];
        const members = this.familyService.getAllMembers();

        const hasParents = member.parentIds && member.parentIds.length > 0;
        const hasFather = hasParents && members.some(m => member.parentIds.includes(m.id) && m.gender === 'male');
        const hasMother = hasParents && members.some(m => member.parentIds.includes(m.id) && m.gender === 'female');

        const relationships = this.familyService.relationships || [];
        const hasSpouse = relationships.some(r => r.type === 'spouse' && (r.member1Id === member.id || r.member2Id === member.id));

        if (!hasFather) suggestions.push({ relationship: 'Father', gender: 'male', position: 'top-left' });
        if (!hasMother) suggestions.push({ relationship: 'Mother', gender: 'female', position: hasFather ? 'top-right' : 'top' });

        suggestions.push({ relationship: 'Son', gender: 'male', position: 'bottom-left' });
        suggestions.push({ relationship: 'Daughter', gender: 'female', position: 'bottom-right' });

        if (!hasSpouse) {
            suggestions.push({
                relationship: member.gender === 'male' ? 'Wife' : 'Husband',
                gender: member.gender === 'male' ? 'female' : 'male',
                position: 'right'
            });
        }

        suggestions.push({ relationship: 'Other', gender: '', position: hasSpouse ? 'right' : 'far-right' });

        return suggestions;
    }

    clearSuggestions() {
        this.mainGroup.select('.suggestions-group').selectAll('*').remove();
        this.selectedMemberForAdd = null;
        this.mainGroup.selectAll('.tree-node').classed('blurred', false).classed('selected-for-add', false);
    }

    handleNodeClick(member) {
        window.dispatchEvent(new CustomEvent('memberSelected', { detail: member }));
    }

    highlightMembers(memberIds) {
        this.highlightedIds = new Set(memberIds);
        this.renderTree(this.familyService.getAllMembers());
    }

    filterMembers(memberIds) {
        const members = this.familyService.getAllMembers().filter(m => memberIds.includes(m.id));
        this.renderTree(members);
    }

    renderTimeline(members) {
        this.mainGroup.selectAll('*').remove();

        if (members.length === 0) {
            this.showEmptyState();
            return;
        }

        const sortedMembers = members.filter(m => m.birthDate).sort((a, b) => new Date(a.birthDate) - new Date(b.birthDate));
        const minDate = d3.min(sortedMembers, d => new Date(d.birthDate));
        const maxDate = new Date();

        const xScale = d3.scaleTime().domain([minDate, maxDate]).range([100, this.width - 100]);
        const axis = d3.axisBottom(xScale).ticks(10).tickFormat(d3.timeFormat('%Y'));

        this.mainGroup.append('g').attr('class', 'timeline-axis').attr('transform', `translate(0, ${this.height / 2})`).call(axis);

        const points = this.mainGroup.selectAll('.timeline-point').data(sortedMembers).enter().append('g')
            .attr('class', 'timeline-point')
            .attr('transform', (d, i) => `translate(${xScale(new Date(d.birthDate))}, ${this.height / 2 + (i % 2 === 0 ? -80 : 80)})`);

        points.append('circle').attr('r', 20).attr('fill', d => d.gender === 'male' ? '#4A90E2' : '#E24A90').style('cursor', 'pointer').on('click', (event, d) => this.handleNodeClick(d));
        points.append('text').attr('text-anchor', 'middle').attr('dy', 35).attr('font-size', '10px').text(d => d.name);
        points.append('line').attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', (d, i) => i % 2 === 0 ? 80 : -80).attr('stroke', '#ccc').attr('stroke-dasharray', '2,2');
    }

    renderGrid(members) {
        this.mainGroup.selectAll('*').remove();

        if (members.length === 0) {
            this.showEmptyState();
            return;
        }

        const columns = Math.ceil(Math.sqrt(members.length));
        const cardWidth = 150;
        const cardHeight = 180;
        const padding = 20;

        const cards = this.mainGroup.selectAll('.grid-card').data(members).enter().append('g')
            .attr('class', 'grid-card')
            .attr('transform', (d, i) => `translate(${50 + (i % columns) * (cardWidth + padding)}, ${50 + Math.floor(i / columns) * (cardHeight + padding)})`);

        cards.append('rect').attr('width', cardWidth).attr('height', cardHeight).attr('rx', 10).attr('fill', '#fff').attr('stroke', '#ddd').attr('stroke-width', 1).style('cursor', 'pointer').on('click', (event, d) => this.handleNodeClick(d));
        cards.append('circle').attr('cx', cardWidth / 2).attr('cy', 40).attr('r', 25).attr('fill', d => d.gender === 'male' ? '#4A90E2' : '#E24A90');
        cards.append('text').attr('x', cardWidth / 2).attr('y', 40).attr('text-anchor', 'middle').attr('dy', 8).attr('font-size', '20px').text(d => d.gender === 'male' ? '👨' : '👩');
        cards.append('text').attr('x', cardWidth / 2).attr('y', 85).attr('text-anchor', 'middle').attr('font-size', '12px').attr('font-weight', 'bold').text(d => d.name);
        cards.append('text').attr('x', cardWidth / 2).attr('y', 105).attr('text-anchor', 'middle').attr('font-size', '10px').attr('fill', '#666').text(d => d.birthDate ? new Date(d.birthDate).getFullYear() : '');
        cards.append('text').attr('x', cardWidth / 2).attr('y', 125).attr('text-anchor', 'middle').attr('font-size', '10px').attr('fill', '#888').text(d => d.profession || '');
    }

    showEmptyState() {
        this.mainGroup.append('text')
            .attr('x', this.width / 2)
            .attr('y', this.height / 2)
            .attr('text-anchor', 'middle')
            .attr('font-size', '18px')
            .attr('fill', '#999')
            .text('No family members to display. Click "Add Member" to get started.');
    }
}

export default TreeRenderer;
