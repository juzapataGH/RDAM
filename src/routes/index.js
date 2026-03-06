const express = require("express");

const router = express.Router();

// Rutas públicas
const publicAuthRoutes = require("./public/auth.routes");
const publicSolicitudesRoutes = require("./public/solicitudes.routes");
const paymentsRoutes = require("./payments.routes");
const internalAuthRoutes = require("./internal/auth.routes");
// Endpoint base de la API
router.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "API RDAM funcionando"
  });
});

// Autenticación pública (ciudadanos)
router.use("/public/auth", publicAuthRoutes);

// Solicitudes del ciudadano
router.use("/public/solicitudes", publicSolicitudesRoutes);

// Pagos
router.use("/payments", paymentsRoutes);

module.exports = router;

router.use("/internal/auth", internalAuthRoutes);