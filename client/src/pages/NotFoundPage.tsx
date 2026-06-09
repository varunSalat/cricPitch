import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-20 text-center">
      <div className="w-full max-w-xl rounded-[2rem] border border-border/80 bg-card p-10 shadow-2xl shadow-black/5">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">404</p>
        <h1 className="mt-6 text-4xl font-bold text-foreground sm:text-5xl">Page not found</h1>
        <p className="mt-4 text-base leading-8 text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
