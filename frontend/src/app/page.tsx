"use client";

import Link from "next/link";

export default function HomePage() {
  const featuredMenus = [
    {
      kode: "M002",
      nama: "Kopi Susu Sukajadi - Palm Sugar",
      kategori: "Kopi",
      harga: "Rp 25.000",
      deskripsi:
        "Espresso mantap berpadu susu creamy dan gula aren organik khas Sukajadi. Menu terlaris pilihan warga Madiun.",
      badge: "Best Seller #1",
      icon: "pi pi-bolt",
    },
    {
      kode: "M006",
      nama: "Dirty Latte",
      kategori: "Kopi",
      harga: "Rp 25.000",
      deskripsi:
        "Susu dingin kental bertekstur lembut yang diguyur double shot espresso hangat. Rasa bold dan sensasi berlapis.",
      badge: "Signature",
      icon: "pi pi-star-fill",
    },
    {
      kode: "M026",
      nama: "Chicken Blackpepper",
      kategori: "Signature Meals",
      harga: "Rp 26.000",
      deskripsi:
        "Ayam fillet juicy berbalut saus lada hitam gurih pedas khas racikan dapur, disajikan dengan nasi hangat.",
      badge: "Top Meals",
      icon: "pi pi-heart-fill",
    },
    {
      kode: "M046",
      nama: "Ketan Susu",
      kategori: "Snack",
      harga: "Rp 15.000",
      deskripsi:
        "Ketan pulen hangat bertabur parutan kelapa gurih dan siraman susu kental manis. Teman pas menyeruput kopi.",
      badge: "Comfort Snack",
      icon: "pi pi-sun",
    },
  ];

  return (
    <main style={{ minHeight: "100vh" }}>
      {/* ============================================================ */}
      {/* 1. HERO SECTION                                              */}
      {/* ============================================================ */}
      <section style={{ backgroundColor: "var(--bg-page)", overflow: "hidden" }}>
        <div className="hero-wrapper">
          {/* Left Column: Headlines & Story */}
          <div className="anim-fade-up">
            <span className="eyebrow-text">GOOD COFFEE, BETTER COMPANY.</span>
            <h1 className="editorial-title">
              Enjoy Your Coffee,
              <br />
              Enjoy Your Space.
            </h1>
            <p className="editorial-desc">
              A little pause in your everyday. Come for a good cup, settle into
              your favorite corner, and make yourself at home. Ruang singgah
              hangat di jantung Kota Madiun untuk melepas penat dan berbagi cerita.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                alignItems: "center",
              }}
            >
              <Link href="/menu" className="btn-primary">
                <i className="pi pi-compass" />
                <span>Jelajahi Menu Kami</span>
              </Link>
              <a href="#lokasi" className="btn-secondary">
                <i className="pi pi-map-marker text-[#a85832]" />
                <span>Petunjuk Lokasi</span>
              </a>
            </div>

            {/* Quick trust metrics */}
            <div
              style={{
                marginTop: "2.5rem",
                paddingTop: "2rem",
                borderTop: "1px solid var(--border-light)",
                display: "flex",
                gap: "2.5rem",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    fontFamily: "var(--font-serif)",
                    color: "var(--text-primary)",
                  }}
                >
                  51+
                </div>
                <div
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--text-muted)",
                    marginTop: "0.25rem",
                  }}
                >
                  Variasi Menu & Minuman
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    fontFamily: "var(--font-serif)",
                    color: "var(--text-primary)",
                  }}
                >
                  2026
                </div>
                <div
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--text-muted)",
                    marginTop: "0.25rem",
                  }}
                >
                  Hadir di Kota Madiun
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    fontFamily: "var(--font-serif)",
                    color: "var(--text-primary)",
                  }}
                >
                  4.9★
                </div>
                <div
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--text-muted)",
                    marginTop: "0.25rem",
                  }}
                >
                  Kepuasan Pengunjung
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Coffee Shop Image with Floating Card */}
          <div className="anim-scale delay-2" style={{ position: "relative" }}>
            <div className="hero-image-box">
              <img
                src="/images/storefront.jpg"
                alt="Kedai Sukajadi Coffee and Brew Madiun"
                className="hero-main-img"
              />

              {/* Floating Badge Card (Matches Mockup) */}
              <div className="floating-badge anim-float">
                <div
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    marginBottom: "0.25rem",
                  }}
                >
                  YOUR DAILY COFFEE SPOT
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    lineHeight: 1.25,
                  }}
                >
                  Come in.
                  <br />
                  Stay a while.
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    marginTop: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.375rem",
                  }}
                >
                  <i className="pi pi-check-circle" style={{ color: "#16a34a" }} />
                  <span>Buka Setiap Hari · 09.00 - 23.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. SECTION KEDUA: KISAH, FILOSOFI & GOOGLE MAPS              */}
      {/* ============================================================ */}
      <section
        id="lokasi"
        style={{
          backgroundColor: "#ffffff",
          borderTop: "1px solid var(--border-light)",
          borderBottom: "1px solid var(--border-light)",
        }}
      >
        <div className="story-wrapper">
          {/* Left Column: Narrative of Sukajadi */}
          <div className="anim-fade-up">
            <span className="eyebrow-text">A WARM WELCOME, ALWAYS</span>
            <h2 className="section-title">
              More than a cup.
              <br />A place to belong.
            </h2>
            <div
              style={{
                fontSize: "1rem",
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                marginBottom: "1.5rem",
              }}
            >
              <p style={{ marginBottom: "1rem" }}>
                Didirikan pada awal <strong>2026</strong> oleh <strong>Masbre dan Mbak Popy</strong>,
                Sukajadi Coffee & Brew berawal dari impian sederhana: menghadirkan
                sebuah ruang singgah hangat di mana kopi bermutu tinggi bertemu
                dengan obrolan santai yang tulus.
              </p>
              <p>
                Bagi kami, kedai ini bukan sekadar tentang racikan biji kopi,
                melainkan ruang kebersamaan. Dari tegukan pertama Anda di pagi
                hari saat memulai pekerjaan, hingga cangkir penutup di malam
                hari bersama sahabat, kami di Sukajadi selalu menyediakan tempat
                yang nyaman untuk Anda.
              </p>
            </div>

            {/* 3 Value Pillars (Quality Beans, Cozy Space, Friendly Service) */}
            <div className="feature-badge-row">
              <div className="feature-badge-item">
                <div className="feature-icon-circle">
                  <i className="pi pi-sparkles" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9375rem" }}>
                    Quality Beans
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    Racikan kopi otentik & bahan segar
                  </div>
                </div>
              </div>

              <div className="feature-badge-item">
                <div className="feature-icon-circle">
                  <i className="pi pi-home" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9375rem" }}>
                    Cozy Space
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    Indoor sejuk & outdoor adem
                  </div>
                </div>
              </div>

              <div className="feature-badge-item">
                <div className="feature-icon-circle">
                  <i className="pi pi-heart" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9375rem" }}>
                    Friendly Service
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    Sambutan ramah dari hati
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Location Card */}
          <div className="map-card-container anim-fade-up delay-2">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--accent)",
                  }}
                >
                  LOKASI KEDAI
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    marginTop: "0.125rem",
                  }}
                >
                  Jl. Sumatera No.24, Madiun
                </h3>
              </div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  fontSize: "0.75rem",
                  backgroundColor: "#dcfce7",
                  color: "#15803d",
                  padding: "0.25rem 0.625rem",
                  borderRadius: "var(--radius-full)",
                  fontWeight: 600,
                }}
              >
                <i className="pi pi-circle-fill" style={{ fontSize: "0.5rem" }} />
                <span>Buka Hari Ini</span>
              </span>
            </div>

            {/* Embedded Google Maps */}
            <div className="map-iframe-wrap">
              <iframe
                title="Peta Lokasi Sukajadi Coffee and Brew"
                src="https://maps.google.com/maps?q=Jl.%20Sumatera%20No.24%2C%20Madiun%20Lor%2C%20Kec.%20Manguharjo%2C%20Kota%20Madiun%2C%20Jawa%20Timur%2063122&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Address Details & Action */}
            <div
              style={{
                marginTop: "1.25rem",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <div style={{ maxWidth: "22rem" }}>
                <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  Jl. Sumatera No.24, Madiun Lor, Kec. Manguharjo, Kota Madiun, Jawa Timur 63122
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=Jl.+Sumatera+No.24,+Madiun+Lor,+Kec.+Manguharjo,+Kota+Madiun,+Jawa+Timur+63122"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ padding: "0.625rem 1.25rem", fontSize: "0.8125rem" }}
              >
                <i className="pi pi-external-link" />
                <span>Buka di Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. SECTION MENU TEASER: "Find your favorite."               */}
      {/* ============================================================ */}
      <section className="menu-teaser-section">
        <div style={{ maxWidth: "1280px", margin: "0 auto", textAlign: "left" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "1.5rem",
            }}
          >
            <div>
              <span className="eyebrow-text">BREWED WITH CARE, SERVED WITH LOVE</span>
              <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>
                Find your favorite.
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
                Familiar comforts, a few new favorites, and something for every kind of day.
              </p>
            </div>
            <Link href="/menu" className="btn-secondary">
              <span>Lihat Seluruh 51 Menu</span>
              <i className="pi pi-arrow-right" />
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="menu-card-grid">
            {featuredMenus.map((item, idx) => (
              <div key={item.kode} className={`menu-item-card anim-fade-up delay-${idx + 1}`}>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.6875rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        backgroundColor: "var(--accent-light)",
                        color: "var(--accent)",
                        padding: "0.25rem 0.625rem",
                        borderRadius: "var(--radius-full)",
                      }}
                    >
                      {item.badge}
                    </span>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        fontWeight: 600,
                      }}
                    >
                      {item.kode}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      lineHeight: 1.3,
                      color: "var(--text-primary)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item.nama}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                      marginBottom: "1.25rem",
                    }}
                  >
                    {item.deskripsi}
                  </p>
                </div>

                <div
                  style={{
                    paddingTop: "1rem",
                    borderTop: "1px dashed var(--border-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 700,
                      color: "var(--accent)",
                      fontFamily: "var(--font-serif)",
                    }}
                  >
                    {item.harga}
                  </span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                      backgroundColor: "var(--bg-page)",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
                    {item.kategori}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. SECTION REKAPAN DATA PREVIEW (Integrasi Fullstack)        */}
      {/* ============================================================ */}
      <section style={{ backgroundColor: "var(--bg-page)", padding: "5rem 1.5rem" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "var(--radius-xl)",
            padding: "clamp(2rem, 4vw, 3.5rem)",
            border: "1px solid var(--border-light)",
            boxShadow: "var(--shadow-md)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2.5rem",
            alignItems: "center",
          }}
        >
          <div>
            <span className="eyebrow-text">TRANSPARANSI & ANALITIKA DATA</span>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 700,
                lineHeight: 1.25,
                marginBottom: "1rem",
              }}
            >
              Pantau Rekapan Penjualan & Performa Kedai
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Website Company Profile ini dilengkapi dengan modul <strong>Rekapan Data</strong> interaktif
              yang diolah langsung melalui Express Backend API, menyajikan data performa 51 menu,
              tren penjualan 31 hari, serta rekapitulasi kategori.
            </p>
            <Link href="/rekap" className="btn-primary">
              <i className="pi pi-chart-bar" />
              <span>Buka Dashboard Rekap Data</span>
            </Link>
          </div>

          {/* Quick Stat Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1.25rem",
            }}
          >
            <div
              style={{
                backgroundColor: "var(--bg-page)",
                padding: "1.5rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-light)",
              }}
            >
              <div style={{ color: "var(--accent)", fontSize: "1.25rem", marginBottom: "0.5rem" }}>
                <i className="pi pi-wallet" />
              </div>
              <div style={{ fontSize: "1.35rem", fontWeight: 700, fontFamily: "var(--font-serif)" }}>
                Rp 121,2 Jt
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                Total Omzet Oktober 2026
              </div>
            </div>

            <div
              style={{
                backgroundColor: "var(--bg-page)",
                padding: "1.5rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-light)",
              }}
            >
              <div style={{ color: "var(--accent)", fontSize: "1.25rem", marginBottom: "0.5rem" }}>
                <i className="pi pi-shopping-bag" />
              </div>
              <div style={{ fontSize: "1.35rem", fontWeight: 700, fontFamily: "var(--font-serif)" }}>
                5.209 Unit
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                Total Item Terjual
              </div>
            </div>

            <div
              style={{
                backgroundColor: "var(--bg-page)",
                padding: "1.5rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-light)",
              }}
            >
              <div style={{ color: "var(--accent)", fontSize: "1.25rem", marginBottom: "0.5rem" }}>
                <i className="pi pi-th-large" />
              </div>
              <div style={{ fontSize: "1.35rem", fontWeight: 700, fontFamily: "var(--font-serif)" }}>
                11 Kategori
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                Kopi, Non-Kopi, Meals, dll
              </div>
            </div>

            <div
              style={{
                backgroundColor: "var(--bg-page)",
                padding: "1.5rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-light)",
              }}
            >
              <div style={{ color: "var(--accent)", fontSize: "1.25rem", marginBottom: "0.5rem" }}>
                <i className="pi pi-database" />
              </div>
              <div style={{ fontSize: "1.35rem", fontWeight: 700, fontFamily: "var(--font-serif)" }}>
                1.448 Baris
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                Rincian Transaksi Harian
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
