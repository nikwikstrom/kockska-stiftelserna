import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><p className="eyebrow">404 / Sidan finns inte</p><h1>Vi hittar inte sidan du söker.</h1><p>Adressen kan ha ändrats. Gå tillbaka till startsidan och välj en väg vidare.</p><Link className="dark-button" href="/">Till startsidan ↗</Link></main>;
}
