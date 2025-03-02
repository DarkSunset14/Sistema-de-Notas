"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import "@/components/CreacionUsuario/Css/Login.css";
import { useForm } from "react-hook-form";

function  Login (){
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const router = useRouter();
      const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    
  const login = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
      cedula: data.cedula,
      password: data.password,
      redirect: false,
    });

    if (res.error) {
      setError(res.error);
    } else {
      setIsLoggedIn(true);
      setError(null);

      //Obtener el rol del usuario de la base de datos
      const userResponse = await fetch("/api/auth/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cedula: data.cedula, password: data.password }), // Incluye la contraseña
      });

      const userData = await userResponse.json();
      console.log("Datos del usuario:", userData); // Para depuración
      // Compruebe si el usuario fue encontrado y tiene un rol
      if (userResponse.ok && userData.redirectUrl) {
        router.push(userData.redirectUrl); // Redirigir a la URL proporcionada
      } else {
        setError("Usuario no encontrado o sin rol asignado.");
      }
    }
  });


    return (
       <div className="mt-50">
      <div className="contenedor_todo">
        <div className="caja__trasera">
          <div className="caja__trasera-login">
         <h3 className="text-[#E05A5D]">¿Ya tienes una cuenta?</h3>
            <p className="text-[#E05A5D]">Inicia sesión para entrar a la página</p>
            <button className="boton_login" id="btn__registrarse"> Iniciar sesión </button>
          </div>
          <div className="caja__trasera-login">
            <h3>¿Aún no tienes una cuenta?</h3>
            <p>Registrate para iniciar sesión</p>
            <Link href="/principal/registro">
              <button className="boton_registro" id="btn__iniciar-sesion"> Registrarse </button>
            </Link>
          </div>
        </div>
        <div className="contenedor__login">
          {!isLoggedIn ? (
            <form onSubmit={login} className="formulario__login">
              <h2>Inicio de sesión</h2>
              <div>
                <label className="text-black" htmlFor="cedula">
                  Cédula
                </label>
                <input
                  type="number"
                  id="cedula"
                  placeholder="29766987"
                  {...register("cedula", {
                    required: "La Cédula es Requerida",
                  })}
                />
                {errors.cedula && (
                  <span className="text-red-500">{errors.cedula.message}</span>
                )}
              </div>
              <div>
                <br />
                <label className="text-black" htmlFor="password">
                  Clave
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="*******"
                  {...register("password", {
                    required: "La Contraseña es Requerida",
                  })}
                />
                {errors.password && (
                  <span className="text-red-500">{errors.password.message}</span>
                )}
              </div>
              {error && (
                <p className="text-red-500 text-xl p-3 rounded">{error}</p>
              )}
              <button type="submit">Iniciar sesión</button>
            </form>
          ) : null}
        </div>  
       </div></div>
    )
  }


export default Login