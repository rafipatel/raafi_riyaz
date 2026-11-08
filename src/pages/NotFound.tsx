import { useLocation } from "react-router-dom";

/** 404, framed as a step outside the environment's state space. */
const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <main className="flex min-h-screen items-center justify-center bg-ro-bg px-6 font-sans text-ro-fg">
      <div className="flex max-w-[520px] flex-col gap-5">
        <p className="font-mono text-sm text-ro-fail">404 · state not found</p>
        <h1 className="text-4xl font-bold tracking-[-0.03em] sm:text-5xl">This page isn't in the environment.</h1>
        <pre className="overflow-x-auto rounded-xl border border-ro-line bg-ro-surface px-4 py-3 font-mono text-[13px] text-ro-body">
          {`step(goto("${pathname}"))\n→ invalid action · reward = 0`}
        </pre>
        <a href="/" className="inline-flex min-h-[44px] w-fit items-center rounded-full bg-ro-acc px-5 font-semibold text-ro-acc-ink hover:opacity-90">
          env.reset() · back home
        </a>
      </div>
    </main>
  );
};

export default NotFound;
