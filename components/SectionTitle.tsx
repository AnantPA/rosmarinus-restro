// Small pill label, a display heading and a gold zigzag underline, used to open each section.
export default function SectionTitle({
  label,
  title,
  id,
  align = "center",
  children,
}: {
  label: string;
  title: React.ReactNode;
  id?: string;
  align?: "center" | "start";
  children?: React.ReactNode;
}) {
  return (
    <div className={`stitle${align === "start" ? " start" : ""}`} data-reveal>
      <span className="pill">{label}</span>
      <h2 id={id} className="h2">{title}</h2>
      <svg className="zigzag" viewBox="0 0 84 12" aria-hidden="true">
        <path d="M2 9 L9 3 L16 9 L23 3 L30 9 L37 3 L44 9 L51 3 L58 9 L65 3 L72 9 L79 3" />
      </svg>
      {children}
    </div>
  );
}
