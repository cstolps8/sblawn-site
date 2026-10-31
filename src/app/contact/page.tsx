import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { contact } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Contact", description: "Contact S&B Lawn Systems in Milwaukee, WI." };

export default function ContactPage() {
  const field =
    "mt-1 w-full rounded-lg border border-black/15 px-4 py-3 outline-none focus:border-turf focus:ring-2 focus:ring-turf/30";
  return (
    <>
      <PageHeader eyebrow="Contact" title="Talk to a striping expert">
        Questions about fit, setup or an order? We&apos;re here to help.
      </PageHeader>
      <Container className="grid gap-12 py-12 lg:grid-cols-[1fr_22rem]">
        {/* Form posts nowhere yet; Phase 5 wires it to a server action + Azure Communication Services */}
        <form className="grid gap-5 sm:grid-cols-2" aria-describedby="form-note">
          <label className="block">
            <span className="text-sm font-semibold">Name</span>
            <input name="name" autoComplete="name" required className={field} />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Email</span>
            <input name="email" type="email" autoComplete="email" required className={field} />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Mower brand &amp; model</span>
            <input name="mower" placeholder="e.g. Toro Recycler 22&quot;" className={field} />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Order number (optional)</span>
            <input name="order" className={field} />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm font-semibold">Message</span>
            <textarea name="message" rows={6} required className={field} />
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled
              className="rounded-lg bg-turf px-8 py-3.5 font-display text-xl font-bold uppercase text-white disabled:opacity-60"
            >
              Send message
            </button>
            <p id="form-note" className="mt-2 text-xs text-charcoal/60">
              Form sending is connected in a later phase.
            </p>
          </div>
        </form>
        <aside className="h-fit space-y-5 rounded-2xl bg-mist p-6">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-charcoal/60">Phone</h2>
            <a className="text-lg font-semibold" href={`tel:${contact.phone.replace(/\D/g, "")}`}>
              {contact.phone}
            </a>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-charcoal/60">Email</h2>
            <a className="break-all text-lg font-semibold" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-charcoal/60">Location</h2>
            <p className="text-lg font-semibold">{contact.city}</p>
          </div>
        </aside>
      </Container>
    </>
  );
}
