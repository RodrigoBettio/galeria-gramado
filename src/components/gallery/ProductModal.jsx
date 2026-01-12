import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { Button } from "@/components/ui/button";

export default function ProductModal({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "60x40cm");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToCart, openCart } = useCart();

  const imageUrls = product.image_urls || (product.image_url ? [product.image_url] : []);

  const handleAddToCart = () => {
    const success = addToCart(product, selectedSize);
    if (success) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        openCart();
      }, 1000);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-[#F3E5C2] rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-[#4B3619]/80 hover:bg-[#4B3619] text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid md:grid-cols-2 gap-8 p-8 max-h-[90vh] overflow-y-auto">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="relative">
                {/* Ornate Frame */}
                <div className="relative bg-gradient-to-br from-[#C5A059] via-[#D4AF6A] to-[#C5A059] p-2 rounded-lg shadow-2xl">
                  <div className="relative bg-gradient-to-br from-[#B89952] to-[#C5A059] p-3 rounded-lg">
                    <div className="relative bg-[#F5F0E8] p-4 rounded-sm">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                        <img
                          src={imageUrls[selectedImageIndex]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          style={{ filter: "sepia(15%) contrast(1.05)" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Corners */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-[#C5A059] rounded-tl-xl" />
                <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-[#C5A059] rounded-tr-xl" />
                <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-[#C5A059] rounded-bl-xl" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-[#C5A059] rounded-br-xl" />
              </div>

              {/* Image Thumbnails */}
              {imageUrls.length > 1 && (
                <div className="flex gap-2 justify-center flex-wrap">
                  {imageUrls.map((url, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? "border-[#C5A059] scale-110"
                          : "border-[#4B3619]/20 hover:border-[#C5A059]/50"
                      }`}
                    >
                      <img
                        src={url}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                        style={{ filter: "sepia(15%)" }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Gravura Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C5A059]/30 rounded-lg mb-3 border border-[#C5A059]/50">
                  <span className="font-montserrat text-[#4B3619] text-xs uppercase tracking-wider font-bold">
                    Gravura em Bico de Pena
                  </span>
                </div>

                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4B3619]/10 rounded-full mb-4 ml-2">
                  <span className="w-2 h-2 bg-[#4B3619] rounded-full" />
                  <span className="font-montserrat text-[#4B3619]/70 text-xs uppercase tracking-wider font-semibold">
                    {product.category}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-playfair text-[#2D2D2D] text-3xl lg:text-4xl font-bold mb-4">
                  {product.name}
                </h2>

                {/* Price */}
                {product.price && (
                  <div className="mb-4">
                    <span className="font-playfair text-[#C5A059] text-3xl font-bold">
                      R$ {product.price.toFixed(2)}
                    </span>
                  </div>
                )}

                {/* Description */}
                {product.description && (
                  <p className="font-montserrat text-[#2D2D2D]/70 text-base leading-relaxed mb-6">
                    {product.description}
                  </p>
                )}

                {/* Divider */}
                <div className="h-px bg-[#4B3619]/20 my-6" />

                {/* Size Selection */}
                <div className="mb-8">
                  <label className="font-montserrat text-[#2D2D2D] text-sm font-semibold uppercase tracking-wide mb-3 block">
                    Selecione o Tamanho
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {(product.sizes || ["60x40cm", "100x80cm", "120x90cm"]).map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`relative py-3 px-4 rounded-lg font-montserrat text-sm font-semibold transition-all duration-300 ${
                          selectedSize === size
                            ? "bg-[#4B3619] text-white shadow-lg scale-105"
                            : "bg-white text-[#2D2D2D] hover:bg-[#4B3619]/10 shadow-md"
                        }`}
                      >
                        {size}
                        {selectedSize === size && (
                          <motion.div
                            layoutId="selectedSize"
                            className="absolute inset-0 border-2 border-[#C5A059] rounded-lg"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div>
                <Button
                  onClick={handleAddToCart}
                  disabled={showSuccess}
                  className="w-full bg-[#C5A059] hover:bg-[#B89952] text-white py-6 rounded-lg font-montserrat font-semibold text-sm tracking-wide uppercase shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  {showSuccess ? (
                    <>
                      <Check className="w-5 h-5" />
                      Adicionado ao Carrinho!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" strokeWidth={2} />
                      Adicionar ao Carrinho
                    </>
                  )}
                </Button>
                {!product.price && (
                  <p className="font-montserrat text-[#2D2D2D]/50 text-xs text-center mt-3">
                    * Os preços serão informados via WhatsApp
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Success Animation Overlay */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#4B3619]/90 flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="w-20 h-20 bg-[#C5A059] rounded-full flex items-center justify-center"
                >
                  <Check className="w-10 h-10 text-white" strokeWidth={3} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}