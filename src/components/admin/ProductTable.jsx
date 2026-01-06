import React from "react";
import { motion } from "framer-motion";
import { Pencil, Trash2, Star, Image as ImageIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Badge } from "@/components/ui/badge";

export default function ProductTable({ products, isLoading, onEdit }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (productId) => base44.entities.Product.delete(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["featured-products"] });
    },
  });

  const handleDelete = async (product) => {
    if (window.confirm(`Tem certeza que deseja excluir "${product.name}"?`)) {
      deleteMutation.mutate(product.id);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-12 text-center">
        <div className="w-16 h-16 bg-[#4B3619]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <ImageIcon className="w-8 h-8 text-[#4B3619]/30" />
        </div>
        <h3 className="font-playfair text-[#2D2D2D] text-xl font-semibold mb-2">
          Nenhuma obra cadastrada
        </h3>
        <p className="font-montserrat text-[#2D2D2D]/60 text-sm">
          Clique em "Nova Obra" para começar
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#4B3619] text-white">
            <tr>
              <th className="px-6 py-4 text-left font-montserrat text-xs uppercase tracking-wider">
                Imagem
              </th>
              <th className="px-6 py-4 text-left font-montserrat text-xs uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-4 text-left font-montserrat text-xs uppercase tracking-wider">
                Categoria
              </th>
              <th className="px-6 py-4 text-left font-montserrat text-xs uppercase tracking-wider">
                Tamanhos
              </th>
              <th className="px-6 py-4 text-center font-montserrat text-xs uppercase tracking-wider">
                Destaque
              </th>
              <th className="px-6 py-4 text-right font-montserrat text-xs uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product, index) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-[#F3E5C2]/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-[#C5A059]/30">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      style={{ filter: "sepia(15%)" }}
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-playfair text-[#2D2D2D] font-semibold">
                    {product.name}
                  </div>
                  {product.price && (
                    <div className="font-montserrat text-[#C5A059] text-xs mt-1">
                      {product.price}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <Badge className="bg-[#4B3619]/10 text-[#4B3619] border-[#4B3619]/20">
                    {product.category}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="font-montserrat text-[#2D2D2D]/70 text-xs">
                    {product.sizes?.join(", ") || "N/A"}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  {product.is_featured && (
                    <Star className="w-5 h-5 text-[#C5A059] fill-[#C5A059] inline-block" />
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onEdit(product)}
                      className="p-2 text-[#4B3619] hover:bg-[#4B3619]/10 rounded-lg transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(product)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      disabled={deleteMutation.isLoading}
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}