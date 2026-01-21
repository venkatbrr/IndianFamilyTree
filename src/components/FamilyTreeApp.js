import FamilyTreeService from '../services/FamilyTreeService.js';
import TreeRenderer from './TreeRenderer.js';
import MemberModal from './MemberModal.js';
import { debounce } from '../utils/helpers.js';

class FamilyTreeApp {
    constructor(familyService = null) {
        // Use provided service or create local one
        this.familyService = familyService || new FamilyTreeService();
        this.treeRenderer = null;
        this.memberModal = null;
        this.currentView = 'tree';
    }

    // Initialize with external service (e.g., Firestore)
    // Does not load sample data - expects data to be loaded by the service
    initWithService() {
        // Initialize components
        this.treeRenderer = new TreeRenderer('#familyTree', this.familyService);
        this.memberModal = new MemberModal(this.familyService);

        // Bind event listeners
        this.bindEvents();

        // Initial render
        this.render();

        // Update statistics (without recent members)
        this.updateStatistics();
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

        // Update statistics (without recent members)
        this.updateStatistics();
    }

    loadSampleData() {
        // ===== SIMPLE 5-MEMBER FAMILY FOR TESTING =====

        // Generation 1: Grandparents
        const grandfather = this.familyService.addMember({
            firstName: 'Ramchandra',
            lastName: 'Sharma',
            name: 'Shri Ramchandra Sharma',
            gender: 'male',
            relationship: 'Grandfather',
            age: 74,
            birthDate: '1950-01-15',
            birthPlace: 'Varanasi, Uttar Pradesh',
            gotra: 'Bharadwaj',
            profession: 'Retired Teacher',
            isAlive: true
        });

        const grandmother = this.familyService.addMember({
            firstName: 'Lakshmi',
            lastName: 'Devi',
            name: 'Smt. Lakshmi Devi',
            gender: 'female',
            relationship: 'Grandmother',
            age: 69,
            birthDate: '1955-03-10',
            birthPlace: 'Allahabad, Uttar Pradesh',
            profession: 'Homemaker',
            isAlive: true
        });

        this.familyService.addSpouse(grandfather.id, grandmother.id, '1975-05-12');

        // Generation 2: Parents
        const father = this.familyService.addMember({
            firstName: 'Rajesh',
            lastName: 'Sharma',
            name: 'Rajesh Sharma',
            gender: 'male',
            relationship: 'Father',
            age: 46,
            birthDate: '1978-08-20',
            birthPlace: 'Delhi, India',
            gotra: 'Bharadwaj',
            profession: 'Software Engineer',
            education: 'B.Tech IIT Delhi',
            isAlive: true,
            parentIds: [grandfather.id, grandmother.id]
        });

        const mother = this.familyService.addMember({
            firstName: 'Priya',
            lastName: 'Sharma',
            name: 'Priya Sharma',
            gender: 'female',
            relationship: 'Mother',
            age: 44,
            birthDate: '1980-02-14',
            birthPlace: 'Mumbai, Maharashtra',
            profession: 'Doctor',
            education: 'MBBS',
            isAlive: true
        });

        this.familyService.addSpouse(father.id, mother.id, '2005-12-10');

        // Generation 3: Child
        this.familyService.addMember({
            firstName: 'Arjun',
            lastName: 'Sharma',
            name: 'Arjun Sharma',
            gender: 'male',
            relationship: 'Son',
            age: 16,
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
        const addMemberBtn = document.getElementById('addMemberBtn');
        console.log('FamilyTreeApp.bindEvents() - addMemberBtn:', addMemberBtn);

        if (addMemberBtn) {
            console.log('✓ Add Member button found, binding click event');
            addMemberBtn.addEventListener('click', () => {
                console.log('🔵 Add Member button clicked - opening modal');
                if (this.memberModal) {
                    this.memberModal.open();
                } else {
                    console.error('❌ memberModal is not initialized');
                }
            });
        } else {
            console.error('❌ addMemberBtn not found in DOM');
        }

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
            const newScale = (this.treeRenderer.currentScale || 1) * 1.2;
            this.treeRenderer.setZoom(Math.min(newScale, 4)); // max 4x
        });

        document.getElementById('zoomOutBtn')?.addEventListener('click', () => {
            const newScale = (this.treeRenderer.currentScale || 1) / 1.2;
            this.treeRenderer.setZoom(Math.max(newScale, 0.1)); // min 0.1x
        });

        document.getElementById('resetZoomBtn')?.addEventListener('click', () => {
            this.treeRenderer.resetZoom();
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

        // Listen for add member with relation event from tree suggestion tiles
        window.addEventListener('addMemberWithRelation', (e) => {
            const { relationship, gender, referenceMemberId } = e.detail;
            console.log('🔵 addMemberWithRelation event received:', relationship, gender, referenceMemberId);

            // Clear suggestions from the tree
            if (this.treeRenderer) {
                this.treeRenderer.clearSuggestions();
            }

            // Open member modal with pre-selected relationship and gender
            if (this.memberModal) {
                this.memberModal.openWithRelationship(relationship, gender, referenceMemberId);
            }
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

        // Update upcoming events
        this.updateUpcomingEvents();
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
