import React from "react";
import { motion } from "framer-motion";
import { Edit2, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function ProductList({ products, isLoading, onEdit, onDelete }) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-[#4B3619]/5 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <div className="w-20 h-20 bg-[#4B3619]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">🎨</span>
        </div>
        <h3 className="font-playfair text-[#2D2D2D] text-xl font-semibold mb-2">
          Nenhuma obra cadastrada
        </h3>
        <p className="font-montserrat text-[#2D2D2D]/60 text-sm">
          Clique em "Nova Obra" para adicionar seu primeiro produto
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#4B3619]/5">
              <TableHead className="font-montserrat">Imagem</TableHead>
              <TableHead className="font-montserrat">Nome</TableHead>
              <TableHead className="font-montserrat">Categoria</TableHead>
              <TableHead className="font-montserrat">Tamanhos</TableHead>
              <TableHead className="font-montserrat text-center">Destaque</TableHead>
              <TableHead className="font-montserrat text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                className="hover:bg-[#F3E5C2]/30 transition-colors"
              >
                <TableCell>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-[#C5A059] to-[#B89952] p-0.5 rounded">
                    <div className="w-full h-full bg-white p-1 rounded-sm">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-sm"
                        style={{ filter: "sepia(15%)" }}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-playfair text-[#2D2D2D] font-semibold">
                      {product.name}
                    </p>
                    {product.description && (
                      <p className="font-montserrat text-[#2D2D2D]/60 text-xs line-clamp-1 mt-1">
                        {product.description}
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="bg-[#C5A059]/20 text-[#4B3619] border-[#C5A059]/30"
                  >
                    {product.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {(product.sizes || []).map((size, i) => (
                      <span
                        key={i}
                        className="font-montserrat text-[#2D2D2D]/70 text-xs bg-[#4B3619]/5 px-2 py-1 rounded"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {product.is_featured ? (
                    <Star className="w-5 h-5 text-[#C5A059] fill-[#C5A059] mx-auto" />
                  ) : (
                    <Star className="w-5 h-5 text-[#2D2D2D]/20 mx-auto" />
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      onClick={() => onEdit(product)}
                      variant="ghost"
                      size="icon"
                      className="text-[#4B3619] hover:bg-[#4B3619]/10"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => onDelete(product.id)}
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}