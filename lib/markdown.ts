import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = ["p", "br", "b", "strong", "i", "em", "a", "ul", "ol", "li"];
const ALLOWED_ATTR = ["href", "rel", "target"];

marked.setOptions({ breaks: true, gfm: true });

export function renderFaqAnswer(source: string): string {
  const rawHtml = marked.parse(source, { async: false }) as string;
  const cleaned = DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOWED_URI_REGEXP: /^(?:https?:|mailto:|\/)/i,
  });
  return cleaned.replace(/<a /g, '<a rel="noopener noreferrer" target="_blank" ');
}
