"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    setIsDark(initialDark);
    document.documentElement.classList.toggle("dark", initialDark);

    const handleScroll = () => {
      // Trigger when scrolled past hero section (roughly 400px)
      setIsScrolled(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? "header-scrolled" : ""}`}>
      <div className="container-custom">
        <div className="header-container">
          <Link href="/" className="logo">
            <svg
              className="logo-star"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 50 50"
              fill="currentColor"
            >
              <path d="M22.462 11.035l2.88 7.097c1.204 2.968 3.558 5.322 6.526 6.526l7.097 2.88c1.312.533 1.312 2.391 0 2.923l-7.097 2.88c-2.968 1.204-5.322 3.558-6.526 6.526l-2.88 7.097c-.533 1.312-2.391 1.312-2.923 0l-2.88-7.097c-1.204-2.968-3.558-5.322-6.526-6.526l-7.097-2.88c-1.312-.533-1.312-2.391 0-2.923l7.097-2.88c2.968-1.204 5.322-3.558 6.526-6.526l2.88-7.097C20.071 9.723 21.929 9.723 22.462 11.035zM39.945 2.701l.842 2.428c.664 1.915 2.169 3.42 4.084 4.084l2.428.842c.896.311.896 1.578 0 1.889l-2.428.842c-1.915.664-3.42 2.169-4.084 4.084l-.842 2.428c-.311.896-1.578.896-1.889 0l-.842-2.428c-.664-1.915-2.169-3.42-4.084-4.084l-2.428-.842c-.896-.311-.896-1.578 0-1.889l2.428-.842c1.915-.664 3.42-2.169 4.084-4.084l.842-2.428C38.366 1.805 39.634 1.805 39.945 2.701z" />
            </svg>
            <div className="logo-text">
              <span className="logo-neural">Neural</span>
              <span className="logo-node">Node</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav desktop-nav">
            <Link
              href="/"
              className={`nav-link ${isActive("/") ? "nav-link-active" : ""}`}
            >
              Home
            </Link>
            <Link
              href="/posts"
              className={`nav-link ${
                isActive("/posts") ? "nav-link-active" : ""
              }`}
            >
              Posts
            </Link>
            <Link
              href="/about"
              className={`nav-link ${
                isActive("/about") ? "nav-link-active" : ""
              }`}
            >
              About
            </Link>
            <Link
              href="/tags"
              className={`nav-link ${
                isActive("/tags") ? "nav-link-active" : ""
              }`}
            >
              Tags
            </Link>
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
            >
              {isDark ? (
                // Sun icon for light mode
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                // Moon icon for dark mode
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="hamburger-button"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`hamburger-line ${
                isMobileMenuOpen ? "hamburger-line-open" : ""
              }`}
            ></span>
            <span
              className={`hamburger-line ${
                isMobileMenuOpen ? "hamburger-line-open" : ""
              }`}
            ></span>
            <span
              className={`hamburger-line ${
                isMobileMenuOpen ? "hamburger-line-open" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav
          className={`mobile-nav ${isMobileMenuOpen ? "mobile-nav-open" : ""}`}
        >
          <div className="mobile-nav-content">
            <Link
              href="/"
              className={`mobile-nav-link ${
                isActive("/") ? "mobile-nav-link-active" : ""
              }`}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              href="/posts"
              className={`mobile-nav-link ${
                isActive("/posts") ? "mobile-nav-link-active" : ""
              }`}
              onClick={closeMobileMenu}
            >
              Posts
            </Link>
            <Link
              href="/about"
              className={`mobile-nav-link ${
                isActive("/about") ? "mobile-nav-link-active" : ""
              }`}
              onClick={closeMobileMenu}
            >
              About
            </Link>
            <Link
              href="/tags"
              className={`mobile-nav-link ${
                isActive("/tags") ? "mobile-nav-link-active" : ""
              }`}
              onClick={closeMobileMenu}
            >
              Tags
            </Link>
            <button
              onClick={() => {
                toggleTheme();
                closeMobileMenu();
              }}
              className="mobile-theme-toggle"
              aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
            >
              {isDark ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              )}
              <span>Toggle Theme</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
