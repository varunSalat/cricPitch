interface FetchAPIError extends Error {
  status?: number;
  data?: { message?: string } & Record<string, unknown>;
}

const isFetchAPIError = (error: unknown): error is FetchAPIError =>
  error instanceof Error && ("status" in error || "data" in error);

export const getAPIErrorMsg = (error: unknown): string => {
  if (isFetchAPIError(error)) {
    return (
      error.data?.message || error.message || "An unexpected error occurred."
    );
  }

  if (error instanceof Error) {
    if (error.name === "TypeError" && error.message === "Failed to fetch") {
      return "Network error — please check your connection and try again.";
    }
    return error.message || "An unexpected error occurred.";
  }

  if (typeof error === "string" && error.trim()) return error;

  return "An unexpected error occurred.";
};
