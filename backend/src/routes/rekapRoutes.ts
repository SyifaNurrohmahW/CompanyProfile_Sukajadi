import { Router } from "express";
import { rekapController } from "../controllers/rekapController.js";

const router = Router();

// Sub-menu 1: Overview & KPI Ringkasan
router.get("/overview", rekapController.getOverview);

// Sub-menu 2: Rekapan Penjualan Harian (31 hari)
router.get("/harian", rekapController.getRekapHarian);

// Sub-menu 3: Rekapan Performa per Menu (51 menu + filter/sort/search/limit)
router.get("/menu", rekapController.getRekapMenu);

// Sub-menu 4: Rekapan Performa per Kategori (11 kategori)
router.get("/kategori", rekapController.getRekapKategori);

// Sub-menu 5: Detail Transaksi Penjualan (1.448 baris dengan pagination & filter)
router.get("/transaksi", rekapController.getTransaksiDetail);

// Sub-menu 6: Metadata & Keterangan Simulasi
router.get("/keterangan", rekapController.getKeterangan);

export default router;
