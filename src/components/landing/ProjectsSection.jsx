import React from "react";
import { motion } from "framer-motion";
import { Brush, Image, Handshake, ArrowRight } from "lucide-react";

export default function ProjectsSection() {
  const projects = [
    {
      icon: Brush,
      title: "Obras Sob Encomenda",
      description: "Peças exclusivas criadas especialmente para você. Transforme sua visão em arte atemporal com o traço único de Giovanni Bocchi.",
      cta: "Solicitar Orçamento",
    },
    {
      icon: Image,
      title: "Galeria",
      description: "Explore nossa coleção de obras originais e reproduções autorizadas. Cada peça carrega a essência da arte clássica.",
      cta: "Ver Coleção",
    },
    {
      icon: Handshake,
      title: "Parcerias",
      description: "Oportunidades para galerias, colecionadores e instituições que desejam promover a arte clássica em seus espaços.",
      cta: "Saiba Mais",
    },
  ];

  return (
    <section id="projetos" className="relative bg-[#F3E5C2] py-20 lg:py-32 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#4B3619]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C5A059]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-[1px] bg-[#C5A059]" />
            <span className="font-montserrat text-[#C5A059] text-sm tracking-[0.2em] uppercase">Nossos Serviços</span>
            <div className="w-16 h-[1px] bg-[#C5A059]" />
          </div>
          <h2 className="font-playfair text-[#4B3619] text-4xl lg:text-6xl font-bold">
            Projetos
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="relative bg-white rounded-lg p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-[#C5A059]/10 rotate-45 translate-x-14 -translate-y-14 group-hover:bg-[#C5A059]/20 transition-colors duration-500" />
                </div>

                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-[#4B3619] rounded-lg flex items-center justify-center shadow-lg group-hover:bg-[#C5A059] transition-colors duration-500">
                    <project.icon className="w-8 h-8 text-[#C5A059] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-playfair text-[#2D2D2D] text-xl lg:text-2xl font-semibold mb-4">
                  {project.title}
                </h3>
                <p className="font-montserrat text-[#2D2D2D]/70 text-sm lg:text-base leading-relaxed mb-8 flex-grow">
                  {project.description}
                </p>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-[#4B3619] text-white font-montserrat text-sm tracking-wide uppercase rounded-lg hover:bg-[#3a2a13] transition-colors duration-300 group/btn"
                >
                  {project.cta}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </div>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-[#C5A059] rounded-full group-hover:w-1/2 transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex justify-center mt-16 lg:mt-20"
        >
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-[#C5A059] rounded-full" />
            <div className="w-3 h-3 bg-[#4B3619] rounded-full" />
            <div className="w-2 h-2 bg-[#C5A059] rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}