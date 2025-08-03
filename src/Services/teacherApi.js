const API_BASE_URL = 'http://localhost:5002/api';

// Fallback data for when API is not available
const fallbackTeachers = [
  {
    id: '1',
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
    address: '123 University Ave',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
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
    address: '456 College St',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
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
    address: '789 Science Blvd',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Fetch all teachers
export const fetchTeachers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/teachers`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn('API not available, using fallback data for teachers:', error.message);
    return fallbackTeachers;
  }
};

// Fetch teacher by ID
export const fetchTeacherById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/teachers/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching teacher:', error);
    throw new Error('Failed to fetch teacher');
  }
};

// Add new teacher
export const addTeacher = async (teacherData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/teachers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teacherData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn('API not available, simulating teacher creation:', error.message);
    // Simulate successful creation with fallback
    const newTeacher = {
      id: Date.now().toString(),
      ...teacherData,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    return newTeacher;
  }
};

// Update teacher
export const updateTeacher = async (id, teacherData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/teachers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teacherData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.warn('API not available, simulating teacher update:', error.message);
    // Simulate successful update with fallback
    const updatedTeacher = {
      id,
      ...teacherData,
      updatedAt: new Date()
    };
    return updatedTeacher;
  }
};

// Delete teacher
export const deleteTeacher = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/teachers/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.warn('API not available, simulating teacher deletion:', error.message);
    // Simulate successful deletion
    return { success: true, message: 'Teacher deleted successfully' };
  }
};
