"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({
  content,
  className = "",
}: MarkdownRendererProps) {
  // Parse markdown-like syntax manually for safe inline formatting
  const parseMarkdown = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const boldRegex = /\*\*([^*]+)\*\*/g;

    const parts: { type: "text" | "link"; content?: string; text?: string; url?: string }[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    // 🔗 Handle links first
    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        const before = text.slice(lastIndex, match.index);
        parts.push({ type: "text", content: before });
      }

      parts.push({ type: "link", text: match[1], url: match[2] });
      lastIndex = match.index + match[0].length;
    }

    // Add remaining text (if any)
    if (lastIndex < text.length) {
      parts.push({ type: "text", content: text.slice(lastIndex) });
    }

    // 🧩 Process bold text inside text segments
    const processed = parts.map((part) => {
      if (part.type === "text" && part.content) {
        return {
          ...part,
          content: part.content.replace(boldRegex, "<strong>$1</strong>"),
        };
      }
      return part;
    });

    return processed;
  };

  // 🪶 Split by double newlines into paragraphs
  const paragraphs = content.split(/\n{2,}/);
  const parsedContent = paragraphs.map((p) => parseMarkdown(p.trim()));

  return (
    <div className={cn("space-y-4 text-sm leading-relaxed", className)}>
      {parsedContent.map((paragraphParts, paragraphIndex) => (
        <div key={paragraphIndex} className="space-y-2">
          {paragraphParts.map((part, index) => {
            if (part.type === "link" && part.text && part.url) {
              return (
                <a
                  key={index}
                  href={part.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  {part.text}
                </a>
              );
            }

            // Safely render inline HTML for bold + line breaks
            return (
              <div
                key={index}
                className="whitespace-pre-line text-foreground"
                dangerouslySetInnerHTML={{
                  __html: part.content?.replace(/\n/g, "<br />") ?? "",
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
