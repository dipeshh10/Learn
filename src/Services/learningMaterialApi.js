const API_URL = import.meta.env.VITE_API_URL_LEARNING_MATERIALS || "http://localhost:5002/api/learning-materials";

// Fallback data for when API is not available
const fallbackLearningMaterials = [
  {
    id: '1',
    title: 'Advanced Calculus Textbook',
    type: 'PDF',
    subject: 'Mathematics',
    description: 'Comprehensive guide to advanced calculus concepts',
    fileUrl: '/materials/calculus.pdf',
    uploadedBy: 'Prof. Johnson',
    uploadDate: '2024-08-10',
    size: '15.2 MB',
    downloads: 45,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: 'Shakespeare Complete Works',
    type: 'PDF',
    subject: 'English Literature',
    description: 'Complete collection of Shakespeare\'s plays and sonnets',
    fileUrl: '/materials/shakespeare.pdf',
    uploadedBy: 'Prof. Smith',
    uploadDate: '2024-08-12',
    size: '8.7 MB',
    downloads: 32,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    title: 'Physics Lab Manual',
    type: 'PDF',
    subject: 'Physics',
    description: 'Laboratory experiments and procedures for physics students',
    fileUrl: '/materials/physics-lab.pdf',
    uploadedBy: 'Dr. Wilson',
    uploadDate: '2024-08-14',
    size: '12.1 MB',
    downloads: 28,
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

export async function fetchLearningMaterials() {
  try {
    return await request();
  } catch (error) {
    console.warn('API not available, using fallback data for learning materials:', error.message);
    return fallbackLearningMaterials;
  }
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
