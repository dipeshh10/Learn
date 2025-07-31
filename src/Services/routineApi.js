const API_URL = import.meta.env.VITE_API_URL_ROUTINES || "http://localhost:5002/api/routines";

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

export function fetchRoutines() {
  return request();
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
