const express = require("express");
const router = express.Router();

const authPublic = require("../../middleware/authPublic");
const solicitudesService = require("../../services/solicitudes.service");

// POST /api/public/solicitudes
router.post("/", authPublic, async (req, res) => {
  const { cuil, nombre, apellido } = req.body;

  if (!cuil || !nombre || !apellido) {
    return res.status(400).json({
      ok: false,
      message: "cuil, nombre y apellido son requeridos",
    });
  }

  const email = req.user.email;

  const result = await solicitudesService.crearSolicitud({
    email,
    cuil,
    nombre,
    apellido,
  });

  res.status(201).json({
    ok: true,
    ...result,
  });
});

// GET /api/public/solicitudes
router.get("/", authPublic, async (req, res) => {
  const email = req.user.email;
  const rows = await solicitudesService.listarSolicitudes(email);

  res.json({
    ok: true,
    items: rows,
  });
});

// GET /api/public/solicitudes/historial
router.get("/historial", authPublic, async (req, res) => {
  const email = req.user.email;
  const rows = await solicitudesService.listarSolicitudes(email);

  res.json({
    ok: true,
    items: rows,
  });
});

// GET /api/public/solicitudes/:id
router.get("/:id", authPublic, async (req, res) => {
  const email = req.user.email;
  const id = Number(req.params.id);

  const row = await solicitudesService.obtenerSolicitudPorId(email, id);

  if (!row) {
    return res.status(404).json({
      ok: false,
      message: "Solicitud no encontrada",
    });
  }

  res.json({
    ok: true,
    item: row,
  });
});

module.exports = router;