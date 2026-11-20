import app from "../app.js";

const server = app.listen(4001, async () => {
  console.log("Testing server listening on 4001...");
  try {
    const endpoints = [
      "/api/health",
      "/api/rekap/overview",
      "/api/rekap/harian",
      "/api/rekap/menu?limit=5",
      "/api/rekap/kategori",
      "/api/rekap/transaksi?page=1&limit=5",
      "/api/rekap/keterangan",
    ];

    for (const ep of endpoints) {
      const res = await fetch(`http://localhost:4001${ep}`);
      const json = await res.json();
      console.log(`[STATUS ${res.status}] ${ep} => success:`, (json as any).success ?? (json as any).status);
      if (ep === "/api/rekap/overview") {
        console.log("  -> Total Omzet:", json.data.indikator["Total pendapatan/omzet"]);
        console.log("  -> Top Menu:", json.data.statistik.topMenu.map((m: any) => m.namaMenu).join(", "));
      }
      if (ep === "/api/rekap/transaksi?page=1&limit=5") {
        console.log("  -> Total baris transaksi:", json.pagination.totalCount);
        console.log("  -> Baris diambil:", json.data.length);
      }
    }
  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    server.close();
    console.log("Test finished & server closed cleanly!");
    process.exit(0);
  }
});
