import FamilyTreeService from '../services/FamilyTreeService.js';
import TreeRenderer from './TreeRenderer.js';
import MemberModal from './MemberModal.js';
import { debounce } from '../utils/helpers.js';

class FamilyTreeApp {
    constructor() {
        this.familyService = new FamilyTreeService();
        this.treeRenderer = null;
        this.memberModal = null;
        this.currentZoom = 1;
        this.currentView = 'tree';
    }

    init() {
        // Clear existing data to load fresh sample data
        this.familyService.clearAllData();

        // Initialize components
        this.treeRenderer = new TreeRenderer('#familyTree', this.familyService);
        this.memberModal = new MemberModal(this.familyService);

        // Load initial data
        this.loadSampleData();

        // Bind event listeners
        this.bindEvents();

        // Initial render
        this.render();

        // Update statistics
        this.updateStatistics();
    }

    loadSampleData() {
        // ===== SIMPLE 5-MEMBER FAMILY FOR TESTING =====

        // Generation 1: Grandparents
        const grandfather = this.familyService.addMember({
            name: 'Shri Ramchandra Sharma',
            gender: 'male',
            birthDate: '1950-01-15',
            birthPlace: 'Varanasi, Uttar Pradesh',
            gotra: 'Bharadwaj',
            profession: 'Retired Teacher',
            isAlive: true
        });

        const grandmother = this.familyService.addMember({
            name: 'Smt. Lakshmi Devi',
            gender: 'female',
            birthDate: '1955-03-10',
            birthPlace: 'Allahabad, Uttar Pradesh',
            profession: 'Homemaker',
            isAlive: true
        });

        this.familyService.addSpouse(grandfather.id, grandmother.id, '1975-05-12');

        // Generation 2: Parents
        const father = this.familyService.addMember({
            name: 'Rajesh Sharma',
            gender: 'male',
            birthDate: '1978-08-20',
            birthPlace: 'Delhi, India',
            gotra: 'Bharadwaj',
            profession: 'Software Engineer',
            education: 'B.Tech IIT Delhi',
            isAlive: true,
            parentIds: [grandfather.id, grandmother.id]
        });

        const mother = this.familyService.addMember({
            name: 'Priya Sharma',
            gender: 'female',
            birthDate: '1980-02-14',
            birthPlace: 'Mumbai, Maharashtra',
            profession: 'Doctor',
            education: 'MBBS',
            isAlive: true
        });

        this.familyService.addSpouse(father.id, mother.id, '2005-12-10');

        // Generation 3: Child
        this.familyService.addMember({
            name: 'Arjun Sharma',
            gender: 'male',
            birthDate: '2008-06-15',
            birthPlace: 'Bangalore, Karnataka',
            gotra: 'Bharadwaj',
            profession: 'Student',
            education: '10th Grade',
            isAlive: true,
            parentIds: [father.id, mother.id]
        });
    }

    bindEvents() {
        // Add member button
        document.getElementById('addMemberBtn')?.addEventListener('click', () => {
            this.memberModal.open();
        });

        // Search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', debounce((e) => {
                this.handleSearch(e.target.value);
            }, 300));
        }

        // View mode selector
        document.getElementById('viewMode')?.addEventListener('change', (e) => {
            this.currentView = e.target.value;
            this.render();
        });

        // Generation filter
        document.getElementById('generationFilter')?.addEventListener('change', (e) => {
            const generation = e.target.value === 'all' ? null : parseInt(e.target.value);
            this.filterByGeneration(generation);
        });

        // Zoom controls
        document.getElementById('zoomInBtn')?.addEventListener('click', () => {
            this.currentZoom *= 1.2;
            this.treeRenderer.setZoom(this.currentZoom);
        });

        document.getElementById('zoomOutBtn')?.addEventListener('click', () => {
            this.currentZoom /= 1.2;
            this.treeRenderer.setZoom(this.currentZoom);
        });

        document.getElementById('resetZoomBtn')?.addEventListener('click', () => {
            this.currentZoom = 1;
            this.treeRenderer.setZoom(this.currentZoom);
        });

        // Export button
        document.getElementById('exportBtn')?.addEventListener('click', () => {
            this.exportData();
        });

        // Print button
        document.getElementById('printBtn')?.addEventListener('click', () => {
            window.print();
        });

        // Listen for data changes
        window.addEventListener('familyDataChanged', () => {
            this.render();
            this.updateStatistics();
        });
    }

    render() {
        const members = this.familyService.getAllMembers();

        switch (this.currentView) {
            case 'tree':
                this.treeRenderer.renderTree(members);
                break;
            case 'timeline':
                this.treeRenderer.renderTimeline(members);
                break;
            case 'grid':
                this.treeRenderer.renderGrid(members);
                break;
        }
    }

    handleSearch(query) {
        if (!query.trim()) {
            this.render();
            return;
        }

        const results = this.familyService.searchMembers(query);
        this.treeRenderer.highlightMembers(results.map(m => m.id));
    }

    filterByGeneration(generation) {
        if (generation === null) {
            this.render();
            return;
        }

        const members = this.familyService.getMembersByGeneration(generation);
        this.treeRenderer.filterMembers(members.map(m => m.id));
    }

    updateStatistics() {
        const stats = this.familyService.getStatistics();

        document.getElementById('totalMembers').textContent = stats.totalMembers;
        document.getElementById('totalGenerations').textContent = stats.generations;
        document.getElementById('totalMales').textContent = stats.males;
        document.getElementById('totalFemales').textContent = stats.females;

        // Update recent members
        this.updateRecentMembers();

        // Update upcoming events
        this.updateUpcomingEvents();
    }

    updateRecentMembers() {
        const container = document.getElementById('recentMembers');
        const recentMembers = this.familyService.getRecentMembers(5);

        container.innerHTML = recentMembers.map(member => `
            <div class="recent-item">
                <span class="member-icon">${member.gender === 'male' ? '👨' : '👩'}</span>
                <span class="member-name">${member.name}</span>
            </div>
        `).join('');
    }

    updateUpcomingEvents() {
        const container = document.getElementById('upcomingEvents');
        const events = this.familyService.getUpcomingBirthdays(5);

        if (events.length === 0) {
            container.innerHTML = '<p class="no-events">No upcoming events</p>';
            return;
        }

        container.innerHTML = events.map(event => `
            <div class="event-item">
                <span class="event-icon">🎂</span>
                <div class="event-details">
                    <div class="event-name">${event.member.name}</div>
                    <div class="event-date">${event.date}</div>
                </div>
            </div>
        `).join('');
    }

    exportData() {
        const data = this.familyService.exportData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `family-tree-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

export default FamilyTreeApp;
