const express = require("express");
const cors = require("cors");

const pool = require("./db/pool");

const app = express();

// Middleware base
app.use(cors());
app.use(express.json());

// Healthcheck
app.get("/health", (req, res) => {
  res.json({ ok: true, service: "RDAM API" });
});

// DB Ping
app.get("/db/ping", async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS ok");
    res.json({ db: "ok", result: rows[0] });
  } catch (err) {
    next(err);
  }
});

// Router principal (lo crearemos en el siguiente paso)
try {
  const apiRouter = require("./routes");
  app.use("/api", apiRouter);
} catch (e) {
  // Si todavía no existe ./routes/index.js, no rompe la app.
  // Podés borrar este try/catch cuando ya lo crees.
}

// 404
app.use((req, res) => {
  res.status(404).json({
    error: "NOT_FOUND",
    message: "Ruta no encontrada",
  });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);

  res.status(500).json({
    error: "INTERNAL_SERVER_ERROR",
    message: err.message || "Error interno",
  });
});

module.exports = app;