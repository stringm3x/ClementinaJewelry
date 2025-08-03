"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.userErrors && data.userErrors.length > 0) {
        setError(data.userErrors[0].message || "Error desconocido.");
      } else if (data.customerAccessToken) {
        // Guarda el token para saber que está logueado
        localStorage.setItem(
          "customerToken",
          data.customerAccessToken.accessToken
        );
        // Notifica al Navbar (¡a todas las tabs/páginas!)
        window.dispatchEvent(new Event("customerTokenChanged"));
        router.push("/"); // Redirige a Home o a donde gustes
      }
    } catch (err) {
      setError("Error al iniciar sesión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-white">
      <div className="max-w-sm w-full flex flex-col items-center text-center gap-8">
        {/* Logo */}
        <div>
          {/* Puedes cambiar el logo si prefieres */}
          <h1 className="text-5xl font-light tracking-widest leading-tight text-black">
            CLEMENTINA
          </h1>
          <p className="text-2xl tracking-[0.3em] text-black">JEWELRY</p>
        </div>

        <h2 className="text-lg font-semibold text-black">Iniciar sesión</h2>
        <p className="text-sm text-zinc-600">
          Compra tus estilos, guarda favoritos y sigue tus pedidos.
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            name="email"
            type="email"
            placeholder="Correo electrónico*"
            className="w-full border border-gray-300 rounded-md px-4 py-2 placeholder-gray-400 text-sm focus:outline-none focus:border-black bg-white"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña*"
            className="w-full border border-gray-300 rounded-md px-4 py-2 placeholder-gray-400 text-sm focus:outline-none focus:border-black bg-white"
            value={form.password}
            onChange={handleChange}
            required
          />

          {error && <p className="text-red-500 text-sm text-left">{error}</p>}

          <button
            type="submit"
            className="bg-black text-white py-3 rounded-full font-semibold text-sm tracking-wide mt-2 transition hover:bg-zinc-800 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Accediendo..." : "ACCESO"}
          </button>
        </form>

        <Link
          href="/forgot-password"
          className="text-sm text-black underline text-center"
        >
          ¿Olvidaste tu contraseña?
        </Link>

        <p className="text-sm text-zinc-600">
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="font-semibold underline text-black">
            Crear cuenta
          </Link>
        </p>
      </div>
    </main>
  );
}
