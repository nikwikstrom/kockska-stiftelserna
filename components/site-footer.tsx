import type { HomepageContent } from "@/lib/content";
import Image from "next/image";

export function SiteFooter({ contact }: { contact: HomepageContent["contact"] }) {
  return (
    <footer id="kontakt" className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="eyebrow">Kontakt</p>
          <h2>Vi hjälper dig vidare.</h2>
        </div>
        <div className="footer-contact">
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
          <address>{contact.address[0]}<br />{contact.address[1]}</address>
          <p>Besök efter överenskommelse.</p>
        </div>
      </div>
      <div className="shell footer-bottom"><span>© {new Date().getFullYear()} Kockska stiftelserna</span><span>Ett arv som fortfarande gör skillnad.</span></div>
      <div className="shell footer-brand">
        <div className="footer-brand-signature">
          <Image
            className="footer-engraving-pair"
            src="/images/illustrations/kock-engraving-pair.jpg"
            alt="Illustrerad tolkning av Greta och Johan Kock"
            width={2304}
            height={1728}
            sizes="(max-width: 760px) 48vw, 18rem"
          />
          <Image
            className="footer-wordmark"
            src="/brand/kockska-wordmark-navy.svg"
            alt="Greta och Johan Kocks stiftelser"
            width={411}
            height={50}
          />
        </div>
      </div>
    </footer>
  );
}
