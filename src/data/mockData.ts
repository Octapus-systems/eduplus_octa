import {
  User,
  Course,
  Assignment,
  AssignmentSubmission,
  Exam,
  AttendanceSession,
  FeeRecord,
  Certificate,
  Announcement,
  NotificationItem,
  VideoLecture
} from '../types';

export const mockUsers: Record<'student' | 'teacher' | 'admin', User> = {
  student: {
    id: 'usr_std_01',
    name: 'Aarav Patel',
    email: 'aarav.patel@school.edu',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    role: 'student',
    grade: 'Class 10',
    section: 'A',
    rollNumber: '10-A-24',
    parentName: 'Mr. Rajesh Patel',
    parentPhone: '+1 (555) 342-8921',
    phone: '+1 (555) 231-9874',
    address: '42 Lotus Boulevard, Springdale'
  },
  teacher: {
    id: 'usr_tch_01',
    name: 'Dr. Sunita Rao',
    email: 'sunita.rao@school.edu',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    role: 'teacher',
    department: 'Science & Physics',
    designation: 'Senior Faculty & HOD',
    phone: '+1 (555) 887-2341'
  },
  admin: {
    id: 'usr_adm_01',
    name: 'Vikram Sharma',
    email: 'vikram.sharma@school.edu',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    role: 'admin',
    department: 'School Administration',
    designation: 'Principal & Operations Director',
    phone: '+1 (555) 443-9087'
  }
};

export const mockCourses: Course[] = [
  {
    id: 'crs_10_phy',
    title: 'Class 10 Physics: Mechanics, Optics & Electricity',
    subject: 'Physics',
    grade: 'Class 10',
    section: 'A & B',
    instructorName: 'Dr. Sunita Rao',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    instructorId: 'usr_tch_01',
    thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600&auto=format&fit=crop&q=80',
    progress: 74,
    totalLessons: 24,
    completedLessons: 18,
    category: 'Science',
    color: 'from-blue-600 to-indigo-700',
    description: 'Comprehensive study of reflection and refraction of light, electrical circuits, Ohm\'s law, magnetic effects of electric current, and energy sources.',
    chapters: [
      {
        id: 'ch_1',
        title: 'Chapter 1: Light - Reflection and Refraction',
        lessons: [
          {
            id: 'les_1',
            title: '1.1 Laws of Reflection & Spherical Mirrors',
            duration: '18:20',
            completed: true,
            description: 'Understanding concave and convex mirrors, ray diagrams, and Cartesian sign conventions.'
          },
          {
            id: 'les_2',
            title: '1.2 Mirror Formula and Magnification Problems',
            duration: '22:15',
            completed: true,
            description: 'Solving numerical problems on object distance, image distance, and focal length.'
          },
          {
            id: 'les_3',
            title: '1.3 Refraction through Glass Slab & Snell\'s Law',
            duration: '19:40',
            completed: true,
            description: 'Refractive index, optical density, and lateral displacement calculations.'
          }
        ]
      },
      {
        id: 'ch_2',
        title: 'Chapter 2: Electricity & Electric Circuits',
        lessons: [
          {
            id: 'les_4',
            title: '2.1 Electric Current & Potential Difference',
            duration: '15:10',
            completed: true,
            description: 'Definition of Ampere, Volt, electric field, and electron drift.'
          },
          {
            id: 'les_5',
            title: '2.2 Ohm\'s Law, Resistance & Factors Affecting It',
            duration: '26:50',
            completed: true,
            description: 'V-I characteristics, resistivity, and temperature dependence.'
          },
          {
            id: 'les_6',
            title: '2.3 Series and Parallel Combinations of Resistors',
            duration: '31:10',
            completed: false,
            description: 'Derivation of equivalent resistance and power dissipation across networked loads.'
          }
        ]
      },
      {
        id: 'ch_3',
        title: 'Chapter 3: Magnetic Effects of Electric Current',
        lessons: [
          {
            id: 'les_7',
            title: '3.1 Magnetic Field Lines & Right-Hand Thumb Rule',
            duration: '21:05',
            completed: false,
            description: 'Oersted experiment, magnetic field around a straight conductor and solenoid.'
          },
          {
            id: 'les_8',
            title: '3.2 Fleming\'s Left-Hand Rule & Electric Motor',
            duration: '24:30',
            completed: false,
            description: 'Lorentz force principle and operating mechanism of DC motors.'
          }
        ]
      }
    ]
  },
  {
    id: 'crs_10_math',
    title: 'Class 10 Advanced Mathematics: Polynomials & Trigonometry',
    subject: 'Mathematics',
    grade: 'Class 10',
    section: 'A',
    instructorName: 'Prof. Ramesh Nambiar',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    instructorId: 'usr_tch_02',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
    progress: 88,
    totalLessons: 30,
    completedLessons: 26,
    category: 'Mathematics',
    color: 'from-emerald-600 to-teal-700',
    description: 'Master quadratic equations, arithmetic progressions, coordinate geometry, trigonometric identities, and surface areas & volumes.',
    chapters: [
      {
        id: 'ch_m1',
        title: 'Chapter 1: Quadratic Equations',
        lessons: [
          {
            id: 'les_m1',
            title: '1.1 Solving by Factorisation & Quadratic Formula',
            duration: '20:15',
            completed: true,
            description: 'Discriminant analysis and determining roots of quadratic polynomials.'
          },
          {
            id: 'les_m2',
            title: '1.2 Word Problems & Real-World Modeling',
            duration: '28:40',
            completed: true,
            description: 'Speed-distance problems, work-rate problems, and geometric dimensions.'
          }
        ]
      },
      {
        id: 'ch_m2',
        title: 'Chapter 2: Introduction to Trigonometry',
        lessons: [
          {
            id: 'les_m3',
            title: '2.1 Trigonometric Ratios (sin, cos, tan, cosec, sec, cot)',
            duration: '24:00',
            completed: true,
            description: 'Right triangle ratios, standard angles (0°, 30°, 45°, 60°, 90°).'
          },
          {
            id: 'les_m4',
            title: '2.2 Trigonometric Identities & Proofs',
            duration: '32:10',
            completed: true,
            description: 'Proving identities involving sin²θ + cos²θ = 1 and related forms.'
          }
        ]
      }
    ]
  },
  {
    id: 'crs_10_chem',
    title: 'Class 10 Chemistry: Chemical Reactions & Carbon Compounds',
    subject: 'Chemistry',
    grade: 'Class 10',
    section: 'A',
    instructorName: 'Dr. Meenakshi Joshi',
    instructorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    instructorId: 'usr_tch_03',
    thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80',
    progress: 55,
    totalLessons: 20,
    completedLessons: 11,
    category: 'Science',
    color: 'from-amber-600 to-orange-700',
    description: 'Types of chemical reactions, acids, bases and salts, metals and non-metals, and organic carbon compounds.',
    chapters: [
      {
        id: 'ch_c1',
        title: 'Chapter 1: Chemical Reactions and Equations',
        lessons: [
          {
            id: 'les_c1',
            title: '1.1 Balancing Chemical Equations',
            duration: '17:30',
            completed: true,
            description: 'Conservation of mass and step-by-step balancing techniques.'
          },
          {
            id: 'les_c2',
            title: '1.2 Redox Reactions, Corrosion & Rancidity',
            duration: '21:45',
            completed: true,
            description: 'Oxidation, reduction, oxidizing agents, and food preservation.'
          }
        ]
      }
    ]
  },
  {
    id: 'crs_10_eng',
    title: 'Class 10 English: Literature & Communicative Rhetoric',
    subject: 'English',
    grade: 'Class 10',
    section: 'A',
    instructorName: 'Sarah Jenkins',
    instructorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    instructorId: 'usr_tch_04',
    thumbnail: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&auto=format&fit=crop&q=80',
    progress: 92,
    totalLessons: 18,
    completedLessons: 16,
    category: 'Languages',
    color: 'from-purple-600 to-violet-700',
    description: 'Analytical reading of prose, poetry, critical essays, formal letter writing, and speech delivery.',
    chapters: [
      {
        id: 'ch_e1',
        title: 'Unit 1: First Flight - Prose & Poetry',
        lessons: [
          {
            id: 'les_e1',
            title: '1.1 A Letter to God - Gregorio López y Fuentes',
            duration: '22:00',
            completed: true,
            description: 'Themes of unyielding faith, irony, and human compassion.'
          },
          {
            id: 'les_e2',
            title: '1.2 Nelson Mandela: Long Walk to Freedom',
            duration: '27:15',
            completed: true,
            description: 'Historical context of apartheid, emancipation, and civic leadership.'
          }
        ]
      }
    ]
  },
  {
    id: 'crs_10_cs',
    title: 'Class 10 Computer Science: Python & Web Foundations',
    subject: 'Computer Science',
    grade: 'Class 10',
    section: 'A',
    instructorName: 'Anand Kothari',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    instructorId: 'usr_tch_05',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
    progress: 60,
    totalLessons: 22,
    completedLessons: 13,
    category: 'Computer Science',
    color: 'from-cyan-600 to-blue-700',
    description: 'Python fundamentals, loops, functions, lists, cyber safety protocols, and HTML5/CSS essentials.',
    chapters: [
      {
        id: 'ch_cs1',
        title: 'Module 1: Algorithms & Python Basics',
        lessons: [
          {
            id: 'les_cs1',
            title: '1.1 Variables, Data Types & Control Flow',
            duration: '25:40',
            completed: true,
            description: 'Syntax, operators, if-elif-else branching structures.'
          },
          {
            id: 'les_cs2',
            title: '1.2 For Loops, While Loops and Nested Iterations',
            duration: '29:10',
            completed: false,
            description: 'Pattern printing, sequence traversing, and accumulator algorithms.'
          }
        ]
      }
    ]
  },
  {
    id: 'crs_12_phy',
    title: 'Class 12 Physics: Electromagnetism & Modern Quantum Physics',
    subject: 'Physics',
    grade: 'Class 12',
    section: 'Science-A',
    instructorName: 'Dr. Sunita Rao',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    instructorId: 'usr_tch_01',
    thumbnail: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&auto=format&fit=crop&q=80',
    progress: 40,
    totalLessons: 32,
    completedLessons: 13,
    category: 'Science',
    color: 'from-indigo-600 to-slate-800',
    description: 'Electrostatics, Gauss Law, Biot-Savart, AC circuits, Wave Optics, and Semiconductor Electronics.',
    chapters: []
  },
  {
    id: 'crs_8_sci',
    title: 'Class 8 General Science: Cells, Forces & Combustion',
    subject: 'Science',
    grade: 'Class 8',
    section: 'A',
    instructorName: 'Pooja Verma',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    instructorId: 'usr_tch_06',
    thumbnail: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=600&auto=format&fit=crop&q=80',
    progress: 82,
    totalLessons: 16,
    completedLessons: 13,
    category: 'Science',
    color: 'from-teal-600 to-emerald-700',
    description: 'Cell structure and functions, friction, pressure, sound, and conservation of plants and animals.',
    chapters: []
  }
];

export const mockAssignments: Assignment[] = [
  {
    id: 'asg_101',
    title: 'Numerical Problems on Ohm\'s Law & Equivalent Resistance',
    courseId: 'crs_10_phy',
    courseName: 'Class 10 Physics',
    subject: 'Physics',
    grade: 'Class 10',
    dueDate: 'Tomorrow, 5:00 PM',
    maxScore: 25,
    status: 'pending',
    description: 'Solve problems 1 to 8 from Chapter 2 problem set. Include circuit schematics, equivalent resistance derivations, and branch current calculations.',
    instructions: [
      'Show all formula steps clearly',
      'Draw circuit diagrams with labels for R1, R2, R3',
      'Specify final units in Ohms (Ω) and Amperes (A)',
      'Upload as PDF or clear image scans'
    ],
    attachments: [
      { name: 'Physics_Worksheet_Ch2_Ohm.pdf', size: '1.4 MB', type: 'PDF' }
    ],
    totalSubmissions: 34,
    totalStudents: 42
  },
  {
    id: 'asg_102',
    title: 'Trigonometric Identities Verification & Graph Plotting',
    courseId: 'crs_10_math',
    courseName: 'Class 10 Mathematics',
    subject: 'Mathematics',
    grade: 'Class 10',
    dueDate: 'Sep 12, 2026',
    maxScore: 30,
    status: 'submitted',
    mySubmission: {
      id: 'sub_patel_01',
      assignmentId: 'asg_102',
      studentId: 'usr_std_01',
      studentName: 'Aarav Patel',
      studentAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      studentGrade: 'Class 10',
      studentSection: 'A',
      submittedAt: 'Sep 04, 2026, 4:15 PM',
      fileName: 'Aarav_Patel_Trig_Assignment.pdf',
      status: 'evaluated',
      score: 28,
      maxScore: 30,
      teacherFeedback: 'Outstanding analytical clarity! Q4 proof was very elegant. Keep attention to axis scaling on graph 2.'
    },
    description: 'Verify 5 standard trigonometric identities algebraically and plot sin θ vs cos θ on coordinate paper from 0° to 90° at 15° increments.',
    instructions: [
      'Use LHS = RHS format',
      'Mention algebraic identities used at each step'
    ],
    totalSubmissions: 41,
    totalStudents: 42
  },
  {
    id: 'asg_103',
    title: 'Python List Comprehensions & Prime Sieve Algorithm',
    courseId: 'crs_10_cs',
    courseName: 'Class 10 Computer Science',
    subject: 'Computer Science',
    grade: 'Class 10',
    dueDate: 'Sep 18, 2026',
    maxScore: 20,
    status: 'pending',
    description: 'Write a Python program implementing the Sieve of Eratosthenes to generate prime numbers up to N with benchmark timing.',
    instructions: [
      'Document time complexity',
      'Include comments explaining inner loop strides',
      'Provide test runs for N=100 and N=1000'
    ],
    totalSubmissions: 19,
    totalStudents: 42
  },
  {
    id: 'asg_104',
    title: 'Analytical Essay: Irony & Empathy in "A Letter to God"',
    courseId: 'crs_10_eng',
    courseName: 'Class 10 English',
    subject: 'English',
    grade: 'Class 10',
    dueDate: 'Aug 28, 2026',
    maxScore: 20,
    status: 'evaluated',
    mySubmission: {
      id: 'sub_patel_02',
      assignmentId: 'asg_104',
      studentId: 'usr_std_01',
      studentName: 'Aarav Patel',
      studentAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      studentGrade: 'Class 10',
      studentSection: 'A',
      submittedAt: 'Aug 27, 2026, 8:20 PM',
      fileName: 'Aarav_Essay_Letter_to_God.pdf',
      status: 'evaluated',
      score: 19,
      maxScore: 20,
      teacherFeedback: 'Nuanced interpretation of the postmaster\'s dilemma. Excellent vocabulary and paragraph transitions.'
    },
    description: 'Discuss the dual perspective of Lencho\'s unwavering innocence versus the town\'s collective charity.',
    instructions: ['Length: 500-600 words', 'Cite at least 3 direct quotes'],
    totalSubmissions: 42,
    totalStudents: 42
  }
];

export const mockExams: Exam[] = [
  {
    id: 'ex_10_phy_mid',
    title: 'Class 10 Midterm: Physics & Physical Measurements',
    subject: 'Physics',
    grade: 'Class 10',
    date: 'Sep 15, 2026 • 10:00 AM',
    durationMinutes: 45,
    totalMarks: 30,
    passingMarks: 15,
    status: 'upcoming',
    examType: 'Midterm',
    questions: [
      {
        id: 'q1',
        question: 'Which of the following materials has the highest refractive index?',
        options: ['Water (1.33)', 'Crown Glass (1.52)', 'Diamond (2.42)', 'Ice (1.31)'],
        correctAnswer: 2,
        explanation: 'Diamond has an optical refractive index of ~2.42, which produces substantial refraction and internal reflection responsible for its brilliance.',
        points: 3
      },
      {
        id: 'q2',
        question: 'According to Ohm\'s law, if the resistance in a circuit is doubled while voltage remains constant, the current will:',
        options: ['Double', 'Halve', 'Quadruple', 'Remain the same'],
        correctAnswer: 1,
        explanation: 'I = V / R. Inversely proportional relationship means doubling resistance R results in half the current I.',
        points: 3
      },
      {
        id: 'q3',
        question: 'A concave mirror produces an erect, magnified image when the object is placed:',
        options: ['At the center of curvature (C)', 'At the principal focus (F)', 'Between the pole (P) and focus (F)', 'Beyond C'],
        correctAnswer: 2,
        explanation: 'When an object lies within the focal length (between Pole and Focus), the reflected rays diverge behind the mirror, forming a virtual, upright, and magnified image.',
        points: 4
      },
      {
        id: 'q4',
        question: 'The commercial unit of electric energy is Kilowatt-hour (kWh). 1 kWh is equivalent to how many Joules?',
        options: ['3.6 × 10⁵ J', '3.6 × 10⁶ J', '1.0 × 10³ J', '7.2 × 10⁶ J'],
        correctAnswer: 1,
        explanation: '1 kWh = 1000 W × 3600 seconds = 3,600,000 Joules = 3.6 × 10⁶ J.',
        points: 5
      },
      {
        id: 'q5',
        question: 'What is the direction of the magnetic field lines inside a current-carrying solenoid?',
        options: ['From South Pole to North Pole', 'From North Pole to South Pole', 'Circular and concentric', 'Zero inside'],
        correctAnswer: 0,
        explanation: 'Inside the solenoid, the magnetic field is uniform and lines run internally from South to North, forming continuous closed loops.',
        points: 5
      }
    ]
  },
  {
    id: 'ex_10_math_quiz',
    title: 'Unit Assessment: Quadratic Equations & Polynomials',
    subject: 'Mathematics',
    grade: 'Class 10',
    date: 'Aug 24, 2026',
    durationMinutes: 30,
    totalMarks: 25,
    passingMarks: 12,
    status: 'graded',
    score: 24,
    percentage: 96,
    rank: 2,
    feedback: 'Exceptional computation speed and algebraic proof accuracy.',
    examType: 'Unit Test',
    questions: [
      {
        id: 'mq1',
        question: 'If the discriminant D = b² - 4ac of ax² + bx + c = 0 is greater than zero and a perfect square, the roots are:',
        options: ['Real, rational, and distinct', 'Real and equal', 'Complex and imaginary', 'Irrational'],
        correctAnswer: 0,
        explanation: 'When D > 0 and a perfect square, √D is rational, yielding two real, rational, and distinct solutions.',
        points: 5
      }
    ]
  },
  {
    id: 'ex_10_chem_quiz',
    title: 'Periodic Properties & Chemical Bonding Quiz',
    subject: 'Chemistry',
    grade: 'Class 10',
    date: 'Aug 10, 2026',
    durationMinutes: 30,
    totalMarks: 25,
    passingMarks: 12,
    status: 'graded',
    score: 22,
    percentage: 88,
    rank: 5,
    feedback: 'Good grasp of electronegativity trends across periods.',
    examType: 'Weekly Quiz',
    questions: []
  }
];

export const mockTeacherSubmissions: AssignmentSubmission[] = [
  {
    id: 'sub_01',
    assignmentId: 'asg_101',
    studentId: 'usr_std_01',
    studentName: 'Aarav Patel',
    studentAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    studentGrade: 'Class 10',
    studentSection: 'A',
    submittedAt: 'Today, 11:30 AM',
    fileName: 'Aarav_Physics_OhmLaw_HW.pdf',
    notes: 'Sir, solved all 8 problems including step-by-step circuit diagrams.',
    status: 'pending',
    maxScore: 25
  },
  {
    id: 'sub_02',
    assignmentId: 'asg_101',
    studentId: 'usr_std_02',
    studentName: 'Ananya Sharma',
    studentAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    studentGrade: 'Class 10',
    studentSection: 'A',
    submittedAt: 'Today, 10:15 AM',
    fileName: 'Ananya_S_Ch2_Problems.pdf',
    notes: 'Attached PDF with multimeter measurement logs as bonus proof.',
    status: 'pending',
    maxScore: 25
  },
  {
    id: 'sub_03',
    assignmentId: 'asg_101',
    studentId: 'usr_std_03',
    studentName: 'Rohan Gupta',
    studentAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    studentGrade: 'Class 10',
    studentSection: 'A',
    submittedAt: 'Yesterday, 9:40 PM',
    fileName: 'Rohan_Gupta_Ohm_Solutions.pdf',
    notes: 'Included verified calculations.',
    status: 'evaluated',
    score: 24,
    maxScore: 25,
    teacherFeedback: 'Neat presentation and flawless calculations!'
  },
  {
    id: 'sub_04',
    assignmentId: 'asg_101',
    studentId: 'usr_std_04',
    studentName: 'Diya Sen',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    studentGrade: 'Class 10',
    studentSection: 'A',
    submittedAt: 'Yesterday, 8:12 PM',
    fileName: 'Diya_Sen_Physics_Ch2.pdf',
    status: 'evaluated',
    score: 23,
    maxScore: 25,
    teacherFeedback: 'Very good work. Review problem 6 equivalent branch.'
  }
];

export const mockAttendanceRoster: AttendanceSession = {
  id: 'att_2026_09_05',
  grade: 'Class 10',
  section: 'A',
  subject: 'Physics',
  date: '2026-09-05',
  records: [
    { studentId: 'std_01', name: 'Aarav Patel', rollNumber: '10-A-01', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80', status: 'present' },
    { studentId: 'std_02', name: 'Ananya Sharma', rollNumber: '10-A-02', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', status: 'present' },
    { studentId: 'std_03', name: 'Devendra Nair', rollNumber: '10-A-03', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', status: 'late' },
    { studentId: 'std_04', name: 'Diya Sen', rollNumber: '10-A-04', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', status: 'present' },
    { studentId: 'std_05', name: 'Ishaan Verma', rollNumber: '10-A-05', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', status: 'absent' },
    { studentId: 'std_06', name: 'Kavya Pillai', rollNumber: '10-A-06', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80', status: 'present' },
    { studentId: 'std_07', name: 'Rohan Gupta', rollNumber: '10-A-07', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', status: 'present' },
    { studentId: 'std_08', name: 'Sanya Mukherjee', rollNumber: '10-A-08', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', status: 'present' }
  ]
};

export const mockCertificates: Certificate[] = [
  {
    id: 'cert_101',
    title: 'Certificate of Distinction in Mathematics',
    subject: 'Advanced Mathematics',
    grade: 'Class 9',
    issueDate: 'March 25, 2026',
    certificateNumber: 'EDP-2026-MTH-9802',
    gradeAchieved: 'A+ (97.4%)',
    instructorName: 'Prof. Ramesh Nambiar',
    verificationUrl: 'https://edupulse.lms/verify/EDP-2026-MTH-9802'
  },
  {
    id: 'cert_102',
    title: 'Junior Cyber Olympiad & Python Honors',
    subject: 'Computer Science',
    grade: 'Class 10',
    issueDate: 'July 14, 2026',
    certificateNumber: 'EDP-2026-CS-4419',
    gradeAchieved: 'Gold Medalist',
    instructorName: 'Anand Kothari',
    verificationUrl: 'https://edupulse.lms/verify/EDP-2026-CS-4419'
  },
  {
    id: 'cert_103',
    title: 'Foundations of Science & Mechanics',
    subject: 'Physics',
    grade: 'Class 9',
    issueDate: 'February 10, 2026',
    certificateNumber: 'EDP-2026-PHY-3129',
    gradeAchieved: 'Excellence (94.0%)',
    instructorName: 'Dr. Sunita Rao',
    verificationUrl: 'https://edupulse.lms/verify/EDP-2026-PHY-3129'
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: 'ann_1',
    title: 'Class 10 & 12 Pre-Board Midterm Schedule Released',
    content: 'The official datesheets for the upcoming Midterm examinations commencing September 15 have been published. Practical lab evaluations will precede theory papers.',
    authorName: 'Vikram Sharma',
    authorRole: 'Principal',
    authorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    date: 'Sep 03, 2026',
    targetRole: 'all',
    priority: 'urgent'
  },
  {
    id: 'ann_2',
    title: 'Annual Inter-School STEM & Robotics Fair 2026',
    content: 'Students from Classes 6 to 12 are invited to submit project abstracts for the Science & Technology Expo. Submissions close September 20 with the Science faculty.',
    authorName: 'Dr. Sunita Rao',
    authorRole: 'Science HOD',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    date: 'Sep 01, 2026',
    targetRole: 'students',
    priority: 'important'
  },
  {
    id: 'ann_3',
    title: 'Faculty Workshop on Hybrid Curriculum & Adaptive Testing',
    content: 'All high school teachers are requested to attend the professional development webinar in the main auditorium on Saturday from 10:00 AM to 1:00 PM.',
    authorName: 'Vikram Sharma',
    authorRole: 'Principal',
    authorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    date: 'Aug 29, 2026',
    targetRole: 'teachers',
    priority: 'normal'
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'New Physics Assignment Posted',
    message: 'Dr. Sunita Rao assigned "Numerical Problems on Ohm\'s Law" due tomorrow at 5:00 PM.',
    timestamp: '2 hours ago',
    read: false,
    type: 'assignment',
    linkTab: 'assignments'
  },
  {
    id: 'notif_2',
    title: 'Mathematics Assignment Evaluated',
    message: 'Your submission for Trigonometric Identities has been scored: 28/30.',
    timestamp: 'Yesterday',
    read: false,
    type: 'grade',
    linkTab: 'results'
  },
  {
    id: 'notif_3',
    title: 'Exam Hall Ticket Available',
    message: 'Download your seat allocation ticket for the Class 10 Midterm Examinations.',
    timestamp: '2 days ago',
    read: true,
    type: 'exam',
    linkTab: 'exams'
  },
  {
    id: 'notif_4',
    title: 'Term 2 Fee Receipt Generated',
    message: 'Your fee installment of $850 was successfully reconciled. Invoice #INV-2026-098.',
    timestamp: '4 days ago',
    read: true,
    type: 'fee',
    linkTab: 'settings'
  }
];

export const mockVideoLibrary: VideoLecture[] = [
  {
    id: 'vid_1',
    title: 'Optics: Deriving Mirror & Lens Formulas',
    subject: 'Physics',
    grade: 'Class 10',
    duration: '22:15',
    dateRecorded: 'Sep 02, 2026',
    views: 142,
    instructorName: 'Dr. Sunita Rao',
    thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600&auto=format&fit=crop&q=80',
    tags: ['Optics', 'Ray Diagrams', 'Class 10']
  },
  {
    id: 'vid_2',
    title: 'Quadratic Equations: Real World Modeling',
    subject: 'Mathematics',
    grade: 'Class 10',
    duration: '28:40',
    dateRecorded: 'Aug 28, 2026',
    views: 210,
    instructorName: 'Prof. Ramesh Nambiar',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
    tags: ['Algebra', 'Polynomials', 'Problem Solving']
  },
  {
    id: 'vid_3',
    title: 'Carbon & Its Allotropes: Diamond, Graphite, Fullerenes',
    subject: 'Chemistry',
    grade: 'Class 10',
    duration: '25:10',
    dateRecorded: 'Aug 25, 2026',
    views: 168,
    instructorName: 'Dr. Meenakshi Joshi',
    thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80',
    tags: ['Organic Chemistry', 'Carbon', 'Class 10']
  },
  {
    id: 'vid_4',
    title: 'Electromagnetic Induction & Lenz\'s Law Demo',
    subject: 'Physics',
    grade: 'Class 12',
    duration: '35:20',
    dateRecorded: 'Sep 01, 2026',
    views: 95,
    instructorName: 'Dr. Sunita Rao',
    thumbnail: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&auto=format&fit=crop&q=80',
    tags: ['Electromagnetism', 'Class 12', 'Lab Demo']
  }
];

export const mockFeeRecords: FeeRecord[] = [
  {
    id: 'fee_01',
    studentId: 'std_01',
    studentName: 'Aarav Patel',
    grade: 'Class 10',
    section: 'A',
    totalFee: 2400,
    paidAmount: 2400,
    dueAmount: 0,
    dueDate: 'Sep 30, 2026',
    status: 'paid',
    lastPaymentDate: 'Aug 15, 2026'
  },
  {
    id: 'fee_02',
    studentId: 'std_02',
    studentName: 'Ananya Sharma',
    grade: 'Class 10',
    section: 'A',
    totalFee: 2400,
    paidAmount: 1600,
    dueAmount: 800,
    dueDate: 'Sep 15, 2026',
    status: 'partial',
    lastPaymentDate: 'Jul 20, 2026'
  },
  {
    id: 'fee_03',
    studentId: 'std_03',
    studentName: 'Devendra Nair',
    grade: 'Class 10',
    section: 'A',
    totalFee: 2400,
    paidAmount: 800,
    dueAmount: 1600,
    dueDate: 'Aug 31, 2026',
    status: 'overdue',
    lastPaymentDate: 'May 10, 2026'
  },
  {
    id: 'fee_04',
    studentId: 'std_04',
    studentName: 'Diya Sen',
    grade: 'Class 10',
    section: 'A',
    totalFee: 2400,
    paidAmount: 2400,
    dueAmount: 0,
    dueDate: 'Sep 30, 2026',
    status: 'paid',
    lastPaymentDate: 'Aug 20, 2026'
  },
  {
    id: 'fee_05',
    studentId: 'std_05',
    studentName: 'Ishaan Verma',
    grade: 'Class 10',
    section: 'A',
    totalFee: 2400,
    paidAmount: 0,
    dueAmount: 2400,
    dueDate: 'Sep 10, 2026',
    status: 'pending'
  }
];

export const mockAdminStats = {
  totalStudents: 1845,
  totalTeachers: 114,
  activeBatches: 38,
  attendanceRate: '94.6%',
  revenueTotal: 442800,
  revenueCollected: 407376,
  collectionRate: '92.0%',
  pendingDues: 35424,
  enrollmentTrend: [
    { month: 'Apr', students: 1620, feeCollection: 72000 },
    { month: 'May', students: 1680, feeCollection: 76000 },
    { month: 'Jun', students: 1740, feeCollection: 81000 },
    { month: 'Jul', students: 1795, feeCollection: 88000 },
    { month: 'Aug', students: 1820, feeCollection: 92500 },
    { month: 'Sep', students: 1845, feeCollection: 97876 }
  ],
  classDistribution: [
    { name: 'Primary (1-5)', count: 680 },
    { name: 'Middle (6-8)', count: 470 },
    { name: 'Secondary (9-10)', count: 395 },
    { name: 'Senior Sec (11-12)', count: 300 }
  ],
  subjectPerformance: [
    { subject: 'Mathematics', averageScore: 84, passRate: 94 },
    { subject: 'Physics', averageScore: 78, passRate: 89 },
    { subject: 'Chemistry', averageScore: 81, passRate: 91 },
    { subject: 'Biology', averageScore: 86, passRate: 96 },
    { subject: 'English', averageScore: 88, passRate: 98 },
    { subject: 'Computer Sci', averageScore: 91, passRate: 99 }
  ]
};

export const mockTeachersList = [
  {
    id: 'tch_1',
    name: 'Dr. Sunita Rao',
    department: 'Physics & Science',
    grades: ['Class 9', 'Class 10', 'Class 12'],
    experience: '12 Years',
    rating: 4.9,
    classesPerWeek: 22,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    email: 'sunita.rao@school.edu'
  },
  {
    id: 'tch_2',
    name: 'Prof. Ramesh Nambiar',
    department: 'Mathematics',
    grades: ['Class 8', 'Class 10', 'Class 11'],
    experience: '16 Years',
    rating: 4.8,
    classesPerWeek: 24,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    email: 'ramesh.nambiar@school.edu'
  },
  {
    id: 'tch_3',
    name: 'Dr. Meenakshi Joshi',
    department: 'Chemistry',
    grades: ['Class 9', 'Class 10', 'Class 12'],
    experience: '9 Years',
    rating: 4.7,
    classesPerWeek: 20,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    email: 'meenakshi.j@school.edu'
  },
  {
    id: 'tch_4',
    name: 'Sarah Jenkins',
    department: 'English Literature',
    grades: ['Class 6', 'Class 8', 'Class 10'],
    experience: '7 Years',
    rating: 4.9,
    classesPerWeek: 18,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    email: 'sarah.jenkins@school.edu'
  },
  {
    id: 'tch_5',
    name: 'Anand Kothari',
    department: 'Computer Science',
    grades: ['Class 7', 'Class 10', 'Class 12'],
    experience: '8 Years',
    rating: 4.9,
    classesPerWeek: 20,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    email: 'anand.kothari@school.edu'
  }
];

export const mockStudentsList = [
  {
    id: 'std_01',
    name: 'Aarav Patel',
    rollNumber: '10-A-01',
    grade: 'Class 10',
    section: 'A',
    attendance: '96%',
    gpa: '3.92',
    feeStatus: 'Paid',
    parentContact: '+1 (555) 342-8921',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'std_02',
    name: 'Ananya Sharma',
    rollNumber: '10-A-02',
    grade: 'Class 10',
    section: 'A',
    attendance: '98%',
    gpa: '4.00',
    feeStatus: 'Partial',
    parentContact: '+1 (555) 234-1190',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'std_03',
    name: 'Devendra Nair',
    rollNumber: '10-A-03',
    grade: 'Class 10',
    section: 'A',
    attendance: '87%',
    gpa: '3.45',
    feeStatus: 'Overdue',
    parentContact: '+1 (555) 678-9922',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'std_04',
    name: 'Diya Sen',
    rollNumber: '10-A-04',
    grade: 'Class 10',
    section: 'A',
    attendance: '94%',
    gpa: '3.80',
    feeStatus: 'Paid',
    parentContact: '+1 (555) 789-2234',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'std_05',
    name: 'Ishaan Verma',
    rollNumber: '10-A-05',
    grade: 'Class 10',
    section: 'A',
    attendance: '82%',
    gpa: '3.20',
    feeStatus: 'Pending',
    parentContact: '+1 (555) 456-1188',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'std_06',
    name: 'Kavya Pillai',
    rollNumber: '10-A-06',
    grade: 'Class 10',
    section: 'A',
    attendance: '97%',
    gpa: '3.95',
    feeStatus: 'Paid',
    parentContact: '+1 (555) 990-2341',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80'
  }
];

export const allGradesList: string[] = [
  'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
  'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
  'Class 11', 'Class 12'
];
