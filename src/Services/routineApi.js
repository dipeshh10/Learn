const API_URL = import.meta.env.VITE_API_URL_ROUTINES || "http://localhost:5002/api/routines";

// Fallback data for when API is not available
const fallbackRoutines = [
  {
    id: '1',
    subject: 'Mathematics',
    teacherName: 'Prof. Johnson',
    teacherId: '1',
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:30',
    room: 'Room 101',
    semester: 'Fall 2024',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    subject: 'English Literature',
    teacherName: 'Prof. Smith',
    teacherId: '2',
    day: 'Tuesday',
    startTime: '11:00',
    endTime: '12:30',
    room: 'Room 205',
    semester: 'Fall 2024',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    subject: 'Physics',
    teacherName: 'Dr. Wilson',
    teacherId: '3',
    day: 'Wednesday',
    startTime: '14:00',
    endTime: '15:30',
    room: 'Lab 301',
    semester: 'Fall 2024',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

function getToken() {
  return localStorage.getItem("token");
}

async function request(path = '', options = {}) {
  const token = getToken();
  if (!token) throw new Error("Authentication token missing");

  const headers = {
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  const res = await fetch(API_URL + path, { ...options, headers });

  if (!res.ok) {
    let errorMessage = "Failed to fetch routines";
    try {
      const errorData = await res.json();
      if (errorData.message) errorMessage = errorData.message;
    } catch {
      // Ignore JSON parsing errors
    }
    throw new Error(errorMessage);
  }

  return res.json();
}

export async function fetchRoutines() {
  try {
    return await request();
  } catch (error) {
    console.warn('API not available, using fallback data for routines:', error.message);
    return fallbackRoutines;
  }
}

export function addRoutine(routine) {
  return request('', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(routine),
  });
}

export function updateRoutine(id, routine) {
  return request(`/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(routine),
  });
}

export function deleteRoutine(id) {
  return request(`/${id}`, {
    method: 'DELETE',
  });
}
