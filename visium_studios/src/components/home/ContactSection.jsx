import { useState } from "react";
import emailjs from "@emailjs/browser";

const initialForm = {
  name: "",
  email: "",
  company: "",
  project: "",
};

function ContactSection({ onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setSubmitted(false);
    setError(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSending(true);
    setSubmitted(false);
    setError(false);

    try {
      await emailjs.send(
        "service_dngp5p9",
        "template_7l9xkee",
        {
          name: form.name,
          email: form.email,
          company: form.company,
          project: form.project,
        },
        "Z0kwV0vRdbvJqqVZ0",
      );

      onSubmit?.(form);

      setSubmitted(true);
      setForm(initialForm);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="border-t border-white/10 px-4 py-20 sm:px-6 md:px-10 md:py-32"
      aria-labelledby="contact-heading"
    >
      <div className="grid gap-16 md:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)] md:gap-20 lg:gap-28">
        <div>
          <p className="mb-8 text-xs uppercase tracking-[0.2em] text-white/40">
            09 / Contact
          </p>

          <h2
            id="contact-heading"
            className="max-w-4xl text-[clamp(3rem,8vw,8rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-white"
          >
            Let&apos;s build something worth looking at.
          </h2>

          <p className="mt-8 max-w-md text-base leading-relaxed text-white/50 md:text-lg">
            Tell us what you&apos;re building, where it needs to go, and what
            should feel different when it gets there.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="grid gap-8 sm:grid-cols-2">
            <label className="flex flex-col gap-3 text-xs uppercase tracking-[0.16em] text-white/50">
              Name
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                className="border-b border-white/25 bg-transparent pb-3 text-base normal-case tracking-normal text-white outline-none transition-colors placeholder:text-white/25 focus:border-white"
                placeholder="Your name"
              />
            </label>

            <label className="flex flex-col gap-3 text-xs uppercase tracking-[0.16em] text-white/50">
              Email
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="border-b border-white/25 bg-transparent pb-3 text-base normal-case tracking-normal text-white outline-none transition-colors placeholder:text-white/25 focus:border-white"
                placeholder="you@company.com"
              />
            </label>
          </div>

          <label className="flex flex-col gap-3 text-xs uppercase tracking-[0.16em] text-white/50">
            Company / project
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              className="border-b border-white/25 bg-transparent pb-3 text-base normal-case tracking-normal text-white outline-none transition-colors placeholder:text-white/25 focus:border-white"
              placeholder="What are we building?"
            />
          </label>

          <label className="flex flex-col gap-3 text-xs uppercase tracking-[0.16em] text-white/50">
            A little context
            <textarea
              required
              name="project"
              value={form.project}
              onChange={handleChange}
              rows="4"
              className="resize-y border-b border-white/25 bg-transparent pb-3 text-base normal-case tracking-normal text-white outline-none transition-colors placeholder:text-white/25 focus:border-white"
              placeholder="Tell us about the opportunity"
            />
          </label>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={sending}
              className="group flex items-center gap-6 border border-white/40 px-5 py-3 text-xs uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              {sending ? "Sending..." : "Start a project"}

              {!sending && (
                <span className="text-xl leading-none transition-transform group-hover:translate-x-1">
                  →
                </span>
              )}
            </button>

            {submitted && (
              <p className="text-sm text-white/60" role="status">
                Thanks. We&apos;ll be in touch soon.
              </p>
            )}

            {error && (
              <p className="text-sm text-white/60" role="alert">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactSection;
