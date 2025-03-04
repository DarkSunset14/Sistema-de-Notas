import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("Datos recibidos:", data);

    // Validar que se proporcionen todos los campos necesarios
    if (!data.cedula || !data.password) {
      return NextResponse.json(
        {
          message: "Todos los campos son obligatorios.",
        },
        {
          status: 400,
        }
      );
    }

    // Buscar usuario por cédula
    const UsuarioExistente = await prisma.usuario.findUnique({
      where: { cedula: data.cedula },
    });

    if (!UsuarioExistente) {
      return NextResponse.json(
        {
          message: "Usuario no encontrado.",
        },
        {
          status: 404, // Not Found
        }
      );
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(data.password, UsuarioExistente.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          message: "Contraseña incorrecta.",
        },
        {
          status: 401, // Unauthorized
        }
      );
    }

    // Redirigir según el rol del usuario
    let redirectUrl;
    if (UsuarioExistente.id_Rol === 1) {
      redirectUrl = "/Administrador"; // Ruta para administradores
    } else {
      redirectUrl = "/principal"; // Ruta para otros roles
    }

    return NextResponse.json(
      {
        message: "Inicio de sesión exitoso.",
        redirectUrl: redirectUrl,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error al iniciar sesión:", error);

    return NextResponse.json(
      {
        message: "Error al iniciar sesión. Inténtalo de nuevo más tarde.",
      },
      {
        status: 500,
      }
    );
  }
}