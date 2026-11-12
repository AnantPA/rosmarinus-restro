// The cement-tile pattern from the restaurant floor, drawn as a repeating SVG.
export default function TilePattern({ id }: { id: string }) {
  return (
    <svg aria-hidden="true">
      <defs>
        <pattern id={id} width="64" height="64" patternUnits="userSpaceOnUse">
          <path
            d="M0 16A16 16 0 0 0 16 0M48 0a16 16 0 0 0 16 16M64 48a16 16 0 0 0-16 16M16 64A16 16 0 0 0 0 48"
            fill="none"
            stroke="var(--tile-line)"
            strokeWidth="1.2"
          />
          <path d="M32 14 L50 32 L32 50 L14 32 Z" fill="none" stroke="var(--tile-line)" strokeWidth="1.2" />
          <circle cx="32" cy="32" r="5" fill="none" stroke="var(--gold)" strokeWidth="1.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
