const API_URL = import.meta.env.VITE_API_URL_REPORTS || "http://localhost:5001/api/reports";

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

export function fetchReports() {
  return request();
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
