"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, User, LogOut, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Cart from "./Cart";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("customerToken");
    setLoggedIn(!!token);
  }, []);

  function handleLogout() {
    localStorage.removeItem("customerToken");
    setLoggedIn(false);
    window.location.reload();
  }

  return (
    <>
      <header
        className={`w-full px-6 md:px-16 py-4 flex items-center justify-between transition-all duration-300 z-50 ${
          scrolled ? "bg-white shadow-sm" : "bg-transparent"
        } fixed top-0`}
      >
        {/* LOGO */}
        <div className="text-xl sm:text-2xl font-light tracking-widest text-center">
          <h1 className="leading-tight">CLEMENTINA</h1>
          <p className="text-xs tracking-[0.3em]">JEWELRY</p>
        </div>

        {/* NAV LINKS DESKTOP */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-gray">
            Inicio
          </Link>
          <Link href="/nuevo" className="hover:text-gray">
            Nuevo
          </Link>
          <Link href="/descuentos" className="hover:text-gray">
            Descuentos
          </Link>
          {/* Menú Comprar */}
          <div className="relative group cursor-pointer">
            <span className="hover:text-gray flex items-center gap-1 select-none">
              Comprar <span className="text-xs">▼</span>
            </span>
            {/* Dropdown */}
            <div className="absolute left-0 top-2 mt-2 bg-white shadow-lg rounded-md py-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto min-w-[150px] transition-opacity z-40">
              <Link
                href="/Necklaces"
                className="block px-5 py-2 hover:bg-black hover:text-white text-sm"
              >
                Collares
              </Link>
              <Link
                href="/Bracelets"
                className="block px-5 py-2 hover:bg-black hover:text-white text-sm"
              >
                Pulseras
              </Link>
              <Link
                href="/Rings"
                className="block px-5 py-2 hover:bg-black hover:text-white text-sm"
              >
                Anillos
              </Link>
              <Link
                href="/Earrings"
                className="block px-5 py-2 hover:bg-black hover:text-white text-sm"
              >
                Aretes
              </Link>
            </div>
          </div>
        </nav>

        {/* ICONOS */}
        <div className="flex items-center gap-6">
          {/* USUARIO */}
          {loggedIn ? (
            <button onClick={handleLogout} title="Cerrar sesión">
              <LogOut className="w-5 h-5 text-gray-500" />
            </button>
          ) : (
            <Link href="/login" title="Iniciar sesión">
              <User className="w-5 h-5 text-gray-500" />
            </Link>
          )}

          {/* CARRITO */}
          <button className="relative" onClick={() => setCartOpen(true)}>
            <ShoppingBag className="w-5 h-5 text-gray-500" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-black text-white rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>

          {/* HAMBURGUESA SOLO EN MOBILE */}
          <button
            className="md:hidden ml-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {menuOpen ? (
              <X className="w-6 h-6  transition-all duration-200" />
            ) : (
              <Menu className="w-6 h-6  transition-all duration-200" />
            )}
          </button>
        </div>
      </header>

      {/* MENU LATERAL MOBILE */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } md:hidden`}
        onClick={() => setMenuOpen(false)}
      >
        <nav
          className={`absolute top-0 left-0 h-full w-3/4 max-w-xs bg-white shadow-xl transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } flex flex-col justify-center gap-4 p-8`}
          onClick={(e) => e.stopPropagation()}
        >
          <Link
            href="/"
            className="py-2 text-base hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link
            href="/nuevo"
            className="py-2 text-base hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Nuevo
          </Link>
          <Link
            href="/descuentos"
            className="py-2 text-base hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Descuentos
          </Link>
          <Link
            href="/Necklaces"
            className="py-2 text-base hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Collares
          </Link>
          <Link
            href="/Bracelets"
            className="py-2 text-base hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Pulseras
          </Link>
          <Link
            href="/Rings"
            className="py-2 text-base hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Anillos
          </Link>
          <Link
            href="/Earrings"
            className="py-2 text-base hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Aretes
          </Link>
          {!loggedIn ? (
            <Link
              href="/login"
              className="py-2 text-base hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              Iniciar sesión
            </Link>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="py-2 text-base text-left hover:underline"
            >
              Cerrar sesión
            </button>
          )}
        </nav>
      </div>

      {/* Drawer del carrito */}
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
