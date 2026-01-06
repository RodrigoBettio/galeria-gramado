import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
          alt="European Architecture"
          className="w-full h-full object-cover"
          style={{ filter: "sepia(60%) brightness(0.7) contrast(1.1)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#4B3619]/40 via-[#4B3619]/30 to-[#4B3619]/80" />
      </div>

      {/* Decorative Frame */}
      <div className="absolute inset-8 lg:inset-16 border border-[#C5A059]/30 rounded-lg pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto mb-8"
          />

          {/* Welcome Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-dancing text-[#C5A059] text-2xl lg:text-3xl mb-4"
          >
            Seja Bem Vindo!
          </motion.p>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-playfair text-white text-5xl sm:text-6xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            Galeria
            <span className="block text-[#C5A059]">Gramado</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="font-montserrat text-white/80 text-base lg:text-lg tracking-[0.15em] uppercase mb-12"
          >
            Arte Clássica em Bico de Pena
          </motion.p>

          {/* CTA Button */}
          <motion.a
            href="#sobre"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#C5A059] text-[#2D2D2D] font-montserrat font-semibold text-sm tracking-wider uppercase rounded-lg hover:bg-[#C5A059]/90 transition-all duration-300 shadow-xl shadow-[#C5A059]/20"
          >
            Explorar Galeria
          </motion.a>

          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto mt-12"
          />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#sobre"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/60 hover:text-[#C5A059] transition-colors cursor-pointer"
        >
          <span className="text-xs tracking-widest uppercase font-montserrat">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.a>
      </motion.div>

      {/* Corner Decorations */}
      <div className="absolute top-24 left-8 lg:left-16 w-16 h-16 border-l-2 border-t-2 border-[#C5A059]/40 rounded-tl-lg" />
      <div className="absolute top-24 right-8 lg:right-16 w-16 h-16 border-r-2 border-t-2 border-[#C5A059]/40 rounded-tr-lg" />
      <div className="absolute bottom-24 left-8 lg:left-16 w-16 h-16 border-l-2 border-b-2 border-[#C5A059]/40 rounded-bl-lg" />
      <div className="absolute bottom-24 right-8 lg:right-16 w-16 h-16 border-r-2 border-b-2 border-[#C5A059]/40 rounded-br-lg" />
    </section>
  );
}