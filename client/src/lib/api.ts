// API configuration for both development and production

// Use environment variable in production, localhost in development
export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Helper function for API calls with credentials
export async function apiCall(endpoint: string, options?: RequestInit) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    credentials: 'include', // Always send cookies
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  return response;
}

// Helper for GET requests
export async function apiGet(endpoint: string) {
  return apiCall(endpoint, { method: 'GET' });
}

// Helper for POST requests
export async function apiPost(endpoint: string, data?: any) {
  return apiCall(endpoint, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
}

// Helper for PATCH requests
export async function apiPatch(endpoint: string, data?: any) {
  return apiCall(endpoint, {
    method: 'PATCH',
    body: data ? JSON.stringify(data) : undefined,
  });
}

// Helper for DELETE requests
export async function apiDelete(endpoint: string) {
  return apiCall(endpoint, { method: 'DELETE' });
}

