/**
 * Script que corre antes de pintar la página: marca `.js` en <html> para activar las animaciones
 * de entrada al hacer scroll. Sin JavaScript (sin la clase) todo el contenido se ve directamente.
 */
export const jsFlagScript = `document.documentElement.classList.add('js');`;
