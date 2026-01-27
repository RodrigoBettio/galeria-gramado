import React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export default function ProductCard({ product, index, onViewDetails }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
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
                src={product.image_urls?.[0] || product.image_url}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ filter: "sepia(15%) contrast(1.05)" }}
              />
              
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#4B3619]/80 via-[#4B3619]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* View Details Button */}
              <motion.button
                onClick={onViewDetails}
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
        <p className="font-montserrat text-[#4B3619]/60 text-xs uppercase tracking-wide mb-2">
          {product.category}
        </p>
        {product.price && (
          <p className="font-montserrat text-[#4B3619] text-lg font-bold">
            R$ {product.price.toFixed(2)}
          </p>
        )}
      </div>

      {/* Shadow Effect */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-[#4B3619]/10 rounded-full blur-xl group-hover:w-full transition-all duration-500" />
    </motion.div>
  );
}