import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawCsvPath = path.resolve(__dirname, "../data/raw_dataset.csv");
const dataDir = path.resolve(__dirname, "../data");

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function run() {
  const rawContent = fs.readFileSync(rawCsvPath, "utf-8");
  const lines = rawContent.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);

  const sections: { name: string; header: string[]; rows: string[][] }[] = [];
  let currentSection: { name: string; header: string[]; rows: string[][] } | null = null;

  for (const line of lines) {
    if (line === "Indikator,Nilai") {
      currentSection = { name: "indikator", header: ["Indikator", "Nilai"], rows: [] };
      sections.push(currentSection);
      continue;
    }
    if (line.startsWith("Tanggal,Kode Menu,Kategori,Nama Menu")) {
      currentSection = {
        name: "penjualanDetail",
        header: parseCSVLine(line),
        rows: [],
      };
      sections.push(currentSection);
      continue;
    }
    if (line.startsWith("Kode Menu,Kategori,Nama Menu,Harga Satuan")) {
      currentSection = {
        name: "rekapMenu",
        header: parseCSVLine(line),
        rows: [],
      };
      sections.push(currentSection);
      continue;
    }
    if (line.startsWith("Tanggal,Total Item Terjual,Total Pendapatan")) {
      currentSection = {
        name: "rekapHarian",
        header: parseCSVLine(line),
        rows: [],
      };
      sections.push(currentSection);
      continue;
    }
    if (line.startsWith("Keterangan,Penjelasan")) {
      currentSection = {
        name: "keterangan",
        header: parseCSVLine(line),
        rows: [],
      };
      sections.push(currentSection);
      continue;
    }

    if (currentSection) {
      currentSection.rows.push(parseCSVLine(line));
    }
  }

  // 1. Indikator
  const secIndikator = sections.find((s) => s.name === "indikator");
  const indikatorMap: Record<string, any> = {};
  if (secIndikator) {
    for (const row of secIndikator.rows) {
      const [key, val] = row;
      const num = Number(val);
      indikatorMap[key] = isNaN(num) ? val : num;
    }
  }

  // 2. Penjualan Detail
  const secDetail = sections.find((s) => s.name === "penjualanDetail");
  const detailList = (secDetail?.rows ?? []).map((row) => ({
    tanggal: row[0],
    kodeMenu: row[1],
    kategori: row[2],
    namaMenu: row[3],
    hargaSatuan: Number(row[4]),
    jumlahTerjual: Number(row[5]),
    totalPenjualan: Number(row[6]),
  }));

  // 3. Rekap Menu
  const secMenu = sections.find((s) => s.name === "rekapMenu");
  const menuList = (secMenu?.rows ?? []).map((row) => ({
    kodeMenu: row[0],
    kategori: row[1],
    namaMenu: row[2],
    hargaSatuan: Number(row[3]),
    totalTerjual: Number(row[4]),
    totalPendapatan: Number(row[5]),
    hariTerjual: Number(row[6]),
  }));

  // 4. Rekap Harian
  const secHarian = sections.find((s) => s.name === "rekapHarian");
  const harianList = (secHarian?.rows ?? []).map((row) => ({
    tanggal: row[0],
    totalItemTerjual: Number(row[1]),
    totalPendapatan: Number(row[2]),
    jumlahJenisMenuTerjual: Number(row[3]),
  }));

  // 5. Keterangan
  const secKet = sections.find((s) => s.name === "keterangan");
  const keteranganList = (secKet?.rows ?? []).map((row) => ({
    keterangan: row[0],
    penjelasan: row[1],
  }));

  // 6. Agregasi Kategori (Dihitung dari menuList)
  const categoryMap: Record<
    string,
    { kategori: string; totalTerjual: number; totalPendapatan: number; jumlahMenu: number }
  > = {};

  for (const m of menuList) {
    if (!categoryMap[m.kategori]) {
      categoryMap[m.kategori] = {
        kategori: m.kategori,
        totalTerjual: 0,
        totalPendapatan: 0,
        jumlahMenu: 0,
      };
    }
    categoryMap[m.kategori].totalTerjual += m.totalTerjual;
    categoryMap[m.kategori].totalPendapatan += m.totalPendapatan;
    categoryMap[m.kategori].jumlahMenu += 1;
  }

  const kategoriList = Object.values(categoryMap)
    .sort((a, b) => b.totalPendapatan - a.totalPendapatan)
    .map((cat) => ({
      ...cat,
      persentasePendapatan: Number(
        ((cat.totalPendapatan / (indikatorMap["Total pendapatan/omzet"] || 1)) * 100).toFixed(2),
      ),
    }));

  fs.writeFileSync(path.join(dataDir, "indikator.json"), JSON.stringify(indikatorMap, null, 2));
  fs.writeFileSync(path.join(dataDir, "penjualanDetail.json"), JSON.stringify(detailList, null, 2));
  fs.writeFileSync(path.join(dataDir, "rekapMenu.json"), JSON.stringify(menuList, null, 2));
  fs.writeFileSync(path.join(dataDir, "rekapHarian.json"), JSON.stringify(harianList, null, 2));
  fs.writeFileSync(path.join(dataDir, "keterangan.json"), JSON.stringify(keteranganList, null, 2));
  fs.writeFileSync(path.join(dataDir, "rekapKategori.json"), JSON.stringify(kategoriList, null, 2));

  console.log("Parsing selesai!");
  console.log("- Indikator:", Object.keys(indikatorMap).length, "items");
  console.log("- Penjualan Detail:", detailList.length, "baris");
  console.log("- Rekap Menu:", menuList.length, "menu");
  console.log("- Rekap Harian:", harianList.length, "hari");
  console.log("- Keterangan:", keteranganList.length, "catatan");
  console.log("- Rekap Kategori:", kategoriList.length, "kategori");
}

run();
