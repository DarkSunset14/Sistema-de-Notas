"use client";

import Link from "next/link";

import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import "@/components/CreacionUsuario/Css/Registro.css";

function RegisterUser() {
 const [roles, setRoles] = useState([]); // State to hold the units
  const [selectedRoles, setSelectedRoles] = useState(""); // State to hold the selected unit

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    const fetchRol = async () => {
      const response = await fetch("/api/auth/rol");
      const data = await response.json();
      setRoles(data);
      console.log(data); // Verifica que los roles se carguen correctamente
    };
  
    fetchRol();
  }, []);
  
    const handleRolChange = (event) => {
      const value = event.target.value;
      setSelectedRoles(value);
      console.log("Rol Seleccionado:", value);
    };
  /*FUNCION PARA QUE SE GUARDEN LOS DATOS EN UNA BASE DE DATOS AL REGISTRASE*/

  const usuario = handleSubmit(async (data) => {
  

    const res = await fetch("/api/auth/RegistroUsuario", {
      method: "POST",
      body: JSON.stringify({
        nombre: data.nombre,
        apellido: data.apellido,
        cedula: data.cedula,
        password: data.password,
        id_Rol: data.id_Rol
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    
    const resJSON = await res.json();
    console.log(resJSON);
  });

  return (
    <div className="mt-50">
      {" "}
      {/*/////////*/}
      <div className="contenedor_todo">
        <div className="caja__trasera">
          <div className="caja__trasera-login">
            <h3>¿Ya tienes una cuenta?</h3>
            <p>Inicia sesión para entrar a la página</p>
            <Link href="/principal">
              <button id="btn__iniciar-sesion"> Iniciar sesión </button>
            </Link>
          </div>{" "}
          <div className="caja__trasera-registro">
     
          </div>
        </div>

        {/*/////////*/}
        <div className="contenedor__register ">
  {/*////FORMULARIO DE REGISTRO/////*/}
  <form
    action=""
    className="formulario__register border border-gray-700"
    onSubmit={usuario}
  >
    <h2>Registrate</h2>

    {/* IMPUT PARA NOMBRE */}
    <div>
      <label className="text-black" htmlFor="nombre">
        Nombre
      </label>
      <input
        type="text"
        id="nombre"
        placeholder="Jesus..."
        {...register("nombre", {
          required: { value: true, message: "El Nombre es requerido" },
        })}
      />
      {errors.nombre && (
        <span className="text-red-500">{errors.nombre.message}</span>
      )}
    </div>

    {/* IMPUT PARA APELLIDO */}
    <div>
      <br />
      <label className="text-black" htmlFor="apellido">
        Apellido
      </label>
      <input
        type="text"
        id="apellido"
        placeholder="Castillo..."
        {...register("apellido", {
          required: {
            value: true,
            message: "El Apellido es Requerido",
          },
        })}
      />
      {errors.apellido && (
        <span className="text-red-500">{errors.apellido.message}</span>
      )}
    </div>

    {/* IMPUT PARA CEDULA */}
    <div>
      <br />
      <label className="text-black" htmlFor="cedula">
        Cedula
      </label>
      <input
        type="number"
        id="cedula"
        placeholder="29332543..."
        {...register("cedula", {
          required: { value: true, message: "La Cedula es Requerida" },
        })}
      />
      {errors.cedula && (
        <span className="text-red-500">{errors.cedula.message}</span>
      )}
    </div>

    {/* IMPUT PARA PASSWORD */}
    <div>
      <br />
      <label className="text-black" htmlFor="contrasena">
        Clave
      </label>
      <input
        type="password"
        id="password"
        placeholder="*******"
        {...register("password", {
          required: {
            value: true,
            message: "La Contraseña es Requerida",
          },
        })}
      />
      {errors.password && (
        <span className="text-red-500">{errors.password.message}</span>
      )}
    </div>

   {/* SELECT PARA ROL */}
<div>
  <br />
  <label className="text-black" htmlFor="rol">
    Rol
  </label>
  <select
   className="Rol"
    id="rol"
    {...register("id_Rol", {
      required: { value: true, message: "El Rol es Requerido" },
    })}
  >
    <option value="">Selecciona un rol...</option>
    {roles.map((rol) => (
      <option key={rol.id} value={rol.id}>
        {rol.rol}
      </option>
    ))}
  </select>
  {errors.id_Rol && (
    <span className="text-red-500">{errors.id_Rol.message}</span>
  )}
</div>

    <br />
    <div>
      <button>Registrarse</button>
    </div>
  </form>
</div>
      </div>
    </div>
  );
}

export default RegisterUser;
