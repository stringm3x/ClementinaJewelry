"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { customerAccessTokenCreate } from "@/lib/shopify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await customerAccessTokenCreate(email, password);

      if (res.userErrors.length > 0) {
        setError(res.userErrors[0].message);
      } else if (res.customerAccessToken) {
        localStorage.setItem(
          "customerToken",
          res.customerAccessToken.accessToken
        );
        window.location.href = "/";
      }
    } catch (err) {
      setError("Error en el servidor. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col  items-center justify-center px-4 py-10">
      <div className="max-w-sm w-full flex flex-col items-center text-center gap-8">
        {/* Logo */}
        <div>
          <h1 className="text-5xl font-light tracking-widest leading-tight">
            CLEMENTINA
          </h1>
          <p className="text-2xl tracking-[0.3em]">JEWELRY</p>
        </div>

        <h2 className="text-lg font-medium">Iniciar sesión</h2>
        <p className="text-sm text-zinc">
          Compra tus estilos, guarda tus favoritos, sigue tus pedidos y entrena
          con nosotros.
        </p>

        <form className="w-full flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            required
            placeholder="Correo electrónico*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray rounded-md px-4 py-2 placeholder-gray-400 text-sm focus:outline-none"
          />

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              required
              placeholder="Contraseña*"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray rounded-md px-4 py-2 placeholder-gray-400 text-sm focus:outline-none pr-10"
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc"
              onClick={() => setShowPass(!showPass)}
              tabIndex={-1}
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && <p className="text-red text-sm text-left">{error}</p>}

          <Link
            href="/forgot-password"
            className="text-sm underline text-zinc hover:text-black text-center"
          >
            ¿Haz olvidado tu contraseña?
          </Link>

          <button
            type="submit"
            className="bg-black text-white py-3 rounded-full font-semibold text-sm tracking-wide"
            disabled={loading}
          >
            {loading ? "Accediendo..." : "ACCESO"}
          </button>
        </form>

        <p className="text-sm">
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="font-semibold underline">
            Crear cuenta
          </Link>
        </p>
      </div>
    </main>
  );
}
