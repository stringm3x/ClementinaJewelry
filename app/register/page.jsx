"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.userErrors && data.userErrors.length > 0) {
        setError(data.userErrors[0].message || "Error desconocido.");
      } else if (data.customer) {
        setSuccess(true);
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
      }
    } catch (err) {
      setError(err?.message || "Error al crear la cuenta. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-white">
      <div className="max-w-sm w-full flex flex-col items-center text-center gap-8">
        {/* Logo */}
        <div>
          {/* Usa tu logo aquí, o el h1/h2 como en Clementina */}
          <h1 className="text-5xl font-light tracking-widest leading-tight text-black">
            CLEMENTINA
          </h1>
          <p className="text-2xl tracking-[0.3em] text-black">JEWELRY</p>
        </div>

        <h2 className="text-lg font-semibold text-black">Crear cuenta</h2>
        <p className="text-sm text-zinc-600">
          Crea tu cuenta para comprar, guardar favoritos y ver tus pedidos.
        </p>

        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            name="firstName"
            type="text"
            required
            placeholder="Nombre*"
            value={form.firstName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 placeholder-gray-400 text-sm focus:outline-none focus:border-black bg-white"
          />
          <input
            name="lastName"
            type="text"
            required
            placeholder="Apellido*"
            value={form.lastName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 placeholder-gray-400 text-sm focus:outline-none focus:border-black bg-white"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Correo electrónico*"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 placeholder-gray-400 text-sm focus:outline-none focus:border-black bg-white"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Contraseña*"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 placeholder-gray-400 text-sm focus:outline-none focus:border-black bg-white"
          />

          {error && <p className="text-red-500 text-sm text-left">{error}</p>}
          {success && (
            <p className="text-green-600 text-sm text-left">
              ¡Cuenta creada! Revisa tu correo para activar tu cuenta.
            </p>
          )}

          <button
            type="submit"
            className="bg-black text-white py-3 rounded-full font-semibold text-sm tracking-wide mt-2 transition hover:bg-zinc-800 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Creando..." : "CREAR CUENTA"}
          </button>
        </form>

        <p className="text-sm text-zinc-600">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="font-semibold underline text-black">
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
