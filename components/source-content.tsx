// This input is local build-time content, extracted through an HTML allowlist.
// Never use this component to render user input or remote runtime responses.
export function sourceHeadings(html: string) {
  return [...html.matchAll(/<h2>([\s\S]*?)<\/h2>/g)].map((match, index) => ({ id: `avsnitt-${index + 1}`, label: match[1].replace(/<[^>]*>/g, "") }));
}
export function SourceContent({ html }: { html: string }) {
  let index = 0;
  const content = html.replace(/<h2>/g, () => `<h2 id="avsnitt-${++index}">`);
  return <div className="prose-content" dangerouslySetInnerHTML={{ __html: content }} />;
}
