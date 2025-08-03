const API_URL = import.meta.env.VITE_API_URL_FEES || "http://localhost:5002/api/fees";

// Fallback data for when API is not available
const fallbackFees = [
  {
    id: '1',
    studentName: 'John Doe',
    studentId: '1',
    feeType: 'Tuition',
    amount: 5000.00,
    dueDate: '2024-09-15',
    paidDate: '2024-08-20',
    status: 'Paid',
    semester: 'Fall 2024',
    paymentMethod: 'Bank Transfer',
    receiptNumber: 'RCP001',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    studentName: 'Jane Smith',
    studentId: '2',
    feeType: 'Library Fee',
    amount: 150.00,
    dueDate: '2024-09-01',
    paidDate: null,
    status: 'Pending',
    semester: 'Fall 2024',
    paymentMethod: null,
    receiptNumber: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    studentName: 'Mike Johnson',
    studentId: '3',
    feeType: 'Lab Fee',
    amount: 300.00,
    dueDate: '2024-08-30',
    paidDate: '2024-08-25',
    status: 'Paid',
    semester: 'Fall 2024',
    paymentMethod: 'Credit Card',
    receiptNumber: 'RCP002',
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
    ...options.headers
  };

  const res = await fetch(API_URL + path, { ...options, headers });

  if (!res.ok) {
    let errorMessage = "Failed to fetch fees";
    try {
      const errorData = await res.json();
      if (errorData.message) errorMessage = errorData.message;
    } catch {
      // ignore JSON parsing errors
    }
    throw new Error(errorMessage);
  }

  return res.json();
}

export async function fetchFees() {
  try {
    return await request();
  } catch (error) {
    console.warn('API not available, using fallback data for fees:', error.message);
    return fallbackFees;
  }
}

export function addFee(fee) {
  return request('', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fee),
  });
}

export function updateFee(id, fee) {
  return request(`/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fee),
  });
}

export function deleteFee(id) {
  return request(`/${id}`, {
    method: 'DELETE',
  });
}
