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

const BLOG_ALLOWED_TAGS = [
  "p", "br", "hr",
  "b", "strong", "i", "em", "u",
  "a",
  "ul", "ol", "li",
  "h2", "h3", "h4", "h5",
  "blockquote",
  "code", "pre",
  "img",
];
const BLOG_ALLOWED_ATTR = ["href", "rel", "target", "src", "alt", "title", "loading"];

export function renderBlogBody(html: string): string {
  const cleaned = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: BLOG_ALLOWED_TAGS,
    ALLOWED_ATTR: BLOG_ALLOWED_ATTR,
    ALLOWED_URI_REGEXP: /^(?:https?:|mailto:|\/)/i,
  });
  return cleaned
    .replace(/<a /g, '<a rel="noopener noreferrer" target="_blank" ')
    .replace(/<img /g, '<img loading="lazy" ');
}
