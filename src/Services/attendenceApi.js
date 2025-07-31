const API_URL = import.meta.env.VITE_API_URL_ATTENDANCE || 'http://localhost:5002/api/attendance';

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

export function fetchAttendance() {
  return request();
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
