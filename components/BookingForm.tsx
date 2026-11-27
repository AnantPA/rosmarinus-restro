"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "@/components/Icons";

type Kind = "table" | "event";

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

const occasions = ["Birthday", "Anniversary", "Office dinner", "Family get-together", "Kitty party", "Something else"];

export default function BookingForm() {
  const [kind, setKind] = useState<Kind>("table");
  const [minDate, setMinDate] = useState("");
  const [errors, setErrors] = useState<{ name?: string; date?: string; guests?: string }>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const guestsRef = useRef<HTMLInputElement>(null);

  // Set on the client so the minimum date matches the visitor's own day.
  useEffect(() => setMinDate(todayISO()), []);

  // The banquet buttons elsewhere on the page link to #book-event to open this form in event mode.
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === "#book-event") {
        setKind("event");
        document.getElementById("book")?.scrollIntoView();
      }
    };
    // Also catch repeat clicks, when the hash is already #book-event and no hashchange fires.
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest?.('a[href="#book-event"]')) setKind("event");
    };
    sync();
    window.addEventListener("hashchange", sync);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", sync);
      document.removeEventListener("click", onClick);
    };
  }, []);

  function switchTo(next: Kind) {
    setKind(next);
    setErrors({});
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const date = String(data.get("date") ?? "");
    const next: typeof errors = {};

    if (!name) next.name = "Enter your name so we know who the booking is for.";
    if (!date) next.date = "Choose the date you’d like to visit.";
    else if (date < todayISO()) next.date = "Choose today or a later date.";

    let guests = String(data.get("guests") ?? "");
    if (kind === "event") {
      const n = Number(guests);
      if (!guests || !Number.isFinite(n) || n < 1) next.guests = "Enter roughly how many guests to expect.";
      guests = String(Math.round(n));
    }

    setErrors(next);
    if (next.name) return nameRef.current?.focus();
    if (next.date) return dateRef.current?.focus();
    if (next.guests) return guestsRef.current?.focus();

    const note = String(data.get("note") ?? "").trim();
    const lines =
      kind === "table"
        ? [
            "Hello Rosmarinus Restro, I’d like to book a table.",
            "",
            `Name: ${name}`,
            `Date: ${prettyDate(date)}`,
            `Meal: ${data.get("meal")}`,
            `Time: ${data.get("time") || "Any"}`,
            `Guests: ${guests}`,
          ]
        : [
            "Hello Rosmarinus Restro, I’d like to know about your banquet packages.",
            "",
            `Name: ${name}`,
            `Occasion: ${data.get("occasion")}`,
            `Date: ${prettyDate(date)}`,
            `Meal: ${data.get("meal")}`,
            `Guests: about ${guests}`,
          ];
    if (note) lines.push(`Note: ${note}`);

    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener");
  }

  return (
    <div className="booking">
      <div className="seg" role="tablist" aria-label="Booking type">
        <button type="button" role="tab" id="tab-table" aria-selected={kind === "table"} aria-controls="booking-form" onClick={() => switchTo("table")}>
          Book a table
        </button>
        <button type="button" role="tab" id="tab-event" aria-selected={kind === "event"} aria-controls="booking-form" onClick={() => switchTo("event")}>
          Banquet or event
        </button>
      </div>

      <form
        className="form"
        id="booking-form"
        role="tabpanel"
        aria-labelledby={kind === "table" ? "tab-table" : "tab-event"}
        onSubmit={onSubmit}
        noValidate
      >
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

        {kind === "event" && (
          <div className="field full">
            <label htmlFor="f-occasion">Occasion</label>
            <select id="f-occasion" name="occasion" defaultValue="Birthday">
              {occasions.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        )}

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

        {kind === "table" ? (
          <>
            <div className="field">
              <label htmlFor="f-guests">Guests</label>
              <select id="f-guests" name="guests" defaultValue="2">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9 or more"].map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="f-time">Preferred time</label>
              <input id="f-time" name="time" type="time" defaultValue="20:00" />
            </div>
          </>
        ) : (
          <div className="field full">
            <label htmlFor="f-guests-n">Number of guests (roughly)</label>
            <input
              ref={guestsRef}
              id="f-guests-n"
              name="guests"
              type="number"
              inputMode="numeric"
              min={1}
              placeholder="e.g. 30"
              required
              aria-invalid={errors.guests ? true : undefined}
              aria-describedby="e-guests"
            />
            <span className="err" id="e-guests">{errors.guests}</span>
          </div>
        )}

        <div className="field full">
          <label htmlFor="f-note">Anything we should know? (optional)</label>
          <textarea
            id="f-note"
            name="note"
            placeholder={kind === "table" ? "Birthday, Jain food, high chair…" : "Decoration, cake, Jain menu, budget per head…"}
          />
        </div>
        <button className="btn btn-teal" type="submit">
          <WhatsAppIcon />
          {kind === "table" ? "Send booking on WhatsApp" : "Send enquiry on WhatsApp"}
        </button>
        <p className="form-note">Your message is sent from your own WhatsApp. Nothing is stored on this website.</p>
      </form>
    </div>
  );
}

