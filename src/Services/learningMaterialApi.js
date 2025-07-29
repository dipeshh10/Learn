const API_URL = process.env.REACT_APP_API_URL_FEES || "http://localhost:5001/api/fees";

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

export function fetchFees() {
  return request();
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
