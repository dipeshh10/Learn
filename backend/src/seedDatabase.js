require('dotenv').config();
const { db } = require('./database');
const dbModels = require('./models');

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Initialize database connection
    await db();
    
    const { Student, Teacher, Course } = dbModels;
    
    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await Student.destroy({ where: {} });
    await Teacher.destroy({ where: {} });
    await Course.destroy({ where: {} });
    
    // Seed Students
    console.log('👨‍🎓 Seeding students...');
    const students = await Student.bulkCreate([
      {
        name: 'John Smith',
        email: 'john.smith@student.com',
        course: 'Computer Science',
        fees: '5000',
        phone: '123-456-7890',
        address: '123 Student St',
        dateOfBirth: '2000-05-15',
        guardianName: 'Robert Smith',
        guardianPhone: '123-456-7891',
        isActive: true
      },
      {
        name: 'Emily Johnson',
        email: 'emily.johnson@student.com',
        course: 'Mathematics',
        fees: '4500',
        phone: '098-765-4321',
        address: '456 College Ave',
        dateOfBirth: '2001-03-20',
        guardianName: 'Mary Johnson',
        guardianPhone: '098-765-4322',
        isActive: true
      },
      {
        name: 'Michael Brown',
        email: 'michael.brown@student.com',
        course: 'Physics',
        fees: '4800',
        phone: '555-123-4567',
        address: '789 University Rd',
        dateOfBirth: '1999-12-10',
        guardianName: 'David Brown',
        guardianPhone: '555-123-4568',
        isActive: true
      }
    ]);
    
    // Seed Teachers
    console.log('👨‍🏫 Seeding teachers...');
    const teachers = await Teacher.bulkCreate([
      {
        name: 'Prof. Johnson',
        email: 'johnson@learnx.com',
        phone: '123-456-7890',
        subject: 'Mathematics',
        department: 'Science',
        qualification: 'PhD in Mathematics',
        experience: 10,
        joiningDate: '2020-01-15',
        salary: 75000,
        isActive: true,
        address: '123 University Ave'
      },
      {
        name: 'Prof. Smith',
        email: 'smith@learnx.com',
        phone: '098-765-4321',
        subject: 'English',
        department: 'Arts',
        qualification: 'MA in English Literature',
        experience: 8,
        joiningDate: '2021-03-20',
        salary: 65000,
        isActive: true,
        address: '456 College St'
      },
      {
        name: 'Dr. Wilson',
        email: 'wilson@learnx.com',
        phone: '555-123-4567',
        subject: 'Physics',
        department: 'Science',
        qualification: 'PhD in Physics',
        experience: 15,
        joiningDate: '2018-08-10',
        salary: 85000,
        isActive: true,
        address: '789 Science Blvd'
      }
    ]);
    
    // Seed Courses
    console.log('📚 Seeding courses...');
    const courses = await Course.bulkCreate([
      {
        name: 'Advanced Mathematics',
        code: 'MATH301',
        description: 'Advanced mathematical concepts including calculus and linear algebra',
        credits: 4,
        duration: '1 semester',
        teacherId: teachers[0].id,
        teacherName: 'Prof. Johnson',
        department: 'Science',
        level: 'Advanced',
        maxStudents: 30,
        currentStudents: 25,
        fee: 1500.00,
        startDate: '2024-09-01',
        endDate: '2024-12-15',
        isActive: true,
        syllabus: 'Calculus, Linear Algebra, Differential Equations',
        prerequisites: 'Basic Mathematics, Algebra'
      },
      {
        name: 'English Literature',
        code: 'ENG201',
        description: 'Study of classic and modern English literature',
        credits: 3,
        duration: '1 semester',
        teacherId: teachers[1].id,
        teacherName: 'Prof. Smith',
        department: 'Arts',
        level: 'Intermediate',
        maxStudents: 25,
        currentStudents: 20,
        fee: 1200.00,
        startDate: '2024-09-01',
        endDate: '2024-12-15',
        isActive: true,
        syllabus: 'Shakespeare, Modern Poetry, Essay Writing',
        prerequisites: 'Basic English'
      },
      {
        name: 'Physics Fundamentals',
        code: 'PHY101',
        description: 'Introduction to basic physics concepts',
        credits: 4,
        duration: '1 semester',
        teacherId: teachers[2].id,
        teacherName: 'Dr. Wilson',
        department: 'Science',
        level: 'Beginner',
        maxStudents: 35,
        currentStudents: 30,
        fee: 1400.00,
        startDate: '2024-09-01',
        endDate: '2024-12-15',
        isActive: true,
        syllabus: 'Mechanics, Thermodynamics, Waves',
        prerequisites: 'Basic Mathematics'
      }
    ]);
    
    console.log('✅ Database seeding completed successfully!');
    console.log(`📊 Created ${students.length} students, ${teachers.length} teachers, ${courses.length} courses`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
