"use client";

import { useState } from "react";
import Link from "next/link";

export default function RecuperarCuentaPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.userErrors && data.userErrors.length > 0) {
        setError(data.userErrors[0].message);
      } else {
        setMsg(
          "Listo. Si el correo está registrado, recibirás un email para restablecer tu contraseña."
        );
        setEmail("");
      }
    } catch {
      setError("Error al enviar el correo. Intenta de nuevo.");
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
          <p className="text-3xl tracking-[0.3em]">JEWELRY</p>
        </div>

        <h2 className="text-xl font-medium">Recuperar cuenta</h2>
        <p className="text-sm text-zinc">
          Ingresa tu correo electrónico y recibirás un enlace para restablecer
          tu contraseña.
        </p>

        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="Correo electrónico*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray rounded-md px-4 py-2 placeholder-gray-400 text-sm focus:outline-none"
          />

          {msg && <p className="text-green text-sm">{msg}</p>}
          {error && <p className="text-red text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-black text-white py-3 rounded-full font-semibold text-sm tracking-wide"
            disabled={loading}
          >
            {loading ? "Enviando..." : "RECUPERAR CONTRASEÑA"}
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
