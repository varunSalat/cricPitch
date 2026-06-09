import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const message =
    error instanceof Error
      ? error.message
      : "Something went wrong while loading the page.";

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-20 text-center">
      <div className="w-full max-w-2xl rounded-[2rem] border border-border/80 bg-card p-10 shadow-2xl shadow-black/5">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Error</p>
        <h1 className="mt-6 text-4xl font-bold text-foreground sm:text-5xl">Oops! Something went wrong.</h1>
        <p className="mt-4 text-base leading-8 text-muted-foreground">{message}</p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Go Home
          </Link>
          <Link
            to="/"
            className="inline-flex rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
          >
            Try Again
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
