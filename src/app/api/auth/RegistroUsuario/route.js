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
  
      // Verificar si ya existe un usuario con la misma cédula
      const UsuarioExistente = await prisma.usuario.findUnique({
        where: { cedula: data.cedula },
      });
  
      if (UsuarioExistente) {
        return NextResponse.json(
          {
            message: "Ya existe un usuario con esta cédula.",
          },
          {
            status: 409, // Conflict
          }
        );
      }
  
      // Encriptar la contraseña
      const encryptPassword = await bcrypt.hash(data.password, 10);
      console.log("Contraseña encriptada:", encryptPassword);
  
      // Crear nuevo usuario
      const NuevoUsuario = await prisma.usuario.create({
        data: {
          nombre: data.nombre,
          apellido: data.apellido,
          cedula: data.cedula,
          password: encryptPassword,
          created_at: new Date(),
          rol: {
            connect: { id: parseInt(data.id_Rol) }, // Conectar con el rol existente
          },
        },
      });
      console.log("Usuario creado:", NuevoUsuario);
  
      return NextResponse.json(
        {
          message: "Usuario creado exitosamente.",
          usuario: NuevoUsuario,
        },
        {
          status: 201,
        }
      );
    } catch (error) {
      console.error("Error al crear usuario:", error);
  
      // Manejar errores de Prisma (por ejemplo, violaciones de restricciones únicas)
      if (error.code === "P2002") {
        return NextResponse.json(
          {
            message: "Ya existe un usuario con esta cédula.",
          },
          {
            status: 409,
          }
        );
      }
  
      return NextResponse.json(
        {
          message: "Error al crear usuario. Inténtalo de nuevo más tarde.",
        },
        {
          status: 500,
        }
      );
    }
  }