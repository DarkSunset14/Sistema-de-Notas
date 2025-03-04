import { prisma } from "@/libs/prisma";

// Manejar solicitudes GET
export async function GET(req) {
  try {
    const Rol = await prisma.rol.findMany(); // Obtiene todos los departamentos
    return new Response(JSON.stringify(Rol), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response("Error al obtener datos", { status: 500 });
  }
}
