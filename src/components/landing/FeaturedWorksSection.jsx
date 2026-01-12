import React from "react";
import { motion } from "framer-motion";
import { Plus, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useCart } from "@/components/cart/CartContext";
import ProductCard from "@/components/gallery/ProductCard";
import { useState } from "react";
import ProductModal from "@/components/gallery/ProductModal";

export default function FeaturedWorksSection() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const allProducts = await base44.entities.Product.list();
      return allProducts.filter(p => p.is_featured === true);
    },
  });

  return (
    <>
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
              <span className="font-montserrat text-[#C5A059] text-sm tracking-[0.2em] uppercase">
                Coleção Premium
              </span>
              <div className="w-16 h-[1px] bg-[#C5A059]" />
            </div>
            <h2 className="font-playfair text-[#4B3619] text-4xl lg:text-6xl font-bold mb-4">
              Obras em Destaque
            </h2>
            <p className="font-montserrat text-[#2D2D2D]/70 text-base lg:text-lg max-w-2xl mx-auto">
              Seleção especial das obras mais emblemáticas de Giovanni Bocchi
            </p>
          </motion.div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-white/50 rounded-lg h-96" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-montserrat text-[#2D2D2D]/60">
                Nenhuma obra em destaque no momento
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            >
              {products.slice(0, 3).map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onViewDetails={() => setSelectedProduct(product)}
                />
              ))}
            </motion.div>
          )}

          {/* View More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex justify-center"
          >
            <Link to={createPageUrl("Gallery")}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-3 px-8 py-4 bg-[#4B3619] text-white font-montserrat font-semibold text-sm tracking-wider uppercase rounded-lg hover:bg-[#3a2a13] transition-all duration-300 shadow-xl"
              >
                Ver Galeria Completa
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="flex justify-center mt-12"
          >
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-[#C5A059] rounded-full" />
              <div className="w-3 h-3 bg-[#4B3619] rounded-full" />
              <div className="w-2 h-2 bg-[#C5A059] rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}