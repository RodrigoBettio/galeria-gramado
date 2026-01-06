import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Header({ scrolled }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, openCart } = useCart();

  const navLinks = [
    { name: "Início", href: "#inicio" },
    { name: "Sobre", href: "#sobre" },
    { name: "Galeria", href: "/gallery", isRoute: true },
    { name: "Contato", href: "#contato" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-[#4B3619]/95 backdrop-blur-md shadow-lg" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <a href="#inicio" className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 lg:w-12 lg:h-12 border-2 border-[#C5A059] rounded-lg flex items-center justify-center">
                  <span className="font-playfair text-[#C5A059] text-xl lg:text-2xl font-bold">G</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-playfair text-white text-lg lg:text-xl font-semibold tracking-wide">
                  Galeria Gramado
                </h1>
                <p className="text-[#C5A059] text-[10px] lg:text-xs tracking-[0.2em] uppercase">
                  Arte Clássica
                </p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link, index) => (
                link.isRoute ? (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={createPageUrl("Gallery")}
                      className="relative text-white/90 hover:text-[#C5A059] transition-colors duration-300 text-sm tracking-wide font-montserrat font-medium group"
                    >
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C5A059] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative text-white/90 hover:text-[#C5A059] transition-colors duration-300 text-sm tracking-wide font-montserrat font-medium group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C5A059] transition-all duration-300 group-hover:w-full" />
                  </motion.a>
                )
              ))}
            </nav>

            {/* Cart & Mobile Menu */}
            <div className="flex items-center gap-4">
              <motion.button
                onClick={openCart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-white hover:text-[#C5A059] transition-colors"
              >
                <ShoppingBag className="w-5 h-5 lg:w-6 lg:h-6" strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C5A059] text-[#2D2D2D] text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </motion.button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-white hover:text-[#C5A059] transition-colors"
              >
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/60" onClick={() => setMobileMenuOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-[#4B3619] shadow-2xl"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-10">
                  <span className="font-playfair text-white text-xl">Menu</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-white hover:text-[#C5A059]"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    link.isRoute ? (
                      <Link
                        key={link.name}
                        to={createPageUrl("Gallery")}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-white/90 hover:text-[#C5A059] transition-colors text-lg font-playfair tracking-wide"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-white/90 hover:text-[#C5A059] transition-colors text-lg font-playfair tracking-wide"
                      >
                        {link.name}
                      </a>
                    )
                  ))}
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}