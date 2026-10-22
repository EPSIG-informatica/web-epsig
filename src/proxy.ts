import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, fromEnglishPath, isLocale, LOCALE_COOKIE, negotiateLocale, toEnglishPath } from "@/lib/i18n";

// Idioma de cada visita:
// - /ca/... y /en/... → valenciano e inglés, tal cual.
// - /es/... → no es una URL pública: redirige a la misma ruta sin prefijo.
// - Sin prefijo → castellano (reescrito internamente a /es/...), salvo que el usuario prefiera
//   otro idioma: lo ha elegido en el selector (cookie) o, si no ha elegido, su navegador está en
//   catalán/valenciano o en inglés. En ese caso se le redirige a /ca/... o /en/... (redirección
//   temporal, para que Google, que no envía Accept-Language, siga indexando el castellano).
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];

  if (first === "en") return englishRoute(request);
  if (isLocale(first) && first !== defaultLocale) return NextResponse.next();

  if (first === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  const chosen = request.cookies.get(LOCALE_COOKIE)?.value;
  const preferred = isLocale(chosen) ? chosen : negotiateLocale(request.headers.get("accept-language"));

  let response: NextResponse;
  if (preferred !== defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${preferred}${pathname}`;
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

// Inglés: las URLs públicas van en inglés (/en/services/...) y se sirven desde las páginas internas
// en castellano (/en/servicios/...). Si alguien entra por la ruta en castellano bajo /en/, se le
// redirige de forma permanente a la de inglés para que Google solo indexe una dirección.
function englishRoute(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const rest = pathname.slice("/en".length) || "/";
  const internal = fromEnglishPath(rest);
  const canonical = toEnglishPath(internal);
  if (canonical !== rest) {
    const url = request.nextUrl.clone();
    url.pathname = `/en${canonical}`;
    return NextResponse.redirect(url, 308);
  }
  if (internal !== rest) {
    const url = request.nextUrl.clone();
    url.pathname = `/en${internal}`;
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  // Solo páginas: fuera la API, los ficheros internos de Next y cualquier fichero con extensión
  // (imágenes, vídeos, /animaciones/, sitemap.xml, robots.txt, favicon...).
  matcher: ["/((?!api/|_next/|.*\\.[^/]+$).*)"],
};
