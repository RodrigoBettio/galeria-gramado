import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#3a2a13] py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-[#C5A059] rounded-lg flex items-center justify-center">
              <span className="font-playfair text-[#C5A059] text-sm font-bold">G</span>
            </div>
            <span className="font-playfair text-white/80 text-sm">Galeria Gramado</span>
          </div>

          {/* Copyright */}
          <p className="font-montserrat text-white/50 text-xs text-center">
            © {new Date().getFullYear()} Galeria Gramado. Todos os direitos reservados.
          </p>

          {/* Decorative */}
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[#C5A059]/50 rounded-full" />
            <div className="w-2 h-2 bg-[#C5A059] rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#C5A059]/50 rounded-full" />
          </div>
        </div>
      </div>
    </footer>
  );
}