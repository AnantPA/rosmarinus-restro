export const site = {
  name: "Rosmarinus Restro",
  url: "https://www.rosmarinusrestro.com", // TODO: replace with the real domain
  description:
    "Pure vegetarian Italian, Lebanese, Continental, North Indian and Chinese dishes near Baghban Circle, Pal Gam, Surat. Live music in the evenings. Book a table on WhatsApp.",
  phone: "+919904144470",
  phoneDisplay: "+91 99041 44470",
  phoneShort: "99041 44470",
  whatsapp: "919904144470",
  instagram: "https://instagram.com/rosmarinusrestro",
  instagramHandle: "@rosmarinusrestro",
  menuUrl: "https://linktr.ee/rosmarinusrestro",
  mapsUrl: "https://maps.app.goo.gl/U69VhBhkeGPr6Zjy5",
  // Google's own "Share > Embed a map" format, pinned to the Rosmarinus Restro listing.
  // To refresh it: open the listing in Google Maps > Share > Embed a map > copy only the src="..." value here.
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1200!2d72.77105!3d21.1924602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04dde65e74bb9%3A0xd3c1c8dcd1dc65c0!2sRosmarinus%20Restro!5e0!3m2!1sen!2sin!4v1731400000000!5m2!1sen!2sin",
  address: {
    street: "Gaurav Path Road, opposite Tea Post Desi Cafe, near Baghban Circle",
    area: "Pal Gam",
    city: "Surat",
    region: "Gujarat",
    postalCode: "394510",
    country: "IN",
    full: "Gaurav Path Road, opposite Tea Post Desi Cafe, near Baghban Circle, Pal Gam, Surat 394510",
  },
  geo: { lat: 21.1924602, lng: 72.77105 },
  // TODO: confirm opening hours with the restaurant
  hours: {
    lunch: { label: "12 noon – 3 pm", opens: "12:00", closes: "15:00" },
    dinner: { label: "7 pm – 11 pm", opens: "19:00", closes: "23:00" },
  },
};

export const kitchens = [
  "Italian",
  "Lebanese",
  "Continental",
  "North Indian",
  "Chinese",
  "Desserts and drinks",
];

export const plates = [
  {
    cuisine: "Italian",
    name: "Penne in tomato and basil",
    description: "Tube pasta tossed in a rich red sauce and finished with fresh basil.",
    image: "/images/penne.jpg",
    width: 464,
    height: 320,
    alt: "Penne in a rich tomato sauce topped with fresh basil",
    position: "50% 50%",
  },
  {
    cuisine: "Lebanese",
    name: "Mezze platter",
    description: "Falafel, warm pita and lavash with hummus, beetroot dip and fresh salad.",
    image: "/images/mezze.jpg",
    width: 1200,
    height: 874,
    alt: "A wooden board of falafel, warm pita and small bowls of dips and salad",
    position: "40% 50%",
  },
  {
    cuisine: "North Indian",
    name: "Green paneer tikka",
    description: "Paneer in a herb marinade, chargrilled and served with a smoky chilli sauce.",
    image: "/images/tikka.jpg",
    width: 1200,
    height: 1043,
    alt: "Chargrilled green paneer tikka on a white plate with a brushed chilli sauce",
    position: "40% 45%",
  },
  {
    cuisine: "Chinese",
    name: "Fried rice sizzler",
    description: "Vegetable fried rice with crisp dumplings, served hot on a sizzler plate.",
    image: "/images/sizzler.jpg",
    width: 930,
    height: 715,
    alt: "Vegetable fried rice with crisp dumplings on a sizzler plate",
    position: "50% 50%",
  },
];

export const features = [
  "Pure vegetarian kitchen",
  "Jain food on request",
  "Air-conditioned dining",
  "Valet parking",
  "Wheelchair accessible",
  "Take-away",
];

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
