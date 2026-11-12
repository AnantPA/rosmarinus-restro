# Rosmarinus Restro website

The official one-page website for Rosmarinus Restro, Pal Gam, Surat. Built with Next.js (App Router), React and TypeScript, with no other dependencies.

## Run it on your computer

You need Node.js 18.18 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploy it (free) on Vercel

1. Push this folder to a GitHub repository.
2. Go to https://vercel.com, sign in with GitHub, and click **Add New → Project**.
3. Pick the repository and click **Deploy**. No settings need to change.
4. To use the restaurant's own domain (for example rosmarinusrestro.com), open the project in Vercel, go to **Settings → Domains**, add the domain, and follow the DNS steps shown.

## Where to change things

| What | File |
| --- | --- |
| Phone, WhatsApp, address, hours, Instagram, menu link, domain | `lib/site.ts` |
| Cuisine list, signature dishes, features list | `lib/site.ts` |
| Page sections and wording | `app/page.tsx` |
| Colours, fonts, spacing, mobile layout | `app/globals.css` |
| Header and mobile menu | `components/Header.tsx` |
| WhatsApp booking form | `components/BookingForm.tsx` |
| Photos | `public/images/` |
| Browser tab icon | `app/icon.png` |

## Before going live

- Confirm opening hours with the restaurant (`lib/site.ts`, marked TODO).
- Set the real domain in `lib/site.ts` (`site.url`), used for search and social previews.
- Check dish names against the current menu.
- Swap in full-size original photos for the sharpest result. Keep the same file names, or update the paths in `lib/site.ts` and `app/page.tsx`.

## How booking works

The form doesn't need a server or database. When a guest submits it, WhatsApp opens with a ready-made message (name, date, meal, time, guests and any note) addressed to the restaurant's number, and the guest presses send.
