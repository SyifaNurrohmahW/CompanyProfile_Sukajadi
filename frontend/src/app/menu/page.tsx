"use client";

import { useEffect, useRef, useState } from "react";

interface MenuItem {
  kodeMenu: string;
  kategori: string;
  namaMenu: string;
  hargaSatuan: number;
  totalTerjual: number;
  totalPendapatan: number;
}

const TOTAL_PAGES = 22;

const CATEGORIES = [
  { name: "Cover Depan", page: 1, icon: "pi-book" },
  { name: "Kopi Susu Sukajadi", page: 2, icon: "pi-bolt" },
  { name: "Dirty Latte", page: 3, icon: "pi-star" },
  { name: "Americano", page: 4, icon: "pi-circle" },
  { name: "Latte & Cappucino", page: 5, icon: "pi-coffee" },
  { name: "Mont Blanc", page: 6, icon: "pi-sparkles" },
  { name: "Morefun", page: 7, icon: "pi-heart" },
  { name: "Non-Kopi", page: 8, icon: "pi-apple" },
  { name: "Milk Base", page: 9, icon: "pi-filter" },
  { name: "Tea Series", page: 10, icon: "pi-sun" },
  { name: "Signature Meals", page: 11, icon: "pi-tag" },
  { name: "Beef Special", page: 12, icon: "pi-star-fill" },
  { name: "Spaghetti", page: 13, icon: "pi-box" },
  { name: "Snack & Platter", page: 14, icon: "pi-th-large" },
  { name: "Dimsum Keju", page: 15, icon: "pi-check" },
  { name: "Terong Raos", page: 16, icon: "pi-sparkles" },
  { name: "Pasta Macaroni", page: 17, icon: "pi-bookmark" },
  { name: "Pastry & Croissant", page: 18, icon: "pi-gift" },
  { name: "Chips & Cheese", page: 19, icon: "pi-compass" },
  { name: "Ketan Susu", page: 20, icon: "pi-star" },
  { name: "Menu Nusantara", page: 21, icon: "pi-flag" },
  { name: "Noodle Selection", page: 22, icon: "pi-bars" },
];

export default function MenuPage() {
  const [viewMode, setViewMode] = useState<"book" | "catalog">("book");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFlipping, setIsFlipping] = useState<"forward" | "backward" | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Catalog list state
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [catalogKategori, setCatalogKategori] = useState<string[]>([]);
  const [selectedKategori, setSelectedKategori] = useState<string>("all");
  const [catalogSearch, setCatalogSearch] = useState<string>("");
  const [catalogLoading, setCatalogLoading] = useState<boolean>(true);

  const bookContainerRef = useRef<HTMLDivElement>(null);

  // Screen size check for mobile/desktop layout
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch catalog data from backend API
  useEffect(() => {
    async function fetchMenu() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
        const res = await fetch(`${apiUrl}/api/rekap/menu`);
        const json = await res.json();
        if (json.success && json.data) {
          setMenuList(json.data);
          const cats = Array.from(new Set(json.data.map((m: MenuItem) => m.kategori))) as string[];
          setCatalogKategori(["all", ...cats]);
        }
      } catch (err) {
        console.error("Gagal memuat katalog menu:", err);
      } finally {
        setCatalogLoading(false);
      }
    }
    fetchMenu();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (viewMode !== "book") return;
      if (e.key === "ArrowRight" || e.key === " ") {
        turnPage("next");
      } else if (e.key === "ArrowLeft") {
        turnPage("prev");
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, viewMode, isMobile]);

  // Web Audio API Synthesized Paper Flip Sound
  function playPaperSound() {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const bufferSize = ctx.sampleRate * 0.12;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1750;
      filter.Q.value = 0.9;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.14, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    } catch {
      // Audio context error or autoplay policy
    }
  }

  // Turn Page function (Step by 2 on desktop spreads, step by 1 on mobile)
  function turnPage(direction: "next" | "prev") {
    if (isFlipping) return;

    if (direction === "next") {
      let target: number;
      if (isMobile) {
        target = Math.min(TOTAL_PAGES, currentPage + 1);
      } else {
        if (currentPage === 1) target = 2;
        else target = Math.min(TOTAL_PAGES, currentPage + 2);
      }

      if (target !== currentPage) {
        setIsFlipping("forward");
        playPaperSound();
        setTimeout(() => {
          setCurrentPage(target);
          setIsFlipping(null);
        }, 320);
      }
    } else {
      let target: number;
      if (isMobile) {
        target = Math.max(1, currentPage - 1);
      } else {
        if (currentPage === 2) target = 1;
        else target = Math.max(1, currentPage - 2);
      }

      if (target !== currentPage) {
        setIsFlipping("backward");
        playPaperSound();
        setTimeout(() => {
          setCurrentPage(target);
          setIsFlipping(null);
        }, 320);
      }
    }
  }

  // Jump to specific category page
  function jumpToPage(targetPage: number) {
    if (targetPage === currentPage || isFlipping) return;
    const direction = targetPage > currentPage ? "forward" : "backward";
    setIsFlipping(direction);
    playPaperSound();
    setTimeout(() => {
      // On desktop, keep pairs aligned (even number on left, odd on right, or page 1 solo)
      if (!isMobile && targetPage > 1 && targetPage % 2 !== 0 && targetPage !== TOTAL_PAGES) {
        setCurrentPage(targetPage - 1);
      } else {
        setCurrentPage(targetPage);
      }
      setIsFlipping(null);
    }, 280);
  }

  // Toggle fullscreen mode
  function toggleFullscreen() {
    if (!bookContainerRef.current) return;
    if (!document.fullscreenElement) {
      bookContainerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }

  // Determine current spread pages
  const isCover = !isMobile && currentPage === 1;
  const isBackCover = !isMobile && currentPage >= TOTAL_PAGES;
  const leftPageNum = isCover ? null : isBackCover ? TOTAL_PAGES - 1 : currentPage % 2 === 0 ? currentPage : currentPage - 1;
  const rightPageNum = isCover ? 1 : isBackCover ? TOTAL_PAGES : (leftPageNum ? leftPageNum + 1 : currentPage);

  // Active category detection
  const currentCategoryObj = CATEGORIES.slice().reverse().find((c) => c.page <= currentPage) || CATEGORIES[0];

  // Filtered catalog
  const filteredCatalog = menuList.filter((item) => {
    const matchCat = selectedKategori === "all" || item.kategori.toLowerCase() === selectedKategori.toLowerCase();
    const matchSearch =
      item.namaMenu.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      item.kodeMenu.toLowerCase().includes(catalogSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main style={{ minHeight: "90vh", padding: "2.5rem 1.5rem 5rem", backgroundColor: "var(--bg-page)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header Title & Subtitle */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span className="eyebrow-text">BUKU MENU RESMI · SUKAJADI COFFEE &amp; BREW</span>
          <h1 className="editorial-title" style={{ marginBottom: "0.5rem" }}>
            Jelajahi Menu Kami
          </h1>
          <p className="editorial-desc" style={{ margin: "0 auto" }}>
            Rasakan sensasi membuka buku menu fisik Sukajadi lembar demi lembar dengan foto sajian asli dan harga resmi.
          </p>

          {/* Mode Switcher Tabs */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#ffffff",
              padding: "0.375rem",
              borderRadius: "var(--radius-full)",
              border: "1px solid var(--border-light)",
              boxShadow: "var(--shadow-sm)",
              marginTop: "1.75rem",
            }}
          >
            <button
              onClick={() => setViewMode("book")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.625rem 1.35rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                borderRadius: "var(--radius-full)",
                border: "none",
                backgroundColor: viewMode === "book" ? "var(--accent)" : "transparent",
                color: viewMode === "book" ? "#ffffff" : "var(--text-secondary)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <i className="pi pi-book" />
              <span>Buku Menu 3D (Flipbook)</span>
            </button>
            <button
              onClick={() => setViewMode("catalog")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.625rem 1.35rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                borderRadius: "var(--radius-full)",
                border: "none",
                backgroundColor: viewMode === "catalog" ? "var(--accent)" : "transparent",
                color: viewMode === "catalog" ? "#ffffff" : "var(--text-secondary)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <i className="pi pi-list" />
              <span>Katalog &amp; Pencarian Cepat</span>
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* VIEW MODE 1: INTERACTIVE 3D FLIPBOOK BOOK                     */}
        {/* ============================================================ */}
        {viewMode === "book" && (
          <div ref={bookContainerRef} style={{ width: "100%" }}>
            {/* Category Quick Jump Pills Bar */}
            <div className="category-pills-bar">
              {CATEGORIES.map((cat) => {
                const isSelected = currentCategoryObj.name === cat.name;
                return (
                  <button
                    key={cat.page}
                    onClick={() => jumpToPage(cat.page)}
                    className={`cat-pill-btn ${isSelected ? "active" : ""}`}
                    title={`Lompat ke ${cat.name} (Halaman ${cat.page})`}
                  >
                    <i className={`pi ${cat.icon}`} style={{ fontSize: "0.75rem" }} />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>

            {/* The 3D Book Stage */}
            <div className="flipbook-scene">
              <div
                className={`book-spread-wrapper ${
                  isFlipping === "forward"
                    ? "flipping-layer-forward"
                    : isFlipping === "backward"
                    ? "flipping-layer-backward"
                    : ""
                }`}
              >
                {/* Mobile Single Page View */}
                {isMobile ? (
                  <div className="book-page-half" style={{ width: "100%", borderRadius: "var(--radius-lg)" }}>
                    <img
                      src={`/menu-pages/page-${currentPage}.jpg`}
                      alt={`Halaman ${currentPage}`}
                      className="book-page-img"
                    />
                  </div>
                ) : (
                  /* Desktop / Tablet Two-Page Spread View */
                  <>
                    {/* Left Page */}
                    <div
                      className="book-page-half left-page"
                      onClick={() => turnPage("prev")}
                      style={{ cursor: currentPage > 1 ? "pointer" : "default" }}
                      title="Klik untuk membuka halaman sebelumnya"
                    >
                      {isCover ? (
                        /* Inside Left Cover when closed */
                        <div
                          style={{
                            textAlign: "center",
                            color: "#8c7f73",
                            padding: "2rem",
                            fontSize: "0.875rem",
                          }}
                        >
                          <img
                            src="/images/logo.png"
                            alt="Logo"
                            style={{
                              width: "70px",
                              height: "70px",
                              borderRadius: "50%",
                              opacity: 0.35,
                              marginBottom: "1rem",
                            }}
                          />
                          <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", color: "#beb2a4" }}>
                            Sukajadi Coffee &amp; Brew
                          </p>
                          <p style={{ fontSize: "0.75rem", color: "#6e6155", marginTop: "0.25rem" }}>
                            Buku Menu Edisi Resmi 2026
                          </p>
                        </div>
                      ) : (
                        leftPageNum && (
                          <img
                            src={`/menu-pages/page-${leftPageNum}.jpg`}
                            alt={`Halaman ${leftPageNum}`}
                            className="book-page-img"
                          />
                        )
                      )}
                    </div>

                    {/* Book Spine Crease Shadow */}
                    <div className="book-spine-crease" />

                    {/* Right Page */}
                    <div
                      className="book-page-half right-page"
                      onClick={() => turnPage("next")}
                      style={{ cursor: currentPage < TOTAL_PAGES ? "pointer" : "default" }}
                      title="Klik untuk membuka halaman berikutnya"
                    >
                      {rightPageNum && (
                        <img
                          src={`/menu-pages/page-${rightPageNum}.jpg`}
                          alt={`Halaman ${rightPageNum}`}
                          className="book-page-img"
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Interactive Bottom Control Toolbar */}
            <div className="book-toolbar">
              {/* Prev / Next Navigation */}
              <div className="toolbar-nav-group">
                <button
                  className="toolbar-btn"
                  onClick={() => turnPage("prev")}
                  disabled={currentPage <= 1 || isFlipping !== null}
                  title="Halaman Sebelumnya (Panah Kiri)"
                >
                  <i className="pi pi-chevron-left" />
                </button>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    {isMobile
                      ? `Halaman ${currentPage}`
                      : isCover
                      ? "Cover Depan"
                      : `Halaman ${leftPageNum} – ${rightPageNum}`}{" "}
                    <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>/ {TOTAL_PAGES}</span>
                  </span>
                  <span style={{ fontSize: "0.6875rem", color: "var(--accent)", fontWeight: 600 }}>
                    {currentCategoryObj.name}
                  </span>
                </div>

                <button
                  className="toolbar-btn"
                  onClick={() => turnPage("next")}
                  disabled={currentPage >= TOTAL_PAGES || isFlipping !== null}
                  title="Halaman Selanjutnya (Panah Kanan / Spasi)"
                >
                  <i className="pi pi-chevron-right" />
                </button>
              </div>

              {/* Utility Tools: Sound, Fullscreen, Download PDF */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                {/* Audio Sound Toggle */}
                <button
                  className="toolbar-btn"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  title={soundEnabled ? "Matikan Efek Suara Lembaran Kertas" : "Nyalakan Efek Suara Lembaran Kertas"}
                >
                  <i className={`pi ${soundEnabled ? "pi-volume-up" : "pi-volume-off"}`} />
                </button>

                {/* Fullscreen Toggle */}
                <button
                  className="toolbar-btn"
                  onClick={toggleFullscreen}
                  title={isFullscreen ? "Keluar Layar Penuh" : "Mode Layar Penuh (Fullscreen)"}
                >
                  <i className={`pi ${isFullscreen ? "pi-window-minimize" : "pi-window-maximize"}`} />
                </button>

                {/* Direct PDF Download Link */}
                <a
                  href="/docs/menu-sukajadi.pdf"
                  target="_blank"
                  download="Menu-Sukajadi-Coffee.pdf"
                  className="btn-secondary"
                  style={{
                    padding: "0.5rem 1rem",
                    fontSize: "0.75rem",
                    boxShadow: "none",
                  }}
                  title="Unduh file PDF resmi Sukajadi Coffee"
                >
                  <i className="pi pi-download" style={{ color: "var(--accent)" }} />
                  <span>Unduh PDF</span>
                </a>
              </div>
            </div>

            {/* Quick UX Tip */}
            <div style={{ textAlign: "center", marginTop: "1.25rem", color: "var(--text-muted)", fontSize: "0.75rem" }}>
              <i className="pi pi-info-circle" style={{ marginRight: "0.35rem" }} />
              <span>
                Tips: Anda dapat membalik halaman dengan mengklik sisi kiri/kanan buku, atau menggunakan tombol panah{" "}
                <strong>←</strong> dan <strong>→</strong> pada keyboard.
              </span>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW MODE 2: CATALOG & SEARCH VIEW                           */}
        {/* ============================================================ */}
        {viewMode === "catalog" && (
          <div className="anim-fade">
            {/* Filter & Search Bar */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "2.5rem",
                backgroundColor: "#ffffff",
                padding: "1.25rem 1.5rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-light)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              {/* Category Pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {catalogKategori.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedKategori(cat)}
                    style={{
                      padding: "0.5rem 1rem",
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      borderRadius: "var(--radius-full)",
                      border: selectedKategori === cat ? "1px solid var(--accent)" : "1px solid var(--border-light)",
                      backgroundColor: selectedKategori === cat ? "var(--accent)" : "var(--bg-page)",
                      color: selectedKategori === cat ? "#ffffff" : "var(--text-secondary)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {cat === "all" ? "Semua Kategori" : cat}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div style={{ position: "relative", minWidth: "260px" }}>
                <input
                  type="text"
                  placeholder="Cari menu (misal: Dirty Latte)..."
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.625rem 1rem 0.625rem 2.25rem",
                    borderRadius: "var(--radius-full)",
                    border: "1px solid var(--border-light)",
                    backgroundColor: "var(--bg-page)",
                    fontSize: "0.875rem",
                    outline: "none",
                  }}
                />
                <i
                  className="pi pi-search"
                  style={{
                    position: "absolute",
                    left: "0.875rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                    fontSize: "0.875rem",
                  }}
                />
              </div>
            </div>

            {/* Catalog Grid */}
            {catalogLoading ? (
              <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-muted)" }}>
                <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem", color: "var(--accent)" }} />
                <p style={{ marginTop: "1rem" }}>Memuat katalog menu...</p>
              </div>
            ) : filteredCatalog.length === 0 ? (
              <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-muted)" }}>
                <i className="pi pi-search" style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "var(--text-muted)" }} />
                <p>Tidak ditemukan menu yang sesuai dengan pencarian "{catalogSearch}".</p>
              </div>
            ) : (
              <div className="menu-card-grid">
                {filteredCatalog.map((item) => (
                  <div key={item.kodeMenu} className="menu-item-card">
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "0.75rem",
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
                            padding: "0.2rem 0.5rem",
                            borderRadius: "var(--radius-full)",
                          }}
                        >
                          {item.kategori}
                        </span>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{item.kodeMenu}</span>
                      </div>

                      <h3
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.15rem",
                          fontWeight: 700,
                          color: "var(--text-primary)",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {item.namaMenu}
                      </h3>
                    </div>

                    <div
                      style={{
                        paddingTop: "1rem",
                        borderTop: "1px dashed var(--border-light)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
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
                        Rp {item.hargaSatuan.toLocaleString("id-ID")}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        Terjual: {item.totalTerjual}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
