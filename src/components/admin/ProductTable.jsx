import React from "react";
import { motion } from "framer-motion";
import { Edit2, Trash2, Star } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ProductTable({ products, isLoading, onEdit, onSuccess }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (productId) => base44.entities.Product.delete(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
      onSuccess();
    },
  });

  const categoryColors = {
    Navios: "bg-blue-100 text-blue-800",
    Mapas: "bg-green-100 text-green-800",
    Arquitetura: "bg-purple-100 text-purple-800",
    Outros: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#4B3619]">
              <TableHead className="text-white font-montserrat">Imagem</TableHead>
              <TableHead className="text-white font-montserrat">Nome</TableHead>
              <TableHead className="text-white font-montserrat">Categoria</TableHead>
              <TableHead className="text-white font-montserrat">Preço</TableHead>
              <TableHead className="text-white font-montserrat">Tamanhos</TableHead>
              <TableHead className="text-white font-montserrat text-center">Destaque</TableHead>
              <TableHead className="text-white font-montserrat text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5)
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={7}>
                      <div className="animate-pulse h-16 bg-gray-200 rounded" />
                    </TableCell>
                  </TableRow>
                ))
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12">
                  <p className="font-montserrat text-[#2D2D2D]/60">
                    Nenhuma obra cadastrada ainda.
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id} className="hover:bg-[#F3E5C2]/50 transition-colors">
                  <TableCell>
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-[#C5A059]">
                      <img
                        src={product.image_urls?.[0] || product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        style={{ filter: "sepia(15%)" }}
                      />
                      {product.image_urls?.length > 1 && (
                        <div className="absolute bottom-0 right-0 bg-[#4B3619] text-white text-[10px] px-1 rounded-tl font-montserrat">
                          +{product.image_urls.length - 1}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-playfair font-semibold text-[#2D2D2D]">
                        {product.name}
                      </p>
                      {product.description && (
                        <p className="font-montserrat text-xs text-[#2D2D2D]/60 line-clamp-1 mt-1">
                          {product.description}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${categoryColors[product.category]} font-montserrat`}>
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {product.price ? (
                      <span className="font-montserrat font-semibold text-[#2D2D2D]">
                        R$ {product.price.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-[#2D2D2D]/30 text-xs font-montserrat">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {(product.sizes || []).slice(0, 2).map((size, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-montserrat bg-[#4B3619]/10 text-[#4B3619] px-2 py-1 rounded"
                        >
                          {size}
                        </span>
                      ))}
                      {product.sizes?.length > 2 && (
                        <span className="text-xs font-montserrat text-[#2D2D2D]/60">
                          +{product.sizes.length - 2}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {product.is_featured ? (
                      <Star className="w-5 h-5 text-[#C5A059] fill-[#C5A059] inline-block" />
                    ) : (
                      <span className="text-[#2D2D2D]/30 text-xs font-montserrat">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(product)}
                        className="hover:bg-[#C5A059]/20 hover:text-[#4B3619]"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-[#F3E5C2]">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="font-playfair text-[#2D2D2D]">
                              Excluir Obra
                            </AlertDialogTitle>
                            <AlertDialogDescription className="font-montserrat text-[#2D2D2D]/70">
                              Tem certeza que deseja excluir "{product.name}"? Esta ação não pode
                              ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="font-montserrat">
                              Cancelar
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteMutation.mutate(product.id)}
                              className="bg-red-600 hover:bg-red-700 font-montserrat"
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}