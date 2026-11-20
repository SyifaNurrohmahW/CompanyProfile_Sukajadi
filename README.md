# Company Profile Sukajadi

Proyek ini menggunakan Express untuk backend API dan Next.js App Router dengan PrimeReact untuk frontend.

## Persyaratan

- Node.js 20.9 atau lebih baru
- npm 10 atau lebih baru

## Menjalankan proyek

Dari direktori root proyek:

```bash
npm install
npm run dev
```

Frontend tersedia di <http://localhost:3000> dan backend di <http://localhost:4000>. Endpoint pemeriksaan backend tersedia di <http://localhost:4000/api/health>.

Untuk menjalankan salah satu bagian secara terpisah, gunakan `npm run dev:backend` atau `npm run dev:frontend`.

## Build

```bash
npm run build
```

Salin `frontend/.env.example` menjadi `frontend/.env.local` jika URL API perlu diubah. Secara default frontend menggunakan `http://localhost:4000`.

