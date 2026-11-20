"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Rekap Data", href: "/rekap" },
  ];

  return (
    <header className="main-navbar">
      <div className="navbar-inner">
        {/* Brand: Logo + Sukajadi Title */}
        <Link href="/" className="navbar-brand">
          <img
            src="/images/logo.png"
            alt="Logo Sukajadi"
            className="navbar-logo-img"
          />
          <div className="navbar-brand-text">
            <span className="navbar-title">Sukajadi</span>
            <span className="navbar-subtitle">Coffee &amp; Brew</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar-nav-desktop">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`navbar-nav-link ${isActive ? "active" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Location Action */}
        <div className="navbar-action-desktop">
          <a
            href="https://maps.google.com/?q=Jl.+Sumatera+No.24,+Madiun+Lor,+Kec.+Manguharjo,+Kota+Madiun,+Jawa+Timur+63122"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-location-btn"
          >
            <i className="pi pi-map-marker" style={{ color: "var(--accent)" }} />
            <span>Madiun Lor</span>
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          <i className={`pi ${mobileMenuOpen ? "pi-times" : "pi-bars"}`} />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-drawer">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`navbar-mobile-link ${isActive ? "active" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href="https://maps.google.com/?q=Jl.+Sumatera+No.24,+Madiun+Lor,+Kec.+Manguharjo,+Kota+Madiun,+Jawa+Timur+63122"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
          >
            <i className="pi pi-map-marker" />
            <span>Petunjuk Lokasi Google Maps</span>
          </a>
        </div>
      )}
    </header>
  );
}
