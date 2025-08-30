import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/blog/Header";
import Footer from "@/components/blog/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Data Blog - A Data Scientist's Journey",
  description: "Exploring data science, machine learning, and mathematics through code and equations.",
  keywords: ["data science", "machine learning", "mathematics", "blog", "LaTeX"],
  authors: [{ name: "Data Scientist" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable}`}
        style={{ 
          WebkitFontSmoothing: 'antialiased',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Header />
        <main style={{ flexGrow: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
