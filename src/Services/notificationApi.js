const API_URL = import.meta.env.VITE_API_URL_NOTIFICATIONS || "http://localhost:5002/api/notifications";

// Fallback data for when API is not available
const fallbackNotifications = [
  {
    id: '1',
    title: 'Mid-term Exam Schedule Released',
    message: 'The mid-term examination schedule for Fall 2024 has been published. Please check your student portal for details.',
    type: 'Academic',
    priority: 'High',
    targetAudience: 'Students',
    sender: 'Academic Office',
    date: '2024-08-19',
    isRead: false,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: 'Library Hours Extended',
    message: 'The library will now be open until 10 PM on weekdays to support students during exam preparation.',
    type: 'General',
    priority: 'Medium',
    targetAudience: 'All',
    sender: 'Library Administration',
    date: '2024-08-18',
    isRead: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    title: 'Fee Payment Reminder',
    message: 'This is a reminder that semester fees are due by September 15, 2024. Please ensure timely payment to avoid late fees.',
    type: 'Financial',
    priority: 'High',
    targetAudience: 'Students',
    sender: 'Finance Office',
    date: '2024-08-17',
    isRead: false,
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

export async function fetchNotifications() {
  try {
    return await request();
  } catch (error) {
    console.warn('API not available, using fallback data for notifications:', error.message);
    return fallbackNotifications;
  }
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
