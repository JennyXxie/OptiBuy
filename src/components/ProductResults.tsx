"use client";

import React from "react";

// 🧱 Product type
export interface Product {
  title: string;
  price?: number | string;
  reason?: string;
  source?: string;
  url?: string;
}

// 🧱 Props type
interface ProductResultsProps {
  data?: {
    ai_summary?: string;
    recommendations?: Product[];
  };
}

/**
 * Renders the AI summary and product recommendations
 * in a visually clean card layout.
 */
export default function ProductResults({ data }: ProductResultsProps) {
  if (!data) return null;

  const { ai_summary, recommendations = [] } = data;

  return (
    <div className="p-4 text-sm text-gray-800">
      {/* 💬 AI summary */}
      {ai_summary && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
          <h2 className="font-semibold text-blue-800 mb-1">🤖 DealBot says:</h2>
          <p>{ai_summary}</p>
        </div>
      )}

      {/* 🛍️ Product cards */}
      <div className="grid gap-3">
        {recommendations.map((product, i) => (
          <div
            key={i}
            className="border rounded-xl p-3 bg-white shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{product.title}</h3>
              {product.price && (
                <span className="text-green-600 font-semibold">
                  ${product.price}
                </span>
              )}
            </div>

            {product.reason && (
              <p className="text-gray-600 mt-1 text-sm">{product.reason}</p>
            )}

            {product.source && (
              <p className="text-gray-400 text-xs mt-1">{product.source}</p>
            )}

            {product.url && (
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm mt-2 inline-block"
              >
                View Product →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
