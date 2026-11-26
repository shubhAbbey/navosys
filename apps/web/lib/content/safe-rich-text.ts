export type SafeRichTextBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; items: string[] }
  | { type: "paragraph"; text: string };

/**
 * Parses controlled plain/markdown-like CMS text into safe structural blocks.
 * Strips raw HTML tags and disallows arbitrary scripts or inline event handlers.
 */
export function parseSafeRichText(raw: string): SafeRichTextBlock[] {
  const sanitized = raw.replace(/<[^>]*>/g, "");
  const lines = sanitized.split(/\r?\n/);

  const blocks: SafeRichTextBlock[] = [];
  let paragraphLines: string[] = [];
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (paragraphLines.length > 0) {
      blocks.push({
        type: "paragraph",
        text: paragraphLines.join(" ").trim(),
      });
      paragraphLines = [];
    }
  };

  const flushList = () => {
    if (listItems.length > 0) {
      blocks.push({ type: "list", items: [...listItems] });
      listItems = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading", level: 3, text: line.slice(4).trim() });
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading", level: 2, text: line.slice(3).trim() });
      continue;
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      flushParagraph();
      listItems.push(line.slice(2).trim());
      continue;
    }

    flushList();
    paragraphLines.push(line);
  }

  flushParagraph();
  flushList();

  return blocks;
}

/**
 * Validates CTA/link URLs against safe relative and web protocols.
 */
export function isSafeLinkUrl(url: string | null | undefined): boolean {
  if (!url) {
    return false;
  }
  const trimmed = url.trim();
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    return true;
  }
  return /^(https?:|mailto:|tel:)/i.test(trimmed);
}

const ALLOWED_VIDEO_EMBED_HOSTS = new Set([
  "www.youtube.com",
  "youtube.com",
  "www.youtube-nocookie.com",
  "player.vimeo.com",
]);

/**
 * Validates external video embed URLs against an explicit HTTPS origin allowlist.
 */
export function isAllowedVideoEmbedUrl(
  url: string | null | undefined
): boolean {
  if (!url) {
    return false;
  }
  try {
    const parsed = new URL(url.trim());
    return (
      parsed.protocol === "https:" &&
      ALLOWED_VIDEO_EMBED_HOSTS.has(parsed.hostname.toLowerCase())
    );
  } catch {
    return false;
  }
}
