import Link from "next/link";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-bold uppercase tracking-[0.18em] text-turf">{children}</p>;
}

export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="stripes-dark text-white">
      <Container className="py-12 sm:py-16">
        {eyebrow && <p className="text-sm font-bold uppercase tracking-[0.18em] text-turf">{eyebrow}</p>}
        <h1 className="mt-2 font-display text-4xl font-bold uppercase sm:text-6xl">{title}</h1>
        {children && <div className="mt-4 max-w-2xl text-lg text-white/85">{children}</div>}
      </Container>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-charcoal/60">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden>/</span>}
            {it.href ? (
              <Link href={it.href} className="hover:text-turf-800">
                {it.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-charcoal">
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "light" | "outline";
}) {
  const styles = {
    primary: "bg-turf text-white hover:bg-turf-800",
    light: "bg-white text-charcoal hover:bg-turf-50",
    outline: "border-2 border-white text-white hover:bg-white hover:text-charcoal",
  }[variant];
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-lg px-6 py-3 font-display text-lg font-bold uppercase tracking-wide transition ${styles}`}
    >
      {children}
    </Link>
  );
}
