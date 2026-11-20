import indikatorData from "../data/indikator.json" with { type: "json" };
import keteranganData from "../data/keterangan.json" with { type: "json" };
import penjualanDetailData from "../data/penjualanDetail.json" with { type: "json" };
import rekapHarianData from "../data/rekapHarian.json" with { type: "json" };
import rekapKategoriData from "../data/rekapKategori.json" with { type: "json" };
import rekapMenuData from "../data/rekapMenu.json" with { type: "json" };

export interface IndikatorData {
  Periode: string;
  "Jumlah jenis menu pada daftar": number;
  "Total unit terjual": number;
  "Total pendapatan/omzet": number;
  "Baris data penjualan menu-harian": number;
}

export interface RekapHarianItem {
  tanggal: string;
  totalItemTerjual: number;
  totalPendapatan: number;
  jumlahJenisMenuTerjual: number;
}

export interface RekapMenuItem {
  kodeMenu: string;
  kategori: string;
  namaMenu: string;
  hargaSatuan: number;
  totalTerjual: number;
  totalPendapatan: number;
  hariTerjual: number;
}

export interface RekapKategoriItem {
  kategori: string;
  totalTerjual: number;
  totalPendapatan: number;
  jumlahMenu: number;
  persentasePendapatan: number;
}

export interface PenjualanDetailItem {
  tanggal: string;
  kodeMenu: string;
  kategori: string;
  namaMenu: string;
  hargaSatuan: number;
  jumlahTerjual: number;
  totalPenjualan: number;
}

export interface KeteranganItem {
  keterangan: string;
  penjelasan: string;
}

export const rekapService = {
  getOverview() {
    const indikator: IndikatorData = indikatorData;
    const harian: RekapHarianItem[] = rekapHarianData;
    const menu: RekapMenuItem[] = rekapMenuData;

    // Hitung statistik tambahan yang berguna
    const totalHari = harian.length;
    const rataRataOmzetHarian = Math.round(
      indikator["Total pendapatan/omzet"] / (totalHari || 1)
    );
    const rataRataItemHarian = Math.round(
      indikator["Total unit terjual"] / (totalHari || 1)
    );

    // Menu terlaris (Top 3)
    const topMenu = [...menu]
      .sort((a, b) => b.totalTerjual - a.totalTerjual)
      .slice(0, 3);

    // Hari dengan omzet tertinggi
    const hariTertinggi = [...harian].sort(
      (a, b) => b.totalPendapatan - a.totalPendapatan
    )[0];

    return {
      indikator,
      statistik: {
        totalHari,
        rataRataOmzetHarian,
        rataRataItemHarian,
        topMenu,
        hariTertinggi,
      },
    };
  },

  getRekapHarian() {
    return rekapHarianData;
  },

  getRekapMenu(options: {
    kategori?: string;
    search?: string;
    sortBy?: "totalTerjual" | "totalPendapatan" | "namaMenu" | "hargaSatuan";
    order?: "asc" | "desc";
    limit?: number;
  }) {
    let items: RekapMenuItem[] = [...rekapMenuData];

    if (options.kategori && options.kategori !== "all") {
      items = items.filter(
        (m) => m.kategori.toLowerCase() === options.kategori?.toLowerCase()
      );
    }

    if (options.search) {
      const q = options.search.toLowerCase();
      items = items.filter(
        (m) =>
          m.namaMenu.toLowerCase().includes(q) ||
          m.kodeMenu.toLowerCase().includes(q)
      );
    }

    const sortBy = options.sortBy || "totalPendapatan";
    const order = options.order || "desc";

    items.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (typeof valA === "string" && typeof valB === "string") {
        return order === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      valA = Number(valA);
      valB = Number(valB);
      return order === "asc" ? valA - valB : valB - valA;
    });

    if (options.limit && options.limit > 0) {
      items = items.slice(0, options.limit);
    }

    return items;
  },

  getRekapKategori() {
    return rekapKategoriData;
  },

  getTransaksiDetail(options: {
    page?: number;
    limit?: number;
    tanggal?: string;
    kategori?: string;
    search?: string;
    sortBy?: string;
    order?: "asc" | "desc";
  }) {
    let items: PenjualanDetailItem[] = [...penjualanDetailData];

    if (options.tanggal) {
      items = items.filter((d) => d.tanggal.startsWith(options.tanggal!));
    }

    if (options.kategori && options.kategori !== "all") {
      items = items.filter(
        (d) => d.kategori.toLowerCase() === options.kategori?.toLowerCase()
      );
    }

    if (options.search) {
      const q = options.search.toLowerCase();
      items = items.filter(
        (d) =>
          d.namaMenu.toLowerCase().includes(q) ||
          d.kodeMenu.toLowerCase().includes(q)
      );
    }

    if (options.sortBy) {
      const sortField = options.sortBy as keyof PenjualanDetailItem;
      const order = options.order || "asc";
      items.sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        if (typeof valA === "string" && typeof valB === "string") {
          return order === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }
        return order === "asc"
          ? (valA as number) - (valB as number)
          : (valB as number) - (valA as number);
      });
    }

    const totalCount = items.length;
    const page = Math.max(1, Number(options.page || 1));
    const limit = Math.max(1, Number(options.limit || 20));
    const totalPages = Math.ceil(totalCount / limit);
    const startIndex = (page - 1) * limit;
    const paginatedItems = items.slice(startIndex, startIndex + limit);

    return {
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
      },
      data: paginatedItems,
    };
  },

  getKeterangan() {
    return keteranganData;
  },
};
