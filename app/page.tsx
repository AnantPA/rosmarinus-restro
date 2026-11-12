import Image from "next/image";
import Header from "@/components/Header";
import BookingForm from "@/components/BookingForm";
import TilePattern from "@/components/TilePattern";
import { features, kitchens, plates, site, whatsappLink } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  url: site.url,
  telephone: site.phone,
  servesCuisine: ["Italian", "Lebanese", "Continental", "North Indian", "Chinese"],
  priceRange: "₹₹₹",
  acceptsReservations: true,
  menu: site.menuUrl,
  sameAs: [site.instagram],
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: `${site.address.area}, ${site.address.city}`,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  openingHoursSpecification: [site.hours.lunch, site.hours.dinner].map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: h.opens,
    closes: h.closes,
  })),
};

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <main id="top">
        {/* Hero */}
        <section className="wrap hero">
          <div className="hero-copy">
            <p className="kicker">Pure vegetarian, near Baghban Circle, Surat</p>
            <h1>A little Venice in Pal Gam</h1>
            <p className="lead">
              Italian, Lebanese, Continental, North Indian and Chinese dishes, all vegetarian, served between
              Roman columns and a hand-drawn Venice on the wall.
            </p>
            <div className="actions">
              <a className="btn btn-teal" href="#book">Book a table</a>
              <a className="btn btn-line" href={`tel:${site.phone}`}>Call {site.phoneShort}</a>
            </div>
            <p className="hours-line">
              Lunch {site.hours.lunch.label.replace(" – ", " to ")}, dinner {site.hours.dinner.label.replace(" – ", " to ")}, every day
            </p>
          </div>
          <div className="arch">
            <Image
              src="/images/table.jpg"
              alt="A table set for eight with rattan chairs, beside tall windows looking onto the garden at dusk"
              width={710}
              height={850}
              priority
              sizes="(max-width: 760px) 100vw, 600px"
            />
          </div>
        </section>

        {/* Mural */}
        <figure className="mural">
          <Image
            src="/images/mural.jpg"
            alt="The hand-drawn Rialto Bridge mural between the Roman columns of the main dining hall"
            width={1220}
            height={370}
            sizes="100vw"
          />
          <figcaption>The Rialto Bridge mural in our main dining hall</figcaption>
        </figure>

        <div className="tiles" aria-hidden="true">
          <TilePattern id="tile-strip" />
        </div>

        {/* Kitchens */}
        <section id="kitchens" className="section surface">
          <div className="wrap center">
            <h2 className="h2">One menu, many kitchens</h2>
            <p className="intro">Everything is vegetarian, and Jain versions are made on request.</p>
            <div className="kitchens">
              {kitchens.map((k) => (
                <a key={k} href={site.menuUrl} {...ext}>{k}</a>
              ))}
            </div>
            <a className="btn btn-teal" href={site.menuUrl} {...ext}>Open the full menu</a>
          </div>
        </section>

        {/* Signature plates */}
        <section className="section wrap" aria-labelledby="plates-title">
          <h2 id="plates-title" className="h2">Signature plates</h2>
          <div className="plates">
            {plates.map((p) => (
              <figure className="plate" key={p.name}>
                <Image
                  src={p.image}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  sizes="(max-width: 700px) 100vw, 300px"
                  style={{ objectPosition: p.position }}
                />
                <figcaption>
                  <span className="cat">{p.cuisine}</span>
                  <span className="name">{p.name}</span>
                  <span className="desc">{p.description}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Evenings */}
        <section id="evenings" className="evenings" aria-labelledby="eve-title">
          <Image
            src="/images/mocktail.jpg"
            alt="A layered blue and green signature mocktail with a citrus garnish, against evening lights"
            width={830}
            height={940}
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <div className="night">
            <h2 id="eve-title" className="h2">Evenings with live music</h2>
            <p>
              Evenings bring live music to the lounge, signature mocktails to the table, and big matches to the
              screen. Bring the family; kids are welcome.
            </p>
            <h3>Planning a celebration?</h3>
            <p>
              We host birthdays, anniversaries and office dinners with a set banquet menu. Send us the date and
              number of guests and we’ll share the packages.
            </p>
            <a
              className="btn btn-lilac"
              href={whatsappLink("Hello Rosmarinus Restro, I’d like to know about your banquet packages.")}
              {...ext}
            >
              Ask about banquet packages
            </a>
            <ul className="features">
              {features.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </div>
        </section>

        {/* Visit */}
        <section id="visit" className="section wrap visit" aria-labelledby="visit-title">
          <div className="visit-copy">
            <h2 id="visit-title" className="h2">Find us</h2>
            <div>
              <p className="address">{site.address.full}</p>
              <a href={site.mapsUrl} {...ext} style={{ fontWeight: 500 }}>Get directions on Google Maps</a>
            </div>
            <div className="facts">
              <div className="fact"><span>Lunch, every day</span><b>{site.hours.lunch.label}</b></div>
              <div className="fact"><span>Dinner, every day</span><b>{site.hours.dinner.label}</b></div>
              <div className="fact"><span>Phone</span><a href={`tel:${site.phone}`}>{site.phoneDisplay}</a></div>
              <div className="fact"><span>Instagram</span><a href={site.instagram} {...ext}>{site.instagramHandle}</a></div>
            </div>
          </div>
          <div className="locate">
            <iframe
              src={site.mapEmbedUrl}
              title="Map showing Rosmarinus Restro near Baghban Circle, Pal Gam, Surat"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="locate-card">
              <div>
                <b>Near Baghban Circle</b>
                <p>On Gaurav Path Road, opposite Tea Post Desi Cafe. Valet parking at the door.</p>
              </div>
              <a className="btn btn-teal" href={site.mapsUrl} {...ext}>Open in Google Maps</a>
            </div>
          </div>
        </section>

        {/* Booking */}
        <section id="book" className="section surface" aria-labelledby="book-title">
          <div className="wrap book">
            <div className="book-copy">
              <h2 id="book-title" className="h2">Book a table</h2>
              <p className="intro">Fill this in and WhatsApp opens with your booking ready to send. We reply to confirm.</p>
              <p className="intro" style={{ fontSize: 17 }}>
                For groups of 10 or more, or a banquet, call <a href={`tel:${site.phone}`}>{site.phoneShort}</a>.
              </p>
            </div>
            <BookingForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap foot">
          <b>Rosmarinus Restro</b>
          <nav aria-label="Footer">
            <a href="#kitchens">Menu</a>
            <a href="#book">Book a table</a>
            <a href={site.instagram} {...ext}>Instagram</a>
            <a href={site.mapsUrl} {...ext}>Directions</a>
          </nav>
          <small>© {new Date().getFullYear()} Rosmarinus Restro, Surat</small>
        </div>
      </footer>

      <div className="quickbar">
        <a className="btn btn-line" href={`tel:${site.phone}`}>Call</a>
        <a className="btn btn-teal" href="#book">Book a table</a>
      </div>
    </>
  );
}
