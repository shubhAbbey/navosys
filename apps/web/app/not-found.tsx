import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 py-12 text-neutral-900 sm:px-6 lg:px-8"
    >
      <section
        aria-labelledby="not-found-heading"
        className="w-full max-w-lg rounded-lg border border-neutral-200 bg-white p-6 shadow-xs sm:p-8"
      >
        <p className="text-xs font-medium tracking-wider text-neutral-600 uppercase">
          404
        </p>
        <h1
          id="not-found-heading"
          className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900"
        >
          Page not found
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-700">
          The requested route is not available in this initialization workspace.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
          >
            Return home
          </Link>
        </div>
      </section>
    </main>
  );
}
