import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, LOCALE_COOKIE, negotiateLocale } from "@/lib/i18n";

// Idioma de cada visita:
// - /ca/... → valenciano, tal cual.
// - /es/... → no es una URL pública: redirige a la misma ruta sin prefijo.
// - Sin prefijo → castellano (reescrito internamente a /es/...), salvo que el usuario prefiera
//   valenciano: lo ha elegido en el selector (cookie) o, si no ha elegido, su navegador está en
//   catalán/valenciano. En ese caso se le redirige a /ca/... (redirección temporal, para que
//   Google, que no envía Accept-Language, siga indexando la versión en castellano).
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];

  if (first === "ca") return NextResponse.next();

  if (first === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  const chosen = request.cookies.get(LOCALE_COOKIE)?.value;
  const preferred = isLocale(chosen) ? chosen : negotiateLocale(request.headers.get("accept-language"));

  let response: NextResponse;
  if (preferred === "ca") {
    const url = request.nextUrl.clone();
    url.pathname = `/ca${pathname}`;
    response = NextResponse.redirect(url, 307);
  } else {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    response = NextResponse.rewrite(url);
  }
  // La respuesta de una URL sin prefijo depende del idioma del navegador y de la cookie.
  response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

export const config = {
  // Solo páginas: fuera la API, los ficheros internos de Next y cualquier fichero con extensión
  // (imágenes, vídeos, /animaciones/, sitemap.xml, robots.txt, favicon...).
  matcher: ["/((?!api/|_next/|.*\\.[^/]+$).*)"],
};
