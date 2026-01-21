import * as d3 from 'd3';

class TreeRenderer {
    constructor(selector, familyService) {
        this.svg = d3.select(selector);
        this.familyService = familyService;
        this.width = 0;
        this.height = 0;
        this.currentScale = 1;
        this.highlightedIds = new Set();
        this.zoomBehavior = null;

        this.init();
    }

    init() {
        // Get dimensions
        this.updateDimensions();

        // Create main group for zooming/panning
        this.mainGroup = this.svg.append('g')
            .attr('class', 'main-group');

        // Add zoom behavior with better mobile support
        this.zoomBehavior = d3.zoom()
            .scaleExtent([0.1, 4])
            .filter((event) => {
                // Allow all events except right-click
                return !event.button;
            })
            .on('zoom', (event) => {
                this.mainGroup.attr('transform', event.transform);
                this.currentScale = event.transform.k;
            });

        this.svg.call(this.zoomBehavior);

        // Handle window resize with debouncing
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.updateDimensions();
                // Re-render if members exist
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
        // Get current transform to maintain pan position
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

    renderTree(members) {
        // Clear previous content
        this.mainGroup.selectAll('*').remove();

        if (members.length === 0) {
            this.showEmptyState();
            return;
        }

        // Build hierarchy
        const root = this.buildHierarchy(members);

        // Calculate dynamic size based on number of members
        const nodeCount = root.descendants().length;

        // Check if mobile viewport
        const isMobile = this.width < 768;

        // For single member, use smaller dimensions
        const dynamicWidth = nodeCount === 1
            ? 200
            : Math.max(
                isMobile ? this.width - 40 : this.width - 100,
                nodeCount * (isMobile ? 120 : 80)
            );
        const dynamicHeight = nodeCount === 1
            ? 100
            : Math.max(
                isMobile ? this.height - 40 : this.height - 100,
                root.height * (isMobile ? 180 : 150)
            );

        // Create tree layout
        const treeLayout = d3.tree()
            .size([dynamicWidth, dynamicHeight])
            .separation((a, b) => a.parent === b.parent ? (isMobile ? 1.5 : 1.2) : (isMobile ? 2.5 : 2));

        const treeData = treeLayout(root);

        // Draw links (connections)
        this.drawLinks(treeData.links());

        // Draw nodes (members)
        this.drawNodes(treeData.descendants());

        // Always center tree after initial render (not just on mobile)
        this.centerTree();
    }

    centerTree() {
        // Get the bounding box of all nodes
        const bounds = this.mainGroup.node().getBBox();

        // If no bounds (empty tree), skip centering
        if (bounds.width === 0 && bounds.height === 0) {
            return;
        }

        // Calculate scale to fit
        const fullWidth = bounds.width;
        const fullHeight = bounds.height;
        const midX = bounds.x + fullWidth / 2;
        const midY = bounds.y + fullHeight / 2;

        // Calculate zoom to fit with padding
        const scale = Math.min(
            this.width / (fullWidth + 100),
            this.height / (fullHeight + 100),
            1
        );

        // Calculate translation to center
        const translateX = this.width / 2 - midX * scale;
        const translateY = this.height / 2 - midY * scale;

        // Apply transform using the stored zoom behavior
        const transform = d3.zoomIdentity
            .translate(translateX, translateY)
            .scale(scale);

        this.currentScale = scale;

        this.svg.transition()
            .duration(750)
            .call(this.zoomBehavior.transform, transform);
    }

    buildHierarchy(members) {
        if (members.length === 0) {
            return d3.hierarchy({ name: 'Family', children: [] });
        }

        // Track which members have been processed
        const processedIds = new Set();

        // Find all children for a given member (including spouse's shared children)
        const getChildren = (memberId) => {
            return members.filter(m =>
                m.parentIds && m.parentIds.includes(memberId) && !processedIds.has(m.id)
            );
        };

        // Build node recursively - goes DOWN the tree
        const buildNode = (member) => {
            if (processedIds.has(member.id)) return null;
            processedIds.add(member.id);

            // Get this member's children
            const childMembers = getChildren(member.id);

            // Build child nodes
            const children = childMembers
                .map(child => buildNode(child))
                .filter(node => node !== null);

            return {
                ...member,
                children: children.length > 0 ? children : undefined
            };
        };

        // Find the true root ancestors (members with no parents who have descendants)
        // Priority: members who are parents of someone
        const membersWithChildren = new Set();
        members.forEach(m => {
            if (m.parentIds) {
                m.parentIds.forEach(pid => membersWithChildren.add(pid));
            }
        });

        // Root members are those without parents
        const rootMembers = members.filter(m => !m.parentIds || m.parentIds.length === 0);

        // Sort root members: those with children first, then by relationship type
        const sortedRoots = rootMembers.sort((a, b) => {
            const aHasChildren = membersWithChildren.has(a.id) ? 1 : 0;
            const bHasChildren = membersWithChildren.has(b.id) ? 1 : 0;
            if (bHasChildren !== aHasChildren) return bHasChildren - aHasChildren;

            // Sort by relationship - Father/Mother first
            const relationOrder = { 'Father': 1, 'Mother': 2, 'Grandfather': 0, 'Grandmother': 0 };
            const aOrder = relationOrder[a.relationship] || 10;
            const bOrder = relationOrder[b.relationship] || 10;
            return aOrder - bOrder;
        });

        // Group parents who share children (couples)
        const processedRoots = new Set();
        const rootNodes = [];

        for (const root of sortedRoots) {
            if (processedRoots.has(root.id)) continue;
            processedRoots.add(root.id);

            // Check if this root shares children with another root (spouse)
            const rootChildren = getChildren(root.id);
            let spouse = null;

            for (const child of rootChildren) {
                if (child.parentIds && child.parentIds.length > 1) {
                    const spouseId = child.parentIds.find(pid => pid !== root.id);
                    const potentialSpouse = sortedRoots.find(r => r.id === spouseId);
                    if (potentialSpouse && !processedRoots.has(spouseId)) {
                        spouse = potentialSpouse;
                        processedRoots.add(spouseId);
                        break;
                    }
                }
            }

            // Build the node for this root
            const node = buildNode(root);
            if (node) {
                // If there's a spouse, mark it for display purposes
                if (spouse) {
                    node.spouse = spouse;
                    processedIds.add(spouse.id);
                }
                rootNodes.push(node);
            }
        }

        // Add any remaining unprocessed members as separate root nodes
        for (const member of members) {
            if (!processedIds.has(member.id)) {
                const node = buildNode(member);
                if (node) rootNodes.push(node);
            }
        }

        // If we have multiple root nodes, create a virtual root
        if (rootNodes.length > 1) {
            return d3.hierarchy({
                name: 'Family',
                isVirtualRoot: true,
                children: rootNodes
            });
        }

        return d3.hierarchy(rootNodes[0] || { name: 'Family', children: [] });
    }

    drawLinks(links) {
        const isMobile = this.width < 768;
        const topMargin = isMobile ? 60 : 100;

        const linkGroup = this.mainGroup.append('g')
            .attr('class', 'links')
            .attr('transform', `translate(${this.width / 2}, ${topMargin})`);

        // Filter out links from virtual root
        const displayLinks = links.filter(link => !link.source.data.isVirtualRoot);

        if (displayLinks.length === 0) {
            // No links to draw (single member or no relationships)
            return;
        }

        // Draw all links
        linkGroup.selectAll('path')
            .data(displayLinks)
            .enter()
            .append('path')
            .attr('class', 'tree-link')
            .attr('d', d3.linkVertical()
                .x(d => d.x)
                .y(d => d.y)
            )
            .attr('fill', 'none')
            .attr('stroke', '#94a3b8')
            .attr('stroke-width', isMobile ? 2 : 2.5)
            .attr('opacity', 0.7);
    }

    drawNodes(nodes) {
        const isMobile = this.width < 768;
        const topMargin = isMobile ? 60 : 100;

        const nodeGroup = this.mainGroup.append('g')
            .attr('class', 'nodes')
            .attr('transform', `translate(${this.width / 2}, ${topMargin})`);

        // Filter out virtual root node from display
        const displayNodes = nodes.filter(d => !d.data.isVirtualRoot);

        const node = nodeGroup.selectAll('g')
            .data(displayNodes)
            .enter()
            .append('g')
            .attr('class', d => `tree-node ${this.highlightedIds.has(d.data.id) ? 'highlighted' : ''} ${!d.data.isAlive ? 'deceased' : ''}`)
            .attr('transform', d => `translate(${d.x}, ${d.y})`)
            .style('cursor', 'pointer')
            .on('click', (event, d) => this.handleNodeClick(d.data));

        // Node dimensions - responsive
        const nodeWidth = isMobile ? 130 : 140;
        const nodeHeight = isMobile ? 90 : 100;
        const borderRadius = isMobile ? 10 : 12;

        // Add rectangular node with rounded edges
        node.append('rect')
            .attr('x', -nodeWidth / 2)
            .attr('y', -nodeHeight / 2)
            .attr('width', nodeWidth)
            .attr('height', nodeHeight)
            .attr('rx', borderRadius)
            .attr('ry', borderRadius)
            .attr('fill', d => {
                if (!d.data.isAlive) return '#9ca3af';
                return d.data.gender === 'male' ? '#3b82f6' : '#ec4899';
            })
            .attr('stroke', d => !d.data.isAlive ? '#6b7280' : '#fff')
            .attr('stroke-width', 3)
            .attr('filter', 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.15))');

        // Add photo or icon
        node.each(function(d) {
            const nodeElement = d3.select(this);

            if (d.data.photoURL) {
                // Add image using foreignObject
                nodeElement.append('foreignObject')
                    .attr('x', -nodeWidth / 2 + 10)
                    .attr('y', -nodeHeight / 2 + 10)
                    .attr('width', 40)
                    .attr('height', 40)
                    .append('xhtml:img')
                    .attr('src', d.data.photoURL)
                    .attr('alt', d.data.name || 'Profile')
                    .style('width', '100%')
                    .style('height', '100%')
                    .style('object-fit', 'cover')
                    .style('border-radius', '8px')
                    .style('border', '2px solid white');
            } else {
                // Add icon
                nodeElement.append('text')
                    .attr('x', -nodeWidth / 2 + 30)
                    .attr('y', -nodeHeight / 2 + 35)
                    .attr('text-anchor', 'middle')
                    .attr('font-size', '24px')
                    .text(d.data.gender === 'male' ? '👨' : '👩');
            }
        });

        // Add name (firstName + lastName or fallback to name)
        node.append('text')
            .attr('x', -nodeWidth / 2 + 60)
            .attr('y', -nodeHeight / 2 + 22)
            .attr('text-anchor', 'start')
            .attr('font-size', '11px')
            .attr('font-weight', 'bold')
            .attr('fill', 'white')
            .text(d => {
                let name = '';
                if (d.data.firstName) {
                    name = `${d.data.firstName} ${d.data.lastName || ''}`.trim();
                } else if (d.data.name) {
                    name = d.data.name;
                }
                // Remove prefixes and shorten
                name = name.replace(/^(Pandit |Shri |Smt\. |Late |Dr\. |Baby )/g, '');
                return name.length > 14 ? name.substring(0, 12) + '...' : name;
            });

        // Add relationship label
        node.append('text')
            .attr('x', -nodeWidth / 2 + 60)
            .attr('y', -nodeHeight / 2 + 38)
            .attr('text-anchor', 'start')
            .attr('font-size', '9px')
            .attr('fill', 'rgba(255, 255, 255, 0.9)')
            .text(d => d.data.relationship || '');

        // Add age/birth year at bottom
        node.append('text')
            .attr('y', nodeHeight / 2 - 10)
            .attr('text-anchor', 'middle')
            .attr('font-size', '9px')
            .attr('fill', 'rgba(255, 255, 255, 0.8)')
            .text(d => {
                if (d.data.age) {
                    return `Age: ${d.data.age}`;
                } else if (d.data.birthDate) {
                    const year = new Date(d.data.birthDate).getFullYear();
                    return d.data.isAlive ? `b. ${year}` : `${year} - ${d.data.deathDate ? new Date(d.data.deathDate).getFullYear() : '?'}`;
                }
                return '';
            });

        // Add "+" button to the current user's tile (marked with isCurrentUser)
        const self = this;
        node.each(function(d) {
            if (d.data.isCurrentUser) {
                const nodeElement = d3.select(this);
                const btnSize = isMobile ? 22 : 26;
                const btnX = nodeWidth / 2 - btnSize / 2 - 5;
                const btnY = -nodeHeight / 2 + 5;

                // Add button background circle
                nodeElement.append('circle')
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
                        // Dispatch event to open add member modal
                        window.dispatchEvent(new CustomEvent('openAddMemberModal'));
                    });

                // Add "+" text
                nodeElement.append('text')
                    .attr('x', btnX)
                    .attr('y', btnY + btnSize / 2)
                    .attr('text-anchor', 'middle')
                    .attr('dominant-baseline', 'central')
                    .attr('font-size', isMobile ? '16px' : '18px')
                    .attr('font-weight', 'bold')
                    .attr('fill', 'white')
                    .style('cursor', 'pointer')
                    .style('pointer-events', 'none')
                    .text('+');
            }
        });
    }

    handleNodeClick(member) {
        // Show member details in modal
        const event = new CustomEvent('memberSelected', { detail: member });
        window.dispatchEvent(event);
    }

    highlightMembers(memberIds) {
        this.highlightedIds = new Set(memberIds);
        this.renderTree(this.familyService.getAllMembers());
    }

    filterMembers(memberIds) {
        const members = this.familyService.getAllMembers()
            .filter(m => memberIds.includes(m.id));
        this.renderTree(members);
    }

    renderTimeline(members) {
        this.mainGroup.selectAll('*').remove();

        if (members.length === 0) {
            this.showEmptyState();
            return;
        }

        // Sort members by birth date
        const sortedMembers = members
            .filter(m => m.birthDate)
            .sort((a, b) => new Date(a.birthDate) - new Date(b.birthDate));

        // Create timeline scale
        const minDate = d3.min(sortedMembers, d => new Date(d.birthDate));
        const maxDate = new Date();

        const xScale = d3.scaleTime()
            .domain([minDate, maxDate])
            .range([100, this.width - 100]);

        // Draw timeline axis
        const axis = d3.axisBottom(xScale)
            .ticks(10)
            .tickFormat(d3.timeFormat('%Y'));

        this.mainGroup.append('g')
            .attr('class', 'timeline-axis')
            .attr('transform', `translate(0, ${this.height / 2})`)
            .call(axis);

        // Draw member points
        const points = this.mainGroup.selectAll('.timeline-point')
            .data(sortedMembers)
            .enter()
            .append('g')
            .attr('class', 'timeline-point')
            .attr('transform', (d, i) => {
                const x = xScale(new Date(d.birthDate));
                const y = this.height / 2 + (i % 2 === 0 ? -80 : 80);
                return `translate(${x}, ${y})`;
            });

        points.append('circle')
            .attr('r', 20)
            .attr('fill', d => d.gender === 'male' ? '#4A90E2' : '#E24A90')
            .style('cursor', 'pointer')
            .on('click', (event, d) => this.handleNodeClick(d));

        points.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', 35)
            .attr('font-size', '10px')
            .text(d => d.name);

        // Draw connecting lines to axis
        points.append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 0)
            .attr('y2', (d, i) => i % 2 === 0 ? 80 : -80)
            .attr('stroke', '#ccc')
            .attr('stroke-dasharray', '2,2');
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

        const cards = this.mainGroup.selectAll('.grid-card')
            .data(members)
            .enter()
            .append('g')
            .attr('class', 'grid-card')
            .attr('transform', (d, i) => {
                const col = i % columns;
                const row = Math.floor(i / columns);
                const x = 50 + col * (cardWidth + padding);
                const y = 50 + row * (cardHeight + padding);
                return `translate(${x}, ${y})`;
            });

        // Card background
        cards.append('rect')
            .attr('width', cardWidth)
            .attr('height', cardHeight)
            .attr('rx', 10)
            .attr('fill', '#fff')
            .attr('stroke', '#ddd')
            .attr('stroke-width', 1)
            .style('cursor', 'pointer')
            .on('click', (event, d) => this.handleNodeClick(d));

        // Avatar circle
        cards.append('circle')
            .attr('cx', cardWidth / 2)
            .attr('cy', 40)
            .attr('r', 25)
            .attr('fill', d => d.gender === 'male' ? '#4A90E2' : '#E24A90');

        // Icon
        cards.append('text')
            .attr('x', cardWidth / 2)
            .attr('y', 40)
            .attr('text-anchor', 'middle')
            .attr('dy', 8)
            .attr('font-size', '20px')
            .text(d => d.gender === 'male' ? '👨' : '👩');

        // Name
        cards.append('text')
            .attr('x', cardWidth / 2)
            .attr('y', 85)
            .attr('text-anchor', 'middle')
            .attr('font-size', '12px')
            .attr('font-weight', 'bold')
            .text(d => d.name);

        // Birth date
        cards.append('text')
            .attr('x', cardWidth / 2)
            .attr('y', 105)
            .attr('text-anchor', 'middle')
            .attr('font-size', '10px')
            .attr('fill', '#666')
            .text(d => d.birthDate ? new Date(d.birthDate).getFullYear() : '');

        // Profession
        cards.append('text')
            .attr('x', cardWidth / 2)
            .attr('y', 125)
            .attr('text-anchor', 'middle')
            .attr('font-size', '10px')
            .attr('fill', '#888')
            .text(d => d.profession || '');
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
