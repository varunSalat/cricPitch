/**
 * Shape thrown by fetchAPI.ts when the server responds with a non-2xx status.
 * The error is a plain Error extended with `status` (HTTP code) and `data`
 * (raw parsed response body).
 */
interface FetchAPIError extends Error {
  status?: number;
  data?: { message?: string } & Record<string, unknown>;
}

const isFetchAPIError = (error: unknown): error is FetchAPIError =>
  error instanceof Error && ("status" in error || "data" in error);

/**
 * Extracts a human-readable error message from any thrown value.
 *
 * Priority order:
 *  1. Server-returned `message` field in the response body (FetchAPI errors)
 *  2. The `Error.message` string (covers network errors like "Failed to fetch")
 *  3. Stringified value for non-Error throws
 *  4. Generic fallback
 */
export const getAPIErrorMsg = (error: unknown): string => {
  // Errors thrown by fetchAPI.ts (non-2xx responses)
  if (isFetchAPIError(error)) {
    return error.data?.message || error.message || "An unexpected error occurred.";
  }

  // Network-level failures (offline, DNS, CORS, etc.) or any other Error
  if (error instanceof Error) {
    if (error.name === "TypeError" && error.message === "Failed to fetch") {
      return "Network error — please check your connection and try again.";
    }
    return error.message || "An unexpected error occurred.";
  }

  // Non-Error throws (strings, objects, etc.)
  if (typeof error === "string" && error.trim()) return error;

  return "An unexpected error occurred.";
};
