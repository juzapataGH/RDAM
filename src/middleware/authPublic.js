const jwt = require("jsonwebtoken");

function authPublic(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ ok: false, message: "Falta token Bearer" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (payload.scope !== "PUBLIC") {
      return res.status(403).json({ ok: false, message: "Token inválido para scope PUBLIC" });
    }

    req.user = payload; // { email, scope, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ ok: false, message: "Token inválido o expirado" });
  }
}

module.exports = authPublic;