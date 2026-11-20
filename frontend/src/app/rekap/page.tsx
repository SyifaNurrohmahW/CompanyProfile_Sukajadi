"use client";

import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function RekapPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "harian" | "menu" | "kategori" | "transaksi" | "keterangan"
  >("overview");

  // Data states
  const [overview, setOverview] = useState<any>(null);
  const [harian, setHarian] = useState<any[]>([]);
  const [menu, setMenu] = useState<any[]>([]);
  const [kategori, setKategori] = useState<any[]>([]);
  const [keterangan, setKeterangan] = useState<any[]>([]);

  // Transaksi pagination state
  const [transaksiData, setTransaksiData] = useState<any[]>([]);
  const [transaksiTotal, setTransaksiTotal] = useState<number>(0);
  const [transaksiPage, setTransaksiPage] = useState<number>(1);
  const [transaksiLimit, setTransaksiLimit] = useState<number>(15);
  const [transaksiSearch, setTransaksiSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch initial data
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [resOver, resHar, resMen, resKat, resKet] = await Promise.all([
          fetch(`${apiUrl}/api/rekap/overview`).then((r) => r.json()),
          fetch(`${apiUrl}/api/rekap/harian`).then((r) => r.json()),
          fetch(`${apiUrl}/api/rekap/menu`).then((r) => r.json()),
          fetch(`${apiUrl}/api/rekap/kategori`).then((r) => r.json()),
          fetch(`${apiUrl}/api/rekap/keterangan`).then((r) => r.json()),
        ]);

        if (resOver.success) setOverview(resOver.data);
        if (resHar.success) setHarian(resHar.data);
        if (resMen.success) setMenu(resMen.data);
        if (resKat.success) setKategori(resKat.data);
        if (resKet.success) setKeterangan(resKet.data);
      } catch (err) {
        console.error("Gagal memuat rekap:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Fetch transaksi when page/search changes
  useEffect(() => {
    async function loadTransaksi() {
      try {
        const query = new URLSearchParams({
          page: String(transaksiPage),
          limit: String(transaksiLimit),
          search: transaksiSearch,
        });
        const res = await fetch(`${apiUrl}/api/rekap/transaksi?${query.toString()}`).then((r) => r.json());
        if (res.success) {
          setTransaksiData(res.data);
          setTransaksiTotal(res.pagination.totalCount);
        }
      } catch (err) {
        console.error("Gagal memuat transaksi:", err);
      }
    }
    loadTransaksi();
  }, [transaksiPage, transaksiLimit, transaksiSearch]);

  const tabs = [
    { id: "overview", label: "Ringkasan Eksekutif", icon: "pi-chart-line" },
    { id: "harian", label: "Rekap Harian (31 Hari)", icon: "pi-calendar" },
    { id: "menu", label: "Performa 51 Menu", icon: "pi-list" },
    { id: "kategori", label: "Kategori Produk", icon: "pi-th-large" },
    { id: "transaksi", label: "Detail Transaksi (1.448 Baris)", icon: "pi-database" },
    { id: "keterangan", label: "Catatan Simulasi", icon: "pi-info-circle" },
  ];

  return (
    <main style={{ minHeight: "85vh", padding: "3.5rem 1.5rem 5rem", backgroundColor: "var(--bg-page)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <span className="eyebrow-text">MODUL ANALITIKA & LAPORAN</span>
          <h1 className="editorial-title" style={{ marginBottom: "0.5rem" }}>
            Rekapan Data Sukajadi
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
            Laporan data penjualan kopi, makanan, dan performa harian periode 1–31 Oktober 2026.
          </p>
        </div>

        {/* Sub-menu Tabs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.625rem",
            marginBottom: "2rem",
            padding: "0.5rem",
            backgroundColor: "#ffffff",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-light)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.625rem 1.25rem",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  borderRadius: "var(--radius-full)",
                  border: isActive ? "1px solid var(--accent)" : "1px solid transparent",
                  backgroundColor: isActive ? "var(--accent)" : "transparent",
                  color: isActive ? "#ffffff" : "var(--text-secondary)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <i className={`pi ${tab.icon}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Section */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "5rem 0", color: "var(--text-muted)" }}>
            <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem", color: "var(--accent)" }} />
            <p style={{ marginTop: "1rem" }}>Memuat rekapan data dari backend Express...</p>
          </div>
        ) : (
          <div>
            {/* SUB 1: OVERVIEW */}
            {activeTab === "overview" && overview && (
              <div style={{ display: "grid", gap: "2rem" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "1.5rem",
                  }}
                >
                  <div style={{ backgroundColor: "#ffffff", padding: "1.75rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--accent)" }}>TOTAL PENDAPATAN / OMZET</div>
                    <div style={{ fontSize: "2rem", fontWeight: 700, fontFamily: "var(--font-serif)", marginTop: "0.5rem" }}>
                      Rp {overview.indikator["Total pendapatan/omzet"].toLocaleString("id-ID")}
                    </div>
                    <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>Periode {overview.indikator["Periode"]}</div>
                  </div>

                  <div style={{ backgroundColor: "#ffffff", padding: "1.75rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--accent)" }}>TOTAL UNIT TERJUAL</div>
                    <div style={{ fontSize: "2rem", fontWeight: 700, fontFamily: "var(--font-serif)", marginTop: "0.5rem" }}>
                      {overview.indikator["Total unit terjual"].toLocaleString("id-ID")} Unit
                    </div>
                    <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>Rata-rata {overview.statistik.rataRataItemHarian} unit / hari</div>
                  </div>

                  <div style={{ backgroundColor: "#ffffff", padding: "1.75rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--accent)" }}>RATA-RATA OMZET HARIAN</div>
                    <div style={{ fontSize: "2rem", fontWeight: 700, fontFamily: "var(--font-serif)", marginTop: "0.5rem" }}>
                      Rp {overview.statistik.rataRataOmzetHarian.toLocaleString("id-ID")}
                    </div>
                    <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>Dihitung dari {overview.statistik.totalHari} hari operasional</div>
                  </div>

                  <div style={{ backgroundColor: "#ffffff", padding: "1.75rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--accent)" }}>VARIASI MENU AKTIF</div>
                    <div style={{ fontSize: "2rem", fontWeight: 700, fontFamily: "var(--font-serif)", marginTop: "0.5rem" }}>
                      {overview.indikator["Jumlah jenis menu pada daftar"]} Jenis
                    </div>
                    <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>1.448 baris transaksi tercatat</div>
                  </div>
                </div>

                {/* Top 3 Best Seller Banner */}
                <div style={{ backgroundColor: "#ffffff", padding: "2rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)" }}>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.35rem", marginBottom: "1rem" }}>
                     3 Menu Paling Diminati Pengunjung
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
                    {overview.statistik.topMenu.map((m: any, idx: number) => (
                      <div key={m.kodeMenu} style={{ padding: "1rem 1.25rem", backgroundColor: "var(--bg-page)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)" }}>
                        <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent)" }}>Rank #{idx + 1} ({m.kategori})</div>
                        <div style={{ fontWeight: 700, fontSize: "1.05rem", marginTop: "0.25rem" }}>{m.namaMenu}</div>
                        <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", marginTop: "0.5rem", display: "flex", justifyContent: "space-between" }}>
                          <span>Terjual: <strong>{m.totalTerjual} cup</strong></span>
                          <span>Omzet: <strong>Rp {m.totalPendapatan.toLocaleString("id-ID")}</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SUB 2: REKAP HARIAN */}
            {activeTab === "harian" && (
              <div style={{ backgroundColor: "#ffffff", padding: "1.5rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)" }}>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "1rem" }}>
                  Tabel Rekapan Penjualan Harian (31 Hari)
                </h3>
                <DataTable value={harian} responsiveLayout="scroll" paginator rows={10} className="p-datatable-sm">
                  <Column field="tanggal" header="Tanggal" sortable />
                  <Column field="totalItemTerjual" header="Item Terjual" sortable body={(row) => `${row.totalItemTerjual} item`} />
                  <Column field="totalPendapatan" header="Total Omzet (Rp)" sortable body={(row) => `Rp ${row.totalPendapatan.toLocaleString("id-ID")}`} />
                  <Column field="jumlahJenisMenuTerjual" header="Variasi Menu Terjual" sortable body={(row) => `${row.jumlahJenisMenuTerjual} jenis menu`} />
                </DataTable>
              </div>
            )}

            {/* SUB 3: PERFORMA MENU */}
            {activeTab === "menu" && (
              <div style={{ backgroundColor: "#ffffff", padding: "1.5rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)" }}>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "1rem" }}>
                  Tabel Ranking & Performa 51 Menu
                </h3>
                <DataTable value={menu} responsiveLayout="scroll" paginator rows={12} className="p-datatable-sm">
                  <Column field="kodeMenu" header="Kode" sortable style={{ width: "90px" }} />
                  <Column field="kategori" header="Kategori" sortable body={(row) => <Tag value={row.kategori} severity="info" />} />
                  <Column field="namaMenu" header="Nama Menu" sortable />
                  <Column field="hargaSatuan" header="Harga" sortable body={(row) => `Rp ${row.hargaSatuan.toLocaleString("id-ID")}`} />
                  <Column field="totalTerjual" header="Total Terjual" sortable body={(row) => `${row.totalTerjual} unit`} />
                  <Column field="totalPendapatan" header="Total Omzet" sortable body={(row) => `Rp ${row.totalPendapatan.toLocaleString("id-ID")}`} />
                  <Column field="hariTerjual" header="Hari Aktif" sortable body={(row) => `${row.hariTerjual} hari`} />
                </DataTable>
              </div>
            )}

            {/* SUB 4: KATEGORI */}
            {activeTab === "kategori" && (
              <div style={{ backgroundColor: "#ffffff", padding: "1.5rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)" }}>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "1rem" }}>
                  Agregasi Penjualan Berdasarkan Kategori Menu
                </h3>
                <DataTable value={kategori} responsiveLayout="scroll" className="p-datatable-sm">
                  <Column field="kategori" header="Kategori Menu" sortable />
                  <Column field="jumlahMenu" header="Jumlah Menu" sortable body={(row) => `${row.jumlahMenu} menu`} />
                  <Column field="totalTerjual" header="Total Item Terjual" sortable body={(row) => `${row.totalTerjual} unit`} />
                  <Column field="totalPendapatan" header="Total Omzet (Rp)" sortable body={(row) => `Rp ${row.totalPendapatan.toLocaleString("id-ID")}`} />
                  <Column field="persentasePendapatan" header="Kontribusi Omzet" sortable body={(row) => <strong>{row.persentasePendapatan}%</strong>} />
                </DataTable>
              </div>
            )}

            {/* SUB 5: DETAIL TRANSAKSI */}
            {activeTab === "transaksi" && (
              <div style={{ backgroundColor: "#ffffff", padding: "1.5rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)" }}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem" }}>
                      Detail 1.448 Baris Penjualan Menu-Harian
                    </h3>
                    <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                      Menampilkan halaman {transaksiPage} (Total {transaksiTotal} transaksi)
                    </p>
                  </div>
                  <input
                    type="text"
                    placeholder="Cari transaksi..."
                    value={transaksiSearch}
                    onChange={(e) => {
                      setTransaksiSearch(e.target.value);
                      setTransaksiPage(1);
                    }}
                    style={{
                      padding: "0.5rem 1rem",
                      borderRadius: "var(--radius-full)",
                      border: "1px solid var(--border-light)",
                      fontSize: "0.875rem",
                      outline: "none",
                    }}
                  />
                </div>

                <DataTable value={transaksiData} responsiveLayout="scroll" className="p-datatable-sm">
                  <Column field="tanggal" header="Waktu Transaksi" body={(row) => row.tanggal.split(" ")[0]} />
                  <Column field="kodeMenu" header="Kode" />
                  <Column field="kategori" header="Kategori" />
                  <Column field="namaMenu" header="Nama Menu" />
                  <Column field="hargaSatuan" header="Harga" body={(row) => `Rp ${row.hargaSatuan.toLocaleString("id-ID")}`} />
                  <Column field="jumlahTerjual" header="Qty" />
                  <Column field="totalPenjualan" header="Total" body={(row) => `Rp ${row.totalPenjualan.toLocaleString("id-ID")}`} />
                </DataTable>

                {/* Pagination Controls */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.5rem" }}>
                  <button
                    disabled={transaksiPage <= 1}
                    onClick={() => setTransaksiPage((p) => Math.max(1, p - 1))}
                    style={{
                      padding: "0.5rem 1rem",
                      fontSize: "0.8125rem",
                      borderRadius: "var(--radius-full)",
                      border: "1px solid var(--border-light)",
                      backgroundColor: transaksiPage <= 1 ? "var(--bg-page)" : "#ffffff",
                      cursor: transaksiPage <= 1 ? "not-allowed" : "pointer",
                    }}
                  >
                    ← Sebelumnya
                  </button>
                  <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                    Halaman <strong>{transaksiPage}</strong> dari {Math.ceil(transaksiTotal / transaksiLimit)}
                  </span>
                  <button
                    disabled={transaksiPage >= Math.ceil(transaksiTotal / transaksiLimit)}
                    onClick={() => setTransaksiPage((p) => p + 1)}
                    style={{
                      padding: "0.5rem 1rem",
                      fontSize: "0.8125rem",
                      borderRadius: "var(--radius-full)",
                      border: "1px solid var(--border-light)",
                      backgroundColor: transaksiPage >= Math.ceil(transaksiTotal / transaksiLimit) ? "var(--bg-page)" : "#ffffff",
                      cursor: transaksiPage >= Math.ceil(transaksiTotal / transaksiLimit) ? "not-allowed" : "pointer",
                    }}
                  >
                    Berikutnya →
                  </button>
                </div>
              </div>
            )}

            {/* SUB 6: KETERANGAN */}
            {activeTab === "keterangan" && (
              <div style={{ backgroundColor: "#ffffff", padding: "2rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)" }}>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "1.25rem" }}>
                  Keterangan & Metadata Simulasi Data
                </h3>
                <div style={{ display: "grid", gap: "1rem" }}>
                  {keterangan.map((item, idx) => (
                    <div key={idx} style={{ padding: "1rem 1.25rem", backgroundColor: "var(--bg-page)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)" }}>
                      <div style={{ fontWeight: 700, color: "var(--accent)", fontSize: "0.875rem" }}>{item.keterangan}</div>
                      <div style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", marginTop: "0.25rem", lineHeight: 1.6 }}>{item.penjelasan}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
