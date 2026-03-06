const express = require("express");
const router = express.Router();

const internalAuthService = require("../../services/internalAuth.service");

router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      ok: false,
      message: "email y password son requeridos"
    });
  }

  const result = await internalAuthService.login({ email, password });

  if (!result.ok) {
    return res.status(result.status).json({
      ok: false,
      message: result.message
    });
  }

  res.json({
    ok: true,
    token: result.token,
    user: result.user
  });

});

module.exports = router;