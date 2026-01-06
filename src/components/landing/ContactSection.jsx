import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Endereço",
      details: ["Rua das Hortênsias, 1500", "Gramado - RS, Brasil"],
    },
    {
      icon: Phone,
      title: "Telefone",
      details: ["+55 (54) 3286-1234", "+55 (54) 99999-0000"],
    },
    {
      icon: Mail,
      title: "E-mail",
      details: ["contato@galeriagramado.com.br", "vendas@galeriagramado.com.br"],
    },
    {
      icon: Clock,
      title: "Horário",
      details: ["Seg - Sáb: 10h às 19h", "Dom: 14h às 18h"],
    },
  ];

  return (
    <section id="contato" className="relative bg-[#4B3619] py-20 lg:py-32 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#F3E5C2] to-transparent opacity-5" />
      <div className="absolute -top-32 -right-32 w-64 h-64 border border-[#C5A059]/10 rounded-full" />
      <div className="absolute -bottom-48 -left-48 w-96 h-96 border border-[#C5A059]/10 rounded-full" />

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
            <span className="font-montserrat text-[#C5A059] text-sm tracking-[0.2em] uppercase">Fale Conosco</span>
            <div className="w-16 h-[1px] bg-[#C5A059]" />
          </div>
          <h2 className="font-playfair text-white text-4xl lg:text-6xl font-bold">
            Contato
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-playfair text-white text-2xl lg:text-3xl font-semibold mb-8">
              Entre em Contato
            </h3>
            <p className="font-montserrat text-white/70 text-base lg:text-lg leading-relaxed mb-10">
              Estamos à disposição para atendê-lo. Entre em contato para 
              conhecer nossas obras, solicitar orçamentos ou agendar uma visita.
            </p>

            <div className="grid sm:grid-cols-2 gap-8 mb-10">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-[#C5A059]/20 rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#C5A059]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-montserrat text-[#C5A059] text-sm tracking-wide uppercase mb-2">
                      {item.title}
                    </h4>
                    {item.details.map((detail, i) => (
                      <p key={i} className="font-montserrat text-white/80 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="font-montserrat text-white/60 text-sm">Siga-nos:</span>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-[#C5A059]/20 rounded-lg flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059] hover:text-white transition-all duration-300"
              >
                <Instagram className="w-5 h-5" strokeWidth={1.5} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-[#C5A059]/20 rounded-lg flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059] hover:text-white transition-all duration-300"
              >
                <Facebook className="w-5 h-5" strokeWidth={1.5} />
              </motion.a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-[#C5A059] rounded-lg p-8 lg:p-10 shadow-2xl">
              <h3 className="font-playfair text-[#2D2D2D] text-xl lg:text-2xl font-semibold mb-6">
                Envie sua Mensagem
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="font-montserrat text-[#2D2D2D] text-sm mb-2 block">
                    Nome Completo
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Seu nome"
                    className="bg-white/90 border-0 rounded-lg h-12 font-montserrat text-[#2D2D2D] placeholder:text-[#2D2D2D]/50 focus:ring-2 focus:ring-[#4B3619]"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-montserrat text-[#2D2D2D] text-sm mb-2 block">
                      E-mail
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="seu@email.com"
                      className="bg-white/90 border-0 rounded-lg h-12 font-montserrat text-[#2D2D2D] placeholder:text-[#2D2D2D]/50 focus:ring-2 focus:ring-[#4B3619]"
                    />
                  </div>
                  <div>
                    <label className="font-montserrat text-[#2D2D2D] text-sm mb-2 block">
                      Telefone
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(00) 00000-0000"
                      className="bg-white/90 border-0 rounded-lg h-12 font-montserrat text-[#2D2D2D] placeholder:text-[#2D2D2D]/50 focus:ring-2 focus:ring-[#4B3619]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-montserrat text-[#2D2D2D] text-sm mb-2 block">
                    Mensagem
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Como podemos ajudá-lo?"
                    rows={5}
                    className="bg-white/90 border-0 rounded-lg font-montserrat text-[#2D2D2D] placeholder:text-[#2D2D2D]/50 focus:ring-2 focus:ring-[#4B3619] resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-[#4B3619] text-white font-montserrat text-sm tracking-wider uppercase rounded-lg hover:bg-[#3a2a13] transition-colors duration-300 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  Enviar Mensagem
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}