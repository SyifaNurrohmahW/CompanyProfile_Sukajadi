import cors from "cors";
import express from "express";
import rekapRoutes from "./routes/rekapRoutes.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());

// Health Check
app.get("/api/health", (_request, response) => {
  response.json({
    status: "ok",
    service: "companyprofile-sukajadi-api",
    timestamp: new Date().toISOString(),
  });
});

// Rekapan Data Routes
app.use("/api/rekap", rekapRoutes);

export default app;
