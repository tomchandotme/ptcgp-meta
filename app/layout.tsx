import type { Metadata } from "next";
import { Archivo_Narrow, IBM_Plex_Mono, Source_Sans_3 } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import "./globals.css";

const archivoNarrow = Archivo_Narrow({
  variable: "--font-archivo-narrow",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ptcg-pocket-meta.vercel.app/"), // Placeholder, typically replaced with actual domain
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
  twitter: {
    card: "summary_large_image",
    title: "PTCGP Meta | Pokemon TCG Pocket Meta Tracker",
    description: "Track the competitive meta for Pokemon TCG Pocket.",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${archivoNarrow.variable} ${sourceSans.variable} ${plexMono.variable} bg-background min-h-screen antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>
            <Header />
            {children}
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}
