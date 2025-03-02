export { default } from "next-auth/middleware";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function middleware(req) {
  // Obtén la sesión del usuario
  const session = await getServerSession({ req, authOptions });

  // Verifica si la sesión es válida
  if (!session || !session.user || !session.user.id) {
    console.error("No se encontró ningún ID de usuario en la sesión.");
    return new Response(
      JSON.stringify({
        error: "No se encontró ningún ID de usuario en la sesión.",
      }),
      {
        status: 401, // Unauthorized
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // Si la sesión es válida, continúa con la solicitud
  return NextResponse.next();
}

// Configura el middleware para que se ejecute en las rutas deseadas

export const config = {
  matcher: [
    "/Perfil_Admin/:path*",
    "/Perfil_Revision/:path*",
    "/auth/:path*",
    "/Perfil_Usuario/:path*",
    "/Comentario/:path*",
    "/Comentario_Revisor/:path*",
    "/Mensaje/:path*",
    "/Publicacion/:path*",
    "/api/auth/Comentarios",
  ],
};

// Agrega un log para verificar que el middleware se está ejecutando
export function middleware(req) {
  console.log("Middleware ejecutado para la ruta:", req.nextUrl.pathname);
}
