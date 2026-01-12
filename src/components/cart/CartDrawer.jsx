import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, MessageCircle } from "lucide-react";
import { useCart } from "./CartContext";
import { Button } from "@/components/ui/button";

export default function CartDrawer() {
  const { cartItems, cartCount, isCartOpen, removeFromCart, closeCart, clearCart } = useCart();

  const checkoutWithWhatsApp = () => {
    if (cartItems.length === 0) return;

    let message = "Olá! Gostaria de solicitar um orçamento para os seguintes quadros:%0A%0A";
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.size})%0A`;
    });

    message += "%0AAguardo retorno. Obrigado!";

    const whatsappUrl = `https://wa.me/5551999373017?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[450px] bg-[#F3E5C2] shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#4B3619] p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#C5A059]/20 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-[#C5A059]" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="font-playfair text-white text-xl font-semibold">
                    Carrinho de Orçamentos
                  </h2>
                  <p className="font-montserrat text-[#C5A059] text-xs">
                    {cartCount} {cartCount === 1 ? "item" : "itens"}
                  </p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 bg-[#4B3619]/10 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-12 h-12 text-[#4B3619]/30" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-playfair text-[#2D2D2D] text-xl font-semibold mb-2">
                    Carrinho Vazio
                  </h3>
                  <p className="font-montserrat text-[#2D2D2D]/60 text-sm">
                    Adicione obras da galeria para solicitar orçamento
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="bg-white rounded-lg p-4 shadow-md flex gap-4 group hover:shadow-lg transition-shadow"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <div className="absolute inset-0 border-4 border-[#C5A059] rounded-md" />
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-sm"
                          style={{ filter: "sepia(20%)" }}
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-playfair text-[#2D2D2D] text-sm font-semibold mb-1 truncate">
                          {item.name}
                        </h4>
                        <p className="font-montserrat text-[#C5A059] text-xs mb-1">
                          {item.category}
                        </p>
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-[#4B3619]/10 rounded text-[#4B3619] text-xs font-montserrat font-medium">
                          {item.size}
                        </div>
                        {item.price && (
                          <p className="font-montserrat text-[#4B3619] text-sm font-bold mt-1">
                            R$ {item.price.toFixed(2)}
                          </p>
                        )}
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex-shrink-0 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="bg-white border-t-2 border-[#4B3619]/10 p-6 space-y-3">
                <Button
                  onClick={checkoutWithWhatsApp}
                  className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white py-6 rounded-lg font-montserrat font-semibold text-sm tracking-wide uppercase shadow-lg flex items-center justify-center gap-3"
                >
                  <MessageCircle className="w-5 h-5" fill="white" />
                  Finalizar no WhatsApp
                </Button>
                <button
                  onClick={clearCart}
                  className="w-full text-[#2D2D2D]/60 hover:text-red-600 font-montserrat text-xs uppercase tracking-wide transition-colors"
                >
                  Limpar Carrinho
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}