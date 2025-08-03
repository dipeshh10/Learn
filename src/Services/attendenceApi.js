const API_URL = import.meta.env.VITE_API_URL_ATTENDANCE || 'http://localhost:5002/api/attendance';

// Fallback data for when API is not available
const fallbackAttendance = [
  {
    id: '1',
    studentName: 'John Doe',
    studentId: '1',
    subject: 'Mathematics',
    date: '2024-08-19',
    status: 'Present',
    time: '09:00',
    teacherName: 'Prof. Johnson',
    notes: '',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    studentName: 'Jane Smith',
    studentId: '2',
    subject: 'English Literature',
    date: '2024-08-19',
    status: 'Present',
    time: '11:00',
    teacherName: 'Prof. Smith',
    notes: '',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    studentName: 'Mike Johnson',
    studentId: '3',
    subject: 'Physics',
    date: '2024-08-19',
    status: 'Absent',
    time: '14:00',
    teacherName: 'Dr. Wilson',
    notes: 'Sick leave',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

function getToken() {
  return localStorage.getItem('token');
}

async function request(path = '', options = {}) {
  const token = getToken();
  if (!token) throw new Error('Authentication token missing');

  const headers = {
    'Authorization': 'Bearer ' + token,
    ...options.headers,
  };

  const res = await fetch(API_URL + path, { ...options, headers });

  if (!res.ok) {
    let errorMessage = 'Failed to fetch attendance';
    try {
      const errorData = await res.json();
      if (errorData.message) errorMessage = errorData.message;
    } catch {
      // Ignore parsing errors
    }
    throw new Error(errorMessage);
  }

  return res.json();
}

export async function fetchAttendance() {
  try {
    return await request();
  } catch (error) {
    console.warn('API not available, using fallback data for attendance:', error.message);
    return fallbackAttendance;
  }
}

export function addAttendance(attendance) {
  return request('', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(attendance),
  });
}

export function updateAttendance(id, attendance) {
  return request(`/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(attendance),
  });
}

export function deleteAttendance(id) {
  return request(`/${id}`, {
    method: 'DELETE',
  });
}
