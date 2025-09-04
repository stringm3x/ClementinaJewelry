import { Facebook, Instagram, Mail, Music2, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-bg items-center text-white px-6 md:px-20 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-20 sm:gap-10 items-center">
        {/* Redes sociales */}
        <div className="flex flex-col gap-7">
          <h4 className="text-sm font-semibold">
            ¿Quieres comunicarte con nostros?
          </h4>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/clementina.jewelry/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black p-2 rounded-full"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/KLAJOYERIA?mibextid=wwXIfr&rdid=I8cZQKD6GMMk8mIu&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19cYevLodK%2F%3Fmibextid%3DwwXIfr#"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black p-2 rounded-full"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/522212775846?text=¡Hola!%20Quiero%20más%20info%20sobre%20CLEMENTINA"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black p-2 rounded-full"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>

          <a
            href="mailto:clientes@klajoyeria.mx"
            className="underline text-sm mt-2"
          >
            clementinayjewelry@gmail.com
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
          <Link href="/" className="hover:underline">
            Inicio
          </Link>
          <Link href="/Necklaces" className="hover:underline">
            Collares
          </Link>
          <Link href="/Bracelets" className="hover:underline">
            Pulseras
          </Link>
          <Link href="/Rings" className="hover:underline">
            Anillos
          </Link>
          <Link href="/Earrings" className="hover:underline">
            Aretes
          </Link>
          <Link href="/Clock" className="hover:underline">
            Relojes
          </Link>
          <Link
            href="/aviso-de-privacidad"
            className="underline font-bold mt-2"
          >
            Aviso de privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
}
