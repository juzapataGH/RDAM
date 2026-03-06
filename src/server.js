require("dotenv").config();

const app = require("./app");

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`✅ RDAM corriendo en http://localhost:${PORT}`);
}).on("error", (err) => {
  console.error("❌ Error al iniciar el servidor:", err.message);
  process.exit(1);
});