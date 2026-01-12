import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ProductModal from "@/components/gallery/ProductModal";

export default function FeaturedWorks() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data: featuredProducts = [], isLoading } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      const allProducts = await base44.entities.Product.list();
      return allProducts.filter(product => product.is_featured === true);
    },
  });

  return (
    <section className="relative bg-[#F3E5C2] py-20 lg:py-32 overflow-hidden">
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
            <span className="font-montserrat text-[#C5A059] text-sm tracking-[0.2em] uppercase">Seleção Especial</span>
            <div className="w-16 h-[1px] bg-[#C5A059]" />
          </div>
          <h2 className="font-playfair text-[#4B3619] text-4xl lg:text-6xl font-bold">
            Obras em Destaque
          </h2>
        </motion.div>

        {/* Featured Products Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white/50 rounded-lg h-[500px]" />
              </div>
            ))}
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="font-montserrat text-[#2D2D2D]/60 text-lg">
              Nenhuma obra em destaque no momento.
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-12"
          >
            {featuredProducts.slice(0, 3).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="group relative"
              >
                {/* Ornate Frame Container */}
                <div className="relative bg-gradient-to-br from-[#C5A059] via-[#D4AF6A] to-[#C5A059] p-1.5 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500">
                  {/* Inner Frame */}
                  <div className="relative bg-gradient-to-br from-[#B89952] to-[#C5A059] p-2 rounded-lg">
                    {/* White Mat */}
                    <div className="relative bg-[#F5F0E8] p-3 rounded-sm">
                      {/* Image Container */}
                      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-[#4B3619]/5">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          style={{ filter: "sepia(15%) contrast(1.05)" }}
                        />
                        
                        {/* Overlay on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#4B3619]/80 via-[#4B3619]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* View Details Button */}
                        <motion.button
                          onClick={() => setSelectedProduct(product)}
                          whileHover={{ scale: 1.1, rotate: 90 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute bottom-4 right-4 w-12 h-12 bg-[#C5A059] rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 hover:bg-[#D4AF6A]"
                        >
                          <Plus className="w-6 h-6 text-white" strokeWidth={2.5} />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Corner Ornaments */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#4B3619]/20 rounded-tl-lg" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#4B3619]/20 rounded-tr-lg" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#4B3619]/20 rounded-bl-lg" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#4B3619]/20 rounded-br-lg" />
                </div>

                {/* Product Info */}
                <div className="mt-4 text-center">
                  <h3 className="font-playfair text-[#2D2D2D] text-lg font-semibold mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="font-montserrat text-[#C5A059] text-sm uppercase tracking-wide">
                    {product.category}
                  </p>
                </div>

                {/* Shadow Effect */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-[#4B3619]/10 rounded-full blur-xl group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Ver Mais Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <Link to={createPageUrl("Gallery")}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 px-8 py-4 bg-[#4B3619] text-white font-montserrat font-semibold text-sm tracking-wider uppercase rounded-lg hover:bg-[#3a2a13] transition-all duration-300 shadow-xl"
            >
              Ver Galeria Completa
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex justify-center mt-16 lg:mt-20"
        >
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-[#C5A059] rounded-full" />
            <div className="w-3 h-3 bg-[#4B3619] rounded-full" />
            <div className="w-2 h-2 bg-[#C5A059] rounded-full" />
          </div>
        </motion.div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}