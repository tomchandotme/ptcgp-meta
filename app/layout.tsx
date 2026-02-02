import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
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
  title: "PTCGP Meta | Pokemon TCG Pocket Meta Tracker",
  description:
    "Real-time meta data and deck statistics for Pokemon TCG Pocket. Track winning decks and competitive trends from Limitless TCG.",
  keywords: ["PTCGP", "Pokemon TCG Pocket", "Meta", "Decks", "Statistics"],
  authors: [{ name: "PTCGP Meta" }],
  openGraph: {
    title: "PTCGP Meta | Pokemon TCG Pocket Meta Tracker",
    description: "Track the competitive meta for Pokemon TCG Pocket.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background min-h-screen antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
