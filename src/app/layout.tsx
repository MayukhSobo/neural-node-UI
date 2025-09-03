import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/blog/Header";
import Footer from "@/components/blog/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeMetaTags from "@/components/ThemeMetaTags";

export const metadata: Metadata = {
  title: "Data Blog - A Data Scientist's Journey",
  description:
    "Exploring data science, machine learning, and mathematics through code and equations.",
  keywords: [
    "data science",
    "machine learning",
    "mathematics",
    "blog",
    "LaTeX",
  ],
  authors: [{ name: "Data Scientist" }],
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "msapplication-navbutton-color": "#f7f8fa",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // This ensures proper handling of iPhone notch/dynamic island
  themeColor: "#f7f8fa", // Initial light theme color - will be updated dynamically
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        style={{
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          textRendering: "optimizeLegibility",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ThemeProvider>
          <ThemeMetaTags />
          <Header />
          <main style={{ flexGrow: 1 }}>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
