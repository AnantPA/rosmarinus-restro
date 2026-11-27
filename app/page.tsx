import Image from "next/image";
import Header from "@/components/Header";
import BookingForm from "@/components/BookingForm";
import Gallery from "@/components/Gallery";
import ScrollReveal from "@/components/ScrollReveal";
import SectionTitle from "@/components/SectionTitle";
import TilePattern from "@/components/TilePattern";
import { ArrowIcon, ClockIcon, InstagramIcon, LeafIcon, PhoneIcon, PinIcon, StarIcon, WhatsAppIcon } from "@/components/Icons";
import { features, kitchens, offers, plates, reviews, site, whatsappLink } from "@/lib/site";

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
const banquetMsg = "Hello Rosmarinus Restro, I’d like to know about your banquet packages.";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScrollReveal />
      <Header />

      <main id="top">
        {/* Hero */}
        <section className="hero-band">
          <div className="wrap hero">
            <div className="hero-copy">
              <p className="badge"><span className="veg-dot" aria-hidden="true" />100% pure vegetarian dining</p>
              <h1>
                A little Venice
                <em>in Pal Gam</em>
              </h1>
              <p className="lead">
                Italian, Lebanese, Continental, North Indian and Chinese dishes, all vegetarian, served between
                Roman columns and a hand-drawn Venice on the wall. Near Baghban Circle, Surat.
              </p>
              <div className="actions">
                <a className="btn btn-teal" href="#book">Book a table</a>
                <a className="btn btn-line" href={site.menuUrl} {...ext}>See our menu <ArrowIcon /></a>
              </div>
              <p className="hours-line">
                <ClockIcon />
                Lunch {site.hours.lunch.label.replace(" – ", " to ")} · Dinner {site.hours.dinner.label.replace(" – ", " to ")} · every day
              </p>
            </div>

            <div className="hero-art">
              <div className="blob">
                <Image
                  src="/images/table.jpg"
                  alt="A table set for eight with rattan chairs, beside tall windows looking onto the garden at dusk"
                  width={710}
                  height={850}
                  priority
                  sizes="(max-width: 760px) 92vw, 560px"
                />
              </div>
              <div className="float-dish" aria-hidden="true">
                <Image src="/images/tikka.jpg" alt="" width={1200} height={1043} sizes="160px" />
              </div>
              <div className="hero-note">
                <b>Good food. Live music.</b>
                <p>Signature mocktails, family dinners and evenings worth lingering over.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick facts strip */}
        <ul className="strip" aria-label="At a glance">
          {["Pure vegetarian", "Jain on request", "Live music evenings", "Banquets and parties", "Valet parking", "Air-conditioned"].map((t) => (
            <li key={t}><LeafIcon />{t}</li>
          ))}
        </ul>

        {/* About */}
        <section id="about" className="section" aria-labelledby="about-title">
          <div className="wrap">
            <SectionTitle label="Our story" id="about-title" title={<>Dinner under the<br /><em>Rialto Bridge</em></>}>
              <p className="intro">
                Rosmarinus brings a slice of Venice to Pal Gam: tall Roman columns, a hand-drawn Rialto Bridge across
                the main dining hall, and garden windows that glow at dusk. It’s a place for long lunches, family
                dinners and evenings that run late.
              </p>
            </SectionTitle>
            <figure className="story-img" data-reveal>
              <Image
                src="/images/mural.jpg"
                alt="The hand-drawn Rialto Bridge mural between the Roman columns of the main dining hall"
                width={1220}
                height={370}
                sizes="(max-width: 1240px) 100vw, 1180px"
              />
              <figcaption>The Rialto Bridge mural in our main dining hall</figcaption>
            </figure>

            <div className="philosophy" data-reveal>
              <div>
                <span className="pill">Our kitchen</span>
                <h3>Vegetarian, without compromise</h3>
              </div>
              <div className="philo-text">
                <p>
                  Everything that leaves our kitchen is vegetarian, and Jain versions of most dishes are made on
                  request. From creamy pastas and mezze boards to chargrilled paneer tikka and sizzlers, every
                  plate is cooked to order.
                </p>
                <ul className="ticks">
                  {features.slice(0, 4).map((f) => <li key={f}>{f}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="tiles" aria-hidden="true">
          <TilePattern id="tile-strip" />
        </div>

        {/* Menu */}
        <section id="menu" className="section soft" aria-labelledby="menu-title">
          <div className="wrap center">
            <SectionTitle label="Our menu" id="menu-title" title="One menu, many kitchens">
              <p className="intro">Everything is vegetarian, and Jain versions are made on request.</p>
            </SectionTitle>
            <div className="kitchens" data-reveal>
              {kitchens.map((k) => (
                <a key={k} href={site.menuUrl} {...ext}>
                  <span>{k}</span>
                  <ArrowIcon />
                </a>
              ))}
            </div>
            <a className="btn btn-teal" href={site.menuUrl} {...ext}>Open the full menu <ArrowIcon /></a>
          </div>
        </section>

        {/* Signature plates */}
        <section className="section pattern" aria-labelledby="plates-title">
          <div className="wrap">
            <SectionTitle label="Our specialities" id="plates-title" title={<>Taste the best of<br /><em>Rosmarinus</em></>} />
            <div className="plates">
              {plates.map((p) => (
                <figure className="plate" key={p.name} data-reveal>
                  <div className="plate-img">
                    <Image
                      src={p.image}
                      alt={p.alt}
                      width={p.width}
                      height={p.height}
                      sizes="200px"
                      style={{ objectPosition: p.position }}
                    />
                  </div>
                  <figcaption>
                    <span className="cat">{p.cuisine}</span>
                    <span className="name">{p.name}</span>
                    <span className="desc">{p.description}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Evenings */}
        <section id="evenings" className="section" aria-labelledby="eve-title">
          <div className="wrap split">
            <div className="round-img" data-reveal>
              <Image
                src="/images/mocktail.jpg"
                alt="A layered blue and green signature mocktail with a citrus garnish, against evening lights"
                width={830}
                height={940}
                sizes="(max-width: 760px) 86vw, 480px"
              />
            </div>
            <div className="split-copy" data-reveal>
              <span className="pill">After sunset</span>
              <h2 id="eve-title" className="h2">Evenings with <em>live music</em></h2>
              <p>
                Evenings bring live music to the lounge, signature mocktails to the table, and big matches to the
                screen. Bring the family; kids are welcome.
              </p>
              <a className="btn btn-teal" href="#book">Reserve for tonight</a>
            </div>
          </div>
        </section>

        {/* Banquets */}
        <section id="banquets" className="banquet" aria-labelledby="banq-title">
          <div className="banquet-tiles" aria-hidden="true">
            <TilePattern id="tile-banquet" />
          </div>
          <div className="wrap banquet-inner" data-reveal>
            <div>
              <span className="pill pill-gold">Celebrations</span>
              <h2 id="banq-title" className="h2">Celebrate life’s <em>special moments</em></h2>
              <p>
                We host birthdays, anniversaries and office dinners with a set banquet menu. Tell us the date and
                number of guests and we’ll share the packages.
              </p>
              <div className="actions">
                <a className="btn btn-gold" href="#book-event">Banquet enquiry</a>
                <a className="btn btn-ghost" href={whatsappLink(banquetMsg)} {...ext}><WhatsAppIcon /> Ask on WhatsApp</a>
              </div>
            </div>
            <ul className="banquet-list">
              <li><b>Set banquet menus</b><span>Vegetarian and Jain options for every guest</span></li>
              <li><b>Birthdays and anniversaries</b><span>Send us the date and guest count for packages</span></li>
              <li><b>Office and family dinners</b><span>Lunch or dinner, open every day</span></li>
            </ul>
          </div>
        </section>

        {/* What we offer */}
        <section className="section" aria-labelledby="offer-title">
          <div className="wrap">
            <SectionTitle label="Rosmarinus Restro" id="offer-title" title="What we offer" />
            <div className="offers">
              {offers.map((o) => (
                <article className="offer" key={o.title} data-reveal>
                  <Image
                    src={o.image}
                    alt={o.alt}
                    width={o.width}
                    height={o.height}
                    sizes="(max-width: 700px) 100vw, 580px"
                    style={{ objectPosition: o.position }}
                  />
                  <div className="offer-body">
                    <h3>{o.title}</h3>
                    <p>{o.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="section soft" aria-labelledby="gallery-title">
          <div className="wrap">
            <SectionTitle label="Gallery" id="gallery-title" title="A look inside" />
          </div>
          <Gallery />
          <p className="center-link">
            <a href={site.instagram} {...ext}><InstagramIcon /> More photos on Instagram {site.instagramHandle}</a>
          </p>
        </section>

        {/* Reviews */}
        <section className="section" aria-labelledby="reviews-title">
          <div className="wrap">
            <SectionTitle label="The Rosmarinus experience" id="reviews-title" title={<>Good food,<br /><em>great evenings</em></>} />
            {reviews.length > 0 ? (
              <div className="reviews">
                {reviews.map((r) => (
                  <figure className="review" key={r.name} data-reveal>
                    <div className="stars" aria-hidden="true">{[0, 1, 2, 3, 4].map((i) => <StarIcon key={i} />)}</div>
                    <blockquote>{r.text}</blockquote>
                    <figcaption>
                      <span className="avatar" aria-hidden="true">{r.name.charAt(0)}</span>
                      <span><b>{r.name}</b><small>via {r.source}</small></span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="review-cta" data-reveal>
                <div className="stars" aria-hidden="true">{[0, 1, 2, 3, 4].map((i) => <StarIcon key={i} />)}</div>
                <p>Been to Rosmarinus? Read what other guests say, or tell us how your evening went.</p>
                <a className="btn btn-teal" href={site.mapsUrl} {...ext}>Reviews on Google <ArrowIcon /></a>
              </div>
            )}
          </div>
        </section>

        {/* Visit */}
        <section id="visit" className="section soft" aria-labelledby="visit-title">
          <div className="wrap">
            <SectionTitle label="Visit us" id="visit-title" title="Plan your visit" />
            <div className="visit-cols" data-reveal>
              <div className="vcol">
                <span className="vicon"><PinIcon /></span>
                <h3>Find us</h3>
                <p>{site.address.full}</p>
                <a href={site.mapsUrl} {...ext}>Get directions</a>
              </div>
              <div className="vcol">
                <span className="vicon"><PhoneIcon /></span>
                <h3>Call or WhatsApp</h3>
                <p><a className="big" href={`tel:${site.phone}`}>{site.phoneDisplay}</a></p>
                <a href={whatsappLink("Hello Rosmarinus Restro,")} {...ext}>Message on WhatsApp</a>
              </div>
              <div className="vcol">
                <span className="vicon"><ClockIcon /></span>
                <h3>Open every day</h3>
                <p>Lunch {site.hours.lunch.label}<br />Dinner {site.hours.dinner.label}</p>
                <a href={site.instagram} {...ext}>{site.instagramHandle}</a>
              </div>
            </div>

            <div className="locate" data-reveal>
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
          </div>
        </section>

        {/* Booking */}
        <section id="book" className="section" aria-labelledby="book-title">
          <span id="book-event" className="anchor" aria-hidden="true" />
          <div className="wrap book">
            <div className="book-copy" data-reveal>
              <span className="pill">Reservations</span>
              <h2 id="book-title" className="h2">Book a table <em>or an event</em></h2>
              <p className="intro">Fill this in and WhatsApp opens with your message ready to send. We reply to confirm.</p>
              <p className="intro small">
                Prefer to talk? Call <a href={`tel:${site.phone}`}>{site.phoneShort}</a>.
              </p>
              <ul className="ticks">
                {features.slice(2).map((f) => <li key={f}>{f}</li>)}
              </ul>
            </div>
            <div className="book-card" data-reveal>
              <BookingForm />
            </div>
          </div>
        </section>

        {/* Closing call to action */}
        <section className="wrap cta" aria-labelledby="cta-title">
          <div className="cta-card" data-reveal>
            <Image src="/images/sizzler.jpg" alt="" width={930} height={715} sizes="(max-width: 1240px) 100vw, 1180px" />
            <div className="cta-body">
              <h2 id="cta-title" className="h2">Come, sit back and stay a while</h2>
              <p>
                Whether it’s lunch, dinner, a family gathering or a celebration, Rosmarinus welcomes you to relax,
                enjoy good food and make yourself at home.
              </p>
              <div className="actions">
                <a className="btn btn-gold" href="#book">Book a table</a>
                <a className="btn btn-ghost" href={`tel:${site.phone}`}><PhoneIcon /> Call us</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap foot">
          <div className="foot-brand">
            <a className="brand" href="#top" aria-label="Rosmarinus Restro, back to top">
              <Image src="/images/logo-gold.png" alt="" width={44} height={57} />
              <span className="brand-name"><b>Rosmarinus</b><span>Restro</span></span>
            </a>
            <p>
              A pure vegetarian restaurant near Baghban Circle, Pal Gam, Surat, serving Italian, Lebanese,
              Continental, North Indian and Chinese dishes, with live music in the evenings.
            </p>
            <div className="socials">
              <a href={site.instagram} {...ext} aria-label="Instagram"><InstagramIcon /></a>
              <a href={whatsappLink("Hello Rosmarinus Restro,")} {...ext} aria-label="WhatsApp"><WhatsAppIcon /></a>
              <a href={`tel:${site.phone}`} aria-label="Call"><PhoneIcon /></a>
            </div>
          </div>
          <nav className="foot-col" aria-label="Footer">
            <h3>Explore</h3>
            <a href="#about">About</a>
            <a href={site.menuUrl} {...ext}>Menu</a>
            <a href="#gallery">Gallery</a>
            <a href="#book-event">Banquet enquiry</a>
            <a href="#book">Book a table</a>
          </nav>
          <div className="foot-col">
            <h3>Hours</h3>
            <p>Lunch<br /><b>{site.hours.lunch.label}</b></p>
            <p>Dinner<br /><b>{site.hours.dinner.label}</b></p>
            <p>Open every day</p>
          </div>
          <div className="foot-col">
            <h3>Contact</h3>
            <p>{site.address.full}</p>
            <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
            <a href={site.mapsUrl} {...ext}>Directions</a>
          </div>
        </div>
        <div className="foot-bottom">
          <div className="wrap">
            <small>© {new Date().getFullYear()} Rosmarinus Restro, Surat. All rights reserved.</small>
          </div>
        </div>
      </footer>

      <div className="quickbar">
        <a className="btn btn-line" href={`tel:${site.phone}`}><PhoneIcon /> Call</a>
        <a className="btn btn-teal" href="#book">Book a table</a>
      </div>
    </>
  );
}
