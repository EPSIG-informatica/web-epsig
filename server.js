// Arranque para Plesk (extensión Node.js / Phusion Passenger), que necesita un fichero .js de inicio.
// Equivale a `next start`: Next lee el puerto de la variable PORT que asigna Plesk.
process.env.NODE_ENV = "production";
const nextBin = require.resolve("next/dist/bin/next");
process.argv = [process.argv[0], nextBin, "start"];
// CommonJS a propósito: Passenger carga el fichero de inicio con require().
// eslint-disable-next-line @typescript-eslint/no-require-imports
require(nextBin);
