import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Plus, LogOut, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ProductTable from "@/components/admin/ProductTable";
import ProductFormModal from "@/components/admin/ProductFormModal";

export default function Admin() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["current-user"],
    queryFn: () => base44.auth.me(),
  });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => base44.entities.Product.list("-created_date"),
  });

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleLogout = async () => {
    await base44.auth.logout();
  };

  // Check if user is admin
  if (user && user.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#F3E5C2] flex items-center justify-center p-6">
        <div className="bg-white rounded-lg p-8 shadow-xl text-center max-w-md">
          <h2 className="font-playfair text-[#2D2D2D] text-2xl font-bold mb-4">
            Acesso Negado
          </h2>
          <p className="font-montserrat text-[#2D2D2D]/70 mb-6">
            Você não tem permissão para acessar o painel administrativo.
          </p>
          <Link to={createPageUrl("Home")}>
            <button className="px-6 py-3 bg-[#4B3619] text-white font-montserrat rounded-lg hover:bg-[#3a2a13] transition-colors">
              Voltar para Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3E5C2]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap');
          .font-playfair { font-family: 'Playfair Display', serif; }
          .font-montserrat { font-family: 'Montserrat', sans-serif; }
        `}
      </style>

      {/* Header */}
      <header className="bg-[#4B3619] sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border-2 border-[#C5A059] rounded-lg flex items-center justify-center">
                <span className="font-playfair text-[#C5A059] text-xl font-bold">G</span>
              </div>
              <div>
                <h1 className="font-playfair text-white text-lg font-semibold">
                  Painel Administrativo
                </h1>
                <p className="font-montserrat text-[#C5A059] text-xs">
                  Galeria Gramado
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link to={createPageUrl("Home")}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-montserrat text-sm"
                >
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Voltar ao Site</span>
                </motion.button>
              </Link>
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-montserrat text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sair</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-playfair text-[#2D2D2D] text-3xl lg:text-4xl font-bold mb-2">
              Gerenciar Obras
            </h2>
            <p className="font-montserrat text-[#2D2D2D]/60 text-sm">
              {products.length} {products.length === 1 ? "obra cadastrada" : "obras cadastradas"}
            </p>
          </div>
          <motion.button
            onClick={handleCreate}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-[#C5A059] text-white font-montserrat font-semibold text-sm tracking-wide uppercase rounded-lg hover:bg-[#B89952] transition-colors shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Nova Obra
          </motion.button>
        </div>

        {/* Products Table */}
        <ProductTable
          products={products}
          isLoading={isLoading}
          onEdit={handleEdit}
        />
      </div>

      {/* Product Form Modal */}
      {isFormOpen && (
        <ProductFormModal
          product={editingProduct}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}