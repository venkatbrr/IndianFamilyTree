class MemberModal {
    constructor(familyService) {
        this.familyService = familyService;
        this.modal = document.getElementById('memberModal');
        this.modalBody = document.getElementById('modalBody');
        this.currentMember = null;
        this.selectedPhoto = null;
        this.photoPreviewURL = null;

        console.log('MemberModal initialized, modal element:', this.modal);

        if (this.modal) {
            this.bindEvents();
        } else {
            console.error('MemberModal: #memberModal element not found in DOM');
        }
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

        // Delete button
        document.getElementById('deleteMemberBtn')?.addEventListener('click', () => {
            this.deleteMember();
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
        console.log('MemberModal.open() called');

        if (!this.modal) {
            console.error('Cannot open modal: modal element is null');
            // Try to find it again
            this.modal = document.getElementById('memberModal');
            this.modalBody = document.getElementById('modalBody');
            if (!this.modal) {
                alert('Error: Modal element not found');
                return;
            }
        }

        this.currentMember = member;
        this.selectedPhoto = null;
        this.photoPreviewURL = null;
        this.photoToDelete = null;
        this.preSelectedRelationship = null;
        this.preSelectedGender = null;
        this.referenceMemberId = null;
        this.relationshipToReference = null;
        this._pendingParentUpdate = null;

        this.renderForm();

        // Show/hide delete button based on whether it's edit mode
        const deleteBtn = document.getElementById('deleteMemberBtn');
        if (deleteBtn) {
            deleteBtn.style.display = member ? 'block' : 'none';
        }

        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('Modal should now be visible, classList:', this.modal.classList);
    }

    openWithRelationship(relationship, gender, referenceMemberId = null) {
        console.log('MemberModal.openWithRelationship() called:', relationship, gender, referenceMemberId);

        if (!this.modal) {
            this.modal = document.getElementById('memberModal');
            this.modalBody = document.getElementById('modalBody');
            if (!this.modal) {
                alert('Error: Modal element not found');
                return;
            }
        }

        this.currentMember = null;
        this.selectedPhoto = null;
        this.photoPreviewURL = null;
        this.photoToDelete = null;
        this.preSelectedRelationship = relationship === 'Other' ? null : relationship;
        this.preSelectedGender = gender || null;

        // Store reference member for establishing relationships
        // If not provided, find the current user's member
        if (referenceMemberId) {
            this.referenceMemberId = referenceMemberId;
        } else {
            // Find the member marked as current user
            const currentUserMember = this.familyService.getAllMembers().find(m => m.isCurrentUser);
            this.referenceMemberId = currentUserMember?.id || null;
        }
        this.relationshipToReference = relationship;

        this.renderForm();

        // Show/hide delete button
        const deleteBtn = document.getElementById('deleteMemberBtn');
        if (deleteBtn) {
            deleteBtn.style.display = 'none';
        }

        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.currentMember = null;
    }

    getParentOptions(selectedId = null) {
        const members = this.familyService.getAllMembers();
        return members.map(member => {
            const name = member.firstName
                ? `${member.firstName} ${member.lastName || ''}`.trim()
                : member.name;
            const selected = selectedId === member.id ? 'selected' : '';
            return `<option value="${member.id}" ${selected}>${name}</option>`;
        }).join('');
    }

    getSelectedAttr(field, value, isEdit) {
        // Check pre-selected values first (from relationship selector)
        if (field === 'gender' && this.preSelectedGender === value) {
            return 'selected';
        }
        if (field === 'relationship' && this.preSelectedRelationship === value) {
            return 'selected';
        }
        // Then check edit mode values
        if (isEdit && this.currentMember && this.currentMember[field] === value) {
            return 'selected';
        }
        return '';
    }

    renderForm() {
        const isEdit = this.currentMember !== null;
        document.getElementById('modalTitle').textContent = isEdit ? 'Edit Member' : 'Add New Member';

        // Get values for form - support both old format (name) and new format (firstName/lastName)
        let firstName = '';
        let lastName = '';
        if (isEdit) {
            if (this.currentMember.firstName) {
                firstName = this.currentMember.firstName;
                lastName = this.currentMember.lastName || '';
            } else if (this.currentMember.name) {
                // Split old format name
                const nameParts = this.currentMember.name.split(' ');
                firstName = nameParts[0] || '';
                lastName = nameParts.slice(1).join(' ') || '';
            }
        }

        this.modalBody.innerHTML = `
            <form id="memberForm" class="member-form">
                <!-- Photo Upload Section - HIDDEN (Firebase Storage disabled) -->
                <!-- TODO: Uncomment when Firebase Storage is enabled
                <div class="form-group photo-upload-section">
                    <label>Profile Photo</label>
                    <div class="photo-upload-container">
                        <div class="photo-preview" id="photoPreview">
                            ${isEdit && this.currentMember.photoURL
                                ? `<img src="${this.currentMember.photoURL}" alt="Profile photo" class="preview-image">`
                                : '<div class="photo-placeholder">📷<br>No photo</div>'}
                        </div>
                        <div class="photo-upload-controls">
                            <input type="file" id="photoInput" name="photo" accept="image/*" class="file-input">
                            <label for="photoInput" class="btn btn-secondary btn-small">Choose Photo</label>
                            ${isEdit && this.currentMember.photoURL ? '<button type="button" id="removePhotoBtn" class="btn btn-secondary btn-small">Remove Photo</button>' : ''}
                        </div>
                    </div>
                </div>
                -->

                <!-- Name Fields -->
                <div class="form-row">
                    <div class="form-group">
                        <label for="firstName">First Name *</label>
                        <input type="text" id="firstName" name="firstName" required
                            value="${firstName}"
                            placeholder="First name">
                    </div>

                    <div class="form-group">
                        <label for="lastName">Last Name</label>
                        <input type="text" id="lastName" name="lastName"
                            value="${lastName}"
                            placeholder="Last name">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="gender">Gender *</label>
                        <select id="gender" name="gender" required>
                            <option value="">Select gender</option>
                            <option value="male" ${this.getSelectedAttr('gender', 'male', isEdit)}>Male</option>
                            <option value="female" ${this.getSelectedAttr('gender', 'female', isEdit)}>Female</option>
                            <option value="other" ${this.getSelectedAttr('gender', 'other', isEdit)}>Other</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="relationship">Relationship</label>
                        <select id="relationship" name="relationship">
                            <option value="">Select relationship</option>
                            <option value="Father" ${this.getSelectedAttr('relationship', 'Father', isEdit)}>Father</option>
                            <option value="Mother" ${this.getSelectedAttr('relationship', 'Mother', isEdit)}>Mother</option>
                            <option value="Son" ${this.getSelectedAttr('relationship', 'Son', isEdit)}>Son</option>
                            <option value="Daughter" ${this.getSelectedAttr('relationship', 'Daughter', isEdit)}>Daughter</option>
                            <option value="Brother" ${this.getSelectedAttr('relationship', 'Brother', isEdit)}>Brother</option>
                            <option value="Sister" ${this.getSelectedAttr('relationship', 'Sister', isEdit)}>Sister</option>
                            <option value="Grandfather" ${this.getSelectedAttr('relationship', 'Grandfather', isEdit)}>Grandfather</option>
                            <option value="Grandmother" ${this.getSelectedAttr('relationship', 'Grandmother', isEdit)}>Grandmother</option>
                            <option value="Grandson" ${this.getSelectedAttr('relationship', 'Grandson', isEdit)}>Grandson</option>
                            <option value="Granddaughter" ${this.getSelectedAttr('relationship', 'Granddaughter', isEdit)}>Granddaughter</option>
                            <option value="Uncle" ${this.getSelectedAttr('relationship', 'Uncle', isEdit)}>Uncle</option>
                            <option value="Aunt" ${this.getSelectedAttr('relationship', 'Aunt', isEdit)}>Aunt</option>
                            <option value="Nephew" ${this.getSelectedAttr('relationship', 'Nephew', isEdit)}>Nephew</option>
                            <option value="Niece" ${this.getSelectedAttr('relationship', 'Niece', isEdit)}>Niece</option>
                            <option value="Cousin" ${this.getSelectedAttr('relationship', 'Cousin', isEdit)}>Cousin</option>
                            <option value="Husband" ${this.getSelectedAttr('relationship', 'Husband', isEdit)}>Husband</option>
                            <option value="Wife" ${this.getSelectedAttr('relationship', 'Wife', isEdit)}>Wife</option>
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
                        <label for="age">Age</label>
                        <input type="number" id="age" name="age" min="0" max="150"
                            value="${isEdit && this.currentMember.age ? this.currentMember.age : ''}"
                            placeholder="Age (auto-calculated from DOB)">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="birthPlace">Place of Birth</label>
                        <input type="text" id="birthPlace" name="birthPlace"
                            value="${isEdit && this.currentMember.birthPlace ? this.currentMember.birthPlace : ''}"
                            placeholder="City, State">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="parent1">Parent 1</label>
                        <select id="parent1" name="parent1">
                            <option value="">Select parent</option>
                            ${this.getParentOptions(isEdit ? this.currentMember.parentIds?.[0] : null)}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="parent2">Parent 2</label>
                        <select id="parent2" name="parent2">
                            <option value="">Select parent</option>
                            ${this.getParentOptions(isEdit ? this.currentMember.parentIds?.[1] : null)}
                        </select>
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

        // Photo upload preview
        document.getElementById('photoInput')?.addEventListener('change', (e) => {
            this.handlePhotoSelect(e);
        });

        // Remove photo button
        document.getElementById('removePhotoBtn')?.addEventListener('click', () => {
            this.handlePhotoRemove();
        });

        // Auto-calculate age from birthDate
        document.getElementById('birthDate')?.addEventListener('change', (e) => {
            const ageInput = document.getElementById('age');
            if (e.target.value && !ageInput.value) {
                const birthDate = new Date(e.target.value);
                const today = new Date();
                const age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                    ageInput.value = age - 1;
                } else {
                    ageInput.value = age;
                }
            }
        });
    }

    handlePhotoSelect(event) {
        const file = event.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                event.target.value = '';
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size must be less than 5MB');
                event.target.value = '';
                return;
            }

            this.selectedPhoto = file;

            // Show preview
            const reader = new FileReader();
            reader.onload = (e) => {
                this.photoPreviewURL = e.target.result;
                const photoPreview = document.getElementById('photoPreview');
                photoPreview.innerHTML = `<img src="${e.target.result}" alt="Preview" class="preview-image">`;
            };
            reader.readAsDataURL(file);
        }
    }

    handlePhotoRemove() {
        this.selectedPhoto = null;
        this.photoPreviewURL = null;
        const photoPreview = document.getElementById('photoPreview');
        photoPreview.innerHTML = '<div class="photo-placeholder">📷<br>No photo</div>';
        document.getElementById('photoInput').value = '';

        // Mark for deletion if editing
        if (this.currentMember && this.currentMember.photoURL) {
            this.photoToDelete = this.currentMember.photoURL;
        }
    }

    async save() {
        const form = document.getElementById('memberForm');
        const formData = new FormData(form);

        // Validate required fields
        const firstName = formData.get('firstName')?.trim();
        const lastName = formData.get('lastName')?.trim();
        const gender = formData.get('gender');

        if (!firstName) {
            alert('First Name is required');
            document.getElementById('memberForm').querySelector('[name="firstName"]')?.focus();
            return;
        }

        if (!gender) {
            alert('Gender is required');
            return;
        }

        // Show loading state
        const saveBtn = document.getElementById('saveBtn');
        const originalText = saveBtn.textContent;
        saveBtn.disabled = true;
        saveBtn.textContent = 'Saving...';

        try {
            // Build member object with new fields
            const lastName = formData.get('lastName') || '';
            const fullName = lastName ? `${firstName} ${lastName}` : firstName;

            // Build parentIds array from form
            const parentIds = [];
            const parent1 = formData.get('parent1');
            const parent2 = formData.get('parent2');
            if (parent1) parentIds.push(parent1);
            if (parent2) parentIds.push(parent2);

            const memberData = {
                firstName: firstName,
                lastName: lastName,
                name: fullName, // Keep for backward compatibility
                gender: gender,
                relationship: formData.get('relationship') || null,
                age: formData.get('age') ? parseInt(formData.get('age')) : null,
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
                notes: formData.get('notes') || null,
                parentIds: parentIds.length > 0 ? parentIds : null
            };

            let memberId = this.currentMember ? this.currentMember.id : null;

            // Handle photo upload
            // TODO: Uncomment when Firebase Storage is enabled (requires billing upgrade)
            /*
            if (this.selectedPhoto) {
                // If editing, delete old photo first
                if (this.currentMember && this.currentMember.photoURL) {
                    await this.familyService.deletePhoto(this.currentMember.photoURL);
                }

                // Upload new photo (need member ID for path)
                if (!memberId) {
                    // For new members, create a temporary ID
                    memberId = `temp_${Date.now()}`;
                }
                const photoURL = await this.familyService.uploadPhoto(this.selectedPhoto, memberId);
                memberData.photoURL = photoURL;
            } else if (this.photoToDelete) {
                // User removed the photo
                await this.familyService.deletePhoto(this.photoToDelete);
                memberData.photoURL = null;
            } else if (this.currentMember && this.currentMember.photoURL) {
                // Keep existing photo
                memberData.photoURL = this.currentMember.photoURL;
            }
            */

            // For now, just notify user that photo upload requires Firebase Storage upgrade
            if (this.selectedPhoto) {
                console.log('Photo selected but Storage not enabled. Saving member without photo.');
                memberData.photoURL = null;
            }

            // Auto-establish relationships based on relationship type selected from picker
            if (this.referenceMemberId && this.relationshipToReference && !this.currentMember) {
                const refMember = this.familyService.getMember(this.referenceMemberId);
                if (refMember) {
                    await this.establishRelationship(memberData, refMember, this.relationshipToReference);
                }
            }

            // Save member data
            if (this.currentMember) {
                // Update existing member
                await this.familyService.updateMember(this.currentMember.id, memberData);
            } else {
                // Add new member
                const newMember = await this.familyService.addMember(memberData);

                // Handle parent relationship - update reference member's parentIds
                if (this._pendingParentUpdate && newMember) {
                    const child = this.familyService.getMember(this._pendingParentUpdate.childId);
                    if (child) {
                        const existingParentIds = child.parentIds || [];
                        if (!existingParentIds.includes(newMember.id)) {
                            existingParentIds.push(newMember.id);
                            await this.familyService.updateMember(child.id, { parentIds: existingParentIds });
                        }
                    }
                    this._pendingParentUpdate = null;
                }

                // Handle spouse relationship after member is created
                if (this.referenceMemberId && this.relationshipToReference &&
                    (this.relationshipToReference === 'Husband' || this.relationshipToReference === 'Wife')) {
                    await this.familyService.addSpouse(this.referenceMemberId, newMember.id);
                }
            }

            // Reset relationship reference state
            this.referenceMemberId = null;
            this.relationshipToReference = null;

            // Reset photo state
            this.selectedPhoto = null;
            this.photoPreviewURL = null;
            this.photoToDelete = null;

            // Dispatch event to notify app of data change
            window.dispatchEvent(new Event('familyDataChanged'));

            // Reset button state
            saveBtn.disabled = false;
            saveBtn.textContent = originalText;

            this.close();
        } catch (error) {
            console.error('Error saving member:', error);
            alert('Failed to save member: ' + error.message);
            saveBtn.disabled = false;
            saveBtn.textContent = originalText;
        }
    }

    async establishRelationship(newMemberData, referenceMember, relationship) {
        // Establish proper parent-child relationships based on the relationship type
        // The relationship is FROM the reference member's perspective
        // e.g., "Father" means the new member is the father OF the reference member

        switch (relationship) {
            case 'Father':
            case 'Mother':
                // New member is a PARENT of the reference member
                // So reference member should have this new member as a parent
                // We'll update reference member's parentIds after the new member is saved
                // Store this for later update
                this._pendingParentUpdate = {
                    childId: referenceMember.id,
                    relationship: relationship
                };
                break;

            case 'Son':
            case 'Daughter':
                // New member is a CHILD of the reference member
                // So new member should have reference member as parent
                if (!newMemberData.parentIds) {
                    newMemberData.parentIds = [];
                }
                if (!newMemberData.parentIds.includes(referenceMember.id)) {
                    newMemberData.parentIds.push(referenceMember.id);
                }
                // Also add reference member's spouse as parent if exists
                if (referenceMember.spouseId) {
                    newMemberData.parentIds.push(referenceMember.spouseId);
                }
                break;

            case 'Brother':
            case 'Sister':
                // New member is a SIBLING - should share the same parents
                if (referenceMember.parentIds && referenceMember.parentIds.length > 0) {
                    newMemberData.parentIds = [...referenceMember.parentIds];
                }
                break;

            case 'Grandfather':
            case 'Grandmother':
                // New member is a grandparent - parent of reference member's parent
                // This is complex, we'll handle it by just adding as a root member for now
                break;

            case 'Grandson':
            case 'Granddaughter':
                // New member is a grandchild - child of reference member's child
                // Find reference member's children and add as parent
                const children = this.familyService.getChildren(referenceMember.id);
                if (children.length > 0) {
                    newMemberData.parentIds = [children[0].id];
                }
                break;

            // Husband/Wife handled separately in save() via addSpouse
            default:
                break;
        }
    }

    async deleteMember() {
        if (!this.currentMember) return;

        const memberName = this.currentMember.name ||
                          `${this.currentMember.firstName || ''} ${this.currentMember.lastName || ''}`.trim();

        // Confirm deletion
        const confirmed = confirm(
            `Are you sure you want to delete ${memberName}?\n\n` +
            `This will also remove all relationships with this member and cannot be undone.`
        );

        if (!confirmed) return;

        // Show loading state
        const deleteBtn = document.getElementById('deleteMemberBtn');
        const originalText = deleteBtn.textContent;
        deleteBtn.disabled = true;
        deleteBtn.textContent = 'Deleting...';

        try {
            // Delete photo from storage if exists
            // TODO: Uncomment when Firebase Storage is enabled
            /*
            if (this.currentMember.photoURL) {
                await this.familyService.deletePhoto(this.currentMember.photoURL);
            }
            */

            console.log('Deleting member:', this.currentMember.id);

            // Delete member (also deletes relationships)
            await this.familyService.deleteMember(this.currentMember.id);

            console.log('Member deleted successfully');

            // Reset button state
            deleteBtn.disabled = false;
            deleteBtn.textContent = originalText;

            // Close modal first
            this.close();

            // Then dispatch event to notify app of data change
            window.dispatchEvent(new Event('familyDataChanged'));
        } catch (error) {
            console.error('Error deleting member:', error);
            alert('Failed to delete member: ' + error.message);
            deleteBtn.disabled = false;
            deleteBtn.textContent = originalText;
        }
    }
}

export default MemberModal;
