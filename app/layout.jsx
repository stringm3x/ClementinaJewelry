import { Roboto } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata = {
  title: "Clementina Jewlery",
  description: "Joyeria Atemporal",
  icons: {
    icon: "/favico.jpeg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
