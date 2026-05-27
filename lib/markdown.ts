import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

marked.setOptions({ breaks: true, gfm: true });

const SAFE_URL_SCHEMES = ["http", "https", "mailto"];

const FAQ_SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ["p", "br", "b", "strong", "i", "em", "a", "ul", "ol", "li"],
  allowedAttributes: { a: ["href", "rel", "target"] },
  allowedSchemes: SAFE_URL_SCHEMES,
  allowedSchemesAppliedToAttributes: ["href"],
  allowProtocolRelative: false,
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer", target: "_blank" }),
  },
};

export function renderFaqAnswer(source: string): string {
  const rawHtml = marked.parse(source, { async: false }) as string;
  return sanitizeHtml(rawHtml, FAQ_SANITIZE_OPTIONS);
}

const BLOG_SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "p", "br", "hr",
    "b", "strong", "i", "em", "u",
    "a",
    "ul", "ol", "li",
    "h2", "h3", "h4", "h5",
    "blockquote",
    "code", "pre",
    "img",
  ],
  allowedAttributes: {
    a: ["href", "rel", "target"],
    img: ["src", "alt", "title", "loading"],
  },
  allowedSchemes: SAFE_URL_SCHEMES,
  allowedSchemesAppliedToAttributes: ["href", "src"],
  allowProtocolRelative: false,
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer", target: "_blank" }),
    img: sanitizeHtml.simpleTransform("img", { loading: "lazy" }),
  },
};

export function renderBlogBody(html: string): string {
  return sanitizeHtml(html, BLOG_SANITIZE_OPTIONS);
}
