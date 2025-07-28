"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, User } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full px-6 md:px-16 py-4 flex items-center justify-between transition-all duration-300 z-50 ${
        scrolled ? "bg-transparent shadow-sm" : "bg-white"
      } fixed top-0`}
    >
      {/* LOGO */}
      <div className="text-2xl font-light tracking-widest text-center">
        <h1 className="leading-tight">CLEMENTINA</h1>
        <p className="text-xs tracking-[0.3em]">JEWELRY</p>
      </div>

      {/* NAV LINKS */}
      <nav className="hidden md:flex gap-8 text-sm font-medium">
        <a href="/" className="hover:text-gray-600">
          Inicio
        </a>
        <a href="/nuevo" className="hover:text-gray-600">
          Nuevo
        </a>
        <a href="/descuentos" className="hover:text-gray-600">
          Descuentos
        </a>
        <div className="relative group cursor-pointer">
          <span className="hover:text-gray-600 flex items-center gap-1">
            Comprar <span className="text-xs">▼</span>
          </span>
        </div>
      </nav>

      {/* ICONOS */}
      <div className="flex items-center gap-6">
        <User className="w-5 h-5 text-gray-500" />
        <div className="relative">
          <ShoppingBag className="w-5 h-5 text-gray-500" />
          <span className="absolute -top-2 -right-2 text-xs bg-black text-white rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        </div>
      </div>
    </header>
  );
}
