"use client";

import { ProgressProvider } from "@/context/ProgressContext";
import { DataProvider } from "@/context/DataContext";
import { LearnSidebar } from "@/components/learn/LearnSidebar";
import { Navbar } from "@/components/shared/Navbar";

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProgressProvider>
      <DataProvider>
        <div className="flex flex-col h-screen">
          <Navbar />
          <div className="flex flex-1 overflow-hidden">
            <LearnSidebar />
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </div>
      </DataProvider>
    </ProgressProvider>
  );
}
