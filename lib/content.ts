import { siteContent } from "@/content/site";

export type HomepageContent = typeof siteContent;

// Sanity can replace this function without changing the page components.
export async function getHomepageContent(): Promise<HomepageContent> {
  return siteContent;
}
