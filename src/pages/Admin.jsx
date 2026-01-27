import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Plus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductTable from "@/components/admin/ProductTable";
import ProductFormModal from "@/components/admin/ProductFormModal";

export default function Admin() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["adminProducts"],
    queryFn: () => base44.entities.Product.list("-created_date"),
  });

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
    handleCloseForm();
  };

  return (
    <div className="min-h-screen bg-[#F3E5C2]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap');
          
          .font-playfair { font-family: 'Playfair Display', serif; }
          .font-montserrat { font-family: 'Montserrat', sans-serif; }
        `}
      </style>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-[#4B3619] shadow-lg sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border-2 border-[#C5A059] rounded-lg flex items-center justify-center">
                <span className="font-playfair text-[#C5A059] text-xl font-bold">G</span>
              </div>
              <div>
                <h1 className="font-playfair text-white text-lg font-semibold">
                  Painel Administrativo
                </h1>
                <p className="text-[#C5A059] text-xs">Gramado Galeria</p>
              </div>
            </div>

            <button
              onClick={() => base44.auth.logout()}
              className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-montserrat text-sm"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Title & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h2 className="font-playfair text-[#2D2D2D] text-3xl lg:text-4xl font-bold mb-2">
              Gerenciar Obras
            </h2>
            <p className="font-montserrat text-[#2D2D2D]/60 text-sm">
              Total de {products.length} obras cadastradas
            </p>
          </div>

          <Button
            onClick={() => {
              setEditingProduct(null);
              setIsFormOpen(true);
            }}
            className="bg-[#C5A059] hover:bg-[#B89952] text-white font-montserrat font-semibold tracking-wide shadow-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Nova Obra
          </Button>
        </motion.div>

        {/* Products Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ProductTable
            products={products}
            isLoading={isLoading}
            onEdit={handleEdit}
            onSuccess={handleSuccess}
          />
        </motion.div>
      </div>

      {/* Product Form Modal */}
      {isFormOpen && (
        <ProductFormModal
          product={editingProduct}
          onClose={handleCloseForm}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}