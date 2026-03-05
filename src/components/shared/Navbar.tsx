"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LearnSidebar } from "@/components/learn/LearnSidebar";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="h-14 border-b border-border bg-card/80 backdrop-blur-sm flex items-center px-4 shrink-0 z-50">
      {/* Mobile menu */}
      <div className="lg:hidden mr-2">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <div onClick={() => setOpen(false)}>
              <LearnSidebar />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mr-8">
        <BarChart3 className="w-5 h-5 text-emerald" />
        <span className="font-semibold text-sm">Cohort Analyser</span>
      </Link>

      {/* Nav links */}
      <nav className="flex items-center gap-1 flex-1">
        <Link
          href="/learn/module-1/retention-heatmap"
          className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
            pathname.startsWith("/learn")
              ? "text-foreground font-medium"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Learn
        </Link>
        <Link
          href="/explore"
          className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
            pathname.startsWith("/explore")
              ? "text-foreground font-medium"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Explore
        </Link>
      </nav>

      <ThemeToggle />
    </header>
  );
}
