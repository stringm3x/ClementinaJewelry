"use client";

import { useState } from "react";
import { customerCreate } from "@/lib/shopify";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
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
      const res = await customerCreate(form);

      if (res.userErrors.length > 0) {
        setError(res.userErrors[0].message);
      } else if (res.customer) {
        setSuccess(true);
        setForm({
          email: "",
          password: "",
          firstName: "",
          lastName: "",
        });
      }
    } catch (err) {
      setError("Error al crear la cuenta. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="max-w-sm w-full flex flex-col items-center text-center gap-8">
        {/* Logo */}
        <div>
          <h1 className="text-5xl font-light tracking-widest leading-tight">
            CLEMENTINA
          </h1>
          <p className="text-2xl tracking-[0.3em]">JEWELRY</p>
        </div>

        <h2 className="text-lg font-medium">Crear cuenta</h2>
        <p className="text-sm text-zinc">
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
            className="w-full border border-gray rounded-md px-4 py-2 placeholder-gray-400 text-sm focus:outline-none"
          />
          <input
            name="lastName"
            type="text"
            required
            placeholder="Apellido*"
            value={form.lastName}
            onChange={handleChange}
            className="w-full border border-gray rounded-md px-4 py-2 placeholder-gray-400 text-sm focus:outline-none"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Correo electrónico*"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray rounded-md px-4 py-2 placeholder-gray-400 text-sm focus:outline-none"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Contraseña*"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray rounded-md px-4 py-2 placeholder-gray-400 text-sm focus:outline-none"
          />

          {error && <p className="text-red-500 text-sm text-left">{error}</p>}
          {success && (
            <p className="text-green text-sm text-left">
              Cuenta creada, revisa tu correo para activar.
            </p>
          )}

          <button
            type="submit"
            className="bg-black text-white py-3 rounded-full font-semibold text-sm tracking-wide"
            disabled={loading}
          >
            {loading ? "Creando..." : "CREAR CUENTA"}
          </button>
        </form>

        <p className="text-sm">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="font-semibold underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
