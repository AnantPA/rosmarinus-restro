"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gallery } from "@/lib/site";

// A swipeable photo carousel: the centred photo is shown large, its neighbours peek in at the sides.
export default function Gallery() {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const goTo = useCallback((i: number) => {
    const el = track.current;
    if (!el) return;
    const n = gallery.length;
    const next = ((i % n) + n) % n;
    const card = el.children[next] as HTMLElement | undefined;
    if (!card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.clientWidth) / 2, behavior: reduce ? "auto" : "smooth" });
  }, []);

  // Work out which photo is closest to the centre while the visitor scrolls or swipes.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      Array.from(el.children).forEach((c, i) => {
        const card = c as HTMLElement;
        const d = Math.abs(card.offsetLeft + card.clientWidth / 2 - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setIndex(best);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="gallery" role="region" aria-roledescription="carousel" aria-label="Photos of Rosmarinus Restro">
      <div
        className="g-track"
        ref={track}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); goTo(index + 1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); goTo(index - 1); }
        }}
      >
        {gallery.map((g, i) => (
          <figure
            key={g.src}
            className={`g-card${i === index ? " on" : ""}`}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${gallery.length}`}
            onClick={() => i !== index && goTo(i)}
          >
            <Image
              src={g.src}
              alt={g.alt}
              width={g.width}
              height={g.height}
              sizes="(max-width: 700px) 80vw, 560px"
              style={{ objectPosition: g.position }}
            />
          </figure>
        ))}
      </div>
      <div className="g-controls">
        <button type="button" className="g-arrow" aria-label="Previous photo" onClick={() => goTo(index - 1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
        </button>
        <div className="g-dots">
          {gallery.map((g, i) => (
            <button
              key={g.src}
              type="button"
              className={i === index ? "on" : undefined}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <button type="button" className="g-arrow" aria-label="Next photo" onClick={() => goTo(index + 1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
}
