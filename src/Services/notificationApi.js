const API_URL = process.env.REACT_APP_API_URL_NOTIFICATIONS || "http://localhost:5001/api/notifications";

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
    let errorMessage = "Failed to fetch notifications";
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

export function fetchNotifications() {
  return request();
}

export function addNotification(notification) {
  return request('', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(notification),
  });
}

export function updateNotification(id, notification) {
  return request(`/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(notification),
  });
}

export function deleteNotification(id) {
  return request(`/${id}`, {
    method: 'DELETE',
  });
}
