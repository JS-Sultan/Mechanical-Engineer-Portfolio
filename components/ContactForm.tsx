"use client";

import { useState } from "react";

// Contact form for a static site. With a Web3Forms access key (NEXT_PUBLIC_WEB3FORMS_KEY) messages are
// delivered by email via api.web3forms.com; without one, Send opens the visitor's mail app pre-filled.
type Status = { kind: "idle" | "sending" | "sent" | "error"; message?: string };

const REASONS = ["Job opportunity", "Project collaboration", "Other"];

export default function ContactForm({ accessKey, email }: { accessKey: string; email: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("botcheck")) return; // hidden field: only bots fill it in

    const name = String(data.get("name") ?? "").trim();
    const from = String(data.get("email") ?? "").trim();
    const reason = String(data.get("reason") ?? "");
    const message = String(data.get("message") ?? "").trim();
    const subject = `${reason} from ${name} (portfolio)`;

    if (!accessKey) {
      const body = `${message}\n\n${name}\n${from}`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      form.reset();
      setStatus({ kind: "sent", message: "Your email app should open with the message ready to send." });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject,
          from_name: "Portfolio contact form",
          name,
          email: from,
          reason,
          message,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) throw new Error(json.message || "Request failed");
      form.reset();
      setStatus({ kind: "sent", message: "Thank you! Your message has been sent. I'll get back to you soon." });
    } catch {
      setStatus({
        kind: "error",
        message: `Sorry, the message couldn't be sent. Please try again, or email ${email} directly.`,
      });
    }
  }

  const sending = status.kind === "sending";

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate={false}>
      <h3 className="contact-form-title">Send a message</h3>

      <div className="field-row">
        <label className="field">
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" required maxLength={80} />
        </label>
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required maxLength={120} />
        </label>
      </div>

      <fieldset className="field reasons">
        <legend>Reason</legend>
        <div className="reason-options">
          {REASONS.map((r, i) => (
            <label key={r} className="reason">
              <input type="radio" name="reason" value={r} defaultChecked={i === 0} />
              <span>{r}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="field">
        <span>Message</span>
        <textarea name="message" rows={5} required minLength={10} maxLength={3000} />
      </label>

      {/* honeypot */}
      <input type="checkbox" name="botcheck" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={sending}>
          {sending ? "Sending…" : "Send message"}
        </button>
        <p className={`form-status ${status.kind}`} role="status" aria-live="polite">
          {status.message}
        </p>
      </div>
    </form>
  );
}
