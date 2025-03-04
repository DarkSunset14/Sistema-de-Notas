import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, { params }) {
  const { cedula } = params; // Extrae la cedula de los parámetros

  const UserId = parseInt(cedula);

  if (!cedula) {
    return NextResponse.json({ error: "Cedula no proporcionada" }, { status: 400 });
  }

  try {
    const usuario = await prisma.usuarios.findUnique({
      where: {
        cedula: UserId, // Asegurece de que la cedula sea un numero
      },
    });

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(usuario);
  } catch (error) {
    console.error("Error al recuperar el usuario:", error);
    return NextResponse.json(
      { error: "Error al obtener el usuario" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const data = await request.json();
  const ActualisaRegistro = await prisma.usuarios.update({
    where: {
      cedula: Number(params.cedula),
    },
    data: data,
  });

  return NextResponse.json(ActualisaRegistro);
}

export async function DELETE(request, { params }) {
  try {
    const EliminaRegistro = await prisma.usuarios.delete({
      where: {
        cedula: Number(params.cedula),
      },
    });

    return NextResponse.json(EliminaRegistro);
  } catch (error) {
    return NextResponse.json(error.message);
  }
}
