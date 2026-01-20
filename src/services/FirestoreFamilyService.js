import {
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    serverTimestamp,
    onSnapshot
} from 'firebase/firestore';
import { db } from '../config/firebase.js';
import authService from './AuthService.js';

class FirestoreFamilyService {
    constructor() {
        this.members = [];
        this.relationships = [];
        this.currentTreeId = null;
        this.unsubscribeMembers = null;
        this.unsubscribeRelationships = null;
        this.dataChangeListeners = [];
        this.familyTreesCache = null;
    }

    // Get current user's family trees collection reference
    getUserTreesRef() {
        const user = authService.getCurrentUser();
        if (!user) throw new Error('User not authenticated');
        return collection(db, 'users', user.uid, 'familyTrees');
    }

    // Get members collection for current tree
    getMembersRef() {
        const user = authService.getCurrentUser();
        if (!user || !this.currentTreeId) return null;
        return collection(db, 'users', user.uid, 'familyTrees', this.currentTreeId, 'members');
    }

    // Get relationships collection for current tree
    getRelationshipsRef() {
        const user = authService.getCurrentUser();
        if (!user || !this.currentTreeId) return null;
        return collection(db, 'users', user.uid, 'familyTrees', this.currentTreeId, 'relationships');
    }

    // Create a new family tree
    async createFamilyTree(name = 'My Family Tree') {
        const treesRef = this.getUserTreesRef();
        const treeDoc = await addDoc(treesRef, {
            name,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        this.currentTreeId = treeDoc.id;
        this.familyTreesCache = null; // Invalidate cache
        await this.subscribeToTree();
        return treeDoc.id;
    }

    // Get all family trees for current user
    async getFamilyTrees() {
        if (this.familyTreesCache) {
            console.log('Returning family trees from cache.');
            return this.familyTreesCache;
        }

        try {
            const treesRef = this.getUserTreesRef();
            // Order by creation date on the server.
            // This requires a composite index on `createdAt` field (desc) in Firestore.
            const q = query(treesRef, orderBy('createdAt', 'desc'));
            const snapshot = await getDocs(q);
            const trees = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            this.familyTreesCache = trees;
            console.log('Fetched and cached family trees.');

            return trees;
        } catch (error) {
            console.error(
                'Error getting family trees with server-side sorting. ' +
                'This likely requires a Firestore index. ' +
                'Falling back to client-side sorting. Error: ', error
            );
            
            // Fallback to old method if index is missing
            try {
                const treesRef = this.getUserTreesRef();
                const snapshot = await getDocs(treesRef);
                const trees = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                // Sort client-side
                return trees.sort((a, b) => {
                    const aTime = a.createdAt?.toMillis?.() || 0;
                    const bTime = b.createdAt?.toMillis?.() || 0;
                    return bTime - aTime;
                });
            } catch (fallbackError) {
                console.error('Error in fallback fetching of family trees:', fallbackError);
                return [];
            }
        }
    }

    // Load a specific family tree
    async loadFamilyTree(treeId) {
        this.currentTreeId = treeId;
        await this.subscribeToTree();
        return this.currentTreeId;
    }

    // Subscribe to real-time updates for current tree
    async subscribeToTree() {
        // Unsubscribe from previous subscriptions
        this.unsubscribe();

        const membersRef = this.getMembersRef();
        const relationshipsRef = this.getRelationshipsRef();

        if (!membersRef || !relationshipsRef) return;

        // Subscribe to members
        this.unsubscribeMembers = onSnapshot(membersRef, (snapshot) => {
            this.members = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            this.notifyDataChange();
        });

        // Subscribe to relationships
        this.unsubscribeRelationships = onSnapshot(relationshipsRef, (snapshot) => {
            this.relationships = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            this.notifyDataChange();
        });
    }

    // Unsubscribe from real-time updates
    unsubscribe() {
        if (this.unsubscribeMembers) {
            this.unsubscribeMembers();
            this.unsubscribeMembers = null;
        }
        if (this.unsubscribeRelationships) {
            this.unsubscribeRelationships();
            this.unsubscribeRelationships = null;
        }
    }

    // Member Management
    async addMember(memberData) {
        const membersRef = this.getMembersRef();
        if (!membersRef) throw new Error('No family tree selected');

        const docRef = await addDoc(membersRef, {
            ...memberData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });

        return { id: docRef.id, ...memberData };
    }

    async updateMember(id, updates) {
        const membersRef = this.getMembersRef();
        if (!membersRef) throw new Error('No family tree selected');

        const memberDoc = doc(membersRef, id);
        await updateDoc(memberDoc, {
            ...updates,
            updatedAt: serverTimestamp()
        });

        return { id, ...updates };
    }

    async deleteMember(id) {
        const membersRef = this.getMembersRef();
        if (!membersRef) throw new Error('No family tree selected');

        await deleteDoc(doc(membersRef, id));

        // Also delete related relationships
        const relationshipsRef = this.getRelationshipsRef();
        const relatedRelationships = this.relationships.filter(
            r => r.member1Id === id || r.member2Id === id
        );
        for (const rel of relatedRelationships) {
            await deleteDoc(doc(relationshipsRef, rel.id));
        }
    }

    getMember(id) {
        return this.members.find(m => m.id === id);
    }

    getAllMembers() {
        return this.members.map(member => {
            const spouse = this.getSpouse(member.id);
            return {
                ...member,
                spouseId: spouse ? spouse.id : null
            };
        });
    }

    // Relationship Management
    async addSpouse(member1Id, member2Id, marriageDate = null) {
        const relationshipsRef = this.getRelationshipsRef();
        if (!relationshipsRef) throw new Error('No family tree selected');

        const docRef = await addDoc(relationshipsRef, {
            type: 'spouse',
            member1Id,
            member2Id,
            marriageDate,
            createdAt: serverTimestamp()
        });

        return { id: docRef.id, type: 'spouse', member1Id, member2Id, marriageDate };
    }

    async addParent(childId, parentId) {
        const child = this.getMember(childId);
        if (child) {
            const parentIds = child.parentIds || [];
            if (!parentIds.includes(parentId)) {
                parentIds.push(parentId);
                await this.updateMember(childId, { parentIds });
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
            return 1;
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
            .sort((a, b) => {
                const aTime = a.createdAt?.toMillis?.() || 0;
                const bTime = b.createdAt?.toMillis?.() || 0;
                return bTime - aTime;
            })
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

    // Data export
    exportData() {
        return {
            members: this.members,
            relationships: this.relationships,
            exportDate: new Date().toISOString(),
            version: '2.0'
        };
    }

    // Clear data (for switching trees)
    clearLocalData() {
        this.members = [];
        this.relationships = [];
        this.currentTreeId = null;
        this.familyTreesCache = null; // Invalidate cache
        this.unsubscribe();
    }

    // Data change notifications
    onDataChange(callback) {
        this.dataChangeListeners.push(callback);
        return () => {
            this.dataChangeListeners = this.dataChangeListeners.filter(cb => cb !== callback);
        };
    }

    notifyDataChange() {
        this.dataChangeListeners.forEach(cb => cb());
        // Also dispatch custom event for compatibility
        window.dispatchEvent(new CustomEvent('familyDataChanged'));
    }
}

// Export singleton instance
const firestoreFamilyService = new FirestoreFamilyService();
export default firestoreFamilyService;
