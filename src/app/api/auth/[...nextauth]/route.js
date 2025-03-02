import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/libs/prisma"; // Adjust the import path as necessary
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        cedula: { label: "Cedula", type: "number", placeholder: "12345678" },
        apellido: { label: "Apellido", type: "text", placeholder: "Barreto" },
        password: { label: "Clave", type: "password", placeholder: "*******" },
      },
      async authorize(credentials, req) {
        const userFound = await prisma.usuario.findFirst({
          where: {
            cedula: credentials.cedula,
            apellido: credentials.apellido,
          },
        });

        if (!userFound) throw new Error("Usuario no Encontrado");

        const matchPassword = await bcrypt.compare(
          credentials.password,
          userFound.password
        );

        if (!matchPassword) throw new Error("Contraseña Incorrecta");

        // Return user object with ID, name, and email
        return {
          id: userFound.id,
          name: userFound.nombre,
          apellido: userFound.apellido,
          cedula: userFound.cedula,
          email: userFound.email, // Ensure email is included if needed
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Store the user ID in the token
        token.apellido = user.apellido; // Store the user's apellido
        token.cedula = user.cedula; // Store the user's cedula
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id; // Store the user ID in the session
        session.user.apellido = token.apellido; // Store the user's apellido in the session
        session.user.cedula = token.cedula; // Store the user's cedula in the session
        console.log("Session después de asignar ID:", session); // Verify the session content
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

// Export the handler for GET and POST requests
export { handler as GET, handler as POST };
