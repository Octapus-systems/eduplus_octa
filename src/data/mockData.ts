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
  VideoLecture,
  ParentChild,
  ParentTeacherMeeting,
  TeacherReview,
  StudentDocument,
  TransportDetail,
  LibraryBookItem,
  ParentLeaveRequest,
  ParentSupportTicket
} from '../types';

export const mockUsers: Record<'student' | 'teacher' | 'admin' | 'parent', User> = {
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
  },
  parent: {
    id: 'usr_prn_01',
    name: 'Rajesh Mehta',
    email: 'rajesh.mehta@parent.school.edu',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'parent',
    phone: '+1 (555) 987-6543',
    address: '108 Palm Avenue, Springdale'
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
  },
  {
    id: 'asg_105',
    title: 'Chemistry Lab Report: Electrolysis of Acidified Water',
    courseId: 'crs_10_chem',
    courseName: 'Class 10 Chemistry',
    subject: 'Chemistry',
    grade: 'Class 10',
    dueDate: 'Sep 14, 2026',
    maxScore: 25,
    status: 'draft',
    draftFileName: 'Aarav_Chem_Lab_Draft_v1.docx',
    draftNotes: 'Saved initial observations on H2 vs O2 volumetric ratio (2:1). Need to finish balanced half-reactions.',
    description: 'Prepare a formal lab report documenting the electrolytic breakdown of water into Hydrogen and Oxygen gas using platinum electrodes.',
    instructions: [
      'Record anode and cathode gas volume ratios',
      'Write balanced oxidation and reduction half-cell equations',
      'Submit as PDF or DOCX'
    ],
    totalSubmissions: 12,
    totalStudents: 42
  },
  {
    id: 'asg_106',
    title: 'English Grammar & Formal Letter Writing Practice',
    courseId: 'crs_10_eng',
    courseName: 'Class 10 English',
    subject: 'English',
    grade: 'Class 10',
    dueDate: 'Aug 20, 2026',
    maxScore: 15,
    status: 'overdue',
    description: 'Write a formal letter to the Municipal Commissioner requesting road repairs near school gate.',
    instructions: ['Follow standard formal letter layout', 'Word limit: 150-200 words'],
    totalSubmissions: 39,
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
    title: 'Term 2 Schedule & Guidelines',
    message: 'Institutional academic guidelines for Term 2 are now available on the notice board.',
    timestamp: '4 days ago',
    read: true,
    type: 'announcement',
    linkTab: 'announcements'
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
    invoiceNumber: 'INV-2026-001',
    studentId: 'std_01',
    studentName: 'Aarav Patel',
    grade: 'Class 10',
    studentGrade: 'Class 10',
    section: 'A',
    feeType: 'Tuition & Term Fee - Term 1',
    amount: 2400,
    totalFee: 2400,
    paidAmount: 2400,
    dueAmount: 0,
    dueDate: 'Sep 30, 2026',
    status: 'paid',
    lastPaymentDate: 'Aug 15, 2026',
    paidAt: 'Aug 15, 2026',
    paymentMethod: 'Online Bank Transfer'
  },
  {
    id: 'fee_02',
    invoiceNumber: 'INV-2026-002',
    studentId: 'std_02',
    studentName: 'Ananya Sharma',
    grade: 'Class 10',
    studentGrade: 'Class 10',
    section: 'A',
    feeType: 'Science Lab & Equipment Fee',
    amount: 2400,
    totalFee: 2400,
    paidAmount: 1600,
    dueAmount: 800,
    dueDate: 'Sep 15, 2026',
    status: 'partial',
    lastPaymentDate: 'Jul 20, 2026',
    paidAt: 'Jul 20, 2026',
    paymentMethod: 'Debit Card'
  },
  {
    id: 'fee_03',
    invoiceNumber: 'INV-2026-003',
    studentId: 'std_03',
    studentName: 'Devendra Nair',
    grade: 'Class 10',
    studentGrade: 'Class 10',
    section: 'A',
    feeType: 'Sports & Technology Fee',
    amount: 2400,
    totalFee: 2400,
    paidAmount: 800,
    dueAmount: 1600,
    dueDate: 'Aug 31, 2026',
    status: 'overdue',
    lastPaymentDate: 'May 10, 2026',
    paidAt: 'May 10, 2026',
    paymentMethod: 'Cash Deposit'
  },
  {
    id: 'fee_04',
    invoiceNumber: 'INV-2026-004',
    studentId: 'std_04',
    studentName: 'Diya Sen',
    grade: 'Class 10',
    studentGrade: 'Class 10',
    section: 'A',
    feeType: 'Tuition & Term Fee - Term 1',
    amount: 2400,
    totalFee: 2400,
    paidAmount: 2400,
    dueAmount: 0,
    dueDate: 'Sep 30, 2026',
    status: 'paid',
    lastPaymentDate: 'Aug 20, 2026',
    paidAt: 'Aug 20, 2026',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'fee_05',
    invoiceNumber: 'INV-2026-005',
    studentId: 'std_05',
    studentName: 'Ishaan Verma',
    grade: 'Class 10',
    studentGrade: 'Class 10',
    section: 'A',
    feeType: 'Library & Annual Dues',
    amount: 2400,
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
    qualification: 'Ph.D in Applied Physics',
    phone: '+1 (555) 887-2341',
    subjects: ['Physics', 'Science', 'Astronomy'],
    assignedGrades: ['Class 9', 'Class 10', 'Class 12'],
    grades: ['Class 9', 'Class 10', 'Class 12'],
    experience: '12 Years',
    rating: 4.9,
    workloadHoursPerWeek: 22,
    classesPerWeek: 22,
    totalCourses: 3,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    email: 'sunita.rao@school.edu'
  },
  {
    id: 'tch_2',
    name: 'Prof. Ramesh Nambiar',
    department: 'Mathematics',
    qualification: 'M.Sc in Pure Mathematics',
    phone: '+1 (555) 341-9082',
    subjects: ['Mathematics', 'Calculus', 'Algebra'],
    assignedGrades: ['Class 8', 'Class 10', 'Class 11'],
    grades: ['Class 8', 'Class 10', 'Class 11'],
    experience: '16 Years',
    rating: 4.8,
    workloadHoursPerWeek: 24,
    classesPerWeek: 24,
    totalCourses: 4,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    email: 'ramesh.nambiar@school.edu'
  },
  {
    id: 'tch_3',
    name: 'Dr. Meenakshi Joshi',
    department: 'Chemistry',
    qualification: 'Ph.D in Organic Chemistry',
    phone: '+1 (555) 782-3490',
    subjects: ['Organic Chemistry', 'General Science'],
    assignedGrades: ['Class 9', 'Class 10', 'Class 12'],
    grades: ['Class 9', 'Class 10', 'Class 12'],
    experience: '9 Years',
    rating: 4.7,
    workloadHoursPerWeek: 20,
    classesPerWeek: 20,
    totalCourses: 3,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    email: 'meenakshi.j@school.edu'
  },
  {
    id: 'tch_4',
    name: 'Sarah Jenkins',
    department: 'English Literature',
    qualification: 'M.A in English Literature',
    phone: '+1 (555) 902-8341',
    subjects: ['English Literature', 'Grammar & Composition'],
    assignedGrades: ['Class 6', 'Class 8', 'Class 10'],
    grades: ['Class 6', 'Class 8', 'Class 10'],
    experience: '7 Years',
    rating: 4.9,
    workloadHoursPerWeek: 18,
    classesPerWeek: 18,
    totalCourses: 3,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    email: 'sarah.jenkins@school.edu'
  },
  {
    id: 'tch_5',
    name: 'Anand Kothari',
    department: 'Computer Science',
    qualification: 'M.Tech in Computer Science',
    phone: '+1 (555) 438-1902',
    subjects: ['Computer Science', 'Python Programming', 'AI Fundamentals'],
    assignedGrades: ['Class 7', 'Class 10', 'Class 12'],
    grades: ['Class 7', 'Class 10', 'Class 12'],
    experience: '8 Years',
    rating: 4.9,
    workloadHoursPerWeek: 20,
    classesPerWeek: 20,
    totalCourses: 3,
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

export const mockLiveClasses: any[] = [
  {
    id: 'live_101',
    subject: 'Physics',
    topic: 'Live Demonstration: Magnetic Lines & Solenoid Currents',
    grade: 'Class 10',
    section: 'A',
    instructorName: 'Dr. Sunita Rao',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    startTime: 'Today, 11:00 AM',
    durationMinutes: 45,
    status: 'live',
    attendeesCount: 38,
    roomCode: 'PHY-10A-LIVE'
  },
  {
    id: 'live_102',
    subject: 'Mathematics',
    topic: 'Problem-Solving Sprint: Quadratic Word Problems',
    grade: 'Class 10',
    section: 'A',
    instructorName: 'Prof. Ramesh Nambiar',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    startTime: 'Today, 02:30 PM',
    durationMinutes: 60,
    status: 'starting_soon',
    attendeesCount: 0,
    roomCode: 'MTH-10A-LIVE'
  },
  {
    id: 'live_103',
    subject: 'Chemistry',
    topic: 'Interactive Redox Reactions & Flame Tests',
    grade: 'Class 10',
    section: 'A',
    instructorName: 'Dr. Meenakshi Joshi',
    instructorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    startTime: 'Tomorrow, 10:00 AM',
    durationMinutes: 45,
    status: 'upcoming',
    attendeesCount: 0,
    roomCode: 'CHM-10A-LIVE'
  },
  {
    id: 'live_104',
    subject: 'Computer Science',
    topic: 'Python Function Scope & Global vs Local Variables',
    grade: 'Class 10',
    section: 'A',
    instructorName: 'Anand Kothari',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    startTime: 'Yesterday, 11:00 AM',
    durationMinutes: 50,
    status: 'completed',
    recordingUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
    attendeesCount: 41
  }
];

export const mockStudentAttendanceLog: any[] = [
  {
    date: 'Sep 05, 2026',
    dayOfWeek: 'Friday',
    status: 'present',
    remark: 'Full day attendance recorded',
    subjectSessions: [
      { subject: 'Physics', time: '09:00 - 09:45 AM', status: 'present' },
      { subject: 'Mathematics', time: '10:00 - 10:45 AM', status: 'present' },
      { subject: 'Chemistry', time: '11:15 - 12:00 PM', status: 'present' },
      { subject: 'English', time: '01:00 - 01:45 PM', status: 'present' }
    ]
  },
  {
    date: 'Sep 04, 2026',
    dayOfWeek: 'Thursday',
    status: 'present',
    remark: 'Full day attendance recorded',
    subjectSessions: [
      { subject: 'Computer Science', time: '09:00 - 09:45 AM', status: 'present' },
      { subject: 'Physics', time: '10:00 - 10:45 AM', status: 'present' },
      { subject: 'Mathematics', time: '11:15 - 12:00 PM', status: 'present' }
    ]
  },
  {
    date: 'Sep 03, 2026',
    dayOfWeek: 'Wednesday',
    status: 'late',
    remark: 'Arrived at 09:18 AM due to school bus delay',
    subjectSessions: [
      { subject: 'Physics Lab', time: '09:00 - 10:30 AM', status: 'late' },
      { subject: 'English', time: '11:00 - 11:45 AM', status: 'present' }
    ]
  },
  {
    date: 'Sep 02, 2026',
    dayOfWeek: 'Tuesday',
    status: 'present',
    remark: 'Full day attendance recorded',
    subjectSessions: [
      { subject: 'Chemistry', time: '09:00 - 09:45 AM', status: 'present' },
      { subject: 'Mathematics', time: '10:00 - 10:45 AM', status: 'present' }
    ]
  },
  {
    date: 'Sep 01, 2026',
    dayOfWeek: 'Monday',
    status: 'present',
    remark: 'Full day attendance recorded',
    subjectSessions: [
      { subject: 'Physics', time: '09:00 - 09:45 AM', status: 'present' },
      { subject: 'English', time: '10:00 - 10:45 AM', status: 'present' }
    ]
  },
  {
    date: 'Aug 28, 2026',
    dayOfWeek: 'Friday',
    status: 'absent',
    remark: 'Parent approved leave (Medical appointment)',
    subjectSessions: [
      { subject: 'All Classes', time: 'Full Day', status: 'absent' }
    ]
  }
];

export const mockStudentMessages: any[] = [
  {
    id: 'msg_1',
    senderId: 'usr_tch_01',
    senderName: 'Dr. Sunita Rao',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    senderRole: 'teacher',
    recipientId: 'usr_std_01',
    text: 'Hello Aarav, excellent work on your Physics quiz last week! Remember to review problem 6 on equivalent resistance before tomorrow\'s lab.',
    timestamp: 'Yesterday, 4:30 PM'
  },
  {
    id: 'msg_2',
    senderId: 'usr_std_01',
    senderName: 'Aarav Patel',
    senderAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    senderRole: 'student',
    recipientId: 'usr_tch_01',
    text: 'Thank you ma\'am! I have worked out the parallel branch derivations and prepared the formula sheet.',
    timestamp: 'Yesterday, 5:10 PM'
  },
  {
    id: 'msg_3',
    senderId: 'usr_tch_01',
    senderName: 'Dr. Sunita Rao',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    senderRole: 'teacher',
    recipientId: 'usr_std_01',
    text: 'Great initiative! See you in today\'s live stream at 11:00 AM.',
    timestamp: 'Today, 08:45 AM'
  }
];

export const mockStudentDoubts: any[] = [
  {
    id: 'dbt_101',
    studentId: 'std_01',
    studentName: 'Aarav Patel',
    studentAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    grade: 'Class 10',
    section: 'A',
    subject: 'Physics',
    topic: 'Ohm\'s Law & Internal Resistance',
    questionText: 'Ma\'am, in Q4 of Assignment 2, why does the terminal potential difference drop when a heavy current is drawn from a non-ideal battery?',
    submittedAt: 'Today, 10:15 AM',
    status: 'pending',
    attachmentName: 'Circuit_Diagram_Q4_Query.png'
  },
  {
    id: 'dbt_102',
    studentId: 'std_02',
    studentName: 'Ananya Sharma',
    studentAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    grade: 'Class 10',
    section: 'A',
    subject: 'Physics',
    topic: 'Refraction through Prism',
    questionText: 'Why does violet light deviate the most in a glass prism compared to red light?',
    submittedAt: 'Yesterday, 6:40 PM',
    status: 'resolved',
    teacherReply: 'Violet light has a shorter wavelength λ (~400nm), so glass exhibits a higher refractive index μ for violet according to Cauchy\'s formula, causing maximum bending angle D.',
    resolvedAt: 'Yesterday, 8:15 PM'
  },
  {
    id: 'dbt_103',
    studentId: 'std_03',
    studentName: 'Devendra Nair',
    studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    grade: 'Class 10',
    section: 'A',
    subject: 'Mathematics',
    topic: 'Quadratic Discriminant',
    questionText: 'Sir, if D = 0 in ax² + bx + c = 0, why are both roots equal to -b / 2a?',
    submittedAt: '2 days ago',
    status: 'resolved',
    teacherReply: 'From the quadratic formula x = (-b ± √D)/(2a), when D = 0, the term ± √D becomes 0. Hence both roots simplify identically to x = -b/(2a).',
    resolvedAt: 'Yesterday, 9:00 AM'
  }
];

export const mockLessonPlans: any[] = [
  {
    id: 'lp_101',
    courseId: 'crs_10_phy',
    subject: 'Physics',
    grade: 'Class 10',
    chapterTitle: 'Chapter 2: Electricity & Circuits',
    topicName: 'Series vs Parallel Circuit Analysis',
    durationMins: 45,
    objectives: [
      'Derive equivalent resistance formula for parallel networks 1/Req = ∑ 1/Ri',
      'Demonstrate voltage division across series resistors',
      'Solve 3 real-world multi-loop circuit numerical problems'
    ],
    teachingMethod: 'Interactive Board Work + Live Multimeter Demo',
    status: 'completed'
  },
  {
    id: 'lp_102',
    courseId: 'crs_10_phy',
    subject: 'Physics',
    grade: 'Class 10',
    chapterTitle: 'Chapter 3: Magnetic Effects of Electric Current',
    topicName: 'Right Hand Thumb Rule & Solenoid Magnetic Field',
    durationMins: 45,
    objectives: [
      'Explain direction of magnetic field vectors inside solenoid',
      'Demonstrate iron filings pattern under 12V DC current',
      'Assign homework worksheet on Fleming\'s Left Hand Rule'
    ],
    teachingMethod: 'Visual Simulation & Hands-on Coil Experiment',
    status: 'draft'
  }
];

export const mockTeachingMaterials: any[] = [
  {
    id: 'mat_101',
    title: 'Complete Lecture Deck: Electricity & Current Distribution',
    subject: 'Physics',
    grade: 'Class 10',
    type: 'slides',
    fileSize: '4.8 MB',
    uploadedAt: 'Sep 01, 2026',
    visibility: 'class',
    downloadUrl: '#'
  },
  {
    id: 'mat_102',
    title: 'Worksheet 4: Numerical Problems on Resistance Networks',
    subject: 'Physics',
    grade: 'Class 10',
    type: 'worksheet',
    fileSize: '1.2 MB',
    uploadedAt: 'Aug 28, 2026',
    visibility: 'class',
    downloadUrl: '#'
  },
  {
    id: 'mat_103',
    title: 'Lab Manual: Ohm\'s Law & Voltmeter Calibration Protocol',
    subject: 'Physics',
    grade: 'Class 10',
    type: 'lab_guide',
    fileSize: '2.5 MB',
    uploadedAt: 'Aug 20, 2026',
    visibility: 'class',
    downloadUrl: '#'
  },
  {
    id: 'mat_104',
    title: 'Teacher Draft: Quiz 3 Answer Key & Explanations',
    subject: 'Physics',
    grade: 'Class 10',
    type: 'pdf',
    fileSize: '890 KB',
    uploadedAt: 'Sep 04, 2026',
    visibility: 'draft',
    downloadUrl: '#'
  }
];

export const mockChildrenList: ParentChild[] = [
  {
    id: 'std_arjun_10',
    name: 'Arjun Mehta',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    grade: 'Class 10',
    section: 'A',
    rollNumber: '10-A-18',
    admissionId: 'ADM-2024-8841',
    dob: '14 Oct 2010',
    house: 'Ruby House (Red)',
    classTeacherName: 'Dr. Sunita Rao',
    classTeacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    classTeacherEmail: 'sunita.rao@school.edu',
    attendancePercentage: 94.2,
    gpa: 3.85,
    feeStatus: 'pending',
    pendingFeeAmount: 450,
    unsubmittedAssignments: 1,
    upcomingExamsCount: 2,
    conductRating: 'Exemplary (A+)'
  },
  {
    id: 'std_ananya_07',
    name: 'Ananya Mehta',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    grade: 'Class 7',
    section: 'B',
    rollNumber: '07-B-09',
    admissionId: 'ADM-2025-9102',
    dob: '02 Mar 2013',
    house: 'Sapphire House (Blue)',
    classTeacherName: 'Elena Rostova',
    classTeacherAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    classTeacherEmail: 'elena.rostova@school.edu',
    attendancePercentage: 97.8,
    gpa: 3.92,
    feeStatus: 'paid',
    pendingFeeAmount: 0,
    unsubmittedAssignments: 0,
    upcomingExamsCount: 1,
    conductRating: 'Outstanding (A+)'
  }
];

export const mockParentMeetings: ParentTeacherMeeting[] = [
  {
    id: 'ptm-001',
    studentId: 'std_arjun_10',
    teacherId: 'usr_tch_01',
    teacherName: 'Dr. Sunita Rao',
    teacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    subject: 'Physics & General Science',
    requestedDate: 'Sep 12, 2026',
    requestedTime: '03:30 PM - 03:50 PM',
    mode: 'video_call',
    agenda: 'Discussion on Midterm exam prep and Physics lab practical performance.',
    status: 'confirmed',
    meetingLink: 'https://meet.edupulse.edu/ptm-sunita-rao',
    venue: 'Google Meet Studio Room 2',
    teacherNotes: 'Confirmed. Looking forward to reviewing Arjun\'s numerical problem-solving progress.'
  },
  {
    id: 'ptm-002',
    studentId: 'std_arjun_10',
    teacherId: 'tch-math-02',
    teacherName: 'Prof. David Miller',
    teacherAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    subject: 'Mathematics',
    requestedDate: 'Aug 22, 2026',
    requestedTime: '04:00 PM',
    mode: 'in_person',
    agenda: 'Quarterly academic review.',
    status: 'completed',
    venue: 'Faculty Cabin 204',
    teacherNotes: 'Arjun is performing exceptionally well in Trigonometry. Encouraged to attempt advanced Olympiad problems.'
  }
];

export const mockTeacherReviews: TeacherReview[] = [
  {
    id: 'rev-101',
    teacherId: 'usr_tch_01',
    teacherName: 'Dr. Sunita Rao',
    subject: 'Physics',
    rating: 5,
    feedbackText: 'Dr. Rao is an inspiring educator! Her practical lab demos have greatly boosted Arjun\'s interest in physical science.',
    category: 'teaching_quality',
    submittedAt: 'Aug 15, 2026',
    anonymous: false
  }
];

export const mockStudentDocuments: StudentDocument[] = [
  {
    id: 'doc-101',
    studentId: 'std_arjun_10',
    title: 'Class 10 Term 1 Official Report Card (2026)',
    category: 'report_card',
    issueDate: 'Aug 30, 2026',
    fileSize: '1.8 MB',
    downloadUrl: '#'
  },
  {
    id: 'doc-102',
    studentId: 'std_arjun_10',
    title: 'Inter-School Science Olympiad Gold Certificate',
    category: 'certificate',
    issueDate: 'Jul 14, 2026',
    fileSize: '2.4 MB',
    downloadUrl: '#'
  },
  {
    id: 'doc-103',
    studentId: 'std_arjun_10',
    title: 'Fee Receipt #INV-2026-0881 (Q2 Tuition)',
    category: 'fee_receipt',
    issueDate: 'Jun 10, 2026',
    fileSize: '450 KB',
    downloadUrl: '#'
  },
  {
    id: 'doc-104',
    studentId: 'std_arjun_10',
    title: 'Annual Student Health & Conduct Verification',
    category: 'conduct',
    issueDate: 'Apr 05, 2026',
    fileSize: '920 KB',
    downloadUrl: '#'
  }
];

export const mockTransportInfo: Record<string, TransportDetail> = {
  std_arjun_10: {
    studentId: 'std_arjun_10',
    busNumber: 'Bus #14 (Yellow Fleet)',
    routeName: 'Route C: Palm Avenue - Springdale Central',
    pickupLocation: 'Palm Avenue Gate 3 Stop',
    dropLocation: 'School Main Campus Bay 2',
    pickupTime: '07:15 AM',
    dropTime: '03:45 PM',
    driverName: 'Ramesh Kumar',
    driverPhone: '+1 (555) 901-2244',
    status: 'on_schedule'
  },
  std_ananya_07: {
    studentId: 'std_ananya_07',
    busNumber: 'Bus #14 (Yellow Fleet)',
    routeName: 'Route C: Palm Avenue - Springdale Central',
    pickupLocation: 'Palm Avenue Gate 3 Stop',
    dropLocation: 'School Junior Wing Bay 1',
    pickupTime: '07:15 AM',
    dropTime: '03:45 PM',
    driverName: 'Ramesh Kumar',
    driverPhone: '+1 (555) 901-2244',
    status: 'on_schedule'
  }
};

export const mockLibraryBooks: LibraryBookItem[] = [
  {
    id: 'lib-01',
    studentId: 'std_arjun_10',
    bookTitle: 'Concepts of Physics (Vol 1) - H.C. Verma',
    author: 'H.C. Verma',
    isbn: '978-8177091877',
    issueDate: 'Aug 20, 2026',
    dueDate: 'Sep 10, 2026',
    status: 'issued',
    fineAmount: 0
  },
  {
    id: 'lib-02',
    studentId: 'std_arjun_10',
    bookTitle: 'The Code Book: Science of Secrecy',
    author: 'Simon Singh',
    isbn: '978-0385495325',
    issueDate: 'Jul 10, 2026',
    dueDate: 'Aug 01, 2026',
    status: 'returned',
    fineAmount: 0
  }
];

export const mockLeaveRequests: ParentLeaveRequest[] = [
  {
    id: 'lve-101',
    studentId: 'std_arjun_10',
    studentName: 'Arjun Mehta',
    startDate: '2026-08-10',
    endDate: '2026-08-11',
    reasonCategory: 'dental_checkup' as any,
    reasonDetails: 'Scheduled orthodontic adjustment.',
    submittedAt: 'Aug 08, 2026',
    status: 'approved',
    teacherRemarks: 'Leave granted. Please catch up on Physics Chapter 4 exercises.'
  }
];

export const mockSupportTickets: ParentSupportTicket[] = [
  {
    id: 'tkt-801',
    ticketNumber: 'EDP-SUP-9941',
    category: 'billing',
    subject: 'Query regarding Q3 Transport Fee receipt generation',
    description: 'Payment was made online yesterday, requesting updated tax receipt download link.',
    priority: 'normal',
    createdAt: 'Sep 02, 2026',
    status: 'resolved',
    response: 'Receipt #INV-2026-0881 has been generated and uploaded to your Student Documents vault.'
  }
];



