import { Facebook, Instagram, Mail, Music2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-bg items-center text-white px-6 md:px-20 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-20 sm:gap-10 items-center">
        {/* Redes sociales */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold">Nuestras redes sociales</h4>
          <div className="flex gap-4">
            <a href="#" className="bg-white text-black p-2 rounded-full">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="bg-white text-black p-2 rounded-full">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="bg-white text-black p-2 rounded-full">
              <Music2 className="w-5 h-5" />
            </a>
          </div>
          <a
            href="mailto:clientes@klajoyeria.mx"
            className="underline text-sm mt-2"
          >
            clientes@klajoyeria.mx
          </a>
        </div>

        {/* Logo */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl tracking-widest font-light">CLEMENTINA</h2>
          <p className="text-xs tracking-[0.3em]">JEWELRY</p>
          <p className="text-xs mt-4">
            ©2025 Clementina Jewelry, Derechos reservados.
          </p>
        </div>

        {/* Páginas */}
        <div className="flex flex-col items-end gap-2 text-sm">
          <h4 className="text-base font-semibold mb-1">Páginas</h4>
          <a href="/" className="hover:underline">
            Inicio
          </a>
          <a href="/nuevo" className="hover:underline">
            Nuevo
          </a>
          <a href="/descuentos" className="hover:underline">
            Descuentos
          </a>
          <a href="/comprar" className="hover:underline">
            Comprar
          </a>
          <a href="/aviso-de-privacidad" className="underline font-bold mt-2">
            Aviso de privacidad
          </a>
        </div>
      </div>
    </footer>
  );
}
