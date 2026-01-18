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
        // Generation 1: Great-Grandparents (1920s)
        const gen1_grandfather = this.familyService.addMember({
            name: 'Shri Ramchandra Sharma',
            gender: 'male',
            birthDate: '1920-01-15',
            deathDate: '1995-06-20',
            birthPlace: 'Varanasi, Uttar Pradesh',
            gotra: 'Bharadwaj',
            profession: 'Sanskrit Scholar',
            isAlive: false
        });

        const gen1_grandmother = this.familyService.addMember({
            name: 'Smt. Lakshmi Devi',
            gender: 'female',
            birthDate: '1925-03-10',
            deathDate: '2000-12-15',
            birthPlace: 'Allahabad, Uttar Pradesh',
            profession: 'Homemaker',
            isAlive: false
        });

        this.familyService.addSpouse(gen1_grandfather.id, gen1_grandmother.id, '1940-05-12');

        // Generation 2: Grandparents (1940s-1950s)
        const gen2_son1 = this.familyService.addMember({
            name: 'Shri Ramesh Kumar Sharma',
            gender: 'male',
            birthDate: '1945-08-20',
            birthPlace: 'Varanasi, Uttar Pradesh',
            gotra: 'Bharadwaj',
            profession: 'Government Officer (Retired)',
            isAlive: true,
            parentIds: [gen1_grandfather.id, gen1_grandmother.id]
        });

        const gen2_daughter1 = this.familyService.addMember({
            name: 'Smt. Saraswati Mishra',
            gender: 'female',
            birthDate: '1948-11-05',
            birthPlace: 'Lucknow, Uttar Pradesh',
            profession: 'School Principal (Retired)',
            isAlive: true,
            parentIds: [gen1_grandfather.id, gen1_grandmother.id]
        });

        const gen2_son1_wife = this.familyService.addMember({
            name: 'Smt. Geeta Devi Sharma',
            gender: 'female',
            birthDate: '1950-02-14',
            birthPlace: 'Kanpur, Uttar Pradesh',
            profession: 'Teacher (Retired)',
            isAlive: true
        });

        this.familyService.addSpouse(gen2_son1.id, gen2_son1_wife.id, '1970-04-15');

        // Generation 3: Parents (1970s)
        const gen3_son1 = this.familyService.addMember({
            name: 'Rajesh Kumar Sharma',
            gender: 'male',
            birthDate: '1972-06-10',
            birthPlace: 'Delhi, India',
            gotra: 'Bharadwaj',
            profession: 'Software Engineer',
            education: 'B.Tech IIT Delhi',
            isAlive: true,
            parentIds: [gen2_son1.id, gen2_son1_wife.id]
        });

        const gen3_daughter1 = this.familyService.addMember({
            name: 'Priya Verma',
            gender: 'female',
            birthDate: '1975-03-22',
            birthPlace: 'Mumbai, Maharashtra',
            profession: 'Doctor (Pediatrician)',
            education: 'MBBS, MD',
            isAlive: true,
            parentIds: [gen2_son1.id, gen2_son1_wife.id]
        });

        const gen3_son2 = this.familyService.addMember({
            name: 'Amit Kumar Sharma',
            gender: 'male',
            birthDate: '1978-09-18',
            birthPlace: 'Delhi, India',
            gotra: 'Bharadwaj',
            profession: 'Business Analyst',
            education: 'MBA',
            isAlive: true,
            parentIds: [gen2_son1.id, gen2_son1_wife.id]
        });

        const gen3_son1_wife = this.familyService.addMember({
            name: 'Anjali Sharma',
            gender: 'female',
            birthDate: '1974-11-25',
            birthPlace: 'Bangalore, Karnataka',
            profession: 'Architect',
            education: 'B.Arch',
            isAlive: true
        });

        const gen3_son2_wife = this.familyService.addMember({
            name: 'Neha Sharma',
            gender: 'female',
            birthDate: '1980-07-08',
            birthPlace: 'Pune, Maharashtra',
            profession: 'HR Manager',
            education: 'MBA HR',
            isAlive: true
        });

        this.familyService.addSpouse(gen3_son1.id, gen3_son1_wife.id, '1998-11-20');
        this.familyService.addSpouse(gen3_son2.id, gen3_son2_wife.id, '2005-12-10');

        // Generation 4: Current Generation (2000s-2010s)
        const gen4_son1 = this.familyService.addMember({
            name: 'Arjun Sharma',
            gender: 'male',
            birthDate: '2000-04-15',
            birthPlace: 'Bangalore, Karnataka',
            gotra: 'Bharadwaj',
            profession: 'Software Developer',
            education: 'B.Tech Computer Science',
            isAlive: true,
            parentIds: [gen3_son1.id, gen3_son1_wife.id]
        });

        const gen4_daughter1 = this.familyService.addMember({
            name: 'Kavya Sharma',
            gender: 'female',
            birthDate: '2003-08-22',
            birthPlace: 'Bangalore, Karnataka',
            profession: 'Student (Engineering)',
            education: 'B.Tech pursuing',
            isAlive: true,
            parentIds: [gen3_son1.id, gen3_son1_wife.id]
        });

        const gen4_son2 = this.familyService.addMember({
            name: 'Rohan Sharma',
            gender: 'male',
            birthDate: '2007-01-10',
            birthPlace: 'Delhi, India',
            gotra: 'Bharadwaj',
            profession: 'Student (12th Grade)',
            education: 'High School',
            isAlive: true,
            parentIds: [gen3_son2.id, gen3_son2_wife.id]
        });

        const gen4_daughter2 = this.familyService.addMember({
            name: 'Isha Sharma',
            gender: 'female',
            birthDate: '2010-05-18',
            birthPlace: 'Delhi, India',
            profession: 'Student (9th Grade)',
            education: 'High School',
            isAlive: true,
            parentIds: [gen3_son2.id, gen3_son2_wife.id]
        });

        // Generation 5: Young Generation (2020s)
        const gen4_son1_wife = this.familyService.addMember({
            name: 'Riya Sharma',
            gender: 'female',
            birthDate: '2002-09-30',
            birthPlace: 'Hyderabad, Telangana',
            profession: 'UI/UX Designer',
            education: 'B.Des',
            isAlive: true
        });

        this.familyService.addSpouse(gen4_son1.id, gen4_son1_wife.id, '2024-02-14');

        const gen5_son1 = this.familyService.addMember({
            name: 'Aditya Sharma',
            gender: 'male',
            birthDate: '2025-12-05',
            birthPlace: 'Bangalore, Karnataka',
            gotra: 'Bharadwaj',
            profession: 'Infant',
            isAlive: true,
            parentIds: [gen4_son1.id, gen4_son1_wife.id]
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
