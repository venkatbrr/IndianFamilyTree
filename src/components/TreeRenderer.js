import * as d3 from 'd3';

class TreeRenderer {
    constructor(selector, familyService) {
        this.svg = d3.select(selector);
        this.familyService = familyService;
        this.width = 0;
        this.height = 0;
        this.zoom = 1;
        this.highlightedIds = new Set();

        this.init();
    }

    init() {
        // Get dimensions
        this.updateDimensions();

        // Create main group for zooming/panning
        this.mainGroup = this.svg.append('g')
            .attr('class', 'main-group');

        // Add zoom behavior
        const zoomBehavior = d3.zoom()
            .scaleExtent([0.1, 4])
            .on('zoom', (event) => {
                this.mainGroup.attr('transform', event.transform);
            });

        this.svg.call(zoomBehavior);

        // Handle window resize
        window.addEventListener('resize', () => {
            this.updateDimensions();
        });
    }

    updateDimensions() {
        const container = this.svg.node().parentElement;
        this.width = container.clientWidth;
        this.height = container.clientHeight;
        this.svg
            .attr('width', this.width)
            .attr('height', this.height);
    }

    setZoom(zoom) {
        this.zoom = zoom;
        const transform = d3.zoomIdentity.scale(zoom);
        this.svg.transition().duration(300).call(
            d3.zoom().transform,
            transform
        );
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

        // Create tree layout
        const treeLayout = d3.tree()
            .size([this.width - 200, this.height - 200])
            .separation((a, b) => a.parent === b.parent ? 1 : 1.5);

        const treeData = treeLayout(root);

        // Draw links (connections)
        this.drawLinks(treeData.links());

        // Draw nodes (members)
        this.drawNodes(treeData.descendants());
    }

    buildHierarchy(members) {
        // Find root member (oldest ancestor with no parents)
        const rootMember = members.find(m => !m.parentIds || m.parentIds.length === 0);

        if (!rootMember) {
            // If no clear root, use first member
            return d3.hierarchy({ ...members[0], children: [] });
        }

        // Build tree structure recursively
        const buildNode = (memberId) => {
            const member = members.find(m => m.id === memberId);
            if (!member) return null;

            const children = members
                .filter(m => m.parentIds && m.parentIds.includes(memberId))
                .map(child => buildNode(child.id))
                .filter(node => node !== null);

            return {
                ...member,
                children: children.length > 0 ? children : undefined
            };
        };

        const hierarchyData = buildNode(rootMember.id);
        return d3.hierarchy(hierarchyData);
    }

    drawLinks(links) {
        const linkGroup = this.mainGroup.append('g')
            .attr('class', 'links')
            .attr('transform', `translate(${this.width / 2}, 100)`);

        linkGroup.selectAll('path')
            .data(links)
            .enter()
            .append('path')
            .attr('class', 'tree-link')
            .attr('d', d3.linkVertical()
                .x(d => d.x)
                .y(d => d.y)
            )
            .attr('fill', 'none')
            .attr('stroke', '#ccc')
            .attr('stroke-width', 2);
    }

    drawNodes(nodes) {
        const nodeGroup = this.mainGroup.append('g')
            .attr('class', 'nodes')
            .attr('transform', `translate(${this.width / 2}, 100)`);

        const node = nodeGroup.selectAll('g')
            .data(nodes)
            .enter()
            .append('g')
            .attr('class', d => `tree-node ${this.highlightedIds.has(d.data.id) ? 'highlighted' : ''}`)
            .attr('transform', d => `translate(${d.x}, ${d.y})`)
            .style('cursor', 'pointer')
            .on('click', (event, d) => this.handleNodeClick(d.data));

        // Add circle for each node
        node.append('circle')
            .attr('r', 30)
            .attr('fill', d => d.data.gender === 'male' ? '#4A90E2' : '#E24A90')
            .attr('stroke', '#fff')
            .attr('stroke-width', 3);

        // Add icon
        node.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', 5)
            .attr('font-size', '24px')
            .text(d => d.data.gender === 'male' ? '👨' : '👩');

        // Add name label
        node.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', 50)
            .attr('font-size', '12px')
            .attr('font-weight', 'bold')
            .text(d => d.data.name);

        // Add birth year
        node.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', 65)
            .attr('font-size', '10px')
            .attr('fill', '#666')
            .text(d => {
                if (d.data.birthDate) {
                    const year = new Date(d.data.birthDate).getFullYear();
                    return d.data.isAlive ? `b. ${year}` : `${year} - ${d.data.deathDate ? new Date(d.data.deathDate).getFullYear() : ''}`;
                }
                return '';
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
