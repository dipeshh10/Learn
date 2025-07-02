export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorAvatar: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  rating: number;
  studentsCount: number;
  image: string;
  price: number;
  curriculum: Array<{
    id: string;
    title: string;
    duration: string;
    isCompleted?: boolean;
  }>;
  requirements: string[];
  whatYouLearn: string[];
  isFeatured?: boolean;
}

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn full-stack web development from scratch. Build real projects and master modern technologies.',
    instructor: 'Dr. Angela Yu',
    instructorAvatar: 'https://images.pexels.com/photos/3771788/pexels-photo-3771788.jpeg?auto=compress&cs=tinysrgb&w=150',
    category: 'Web Development',
    level: 'Beginner',
    duration: '54 hours',
    rating: 4.8,
    studentsCount: 12543,
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 0,
    curriculum: [
      { id: '1-1', title: 'Introduction to HTML', duration: '45 min' },
      { id: '1-2', title: 'CSS Fundamentals', duration: '1.5 hours' },
      { id: '1-3', title: 'JavaScript Basics', duration: '2 hours' },
      { id: '1-4', title: 'React.js Introduction', duration: '3 hours' }
    ],
    requirements: ['No prior experience needed', 'Computer with internet connection'],
    whatYouLearn: [
      'Build responsive websites with HTML, CSS, and JavaScript',
      'Master React.js for modern web applications',
      'Learn Node.js and Express for backend development',
      'Work with databases and APIs'
    ],
    isFeatured: true
  },
  {
    id: '2',
    title: 'Data Science with Python',
    description: 'Master data science techniques using Python. Learn machine learning, data visualization, and statistical analysis.',
    instructor: 'Prof. Michael Chen',
    instructorAvatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
    category: 'Data Science',
    level: 'Intermediate',
    duration: '42 hours',
    rating: 4.9,
    studentsCount: 8765,
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 0,
    curriculum: [
      { id: '2-1', title: 'Python for Data Science', duration: '3 hours' },
      { id: '2-2', title: 'Data Manipulation with Pandas', duration: '4 hours' },
      { id: '2-3', title: 'Data Visualization', duration: '3 hours' },
      { id: '2-4', title: 'Machine Learning Basics', duration: '5 hours' }
    ],
    requirements: ['Basic Python knowledge', 'Mathematics fundamentals'],
    whatYouLearn: [
      'Data manipulation and cleaning',
      'Statistical analysis and visualization',
      'Machine learning algorithms',
      'Real-world data science projects'
    ],
    isFeatured: true
  },
  {
    id: '3',
    title: 'UI/UX Design Masterclass',
    description: 'Create stunning user interfaces and exceptional user experiences. Learn design principles and industry tools.',
    instructor: 'Sarah Johnson',
    instructorAvatar: 'https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&w=150',
    category: 'Design',
    level: 'Beginner',
    duration: '36 hours',
    rating: 4.7,
    studentsCount: 15432,
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 0,
    curriculum: [
      { id: '3-1', title: 'Design Principles', duration: '2 hours' },
      { id: '3-2', title: 'User Research Methods', duration: '3 hours' },
      { id: '3-3', title: 'Wireframing and Prototyping', duration: '4 hours' },
      { id: '3-4', title: 'Visual Design', duration: '3 hours' }
    ],
    requirements: ['No design experience needed', 'Access to design software (Figma recommended)'],
    whatYouLearn: [
      'Design thinking and user-centered design',
      'Create wireframes and prototypes',
      'Visual design and typography',
      'Usability testing and iteration'
    ]
  },
  {
    id: '4',
    title: 'Digital Marketing Strategy',
    description: 'Build comprehensive digital marketing campaigns. Master SEO, social media, and content marketing.',
    instructor: 'Mark Thompson',
    instructorAvatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
    category: 'Marketing',
    level: 'Intermediate',
    duration: '28 hours',
    rating: 4.6,
    studentsCount: 9876,
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 0,
    curriculum: [
      { id: '4-1', title: 'Digital Marketing Fundamentals', duration: '2 hours' },
      { id: '4-2', title: 'SEO and Content Strategy', duration: '4 hours' },
      { id: '4-3', title: 'Social Media Marketing', duration: '3 hours' },
      { id: '4-4', title: 'Analytics and Optimization', duration: '2 hours' }
    ],
    requirements: ['Basic understanding of marketing concepts', 'Access to social media platforms'],
    whatYouLearn: [
      'Develop comprehensive marketing strategies',
      'SEO and content optimization',
      'Social media marketing tactics',
      'Measure and analyze campaign performance'
    ]
  }
];

export const categories = [
  { name: 'Web Development', count: 142, icon: 'Code' },
  { name: 'Data Science', count: 89, icon: 'BarChart3' },
  { name: 'Design', count: 156, icon: 'Palette' },
  { name: 'Marketing', count: 78, icon: 'Megaphone' },
  { name: 'Business', count: 134, icon: 'Briefcase' },
  { name: 'Photography', count: 67, icon: 'Camera' }
];

export const testimonials = [
  {
    id: '1',
    name: 'Alex Rodriguez',
    role: 'Software Developer',
    content: 'This platform transformed my career. The quality of courses and instructors is exceptional.',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5
  },
  {
    id: '2',
    name: 'Emily Chen',
    role: 'UX Designer',
    content: 'Amazing learning experience! The interactive content and practical projects helped me land my dream job.',
    avatar: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5
  },
  {
    id: '3',
    name: 'David Park',
    role: 'Data Analyst',
    content: 'The data science courses are incredibly comprehensive. I went from beginner to professional level.',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5
  }
];

export const instructors = [
  {
    id: '1',
    name: 'Dr. Angela Yu',
    speciality: 'Web Development',
    students: 25000,
    courses: 12,
    rating: 4.9,
    avatar: 'https://images.pexels.com/photos/3771788/pexels-photo-3771788.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    speciality: 'Data Science',
    students: 18000,
    courses: 8,
    rating: 4.8,
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    speciality: 'UI/UX Design',
    students: 22000,
    courses: 15,
    rating: 4.9,
    avatar: 'https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&w=200'
  }
];