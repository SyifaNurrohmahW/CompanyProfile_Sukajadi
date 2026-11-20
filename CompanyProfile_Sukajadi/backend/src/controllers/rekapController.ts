import { Request, Response } from "express";
import { rekapService } from "../services/rekapService.js";

export const rekapController = {
  getOverview(_req: Request, res: Response) {
    try {
      const data = rekapService.getOverview();
      res.json({
        success: true,
        message: "Berhasil mengambil overview rekapan data",
        data,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Gagal memproses data overview",
        error: error.message,
      });
    }
  },

  getRekapHarian(_req: Request, res: Response) {
    try {
      const data = rekapService.getRekapHarian();
      res.json({
        success: true,
        message: "Berhasil mengambil rekap penjualan harian",
        totalHari: data.length,
        data,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Gagal memproses data rekap harian",
        error: error.message,
      });
    }
  },

  getRekapMenu(req: Request, res: Response) {
    try {
      const { kategori, search, sortBy, order, limit } = req.query;

      const data = rekapService.getRekapMenu({
        kategori: kategori as string,
        search: search as string,
        sortBy: sortBy as any,
        order: order as any,
        limit: limit ? Number(limit) : undefined,
      });

      res.json({
        success: true,
        message: "Berhasil mengambil rekap performa menu",
        totalMenu: data.length,
        data,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Gagal memproses data rekap menu",
        error: error.message,
      });
    }
  },

  getRekapKategori(_req: Request, res: Response) {
    try {
      const data = rekapService.getRekapKategori();
      res.json({
        success: true,
        message: "Berhasil mengambil rekap performa kategori",
        totalKategori: data.length,
        data,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Gagal memproses data rekap kategori",
        error: error.message,
      });
    }
  },

  getTransaksiDetail(req: Request, res: Response) {
    try {
      const { page, limit, tanggal, kategori, search, sortBy, order } = req.query;

      const result = rekapService.getTransaksiDetail({
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 20,
        tanggal: tanggal as string,
        kategori: kategori as string,
        search: search as string,
        sortBy: sortBy as string,
        order: (order as "asc" | "desc") || "asc",
      });

      res.json({
        success: true,
        message: "Berhasil mengambil data transaksi detail",
        ...result,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Gagal memproses data transaksi detail",
        error: error.message,
      });
    }
  },

  getKeterangan(_req: Request, res: Response) {
    try {
      const data = rekapService.getKeterangan();
      res.json({
        success: true,
        message: "Berhasil mengambil keterangan simulasi data",
        data,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Gagal memproses data keterangan",
        error: error.message,
      });
    }
  },
};
