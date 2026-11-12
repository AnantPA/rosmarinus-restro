"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { whatsappLink } from "@/lib/site";

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function prettyDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BookingForm() {
  const [minDate, setMinDate] = useState("");
  const [errors, setErrors] = useState<{ name?: string; date?: string }>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  // Set on the client so the minimum date matches the visitor's own day.
  useEffect(() => setMinDate(todayISO()), []);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const date = String(data.get("date") ?? "");
    const next: typeof errors = {};

    if (!name) next.name = "Enter your name so we know who the table is for.";
    if (!date) next.date = "Choose the date you’d like to visit.";
    else if (date < todayISO()) next.date = "Choose today or a later date.";

    setErrors(next);
    if (next.name) return nameRef.current?.focus();
    if (next.date) return dateRef.current?.focus();

    const lines = [
      "Hello Rosmarinus Restro, I’d like to book a table.",
      "",
      `Name: ${name}`,
      `Date: ${prettyDate(date)}`,
      `Meal: ${data.get("meal")}`,
      `Time: ${data.get("time") || "Any"}`,
      `Guests: ${data.get("guests")}`,
    ];
    const note = String(data.get("note") ?? "").trim();
    if (note) lines.push(`Note: ${note}`);

    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener");
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="field full">
        <label htmlFor="f-name">Name</label>
        <input
          ref={nameRef}
          id="f-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={errors.name ? true : undefined}
          aria-describedby="e-name"
        />
        <span className="err" id="e-name">{errors.name}</span>
      </div>
      <div className="field">
        <label htmlFor="f-date">Date</label>
        <input
          ref={dateRef}
          id="f-date"
          name="date"
          type="date"
          min={minDate || undefined}
          required
          aria-invalid={errors.date ? true : undefined}
          aria-describedby="e-date"
        />
        <span className="err" id="e-date">{errors.date}</span>
      </div>
      <div className="field">
        <label htmlFor="f-meal">Lunch or dinner</label>
        <select id="f-meal" name="meal" defaultValue="Dinner">
          <option>Dinner</option>
          <option>Lunch</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="f-guests">Guests</label>
        <select id="f-guests" name="guests" defaultValue="2">
          {["2", "3", "4", "5", "6", "7", "8", "9 or more"].map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="f-time">Preferred time</label>
        <input id="f-time" name="time" type="time" defaultValue="20:00" />
      </div>
      <div className="field full">
        <label htmlFor="f-note">Anything we should know? (optional)</label>
        <textarea id="f-note" name="note" placeholder="Birthday, Jain food, high chair…" />
      </div>
      <button className="btn btn-teal" type="submit">
        Send booking on WhatsApp
      </button>
      <p className="form-note">Your booking is sent from your own WhatsApp. Nothing is stored on this website.</p>
    </form>
  );
}
