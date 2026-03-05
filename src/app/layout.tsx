import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PostHogProvider } from "@/analytics/provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Cohort Analyser — Learn Growth Analytics by Doing",
    template: "%s | Cohort Analyser",
  },
  description:
    "Interactive lessons teaching cohort retention, growth accounting, and DAU forecasting through hands-on data visualization with real datasets. Free, no signup required.",
  keywords: [
    "cohort analysis",
    "retention heatmap",
    "growth accounting",
    "DAU forecasting",
    "product analytics",
    "retention curves",
    "quick ratio",
    "CMGR",
    "LTV curves",
    "product management",
  ],
  openGraph: {
    title: "Cohort Analyser — Learn Growth Analytics by Doing",
    description:
      "Interactive lessons teaching cohort retention, growth accounting, and DAU forecasting through hands-on data visualization.",
    type: "website",
    siteName: "Cohort Analyser",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cohort Analyser — Learn Growth Analytics by Doing",
    description:
      "Interactive lessons + real data. No signup. No paywall. Just learn.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light")document.documentElement.classList.remove("dark")}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <PostHogProvider>
          <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
