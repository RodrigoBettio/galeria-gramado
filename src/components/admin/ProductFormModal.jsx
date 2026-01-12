import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Plus, Trash2, Save } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function ProductFormModal({ product, onClose }) {
  const queryClient = useQueryClient();
  const isEditing = !!product;

  const [formData, setFormData] = useState({
    name: product?.name || "",
    category: product?.category || "Arquitetura",
    description: product?.description || "",
    price: product?.price || "",
    image_url: product?.image_url || "",
    sizes: product?.sizes || ["60x40cm", "100x80cm"],
    is_featured: product?.is_featured || false,
  });

  const [newSize, setNewSize] = useState("");
  const [uploading, setUploading] = useState(false);

  const saveMutation = useMutation({
    mutationFn: async (data) => {
      if (isEditing) {
        return base44.entities.Product.update(product.id, data);
      } else {
        return base44.entities.Product.create(data);
      }
    },
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

    try {
      setUploading(true);
      const result = await base44.integrations.Core.UploadFile({ file });
      setFormData({ ...formData, image_url: result.file_url });
    } catch (error) {
      alert("Erro ao fazer upload da imagem");
    } finally {
      setUploading(false);
    }
  };

  const handleAddSize = () => {
    if (newSize.trim() && !formData.sizes.includes(newSize.trim())) {
      setFormData({
        ...formData,
        sizes: [...formData.sizes, newSize.trim()],
      });
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
    if (!formData.name || !formData.category || !formData.image_url) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }
    saveMutation.mutate(formData);
  };

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
          className="relative bg-[#F3E5C2] rounded-xl shadow-2xl w-full max-w-3xl my-8"
        >
          {/* Header */}
          <div className="bg-[#4B3619] px-8 py-6 rounded-t-xl flex items-center justify-between">
            <h2 className="font-playfair text-white text-2xl font-bold">
              {isEditing ? "Editar Obra" : "Nova Obra"}
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
              <Label className="font-montserrat text-[#2D2D2D] text-sm font-semibold mb-2 block">
                Imagem da Obra *
              </Label>
              <div className="flex gap-4">
                {formData.image_url && (
                  <div className="w-32 h-32 rounded-lg overflow-hidden border-4 border-[#C5A059] flex-shrink-0">
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#4B3619]/30 rounded-lg cursor-pointer hover:border-[#C5A059] hover:bg-white/50 transition-all">
                    <Upload className="w-8 h-8 text-[#4B3619]/40 mb-2" />
                    <span className="font-montserrat text-[#2D2D2D]/60 text-sm">
                      {uploading ? "Enviando..." : "Clique para fazer upload"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Name */}
            <div>
              <Label className="font-montserrat text-[#2D2D2D] text-sm font-semibold mb-2 block">
                Nome da Obra *
              </Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Catedral de Notre-Dame"
                className="bg-white border-[#4B3619]/20"
              />
            </div>

            {/* Category & Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-montserrat text-[#2D2D2D] text-sm font-semibold mb-2 block">
                  Categoria *
                </Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
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
              <div>
                <Label className="font-montserrat text-[#2D2D2D] text-sm font-semibold mb-2 block">
                  Preço (opcional)
                </Label>
                <Input
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="Ex: R$ 1.500,00"
                  className="bg-white border-[#4B3619]/20"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <Label className="font-montserrat text-[#2D2D2D] text-sm font-semibold mb-2 block">
                Descrição
              </Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descrição detalhada da obra..."
                rows={3}
                className="bg-white border-[#4B3619]/20 resize-none"
              />
            </div>

            {/* Sizes */}
            <div>
              <Label className="font-montserrat text-[#2D2D2D] text-sm font-semibold mb-2 block">
                Tamanhos Disponíveis
              </Label>
              <div className="flex gap-2 mb-3">
                <Input
                  value={newSize}
                  onChange={(e) => setNewSize(e.target.value)}
                  placeholder="Ex: 60x40cm"
                  className="bg-white border-[#4B3619]/20"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSize())}
                />
                <Button
                  type="button"
                  onClick={handleAddSize}
                  className="bg-[#C5A059] hover:bg-[#B89952] flex-shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.sizes.map((size) => (
                  <div
                    key={size}
                    className="flex items-center gap-2 px-3 py-1 bg-white rounded-lg border border-[#4B3619]/20"
                  >
                    <span className="font-montserrat text-sm text-[#2D2D2D]">{size}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSize(size)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-[#4B3619]/20">
              <div>
                <Label className="font-montserrat text-[#2D2D2D] font-semibold">
                  Obra em Destaque
                </Label>
                <p className="font-montserrat text-[#2D2D2D]/60 text-xs mt-1">
                  Esta obra aparecerá na seção "Obras em Destaque" da página inicial
                </p>
              </div>
              <Switch
                checked={formData.is_featured}
                onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                className="data-[state=checked]:bg-[#C5A059]"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="flex-1 border-[#4B3619]/20 hover:bg-[#4B3619]/5"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={saveMutation.isLoading}
                className="flex-1 bg-[#4B3619] hover:bg-[#3a2a13] text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {saveMutation.isLoading ? "Salvando..." : isEditing ? "Salvar Alterações" : "Criar Obra"}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}