const API_URL = import.meta.env.VITE_API_URL_STUDENTS || "http://localhost:5002/api/students";

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
    let errorMessage = "Failed to fetch students";
    try {
      const errorData = await res.json();
      if (errorData.message) errorMessage = errorData.message;
    } catch {
      // Ignore JSON parsing errors here
    }
    throw new Error(errorMessage);
  }

  return res.json();
}

export function fetchStudents() {
  return request();
}

export function addStudent(student) {
  return request('', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student),
  });
}

export function updateStudent(id, student) {
  return request(`/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student),
  });
}

export function deleteStudent(id) {
  return request(`/${id}`, {
    method: 'DELETE',
  });
}
