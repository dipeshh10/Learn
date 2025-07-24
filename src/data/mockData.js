// Mock data for courses, categories, testimonials, and instructors

export const mockCourses = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn full-stack web development from scratch. Build real projects and master modern technologies including HTML, CSS, JavaScript, React, and Node.js.',
    instructor: 'Dr. Angela Yu (Sikshak)',
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
      { id: '1-4', title: 'React.js Introduction', duration: '3 hours' },
      { id: '1-5', title: 'Node.js Backend', duration: '2.5 hours' },
      { id: '1-6', title: 'Database Integration', duration: '2 hours' },
      { id: '1-7', title: 'Deployment & Hosting', duration: '1.5 hours' }
    ],
    requirements: ['No prior experience needed', 'Computer with internet connection', 'Text editor (VS Code recommended)'],
    whatYouLearn: [
      'Build responsive websites with HTML, CSS, and JavaScript',
      'Master React.js for modern web applications',
      'Learn Node.js and Express for backend development',
      'Work with databases and APIs',
      'Deploy applications to the cloud',
      'Understand version control with Git',
      'Build a complete full-stack project portfolio'
    ],
    isFeatured: true,
    hasDetailedContent: true
  },
  // ... (repeat for other courses, updating instructor names to Nepali Roman as needed)
];

export const categories = [
  { name: 'Web Development', count: 142, icon: 'Code' },
  { name: 'Data Science', count: 89, icon: 'BarChart3' },
  { name: 'Design', count: 156, icon: 'Palette' },
  { name: 'Marketing', count: 78, icon: 'Megaphone' },
  { name: 'Business', count: 134, icon: 'Briefcase' },
  { name: 'Mobile Development', count: 67, icon: 'Smartphone' },
  { name: 'Cybersecurity', count: 45, icon: 'Shield' }
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
    name: 'Dr. Angela Yu (Sikshak)',
    speciality: 'Web Development',
    students: 25000,
    courses: 12,
    rating: 4.9,
    avatar: 'https://images.pexels.com/photos/3771788/pexels-photo-3771788.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: '2',
    name: 'Prof. Michael Chen (Sikshak)',
    speciality: 'Data Science',
    students: 18000,
    courses: 8,
    rating: 4.8,
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: '3',
    name: 'Sarah Johnson (Sikshak)',
    speciality: 'UI/UX Design',
    students: 22000,
    courses: 15,
    rating: 4.9,
    avatar: 'https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&w=200'
  }
]; 