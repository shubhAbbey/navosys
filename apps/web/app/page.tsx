export default function HomePage() {
  return (
    <main
      id="main-content"
      className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 py-12 text-neutral-900 sm:px-6 lg:px-8"
    >
      <section
        aria-labelledby="foundation-heading"
        className="w-full max-w-2xl rounded-lg border border-neutral-200 bg-white p-6 shadow-xs sm:p-8"
      >
        <p className="text-xs font-medium tracking-wider text-neutral-600 uppercase">
          Phase 01 — Technical Foundation
        </p>
        <h1
          id="foundation-heading"
          className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl"
        >
          NAVOSYS Web Workspace Initialized
        </h1>
        <p className="mt-4 text-base leading-relaxed text-neutral-700">
          Next.js App Router, TypeScript, Tailwind CSS, linting, and testing
          tooling are configured. CMS schemas, design tokens, and dynamic
          content routes are reserved for subsequent phases.
        </p>
      </section>
    </main>
  );
}
