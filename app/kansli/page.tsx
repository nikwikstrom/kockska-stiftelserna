import { InteriorPage } from "@/components/interior-page";
import { ApplicationInbox } from "@/components/application-inbox";
export const metadata = { title: "Kansli | Kockska stiftelserna", robots: { index: false, follow: false } };
export default function InboxPage() {
  return <InteriorPage eyebrow="För handläggare" title="Kansliets inkorg." intro="Digitalt inlämnade ansökningar och deras bilagor."><ApplicationInbox /></InteriorPage>;
}
