const express = require("express");
const router = express.Router();

const authPublic = require("../middleware/authPublic");
const paymentsService = require("../services/payments.service");

// Ciudadano inicia el pago de una solicitud propia
router.post("/create", authPublic, async (req, res) => {
  const { solicitudId } = req.body;

  if (!solicitudId) {
    return res.status(400).json({
      ok: false,
      message: "solicitudId es requerido",
    });
  }

  const result = await paymentsService.iniciarPago({
    solicitudId,
    email: req.user.email,
  });

  if (!result.ok) {
    return res.status(result.status).json({
      ok: false,
      message: result.message,
    });
  }

  res.json({
    ok: true,
    message: "Pago inicializado",
    data: result,
  });
});

// Webhook de la pasarela
router.post("/webhook", async (req, res) => {
  const result = await paymentsService.procesarWebhookPago(req.body);

  if (!result.ok) {
    return res.status(result.status).json({
      ok: false,
      message: result.message,
    });
  }

  res.json({
    ok: true,
    nuevoEstado: result.nuevoEstado,
  });
});

module.exports = router;