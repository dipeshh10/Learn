const API_URL = import.meta.env.VITE_API_URL_LEARNING_MATERIALS || "http://localhost:5002/api/learning-materials";

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
    let errorMessage = "Failed to fetch learning materials";
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

export function fetchLearningMaterials() {
  return request();
}

export function addLearningMaterial(learningMaterial) {
  return request('', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(learningMaterial),
  });
}

export function updateLearningMaterial(id, learningMaterial) {
  return request(`/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(learningMaterial),
  });
}

export function deleteLearningMaterial(id) {
  return request(`/${id}`, {
    method: 'DELETE',
  });
}
