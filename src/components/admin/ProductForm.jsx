import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Plus, Trash2, Save, Star } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductForm({ product, onClose }) {
  const queryClient = useQueryClient();
  const [isUploading, setIsUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: product?.name || "",
    category: product?.category || "Navios",
    image_url: product?.image_url || "",
    description: product?.description || "",
    sizes: product?.sizes || ["60x40cm", "100x80cm"],
    is_featured: product?.is_featured || false,
  });

  const [newSize, setNewSize] = useState("");

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Product.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["featured-products"] });
      onClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data) => base44.entities.Product.update(product.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["featured-products"] });
      onClose();
    },
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const result = await base44.integrations.Core.UploadFile({ file });
      setFormData({ ...formData, image_url: result.file_url });
    } catch (error) {
      console.error("Upload error:", error);
      alert("Erro ao fazer upload da imagem");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddSize = () => {
    if (newSize && !formData.sizes.includes(newSize)) {
      setFormData({ ...formData, sizes: [...formData.sizes, newSize] });
      setNewSize("");
    }
  };

  const handleRemoveSize = (size) => {
    setFormData({
      ...formData,
      sizes: formData.sizes.filter((s) => s !== size),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.image_url) {
      alert("Por favor, preencha o nome e adicione uma imagem");
      return;
    }

    if (product) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-[#F3E5C2] rounded-xl shadow-2xl max-w-3xl w-full my-8"
        >
          {/* Header */}
          <div className="bg-[#4B3619] p-6 rounded-t-xl flex items-center justify-between">
            <h2 className="font-playfair text-white text-2xl font-bold">
              {product ? "Editar Obra" : "Nova Obra"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Image Upload */}
            <div>
              <Label className="font-montserrat text-[#2D2D2D] font-semibold mb-3 block">
                Imagem da Obra
              </Label>
              <div className="relative">
                {formData.image_url ? (
                  <div className="relative">
                    <div className="relative bg-gradient-to-br from-[#C5A059] to-[#B89952] p-1 rounded-lg w-48 h-64 mx-auto">
                      <div className="w-full h-full bg-white p-2 rounded-sm">
                        <img
                          src={formData.image_url}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-sm"
                          style={{ filter: "sepia(15%)" }}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image_url: "" })}
                      className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="block border-2 border-dashed border-[#4B3619]/30 rounded-lg p-12 text-center cursor-pointer hover:border-[#C5A059] transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                    <Upload className="w-12 h-12 text-[#4B3619]/40 mx-auto mb-3" />
                    <p className="font-montserrat text-[#2D2D2D]/70">
                      {isUploading ? "Enviando..." : "Clique para fazer upload da imagem"}
                    </p>
                  </label>
                )}
              </div>
            </div>

            {/* Name */}
            <div>
              <Label htmlFor="name" className="font-montserrat text-[#2D2D2D] font-semibold mb-2 block">
                Nome da Obra
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Galeão Santa Maria"
                className="bg-white border-[#4B3619]/20 font-montserrat"
              />
            </div>

            {/* Category */}
            <div>
              <Label className="font-montserrat text-[#2D2D2D] font-semibold mb-2 block">
                Categoria
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="bg-white border-[#4B3619]/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Navios">Navios</SelectItem>
                  <SelectItem value="Mapas">Mapas</SelectItem>
                  <SelectItem value="Arquitetura">Arquitetura</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="font-montserrat text-[#2D2D2D] font-semibold mb-2 block">
                Descrição
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descreva a obra..."
                rows={3}
                className="bg-white border-[#4B3619]/20 font-montserrat resize-none"
              />
            </div>

            {/* Sizes */}
            <div>
              <Label className="font-montserrat text-[#2D2D2D] font-semibold mb-2 block">
                Tamanhos Disponíveis
              </Label>
              <div className="flex gap-2 mb-3">
                <Input
                  value={newSize}
                  onChange={(e) => setNewSize(e.target.value)}
                  placeholder="Ex: 120x90cm"
                  className="bg-white border-[#4B3619]/20 font-montserrat"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSize())}
                />
                <Button
                  type="button"
                  onClick={handleAddSize}
                  className="bg-[#C5A059] hover:bg-[#B89952]"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.sizes.map((size) => (
                  <div
                    key={size}
                    className="flex items-center gap-2 px-3 py-2 bg-[#4B3619]/10 rounded-lg"
                  >
                    <span className="font-montserrat text-sm text-[#2D2D2D]">{size}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSize(size)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-[#4B3619]/20">
              <div className="flex items-center gap-3">
                <Star className={`w-5 h-5 ${formData.is_featured ? "text-[#C5A059] fill-[#C5A059]" : "text-[#2D2D2D]/40"}`} />
                <div>
                  <Label className="font-montserrat text-[#2D2D2D] font-semibold cursor-pointer">
                    Obra em Destaque
                  </Label>
                  <p className="font-montserrat text-[#2D2D2D]/60 text-xs">
                    Exibir na seção de destaques da página inicial
                  </p>
                </div>
              </div>
              <Switch
                checked={formData.is_featured}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_featured: checked })
                }
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="flex-1 border-[#4B3619]/30 text-[#2D2D2D] hover:bg-[#4B3619]/5"
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#C5A059] hover:bg-[#B89952] text-white font-montserrat font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Salvando..."
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {product ? "Atualizar" : "Criar"} Obra
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}