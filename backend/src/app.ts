import cors from "cors";
import express from "express";
import rekapRoutes from "./routes/rekapRoutes.js";

const app = express();
const frontendOrigin =
  process.env.FRONTEND_URL?.replace(/\/+$/, "") ??
  (process.env.NODE_ENV === "production" ? false : "http://localhost:3000");

app.use(
  cors({
    origin: frontendOrigin,
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
