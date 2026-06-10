import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
}

// Shared base fetch with JSON handling
const baseFetch = async (
  url: string,
  options: FetchOptions = {},
  extraHeaders: Record<string, string> = {},
) => {
  const { method = "GET", body, headers = {} } = options;

  const response = await fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...extraHeaders,
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message =
      (errorData as { message?: string }).message ||
      `Request failed with status ${response.status}`;
    const error = Object.assign(new Error(message), {
      status: response.status,
      data: errorData,
    });
    throw error;
  }

  // Return null for 204 No Content
  if (response.status === 204) return null;

  return response.json();
};

// Public fetch — no auth token (login, register, public routes)
export const publicFetch = (url: string, options?: FetchOptions) =>
  baseFetch(url, options);

// Private fetch — attaches Bearer token from cookie automatically
export const privateFetch = (url: string, options?: FetchOptions) => {
  const token = Cookies.get("access_token");
  const authHeader: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  if (!token) {
    console.warn("privateFetch: No access_token found in cookies.");
  }

  return baseFetch(url, options, authHeader);
};
