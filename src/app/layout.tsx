import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Toaster } from "@/components/ui/sonner";

// ✅ Font setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Metadata (SEO + branding)
export const metadata: Metadata = {
  title: "OptiBuy - Your wallet's favorite algorithm",
  description:
    "Cross-platform price comparison with an AI-powered shopping assistant. Compare prices across Amazon, Temu, and Shein with smart analytics and predictions.",
};

// ✅ Root Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* ✅ Navigation bar */}
          <Navigation />

          {/* ✅ Main content */}
          <main className="min-h-screen bg-background text-foreground transition-colors">
            {children}
          </main>

          {/* ✅ Toast notifications (shadcn/sonner) */}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
