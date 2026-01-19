class FamilyTreeService {
    constructor() {
        this.members = [];
        this.relationships = [];
        this.loadFromStorage();
    }

    // Member Management
    addMember(memberData) {
        const member = {
            id: this.generateId(),
            ...memberData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.members.push(member);
        this.saveToStorage();
        return member;
    }

    updateMember(id, updates) {
        const index = this.members.findIndex(m => m.id === id);
        if (index !== -1) {
            this.members[index] = {
                ...this.members[index],
                ...updates,
                updatedAt: new Date().toISOString()
            };
            this.saveToStorage();
            return this.members[index];
        }
        return null;
    }

    deleteMember(id) {
        this.members = this.members.filter(m => m.id !== id);
        this.relationships = this.relationships.filter(
            r => r.member1Id !== id && r.member2Id !== id
        );
        this.saveToStorage();
    }

    getMember(id) {
        return this.members.find(m => m.id === id);
    }

    getAllMembers() {
        // Return members with spouse info attached
        return this.members.map(member => {
            const spouse = this.getSpouse(member.id);
            return {
                ...member,
                spouseId: spouse ? spouse.id : null
            };
        });
    }

    // Relationship Management
    addSpouse(member1Id, member2Id, marriageDate = null) {
        const relationship = {
            id: this.generateId(),
            type: 'spouse',
            member1Id,
            member2Id,
            marriageDate,
            createdAt: new Date().toISOString()
        };

        this.relationships.push(relationship);
        this.saveToStorage();
        return relationship;
    }

    addParent(childId, parentId) {
        const child = this.getMember(childId);
        if (child) {
            if (!child.parentIds) {
                child.parentIds = [];
            }
            if (!child.parentIds.includes(parentId)) {
                child.parentIds.push(parentId);
                this.updateMember(childId, { parentIds: child.parentIds });
            }
        }
    }

    getSpouse(memberId) {
        const relationship = this.relationships.find(
            r => r.type === 'spouse' && (r.member1Id === memberId || r.member2Id === memberId)
        );

        if (relationship) {
            const spouseId = relationship.member1Id === memberId
                ? relationship.member2Id
                : relationship.member1Id;
            return this.getMember(spouseId);
        }
        return null;
    }

    getChildren(memberId) {
        return this.members.filter(m =>
            m.parentIds && m.parentIds.includes(memberId)
        );
    }

    getParents(memberId) {
        const member = this.getMember(memberId);
        if (member && member.parentIds) {
            return member.parentIds.map(id => this.getMember(id)).filter(Boolean);
        }
        return [];
    }

    getSiblings(memberId) {
        const member = this.getMember(memberId);
        if (!member || !member.parentIds || member.parentIds.length === 0) {
            return [];
        }

        return this.members.filter(m =>
            m.id !== memberId &&
            m.parentIds &&
            m.parentIds.some(pid => member.parentIds.includes(pid))
        );
    }

    // Search and Filter
    searchMembers(query) {
        const lowerQuery = query.toLowerCase();
        return this.members.filter(member =>
            member.name.toLowerCase().includes(lowerQuery) ||
            (member.profession && member.profession.toLowerCase().includes(lowerQuery)) ||
            (member.birthPlace && member.birthPlace.toLowerCase().includes(lowerQuery)) ||
            (member.gotra && member.gotra.toLowerCase().includes(lowerQuery))
        );
    }

    getMembersByGeneration(generation) {
        // Calculate generation for each member
        const membersWithGen = this.members.map(member => ({
            ...member,
            generation: this.calculateGeneration(member.id)
        }));

        return membersWithGen.filter(m => m.generation === generation);
    }

    calculateGeneration(memberId, visited = new Set()) {
        if (visited.has(memberId)) return 0;
        visited.add(memberId);

        const member = this.getMember(memberId);
        if (!member || !member.parentIds || member.parentIds.length === 0) {
            return 1; // Root generation
        }

        const parentGenerations = member.parentIds.map(pid =>
            this.calculateGeneration(pid, visited)
        );

        return Math.max(...parentGenerations) + 1;
    }

    // Statistics
    getStatistics() {
        const males = this.members.filter(m => m.gender === 'male').length;
        const females = this.members.filter(m => m.gender === 'female').length;

        const generations = new Set(
            this.members.map(m => this.calculateGeneration(m.id))
        );

        return {
            totalMembers: this.members.length,
            males,
            females,
            generations: generations.size,
            alive: this.members.filter(m => m.isAlive).length,
            deceased: this.members.filter(m => !m.isAlive).length
        };
    }

    getRecentMembers(limit = 5) {
        return [...this.members]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, limit);
    }

    getUpcomingBirthdays(limit = 10) {
        const today = new Date();
        const currentYear = today.getFullYear();

        const birthdays = this.members
            .filter(m => m.birthDate && m.isAlive)
            .map(member => {
                const birthDate = new Date(member.birthDate);
                const thisYearBirthday = new Date(
                    currentYear,
                    birthDate.getMonth(),
                    birthDate.getDate()
                );

                if (thisYearBirthday < today) {
                    thisYearBirthday.setFullYear(currentYear + 1);
                }

                const daysUntil = Math.ceil(
                    (thisYearBirthday - today) / (1000 * 60 * 60 * 24)
                );

                return {
                    member,
                    date: thisYearBirthday.toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric'
                    }),
                    daysUntil
                };
            })
            .sort((a, b) => a.daysUntil - b.daysUntil)
            .slice(0, limit);

        return birthdays;
    }

    // Data Management
    exportData() {
        return {
            members: this.members,
            relationships: this.relationships,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
    }

    importData(data) {
        if (data.members && Array.isArray(data.members)) {
            this.members = data.members;
        }
        if (data.relationships && Array.isArray(data.relationships)) {
            this.relationships = data.relationships;
        }
        this.saveToStorage();
    }

    clearAllData() {
        this.members = [];
        this.relationships = [];
        this.saveToStorage();
    }

    // Storage
    saveToStorage() {
        try {
            localStorage.setItem('familyTreeMembers', JSON.stringify(this.members));
            localStorage.setItem('familyTreeRelationships', JSON.stringify(this.relationships));
        } catch (error) {
            console.error('Error saving to storage:', error);
        }
    }

    loadFromStorage() {
        try {
            const membersData = localStorage.getItem('familyTreeMembers');
            const relationshipsData = localStorage.getItem('familyTreeRelationships');

            if (membersData) {
                this.members = JSON.parse(membersData);
            }
            if (relationshipsData) {
                this.relationships = JSON.parse(relationshipsData);
            }
        } catch (error) {
            console.error('Error loading from storage:', error);
        }
    }

    // Utilities
    generateId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
}

export default FamilyTreeService;
