import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Plus, LogOut, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductList from "@/components/admin/ProductList";
import ProductForm from "@/components/admin/ProductForm";

export default function Admin() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => base44.entities.Product.list("-created_date"),
  });

  const { data: user } = useQuery({
    queryKey: ["current-user"],
    queryFn: () => base44.auth.me(),
  });

  const deleteProductMutation = useMutation({
    mutationFn: (id) => base44.entities.Product.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["featured-products"] });
    },
  });

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta obra?")) {
      deleteProductMutation.mutate(id);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleLogout = async () => {
    await base44.auth.logout();
  };

  // Check if user is admin
  if (user && user.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#F3E5C2] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-playfair text-4xl text-[#2D2D2D] mb-4">Acesso Negado</h1>
          <p className="font-montserrat text-[#2D2D2D]/70">Você não tem permissão para acessar esta página.</p>
        </div>
      </div>
    );
  }

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
      <div className="bg-[#4B3619] shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border-2 border-[#C5A059] rounded-lg flex items-center justify-center">
                <span className="font-playfair text-[#C5A059] text-xl font-bold">G</span>
              </div>
              <div>
                <h1 className="font-playfair text-white text-lg font-semibold">Painel Administrativo</h1>
                <p className="font-montserrat text-[#C5A059] text-xs">Gerenciamento de Obras</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-6 shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#4B3619]/10 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-[#4B3619]" />
              </div>
              <div>
                <p className="font-montserrat text-[#2D2D2D]/60 text-sm">Total de Obras</p>
                <p className="font-playfair text-[#2D2D2D] text-2xl font-bold">{products.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg p-6 shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#C5A059]/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
              <div>
                <p className="font-montserrat text-[#2D2D2D]/60 text-sm">Em Destaque</p>
                <p className="font-playfair text-[#2D2D2D] text-2xl font-bold">
                  {products.filter(p => p.is_featured).length}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg p-6 shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#4B3619]/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📂</span>
              </div>
              <div>
                <p className="font-montserrat text-[#2D2D2D]/60 text-sm">Categorias</p>
                <p className="font-playfair text-[#2D2D2D] text-2xl font-bold">
                  {new Set(products.map(p => p.category)).size}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-between items-center mb-8"
        >
          <h2 className="font-playfair text-[#2D2D2D] text-3xl font-bold">Obras Cadastradas</h2>
          <Button
            onClick={() => setIsFormOpen(true)}
            className="bg-[#C5A059] hover:bg-[#B89952] text-white font-montserrat font-semibold"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nova Obra
          </Button>
        </motion.div>

        {/* Products List */}
        <ProductList
          products={products}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Product Form Modal */}
      {isFormOpen && (
        <ProductForm
          product={editingProduct}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}