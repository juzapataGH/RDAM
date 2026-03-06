const pool = require("../db/pool");

function buildNroTramite() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const rnd = String(Math.floor(1000 + Math.random() * 9000));

  return `RDAM-${yyyy}${mm}${dd}-${rnd}`;
}

async function crearSolicitud({ email, cuil, nombre, apellido }) {
  const nroTramite = buildNroTramite();

  await pool.query(
    `INSERT INTO solicitudes 
      (email, cuil, nombre, apellido, nro_tramite, estado)
     VALUES (?, ?, ?, ?, ?, 'PENDIENTE')`,
    [email, cuil, nombre, apellido, nroTramite]
  );

  return {
    nroTramite,
    estado: "PENDIENTE",
  };
}

async function listarSolicitudes(email) {
  const [rows] = await pool.query(
    `SELECT 
        id,
        nro_tramite,
        estado,
        referencia_pago,
        fecha_pago,
        fecha_aprobacion,
        fecha_publicacion,
        fecha_vencimiento,
        observaciones,
        created_at,
        updated_at,
        cuil,
        nombre,
        apellido
     FROM solicitudes
     WHERE email = ?
     ORDER BY created_at DESC`,
    [email]
  );

  return rows;
}

async function obtenerSolicitudPorId(email, id) {
  const [rows] = await pool.query(
    `SELECT 
        id,
        nro_tramite,
        estado,
        referencia_pago,
        fecha_pago,
        fecha_aprobacion,
        fecha_publicacion,
        fecha_vencimiento,
        observaciones,
        created_at,
        updated_at,
        cuil,
        nombre,
        apellido
     FROM solicitudes
     WHERE email = ? AND id = ?
     LIMIT 1`,
    [email, id]
  );

  return rows[0] || null;
}

module.exports = {
  crearSolicitud,
  listarSolicitudes,
  obtenerSolicitudPorId,
};