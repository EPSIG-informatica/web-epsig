// Comprueba la conexión SMTP del formulario de contacto sin enviar ningún correo.
// Uso (en local o en Plesk → Node.js → Ejecutar script): npm run test-smtp
import nodemailer from "nodemailer";

const { SMTP_HOST, SMTP_PORT = "587", SMTP_USER, SMTP_PASS } = process.env;

if (!SMTP_HOST) {
  console.error("ERROR: falta SMTP_HOST. ¿Existe .env.local junto a package.json?");
  process.exit(1);
}

const port = Number(SMTP_PORT);
console.log(
  `Probando ${SMTP_HOST}:${port} con usuario ${SMTP_USER || "(sin usuario)"} y contraseña ${SMTP_PASS ? "presente" : "AUSENTE"}...`,
);

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port,
  secure: port === 465,
  requireTLS: true,
  connectionTimeout: 15000,
  auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
});

try {
  await transporter.verify();
  console.log("OK: conexión y autenticación SMTP correctas.");
} catch (error) {
  console.error("ERROR SMTP:", error.code ?? "", error.response ?? error.message);
  process.exit(1);
}
