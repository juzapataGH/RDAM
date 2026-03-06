const express = require("express");
const router = express.Router();

const publicAuthService = require("../../services/publicAuth.service");

// POST /api/public/auth/request-code
router.post("/request-code", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ ok: false, message: "email es requerido" });
  }

  await publicAuthService.requestCode(email);
  res.json({ ok: true, message: "Código enviado (modo DEV: ver consola)" });
});

// POST /api/public/auth/verify-code
router.post("/verify-code", async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res
      .status(400)
      .json({ ok: false, message: "email y code son requeridos" });
  }

  const result = await publicAuthService.verifyCode(email, code);

  if (!result.ok) {
    return res.status(result.status).json({ ok: false, message: result.message });
  }

  res.json({ ok: true, token: result.token });
});

module.exports = router;