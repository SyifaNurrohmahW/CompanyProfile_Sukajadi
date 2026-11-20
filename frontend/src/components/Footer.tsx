import Link from "next/link";

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Col 1: Brand Info */}
          <div>
            <div className="footer-brand">
              <img
                src="/images/logo.png"
                alt="Logo Sukajadi"
                className="footer-logo-img"
              />
              <div>
                <h3 className="footer-title">Sukajadi</h3>
                <p className="footer-subtitle">Coffee &amp; Brew</p>
              </div>
            </div>
            <p className="footer-text">
              Ruang hangat untuk menikmati secangkir kopi berkualitas, obrolan
              santai, dan suasana tenang di jantung Kota Madiun. Didirikan pada
              tahun 2026 oleh Masbre &amp; Mbak Popy.
            </p>
            <div style={{ marginTop: "1rem" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "0.25rem 0.75rem",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "#2e2621",
                  color: "#d88a65",
                  border: "1px solid #4a3d34",
                }}
              >
                Est. 2026 · Kota Madiun
              </span>
            </div>
          </div>

          {/* Col 2: Lokasi */}
          <div>
            <h4 className="footer-heading">Lokasi Kedai</h4>
            <p className="footer-text" style={{ marginBottom: "0.875rem" }}>
              Jl. Sumatera No.24, Madiun Lor, Kec. Manguharjo, Kota Madiun, Jawa
              Timur 63122
            </p>
            <a
              href="https://maps.google.com/?q=Jl.+Sumatera+No.24,+Madiun+Lor,+Kec.+Manguharjo,+Kota+Madiun,+Jawa+Timur+63122"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
              style={{ color: "#d88a65", fontWeight: 600 }}
            >
              <i className="pi pi-external-link" />
              <span>Buka Google Maps</span>
            </a>
          </div>

          {/* Col 3: Jam Operasional */}
          <div>
            <h4 className="footer-heading">Jam Operasional</h4>
            <ul className="footer-list">
              <li className="footer-list-row">
                <span>Senin – Kamis</span>
                <span style={{ color: "#ffffff", fontWeight: 600 }}>
                  09:00 – 23:00
                </span>
              </li>
              <li className="footer-list-row">
                <span>Jumat – Sabtu</span>
                <span style={{ color: "#ffffff", fontWeight: 600 }}>
                  09:00 – 00:00
                </span>
              </li>
              <li className="footer-list-row">
                <span>Minggu</span>
                <span style={{ color: "#ffffff", fontWeight: 600 }}>
                  09:00 – 23:00
                </span>
              </li>
            </ul>
            <div
              style={{
                marginTop: "1rem",
                fontSize: "0.75rem",
                color: "#998b7d",
                lineHeight: 1.6,
              }}
            >
              <p>✔ Indoor AC &amp; Outdoor Sejuk</p>
              <p>✔ Free WiFi &amp; Stopkontak WFC</p>
            </div>
          </div>

          {/* Col 4: Kontak & Social Media */}
          <div>
            <h4 className="footer-heading">Hubungi Kami</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                <i className="pi pi-instagram" style={{ color: "#d88a65" }} />
                <span>@sukajadi.coffee</span>
              </a>
              <a href="mailto:sukajadicoffee@gmail.com" className="footer-link">
                <i className="pi pi-envelope" style={{ color: "#d88a65" }} />
                <span>sukajadicoffee@gmail.com</span>
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                <i className="pi pi-whatsapp" style={{ color: "#d88a65" }} />
                <span>+62 812-3456-7890</span>
              </a>
              <Link
                href="/rekap"
                className="footer-link"
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.8125rem",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                <span>Lihat Data Penjualan Sukajadi →</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© 2026 Sukajadi Coffee and Brew. All rights reserved.</p>
          <p>
            Proyek Magang D3 Teknik Informatika · Politeknik Negeri Madiun (PNM)
          </p>
        </div>
      </div>
    </footer>
  );
}
