import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const siteUrl = "https://estatehub-3xnl.onrender.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "EstateHub — A clearer way to explore a move",
    template: "%s | EstateHub",
  },
  description:
    "Explore a polished, fictional UK property discovery demo with illustrative homes, local guides, saved searches and planning tools.",
  applicationName: "EstateHub",
  icons: { icon: "/favicon.svg" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "EstateHub",
    title: "EstateHub — A clearer way to explore a move",
    description: "A fictional UK property-discovery demo built around considered decisions.",
    images: [
      {
        url: "/images/alder-house.jpg",
        width: 1800,
        height: 1200,
        alt: "Illustrative red-brick home used in the EstateHub demo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EstateHub — A clearer way to explore a move",
    description: "A fictional UK property-discovery demo built around considered decisions.",
    images: ["/images/alder-house.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f4f0e8",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        <div id="main-content">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
