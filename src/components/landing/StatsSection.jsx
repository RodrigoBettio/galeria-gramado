import React from "react";
import { motion } from "framer-motion";

export default function StatsSection() {
  const stats = [
    { number: "92", label: "Exposições", suffix: "" },
    { number: "15.000", label: "Peças", suffix: "+" },
    { number: "11", label: "Países", suffix: "" },
    { number: "9", label: "Premiações", suffix: "" },
  ];

  return (
    <section className="relative">
      {/* Wave SVG Top */}
      <div className="relative h-24 lg:h-32 bg-[#F3E5C2]">
        <svg
          className="absolute bottom-0 w-full h-24 lg:h-32"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            fill="#4B3619"
          />
        </svg>
      </div>

      {/* Stats Content */}
      <div className="bg-[#4B3619] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="relative inline-block mb-4">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.6, type: "spring" }}
                    className="font-playfair text-white text-5xl sm:text-6xl lg:text-7xl font-bold"
                  >
                    {stat.number}
                  </motion.span>
                  <span className="font-playfair text-[#C5A059] text-3xl lg:text-4xl font-bold">
                    {stat.suffix}
                  </span>
                </div>
                <p className="font-montserrat text-white/70 text-sm lg:text-base tracking-[0.15em] uppercase">
                  {stat.label}
                </p>
                
                {/* Decorative Line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "40px" }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
                  className="h-[2px] bg-[#C5A059] mx-auto mt-4"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-32 border border-[#C5A059]/10 rounded-full -translate-x-1/2" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 border border-[#C5A059]/10 rounded-full translate-x-1/2" />
      </div>

      {/* Wave SVG Bottom */}
      <div className="relative h-24 lg:h-32 bg-[#F3E5C2]">
        <svg
          className="absolute top-0 w-full h-24 lg:h-32"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0L48 10C96 20 192 40 288 50C384 60 480 60 576 55C672 50 768 40 864 35C960 30 1056 30 1152 35C1248 40 1344 50 1392 55L1440 60V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0Z"
            fill="#4B3619"
          />
        </svg>
      </div>
    </section>
  );
}