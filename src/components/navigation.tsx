"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingCart, MessageCircle, Bell, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Compare", href: "/", icon: ShoppingCart },
  { name: "Chat", href: "/chat", icon: MessageCircle },
  { name: "Alerts", href: "/alerts", icon: Bell },
  { name: "Docs", href: "/docs", icon: BookOpen },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* 🛒 Left side: Logo + navigation links */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2 group">
              <Image
                src="/logo.png"
                alt="OptiBuy Logo"
                width={32}
                height={32}
                priority
                className="h-8 w-8 object-contain transition-transform group-hover:scale-105"
              />
              <span className="text-xl font-bold tracking-tight">OptiBuy</span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* 🌗 Right side: Theme toggle + sign-in button */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="outline" size="sm" className="hidden sm:flex">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
