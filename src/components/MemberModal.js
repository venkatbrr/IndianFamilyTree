class MemberModal {
    constructor(familyService) {
        this.familyService = familyService;
        this.modal = document.getElementById('memberModal');
        this.modalBody = document.getElementById('modalBody');
        this.currentMember = null;

        this.bindEvents();
    }

    bindEvents() {
        // Close modal
        document.getElementById('closeModal')?.addEventListener('click', () => {
            this.close();
        });

        // Cancel button
        document.getElementById('cancelBtn')?.addEventListener('click', () => {
            this.close();
        });

        // Save button
        document.getElementById('saveBtn')?.addEventListener('click', () => {
            this.save();
        });

        // Close on outside click
        this.modal?.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Listen for member selection
        window.addEventListener('memberSelected', (e) => {
            this.open(e.detail);
        });
    }

    open(member = null) {
        this.currentMember = member;
        this.renderForm();
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.currentMember = null;
    }

    renderForm() {
        const isEdit = this.currentMember !== null;
        document.getElementById('modalTitle').textContent = isEdit ? 'Edit Member' : 'Add New Member';

        this.modalBody.innerHTML = `
            <form id="memberForm" class="member-form">
                <div class="form-row">
                    <div class="form-group">
                        <label for="name">Full Name *</label>
                        <input type="text" id="name" name="name" required
                            value="${isEdit ? this.currentMember.name : ''}"
                            placeholder="Enter full name">
                    </div>

                    <div class="form-group">
                        <label for="gender">Gender *</label>
                        <select id="gender" name="gender" required>
                            <option value="">Select gender</option>
                            <option value="male" ${isEdit && this.currentMember.gender === 'male' ? 'selected' : ''}>Male</option>
                            <option value="female" ${isEdit && this.currentMember.gender === 'female' ? 'selected' : ''}>Female</option>
                            <option value="other" ${isEdit && this.currentMember.gender === 'other' ? 'selected' : ''}>Other</option>
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="birthDate">Date of Birth</label>
                        <input type="date" id="birthDate" name="birthDate"
                            value="${isEdit && this.currentMember.birthDate ? this.currentMember.birthDate : ''}">
                    </div>

                    <div class="form-group">
                        <label for="birthPlace">Place of Birth</label>
                        <input type="text" id="birthPlace" name="birthPlace"
                            value="${isEdit && this.currentMember.birthPlace ? this.currentMember.birthPlace : ''}"
                            placeholder="City, State">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="isAlive" name="isAlive"
                                ${isEdit && !this.currentMember.isAlive ? '' : 'checked'}>
                            Currently Alive
                        </label>
                    </div>
                </div>

                <div class="form-row" id="deathDateRow" style="display: ${isEdit && !this.currentMember.isAlive ? 'flex' : 'none'};">
                    <div class="form-group">
                        <label for="deathDate">Date of Death</label>
                        <input type="date" id="deathDate" name="deathDate"
                            value="${isEdit && this.currentMember.deathDate ? this.currentMember.deathDate : ''}">
                    </div>

                    <div class="form-group">
                        <label for="deathPlace">Place of Death</label>
                        <input type="text" id="deathPlace" name="deathPlace"
                            value="${isEdit && this.currentMember.deathPlace ? this.currentMember.deathPlace : ''}"
                            placeholder="City, State">
                    </div>
                </div>

                <div class="form-section-title">Indian Cultural Information</div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="gotra">Gotra</label>
                        <input type="text" id="gotra" name="gotra"
                            value="${isEdit && this.currentMember.gotra ? this.currentMember.gotra : ''}"
                            placeholder="e.g., Bharadwaj, Kashyap">
                    </div>

                    <div class="form-group">
                        <label for="kuldevta">Kuldevta/Kuldevi</label>
                        <input type="text" id="kuldevta" name="kuldevta"
                            value="${isEdit && this.currentMember.kuldevta ? this.currentMember.kuldevta : ''}"
                            placeholder="Family deity">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="nakshatra">Nakshatra</label>
                        <input type="text" id="nakshatra" name="nakshatra"
                            value="${isEdit && this.currentMember.nakshatra ? this.currentMember.nakshatra : ''}"
                            placeholder="Birth star">
                    </div>

                    <div class="form-group">
                        <label for="rashi">Rashi (Zodiac Sign)</label>
                        <input type="text" id="rashi" name="rashi"
                            value="${isEdit && this.currentMember.rashi ? this.currentMember.rashi : ''}"
                            placeholder="e.g., Mesha, Vrishabha">
                    </div>
                </div>

                <div class="form-section-title">Personal Information</div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="profession">Profession</label>
                        <input type="text" id="profession" name="profession"
                            value="${isEdit && this.currentMember.profession ? this.currentMember.profession : ''}"
                            placeholder="Occupation">
                    </div>

                    <div class="form-group">
                        <label for="education">Education</label>
                        <input type="text" id="education" name="education"
                            value="${isEdit && this.currentMember.education ? this.currentMember.education : ''}"
                            placeholder="Highest qualification">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone"
                            value="${isEdit && this.currentMember.phone ? this.currentMember.phone : ''}"
                            placeholder="+91 XXXXX XXXXX">
                    </div>

                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email"
                            value="${isEdit && this.currentMember.email ? this.currentMember.email : ''}"
                            placeholder="email@example.com">
                    </div>
                </div>

                <div class="form-group">
                    <label for="address">Current Address</label>
                    <textarea id="address" name="address" rows="3"
                        placeholder="Full address">${isEdit && this.currentMember.address ? this.currentMember.address : ''}</textarea>
                </div>

                <div class="form-group">
                    <label for="notes">Additional Notes</label>
                    <textarea id="notes" name="notes" rows="3"
                        placeholder="Any additional information">${isEdit && this.currentMember.notes ? this.currentMember.notes : ''}</textarea>
                </div>
            </form>
        `;

        // Add event listener for isAlive checkbox
        document.getElementById('isAlive')?.addEventListener('change', (e) => {
            const deathDateRow = document.getElementById('deathDateRow');
            deathDateRow.style.display = e.target.checked ? 'none' : 'flex';
        });
    }

    save() {
        const form = document.getElementById('memberForm');
        const formData = new FormData(form);

        // Validate required fields
        if (!formData.get('name') || !formData.get('gender')) {
            alert('Please fill in all required fields');
            return;
        }

        // Build member object
        const memberData = {
            name: formData.get('name'),
            gender: formData.get('gender'),
            birthDate: formData.get('birthDate') || null,
            birthPlace: formData.get('birthPlace') || null,
            isAlive: document.getElementById('isAlive').checked,
            deathDate: formData.get('deathDate') || null,
            deathPlace: formData.get('deathPlace') || null,
            gotra: formData.get('gotra') || null,
            kuldevta: formData.get('kuldevta') || null,
            nakshatra: formData.get('nakshatra') || null,
            rashi: formData.get('rashi') || null,
            profession: formData.get('profession') || null,
            education: formData.get('education') || null,
            phone: formData.get('phone') || null,
            email: formData.get('email') || null,
            address: formData.get('address') || null,
            notes: formData.get('notes') || null
        };

        if (this.currentMember) {
            // Update existing member
            this.familyService.updateMember(this.currentMember.id, memberData);
        } else {
            // Add new member
            this.familyService.addMember(memberData);
        }

        // Dispatch event to notify app of data change
        window.dispatchEvent(new Event('familyDataChanged'));

        this.close();
    }
}

export default MemberModal;
