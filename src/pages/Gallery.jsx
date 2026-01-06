import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Ship, Map, Building2, Palette, ShoppingBag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { useCart } from "@/components/cart/CartContext";
import ProductCard from "@/components/gallery/ProductCard";
import ProductModal from "@/components/gallery/ProductModal";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Gallery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { openCart, cartCount } = useCart();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => base44.entities.Product.list(),
  });

  const categories = [
    { name: "Todos", icon: Palette },
    { name: "Navios", icon: Ship },
    { name: "Mapas", icon: Map },
    { name: "Arquitetura", icon: Building2 },
    { name: "Outros", icon: Palette },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#F3E5C2]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&family=Dancing+Script:wght@400;500;600;700&display=swap');
          
          .font-playfair { font-family: 'Playfair Display', serif; }
          .font-cursive { font-family: 'Great Vibes', cursive; }
          .font-montserrat { font-family: 'Montserrat', sans-serif; }
        `}
      </style>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-[#4B3619] sticky top-0 z-40 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <Link to={createPageUrl("Home")} className="flex items-center gap-3">
              <div className="w-10 h-10 border-2 border-[#C5A059] rounded-lg flex items-center justify-center">
                <span className="font-playfair text-[#C5A059] text-xl font-bold">G</span>
              </div>
              <div>
                <h1 className="font-playfair text-white text-lg font-semibold">Galeria Gramado</h1>
              </div>
            </Link>

            <button
              onClick={openCart}
              className="relative p-2 text-white hover:text-[#C5A059] transition-colors"
            >
              <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C5A059] text-[#2D2D2D] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Hero */}
      <div className="bg-gradient-to-b from-[#4B3619] to-[#F3E5C2] pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-playfair text-white text-4xl lg:text-6xl font-bold mb-4">
              Nossa Galeria
            </h1>
            <p className="font-montserrat text-[#C5A059] text-base lg:text-lg tracking-wide">
              Explore obras únicas em bico de pena
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-12 pb-20">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4B3619]/40" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar obras por nome..."
              className="w-full h-14 pl-12 pr-6 bg-[#E5D4AA] border-0 rounded-lg font-montserrat text-[#2D2D2D] placeholder:text-[#2D2D2D]/40 focus:ring-2 focus:ring-[#C5A059] shadow-lg"
            />
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              onClick={() => setSelectedCategory(category.name)}
              className={`group relative h-24 rounded-lg overflow-hidden transition-all duration-300 ${
                selectedCategory === category.name
                  ? "bg-[#4B3619] shadow-xl scale-105"
                  : "bg-white hover:bg-[#4B3619]/10 shadow-md hover:shadow-lg"
              }`}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <category.icon
                  className={`w-6 h-6 transition-colors ${
                    selectedCategory === category.name
                      ? "text-[#C5A059]"
                      : "text-[#4B3619] group-hover:text-[#C5A059]"
                  }`}
                  strokeWidth={1.5}
                />
                <span
                  className={`font-montserrat text-sm font-semibold transition-colors ${
                    selectedCategory === category.name
                      ? "text-white"
                      : "text-[#2D2D2D] group-hover:text-[#4B3619]"
                  }`}
                >
                  {category.name}
                </span>
              </div>
              {selectedCategory === category.name && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#C5A059]"
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white/50 rounded-lg h-96" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-[#4B3619]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-[#4B3619]/30" />
            </div>
            <h3 className="font-playfair text-[#2D2D2D] text-2xl font-semibold mb-2">
              Nenhuma obra encontrada
            </h3>
            <p className="font-montserrat text-[#2D2D2D]/60">
              Tente ajustar seus filtros de busca
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onViewDetails={() => setSelectedProduct(product)}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}