"use client"

import React from 'react'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  // Function to parse markdown-style links [text](url) and handle line breaks
  const parseMarkdown = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    const boldRegex = /\*\*([^*]+)\*\*/g
    const parts = []
    let lastIndex = 0
    let match

    // First, handle links
    while ((match = linkRegex.exec(text)) !== null) {
      // Add text before the link
      if (match.index > lastIndex) {
        const beforeText = text.slice(lastIndex, match.index)
        parts.push({ type: 'text', content: beforeText })
      }
      
      // Add the link
      parts.push({ 
        type: 'link', 
        text: match[1], 
        url: match[2] 
      })
      
      lastIndex = match.index + match[0].length
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({ type: 'text', content: text.slice(lastIndex) })
    }

    // Then process bold text in each part
    const processedParts = parts.map(part => {
      if (part.type === 'text') {
        return {
          ...part,
          content: part.content.replace(boldRegex, '<strong>$1</strong>')
        }
      }
      return part
    })

    return processedParts
  }

  // Split content by double newlines to create paragraphs
  const paragraphs = content.split('\n\n')
  const parsedContent = paragraphs.map(paragraph => parseMarkdown(paragraph.trim()))

  return (
    <div className={`${className} space-y-3`}>
      {parsedContent.map((paragraphParts, paragraphIndex) => (
        <div key={paragraphIndex} className="space-y-2">
          {paragraphParts.map((part, index) => {
            if (part.type === 'link') {
              return (
                <div key={index} className="mt-2">
                  <a
                    href={part.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    {part.text}
                  </a>
                </div>
              )
            } else {
              return (
                <div
                  key={index}
                  className="leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: part.content.replace(/\n/g, '<br />') 
                  }}
                />
              )
            }
          })}
        </div>
      ))}
    </div>
  )
}
