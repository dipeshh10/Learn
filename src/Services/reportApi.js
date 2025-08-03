const API_URL = import.meta.env.VITE_API_URL_REPORTS || "http://localhost:5002/api/reports";

// Fallback data for when API is not available
const fallbackReports = [
  {
    id: '1',
    title: 'Mid-term Mathematics Exam',
    type: 'Exam',
    studentName: 'John Doe',
    studentId: '1',
    subject: 'Mathematics',
    date: '2024-08-15',
    grade: 85,
    maxGrade: 100,
    teacherName: 'Prof. Johnson',
    comments: 'Good performance in algebra section',
    semester: 'Fall 2024',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: 'English Literature Essay',
    type: 'Assignment',
    studentName: 'Jane Smith',
    studentId: '2',
    subject: 'English Literature',
    date: '2024-08-18',
    grade: 92,
    maxGrade: 100,
    teacherName: 'Prof. Smith',
    comments: 'Excellent analysis and writing style',
    semester: 'Fall 2024',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    title: 'Physics Lab Report',
    type: 'Lab',
    studentName: 'Mike Johnson',
    studentId: '3',
    subject: 'Physics',
    date: '2024-08-17',
    grade: 78,
    maxGrade: 100,
    teacherName: 'Dr. Wilson',
    comments: 'Good experimental procedure, needs improvement in analysis',
    semester: 'Fall 2024',
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
    let errorMessage = "Failed to fetch reports";
    try {
      const errorData = await res.json();
      if (errorData.message) errorMessage = errorData.message;
    } catch {
      // Ignore JSON parse errors
    }
    throw new Error(errorMessage);
  }

  return res.json();
}

export async function fetchReports() {
  try {
    return await request();
  } catch (error) {
    console.warn('API not available, using fallback data for reports:', error.message);
    return fallbackReports;
  }
}

export function addReport(report) {
  return request('', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(report),
  });
}

export function updateReport(id, report) {
  return request(`/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(report),
  });
}

export function deleteReport(id) {
  return request(`/${id}`, {
    method: 'DELETE',
  });
}
