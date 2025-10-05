"use client";

import Image from "next/image";
import { Search, TrendingDown, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/90 to-background" />

      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* 🪄 Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.png"
              alt="OptiBuy Logo"
              width={80}
              height={80}
              priority
              className="h-20 w-20 object-contain drop-shadow-sm"
            />
          </div>

          {/* 🧠 Headline */}
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
            Your wallet&apos;s{" "}
            <span className="text-primary">favorite algorithm</span>
          </h1>

          {/* ✍️ Subtext */}
          <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Compare prices across Amazon, Temu, and Shein with AI-powered
            insights. Never overpay again with smart analytics and personalized
            recommendations.
          </p>

          {/* 🔍 Search bar */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for products..."
                className="pl-10 h-12 text-base"
              />
            </div>
            <Button size="lg" className="h-12 px-8">
              Compare Prices
            </Button>
          </div>

          {/* 💡 Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <FeatureCard
              icon={<TrendingDown className="h-8 w-8 text-primary mx-auto mb-3" />}
              title="Price History"
              text="6-month price tracking with drop predictions"
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-primary mx-auto mb-3" />}
              title="AI DealBot"
              text="Personalized shopping assistant"
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-primary mx-auto mb-3" />}
              title="Smart Alerts"
              text="Notify when prices drop to your target"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* 🧩 Small subcomponent for reusable feature cards */
function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <Card className="border-2 hover:border-primary/50 hover:shadow-sm transition-all duration-200">
      <CardContent className="p-6 text-center">
        {icon}
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{text}</p>
      </CardContent>
    </Card>
  );
}
