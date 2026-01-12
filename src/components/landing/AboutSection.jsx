import React from "react";
import { motion } from "framer-motion";
import { Award, Star } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="sobre" className="relative bg-[#F3E5C2] py-20 lg:py-32">
      {/* Subtle Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234B3619' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Artist Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative max-w-sm mx-auto lg:mx-0"
          >
            <div className="relative">
              {/* Frame Decoration */}
              <div className="absolute -inset-3 lg:-inset-4 border-2 border-[#C5A059]/30 rounded-lg" />
              <div className="absolute -inset-5 lg:-inset-6 border border-[#4B3619]/10 rounded-lg" />
              
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-lg shadow-2xl">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695d83a2796b79f316117048/c045affeb_image.png"
                  alt="Giovanni Bocchi"
                  className="w-full aspect-[3/4] object-cover"
                  style={{ filter: "grayscale(100%) contrast(1.1)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4B3619]/40 to-transparent" />
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -bottom-3 -right-3 lg:-bottom-5 lg:-right-5 bg-[#4B3619] p-3 lg:p-4 rounded-lg shadow-xl"
              >
                <Award className="w-5 h-5 lg:w-7 lg:h-7 text-[#C5A059] mb-1" />
                <p className="font-playfair text-white text-xs lg:text-sm font-semibold">4x Louvre</p>
                <p className="text-[#C5A059] text-[10px] lg:text-xs">Paris, França</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Artist Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:pl-8"
          >
            {/* Section Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-[#C5A059]" />
              <span className="font-montserrat text-[#C5A059] text-sm tracking-[0.2em] uppercase">O Artista</span>
            </div>

            {/* Title */}
            <h2 className="font-playfair text-[#2D2D2D] text-4xl lg:text-6xl font-bold mb-4 leading-tight">
              Giovanni
              <span className="block text-[#4B3619]">Bocchi</span>
            </h2>

            {/* Subtitle */}
            <p className="font-dancing text-[#C5A059] text-2xl lg:text-3xl mb-8">
              Arte Clássica em Bico de Pena
            </p>

            {/* Description */}
            <div className="space-y-4 mb-8">
              <p className="font-montserrat text-[#2D2D2D]/80 text-base lg:text-lg leading-relaxed">
                Com traços que transcendem o tempo, Giovanni Bocchi é reconhecido internacionalmente 
                por suas obras em bico de pena que capturam a essência da arquitetura europeia e 
                paisagens bucólicas com precisão extraordinária.
              </p>
              <p className="font-montserrat text-[#2D2D2D]/80 text-base lg:text-lg leading-relaxed">
                Cada peça é uma jornada pela história e pela beleza, criada com dedicação artesanal 
                que poucos mestres contemporâneos dominam.
              </p>
            </div>

            {/* Highlight Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-[#4B3619] p-6 lg:p-8 rounded-lg shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#C5A059]/20 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-[#C5A059]" fill="#C5A059" />
                  </div>
                </div>
                <div>
                  <h3 className="font-playfair text-white text-lg lg:text-xl font-semibold mb-2">
                    Destaque Internacional
                  </h3>
                  <p className="font-montserrat text-white/80 text-sm lg:text-base leading-relaxed">
                    <span className="text-[#C5A059] font-semibold">O primeiro artista gaúcho</span> a 
                    expor 4 vezes no prestigiado Museu do Louvre, em Paris.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}