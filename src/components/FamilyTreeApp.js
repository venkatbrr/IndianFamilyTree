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
        // ===== GENERATION 1: Great-Grandparents (1920s-1930s) - 4 people =====
        const gen1_paternal_gf = this.familyService.addMember({
            name: 'Pandit Ramchandra Sharma',
            gender: 'male',
            birthDate: '1920-01-15',
            deathDate: '1995-06-20',
            birthPlace: 'Varanasi, Uttar Pradesh',
            gotra: 'Bharadwaj',
            profession: 'Sanskrit Scholar & Priest',
            isAlive: false
        });

        const gen1_paternal_gm = this.familyService.addMember({
            name: 'Smt. Lakshmi Devi',
            gender: 'female',
            birthDate: '1925-03-10',
            deathDate: '2000-12-15',
            birthPlace: 'Allahabad, Uttar Pradesh',
            profession: 'Homemaker',
            isAlive: false
        });

        const gen1_maternal_gf = this.familyService.addMember({
            name: 'Shri Mohan Lal Gupta',
            gender: 'male',
            birthDate: '1922-07-08',
            deathDate: '1998-03-25',
            birthPlace: 'Jaipur, Rajasthan',
            gotra: 'Kashyap',
            profession: 'Jeweler',
            isAlive: false
        });

        const gen1_maternal_gm = this.familyService.addMember({
            name: 'Smt. Radha Devi',
            gender: 'female',
            birthDate: '1927-11-20',
            deathDate: '2005-08-10',
            birthPlace: 'Ajmer, Rajasthan',
            profession: 'Homemaker',
            isAlive: false
        });

        this.familyService.addSpouse(gen1_paternal_gf.id, gen1_paternal_gm.id, '1940-05-12');
        this.familyService.addSpouse(gen1_maternal_gf.id, gen1_maternal_gm.id, '1943-11-15');

        // ===== GENERATION 2: Grandparents (1940s-1950s) - 12 people =====
        // Paternal side (Sharma family)
        const gen2_father = this.familyService.addMember({
            name: 'Shri Ramesh Kumar Sharma',
            gender: 'male',
            birthDate: '1945-08-20',
            birthPlace: 'Varanasi, Uttar Pradesh',
            gotra: 'Bharadwaj',
            profession: 'IAS Officer (Retired)',
            education: 'MA Political Science',
            isAlive: true,
            parentIds: [gen1_paternal_gf.id, gen1_paternal_gm.id]
        });

        const gen2_uncle1 = this.familyService.addMember({
            name: 'Shri Suresh Kumar Sharma',
            gender: 'male',
            birthDate: '1947-04-10',
            birthPlace: 'Varanasi, Uttar Pradesh',
            gotra: 'Bharadwaj',
            profession: 'Bank Manager (Retired)',
            education: 'M.Com',
            isAlive: true,
            parentIds: [gen1_paternal_gf.id, gen1_paternal_gm.id]
        });

        const gen2_aunt1 = this.familyService.addMember({
            name: 'Smt. Saraswati Mishra',
            gender: 'female',
            birthDate: '1948-11-05',
            birthPlace: 'Varanasi, Uttar Pradesh',
            profession: 'School Principal (Retired)',
            education: 'MA Education',
            isAlive: true,
            parentIds: [gen1_paternal_gf.id, gen1_paternal_gm.id]
        });

        const gen2_uncle2 = this.familyService.addMember({
            name: 'Late Shri Mahesh Sharma',
            gender: 'male',
            birthDate: '1952-02-18',
            deathDate: '2015-09-10',
            birthPlace: 'Varanasi, Uttar Pradesh',
            gotra: 'Bharadwaj',
            profession: 'Doctor (Cardiologist)',
            education: 'MBBS, MD',
            isAlive: false,
            parentIds: [gen1_paternal_gf.id, gen1_paternal_gm.id]
        });

        // Maternal side (Gupta family)
        const gen2_mother = this.familyService.addMember({
            name: 'Smt. Geeta Devi Sharma',
            gender: 'female',
            birthDate: '1950-02-14',
            birthPlace: 'Jaipur, Rajasthan',
            profession: 'College Professor (Retired)',
            education: 'MA Hindi Literature',
            isAlive: true
        });

        const gen2_maternal_uncle1 = this.familyService.addMember({
            name: 'Shri Anil Gupta',
            gender: 'male',
            birthDate: '1948-06-22',
            birthPlace: 'Jaipur, Rajasthan',
            gotra: 'Kashyap',
            profession: 'Businessman',
            education: 'BCom',
            isAlive: true,
            parentIds: [gen1_maternal_gf.id, gen1_maternal_gm.id]
        });

        const gen2_maternal_aunt1 = this.familyService.addMember({
            name: 'Smt. Meera Verma',
            gender: 'female',
            birthDate: '1951-09-30',
            birthPlace: 'Jaipur, Rajasthan',
            profession: 'Classical Dancer (Retired)',
            education: 'BA Fine Arts',
            isAlive: true,
            parentIds: [gen1_maternal_gf.id, gen1_maternal_gm.id]
        });

        // Spouses of Gen 2
        const gen2_father_wife = gen2_mother;
        this.familyService.addSpouse(gen2_father.id, gen2_father_wife.id, '1970-04-15');

        const gen2_uncle1_wife = this.familyService.addMember({
            name: 'Smt. Kamala Sharma',
            gender: 'female',
            birthDate: '1950-05-25',
            birthPlace: 'Lucknow, Uttar Pradesh',
            profession: 'Ayurvedic Doctor',
            education: 'BAMS',
            isAlive: true
        });
        this.familyService.addSpouse(gen2_uncle1.id, gen2_uncle1_wife.id, '1972-12-10');

        const gen2_aunt1_husband = this.familyService.addMember({
            name: 'Shri Rajendra Mishra',
            gender: 'male',
            birthDate: '1946-03-12',
            birthPlace: 'Patna, Bihar',
            gotra: 'Shandilya',
            profession: 'Engineer (Retired)',
            education: 'B.Tech Civil',
            isAlive: true
        });
        this.familyService.addSpouse(gen2_aunt1.id, gen2_aunt1_husband.id, '1970-06-20');

        const gen2_uncle2_wife = this.familyService.addMember({
            name: 'Late Smt. Kavita Sharma',
            gender: 'female',
            birthDate: '1955-08-15',
            deathDate: '2020-04-22',
            birthPlace: 'Delhi, India',
            profession: 'Nurse',
            education: 'B.Sc Nursing',
            isAlive: false
        });
        this.familyService.addSpouse(gen2_uncle2.id, gen2_uncle2_wife.id, '1975-11-28');

        const gen2_maternal_uncle1_wife = this.familyService.addMember({
            name: 'Smt. Sunita Gupta',
            gender: 'female',
            birthDate: '1952-12-05',
            birthPlace: 'Udaipur, Rajasthan',
            profession: 'Fashion Designer',
            education: 'Diploma Fashion Design',
            isAlive: true
        });
        this.familyService.addSpouse(gen2_maternal_uncle1.id, gen2_maternal_uncle1_wife.id, '1973-02-18');

        const gen2_maternal_aunt1_husband = this.familyService.addMember({
            name: 'Shri Vikram Verma',
            gender: 'male',
            birthDate: '1949-07-14',
            birthPlace: 'Indore, Madhya Pradesh',
            gotra: 'Gautam',
            profession: 'Army Officer (Retired Colonel)',
            education: 'BA, NDA',
            isAlive: true
        });
        this.familyService.addSpouse(gen2_maternal_aunt1.id, gen2_maternal_aunt1_husband.id, '1974-04-10');

        // ===== GENERATION 3: Parents (1970s-1980s) - 18 people =====
        // Main branch (Ramesh & Geeta's children)
        const gen3_son1 = this.familyService.addMember({
            name: 'Rajesh Kumar Sharma',
            gender: 'male',
            birthDate: '1972-06-10',
            birthPlace: 'Delhi, India',
            gotra: 'Bharadwaj',
            profession: 'Software Architect',
            education: 'B.Tech IIT Delhi, MS USA',
            isAlive: true,
            parentIds: [gen2_father.id, gen2_mother.id]
        });

        const gen3_daughter1 = this.familyService.addMember({
            name: 'Dr. Priya Verma',
            gender: 'female',
            birthDate: '1975-03-22',
            birthPlace: 'Delhi, India',
            profession: 'Pediatrician',
            education: 'MBBS AIIMS, MD Pediatrics',
            isAlive: true,
            parentIds: [gen2_father.id, gen2_mother.id]
        });

        const gen3_son2 = this.familyService.addMember({
            name: 'Amit Kumar Sharma',
            gender: 'male',
            birthDate: '1978-09-18',
            birthPlace: 'Delhi, India',
            gotra: 'Bharadwaj',
            profession: 'CA & CFO',
            education: 'BCom, CA, MBA Finance',
            isAlive: true,
            parentIds: [gen2_father.id, gen2_mother.id]
        });

        const gen3_daughter2 = this.familyService.addMember({
            name: 'Neelam Kapoor',
            gender: 'female',
            birthDate: '1980-12-25',
            birthPlace: 'Delhi, India',
            profession: 'Lawyer',
            education: 'LLB, LLM',
            isAlive: true,
            parentIds: [gen2_father.id, gen2_mother.id]
        });

        // Uncle 1's children (Suresh & Kamala)
        const gen3_cousin1 = this.familyService.addMember({
            name: 'Vikram Sharma',
            gender: 'male',
            birthDate: '1974-08-05',
            birthPlace: 'Lucknow, Uttar Pradesh',
            gotra: 'Bharadwaj',
            profession: 'Civil Engineer',
            education: 'B.Tech Civil, M.Tech',
            isAlive: true,
            parentIds: [gen2_uncle1.id, gen2_uncle1_wife.id]
        });

        const gen3_cousin2 = this.familyService.addMember({
            name: 'Sonia Agarwal',
            gender: 'female',
            birthDate: '1977-01-18',
            birthPlace: 'Lucknow, Uttar Pradesh',
            profession: 'Interior Designer',
            education: 'B.Des Interior Design',
            isAlive: true,
            parentIds: [gen2_uncle1.id, gen2_uncle1_wife.id]
        });

        // Aunt 1's children (Saraswati & Rajendra Mishra)
        const gen3_cousin3 = this.familyService.addMember({
            name: 'Ankit Mishra',
            gender: 'male',
            birthDate: '1976-05-12',
            birthPlace: 'Patna, Bihar',
            gotra: 'Shandilya',
            profession: 'IPS Officer',
            education: 'BA, Civil Services',
            isAlive: true,
            parentIds: [gen2_aunt1.id, gen2_aunt1_husband.id]
        });

        const gen3_cousin4 = this.familyService.addMember({
            name: 'Pooja Mishra',
            gender: 'female',
            birthDate: '1979-10-22',
            birthPlace: 'Patna, Bihar',
            profession: 'Journalist',
            education: 'MA Journalism',
            isAlive: true,
            parentIds: [gen2_aunt1.id, gen2_aunt1_husband.id]
        });

        // Uncle 2's children (Late Mahesh & Late Kavita)
        const gen3_cousin5 = this.familyService.addMember({
            name: 'Rahul Sharma',
            gender: 'male',
            birthDate: '1977-11-30',
            birthPlace: 'Mumbai, Maharashtra',
            gotra: 'Bharadwaj',
            profession: 'Cardiologist',
            education: 'MBBS, MD Cardiology',
            isAlive: true,
            parentIds: [gen2_uncle2.id, gen2_uncle2_wife.id]
        });

        const gen3_cousin6 = this.familyService.addMember({
            name: 'Sneha Patel',
            gender: 'female',
            birthDate: '1981-04-08',
            birthPlace: 'Mumbai, Maharashtra',
            profession: 'Pharmacist',
            education: 'B.Pharm',
            isAlive: true,
            parentIds: [gen2_uncle2.id, gen2_uncle2_wife.id]
        });

        // Maternal uncle's children (Anil & Sunita Gupta)
        const gen3_maternal_cousin1 = this.familyService.addMember({
            name: 'Karan Gupta',
            gender: 'male',
            birthDate: '1975-02-28',
            birthPlace: 'Jaipur, Rajasthan',
            gotra: 'Kashyap',
            profession: 'Hotel Owner',
            education: 'BHM',
            isAlive: true,
            parentIds: [gen2_maternal_uncle1.id, gen2_maternal_uncle1_wife.id]
        });

        const gen3_maternal_cousin2 = this.familyService.addMember({
            name: 'Ritu Malhotra',
            gender: 'female',
            birthDate: '1978-07-15',
            birthPlace: 'Jaipur, Rajasthan',
            profession: 'Yoga Instructor',
            education: 'Yoga Certification',
            isAlive: true,
            parentIds: [gen2_maternal_uncle1.id, gen2_maternal_uncle1_wife.id]
        });

        // Maternal aunt's children (Meera & Vikram Verma)
        const gen3_maternal_cousin3 = this.familyService.addMember({
            name: 'Arjun Verma',
            gender: 'male',
            birthDate: '1976-09-20',
            birthPlace: 'Indore, Madhya Pradesh',
            gotra: 'Gautam',
            profession: 'Pilot (Commercial)',
            education: 'BSc Aviation',
            isAlive: true,
            parentIds: [gen2_maternal_aunt1.id, gen2_maternal_aunt1_husband.id]
        });

        const gen3_maternal_cousin4 = this.familyService.addMember({
            name: 'Divya Kapoor',
            gender: 'female',
            birthDate: '1980-03-08',
            birthPlace: 'Indore, Madhya Pradesh',
            profession: 'Kathak Dancer',
            education: 'MA Performing Arts',
            isAlive: true,
            parentIds: [gen2_maternal_aunt1.id, gen2_maternal_aunt1_husband.id]
        });

        // Spouses for Gen 3
        const gen3_son1_wife = this.familyService.addMember({
            name: 'Anjali Sharma',
            gender: 'female',
            birthDate: '1974-11-25',
            birthPlace: 'Bangalore, Karnataka',
            profession: 'Architect',
            education: 'B.Arch, M.Arch',
            isAlive: true
        });
        this.familyService.addSpouse(gen3_son1.id, gen3_son1_wife.id, '1998-11-20');

        const gen3_daughter1_husband = this.familyService.addMember({
            name: 'Dr. Sanjay Verma',
            gender: 'male',
            birthDate: '1973-05-18',
            birthPlace: 'Chennai, Tamil Nadu',
            gotra: 'Bharadwaj',
            profession: 'Orthopedic Surgeon',
            education: 'MBBS, MS Orthopedics',
            isAlive: true
        });
        this.familyService.addSpouse(gen3_daughter1.id, gen3_daughter1_husband.id, '2000-12-15');

        const gen3_son2_wife = this.familyService.addMember({
            name: 'Neha Sharma',
            gender: 'female',
            birthDate: '1980-07-08',
            birthPlace: 'Pune, Maharashtra',
            profession: 'HR Director',
            education: 'MBA HR',
            isAlive: true
        });
        this.familyService.addSpouse(gen3_son2.id, gen3_son2_wife.id, '2005-12-10');

        const gen3_daughter2_husband = this.familyService.addMember({
            name: 'Rohit Kapoor',
            gender: 'male',
            birthDate: '1978-09-12',
            birthPlace: 'Chandigarh, Punjab',
            gotra: 'Kashyap',
            profession: 'Judge',
            education: 'LLB, LLM',
            isAlive: true
        });
        this.familyService.addSpouse(gen3_daughter2.id, gen3_daughter2_husband.id, '2003-05-25');

        // ===== GENERATION 4: Current Gen (2000s-2015s) - 21 people =====
        // Rajesh & Anjali's children
        const gen4_1 = this.familyService.addMember({
            name: 'Arjun Sharma',
            gender: 'male',
            birthDate: '2000-04-15',
            birthPlace: 'Bangalore, Karnataka',
            gotra: 'Bharadwaj',
            profession: 'Software Developer',
            education: 'B.Tech CSE IIT Bombay',
            isAlive: true,
            parentIds: [gen3_son1.id, gen3_son1_wife.id]
        });

        const gen4_2 = this.familyService.addMember({
            name: 'Kavya Sharma',
            gender: 'female',
            birthDate: '2003-08-22',
            birthPlace: 'Bangalore, Karnataka',
            profession: 'Engineering Student',
            education: 'B.Tech Electronics pursuing',
            isAlive: true,
            parentIds: [gen3_son1.id, gen3_son1_wife.id]
        });

        // Priya & Sanjay's children
        const gen4_3 = this.familyService.addMember({
            name: 'Aarav Verma',
            gender: 'male',
            birthDate: '2002-01-10',
            birthPlace: 'Chennai, Tamil Nadu',
            gotra: 'Bharadwaj',
            profession: 'Medical Student',
            education: 'MBBS pursuing',
            isAlive: true,
            parentIds: [gen3_daughter1.id, gen3_daughter1_husband.id]
        });

        const gen4_4 = this.familyService.addMember({
            name: 'Diya Verma',
            gender: 'female',
            birthDate: '2005-11-18',
            birthPlace: 'Chennai, Tamil Nadu',
            profession: 'Student',
            education: '12th Grade',
            isAlive: true,
            parentIds: [gen3_daughter1.id, gen3_daughter1_husband.id]
        });

        // Amit & Neha's children
        const gen4_5 = this.familyService.addMember({
            name: 'Rohan Sharma',
            gender: 'male',
            birthDate: '2007-01-10',
            birthPlace: 'Mumbai, Maharashtra',
            gotra: 'Bharadwaj',
            profession: 'Student',
            education: '11th Grade',
            isAlive: true,
            parentIds: [gen3_son2.id, gen3_son2_wife.id]
        });

        const gen4_6 = this.familyService.addMember({
            name: 'Isha Sharma',
            gender: 'female',
            birthDate: '2010-05-18',
            birthPlace: 'Mumbai, Maharashtra',
            profession: 'Student',
            education: '8th Grade',
            isAlive: true,
            parentIds: [gen3_son2.id, gen3_son2_wife.id]
        });

        const gen4_7 = this.familyService.addMember({
            name: 'Vihaan Sharma',
            gender: 'male',
            birthDate: '2013-09-22',
            birthPlace: 'Mumbai, Maharashtra',
            gotra: 'Bharadwaj',
            profession: 'Student',
            education: '5th Grade',
            isAlive: true,
            parentIds: [gen3_son2.id, gen3_son2_wife.id]
        });

        // Neelam & Rohit's children
        const gen4_8 = this.familyService.addMember({
            name: 'Ananya Kapoor',
            gender: 'female',
            birthDate: '2005-03-14',
            birthPlace: 'Chandigarh, Punjab',
            profession: 'Law Student',
            education: 'LLB pursuing',
            isAlive: true,
            parentIds: [gen3_daughter2.id, gen3_daughter2_husband.id]
        });

        const gen4_9 = this.familyService.addMember({
            name: 'Advait Kapoor',
            gender: 'male',
            birthDate: '2008-07-20',
            birthPlace: 'Chandigarh, Punjab',
            gotra: 'Kashyap',
            profession: 'Student',
            education: '10th Grade',
            isAlive: true,
            parentIds: [gen3_daughter2.id, gen3_daughter2_husband.id]
        });

        // Vikram's children
        const gen4_10 = this.familyService.addMember({
            name: 'Ayush Sharma',
            gender: 'male',
            birthDate: '2001-06-05',
            birthPlace: 'Lucknow, Uttar Pradesh',
            gotra: 'Bharadwaj',
            profession: 'Civil Engineer',
            education: 'B.Tech Civil',
            isAlive: true,
            parentIds: [gen3_cousin1.id]
        });

        // Sonia's children
        const gen4_11 = this.familyService.addMember({
            name: 'Saanvi Agarwal',
            gender: 'female',
            birthDate: '2004-02-28',
            birthPlace: 'Lucknow, Uttar Pradesh',
            profession: 'Design Student',
            education: 'B.Des pursuing',
            isAlive: true,
            parentIds: [gen3_cousin2.id]
        });

        // Ankit's children
        const gen4_12 = this.familyService.addMember({
            name: 'Shivansh Mishra',
            gender: 'male',
            birthDate: '2006-08-15',
            birthPlace: 'Delhi, India',
            gotra: 'Shandilya',
            profession: 'Student',
            education: '10th Grade',
            isAlive: true,
            parentIds: [gen3_cousin3.id]
        });

        // Pooja's children
        const gen4_13 = this.familyService.addMember({
            name: 'Myra Mishra',
            gender: 'female',
            birthDate: '2009-12-03',
            birthPlace: 'Delhi, India',
            profession: 'Student',
            education: '7th Grade',
            isAlive: true,
            parentIds: [gen3_cousin4.id]
        });

        // Rahul's children
        const gen4_14 = this.familyService.addMember({
            name: 'Aditya Sharma',
            gender: 'male',
            birthDate: '2003-05-20',
            birthPlace: 'Mumbai, Maharashtra',
            gotra: 'Bharadwaj',
            profession: 'Medical Student',
            education: 'MBBS pursuing',
            isAlive: true,
            parentIds: [gen3_cousin5.id]
        });

        // Sneha's children
        const gen4_15 = this.familyService.addMember({
            name: 'Aarohi Patel',
            gender: 'female',
            birthDate: '2008-09-10',
            birthPlace: 'Mumbai, Maharashtra',
            profession: 'Student',
            education: '9th Grade',
            isAlive: true,
            parentIds: [gen3_cousin6.id]
        });

        // Karan's children
        const gen4_16 = this.familyService.addMember({
            name: 'Veer Gupta',
            gender: 'male',
            birthDate: '2004-11-12',
            birthPlace: 'Jaipur, Rajasthan',
            gotra: 'Kashyap',
            profession: 'Hotel Management Student',
            education: 'BHM pursuing',
            isAlive: true,
            parentIds: [gen3_maternal_cousin1.id]
        });

        const gen4_17 = this.familyService.addMember({
            name: 'Kiara Gupta',
            gender: 'female',
            birthDate: '2007-04-25',
            birthPlace: 'Jaipur, Rajasthan',
            profession: 'Student',
            education: '10th Grade',
            isAlive: true,
            parentIds: [gen3_maternal_cousin1.id]
        });

        // Ritu's children
        const gen4_18 = this.familyService.addMember({
            name: 'Pranav Malhotra',
            gender: 'male',
            birthDate: '2006-01-30',
            birthPlace: 'Jaipur, Rajasthan',
            gotra: 'Kashyap',
            profession: 'Student',
            education: '10th Grade',
            isAlive: true,
            parentIds: [gen3_maternal_cousin2.id]
        });

        // Arjun Verma's children
        const gen4_19 = this.familyService.addMember({
            name: 'Reyansh Verma',
            gender: 'male',
            birthDate: '2005-07-08',
            birthPlace: 'Delhi, India',
            gotra: 'Gautam',
            profession: 'Student',
            education: '11th Grade',
            isAlive: true,
            parentIds: [gen3_maternal_cousin3.id]
        });

        // Divya's children
        const gen4_20 = this.familyService.addMember({
            name: 'Anvi Kapoor',
            gender: 'female',
            birthDate: '2010-10-15',
            birthPlace: 'Indore, Madhya Pradesh',
            profession: 'Kathak Student',
            education: '6th Grade',
            isAlive: true,
            parentIds: [gen3_maternal_cousin4.id]
        });

        const gen4_21 = this.familyService.addMember({
            name: 'Vivaan Kapoor',
            gender: 'male',
            birthDate: '2013-03-18',
            birthPlace: 'Indore, Madhya Pradesh',
            gotra: 'Gautam',
            profession: 'Student',
            education: '3rd Grade',
            isAlive: true,
            parentIds: [gen3_maternal_cousin4.id]
        });

        // ===== GENERATION 5: Young Generation (2020s-2026s) - 5 people =====
        // Arjun's spouse and children
        const gen4_1_wife = this.familyService.addMember({
            name: 'Riya Sharma',
            gender: 'female',
            birthDate: '2002-09-30',
            birthPlace: 'Hyderabad, Telangana',
            profession: 'UI/UX Designer',
            education: 'B.Des',
            isAlive: true
        });
        this.familyService.addSpouse(gen4_1.id, gen4_1_wife.id, '2024-02-14');

        const gen5_1 = this.familyService.addMember({
            name: 'Baby Aditya Sharma',
            gender: 'male',
            birthDate: '2025-12-05',
            birthPlace: 'Bangalore, Karnataka',
            gotra: 'Bharadwaj',
            profession: 'Infant',
            isAlive: true,
            parentIds: [gen4_1.id, gen4_1_wife.id]
        });

        // Aarav's spouse and children
        const gen4_3_wife = this.familyService.addMember({
            name: 'Anushka Verma',
            gender: 'female',
            birthDate: '2003-04-12',
            birthPlace: 'Coimbatore, Tamil Nadu',
            profession: 'Medical Student',
            education: 'MBBS pursuing',
            isAlive: true
        });
        this.familyService.addSpouse(gen4_3.id, gen4_3_wife.id, '2025-06-20');

        const gen5_2 = this.familyService.addMember({
            name: 'Baby Siya Verma',
            gender: 'female',
            birthDate: '2026-03-15',
            birthPlace: 'Chennai, Tamil Nadu',
            profession: 'Infant',
            isAlive: true,
            parentIds: [gen4_3.id, gen4_3_wife.id]
        });

        // Ayush's spouse and children
        const gen4_10_wife = this.familyService.addMember({
            name: 'Tanvi Sharma',
            gender: 'female',
            birthDate: '2001-11-08',
            birthPlace: 'Kanpur, Uttar Pradesh',
            profession: 'Teacher',
            education: 'B.Ed',
            isAlive: true
        });
        this.familyService.addSpouse(gen4_10.id, gen4_10_wife.id, '2023-11-25');

        const gen5_3 = this.familyService.addMember({
            name: 'Aadhya Sharma',
            gender: 'female',
            birthDate: '2024-08-20',
            birthPlace: 'Lucknow, Uttar Pradesh',
            profession: 'Infant',
            isAlive: true,
            parentIds: [gen4_10.id, gen4_10_wife.id]
        });

        const gen5_4 = this.familyService.addMember({
            name: 'Baby Rudra Sharma',
            gender: 'male',
            birthDate: '2026-01-10',
            birthPlace: 'Lucknow, Uttar Pradesh',
            gotra: 'Bharadwaj',
            profession: 'Infant',
            isAlive: true,
            parentIds: [gen4_10.id, gen4_10_wife.id]
        });

        // ===== ADDITIONAL MEMBERS (61-63) - Special Indian Scenarios =====

        // Gen 3: Adopted son of Rahul Sharma (represents adoption in Indian families)
        const gen3_adopted = this.familyService.addMember({
            name: 'Siddharth Sharma',
            gender: 'male',
            birthDate: '1982-10-15',
            birthPlace: 'Pune, Maharashtra',
            gotra: 'Bharadwaj',
            profession: 'CA & Tax Consultant',
            education: 'BCom, CA, CFA',
            isAlive: true,
            parentIds: [gen3_cousin5.id]
        });

        // Gen 4: Child of adopted son
        const gen4_adopted_child = this.familyService.addMember({
            name: 'Aarush Sharma',
            gender: 'male',
            birthDate: '2012-06-28',
            birthPlace: 'Pune, Maharashtra',
            gotra: 'Bharadwaj',
            profession: 'Student',
            education: '7th Grade',
            isAlive: true,
            parentIds: [gen3_adopted.id]
        });

        // Gen 2: Widowed great-aunt (never remarried - common in older Indian society)
        const gen2_widowed_aunt = this.familyService.addMember({
            name: 'Late Smt. Shanti Devi',
            gender: 'female',
            birthDate: '1940-04-18',
            deathDate: '2022-01-05',
            birthPlace: 'Mathura, Uttar Pradesh',
            profession: 'Freedom Fighter & Social Worker',
            education: 'BA Literature',
            isAlive: false,
            parentIds: [gen1_paternal_gf.id, gen1_paternal_gm.id]
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
