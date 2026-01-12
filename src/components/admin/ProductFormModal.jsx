import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Plus, Minus, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
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

export default function ProductFormModal({ product, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    category: product?.category || "Arquitetura",
    image_urls: product?.image_urls || [],
    price: product?.price || "",
    sizes: product?.sizes || ["60x40cm", "100x80cm"],
    description: product?.description || "",
    is_featured: product?.is_featured || false,
  });

  const [newSize, setNewSize] = useState("");
  const [uploading, setUploading] = useState(false);

  const saveMutation = useMutation({
    mutationFn: async (data) => {
      if (product) {
        return await base44.entities.Product.update(product.id, data);
      } else {
        return await base44.entities.Product.create(data);
      }
    },
    onSuccess: () => {
      onSuccess();
    },
  });

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const result = await base44.integrations.Core.UploadFile({ file });
      setFormData({ ...formData, image_urls: [...formData.image_urls, result.file_url] });
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      image_urls: formData.image_urls.filter((_, i) => i !== index),
    });
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

  const handleRemoveSize = (sizeToRemove) => {
    setFormData({
      ...formData,
      sizes: formData.sizes.filter((size) => size !== sizeToRemove),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-[#F3E5C2] rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-[#4B3619] p-6 flex items-center justify-between z-10">
            <h2 className="font-playfair text-white text-2xl font-bold">
              {product ? "Editar Obra" : "Nova Obra"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label className="font-montserrat text-[#2D2D2D]">Imagens da Obra *</Label>
              <div className="space-y-3">
                {formData.image_urls.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {formData.image_urls.map((url, index) => (
                      <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border-4 border-[#C5A059] flex-shrink-0">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                          style={{ filter: "sepia(15%)" }}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <label className="cursor-pointer block">
                  <div className="border-2 border-dashed border-[#4B3619]/30 rounded-lg p-6 hover:border-[#C5A059] transition-colors text-center">
                    <Upload className="w-8 h-8 text-[#4B3619]/40 mx-auto mb-2" />
                    <p className="font-montserrat text-sm text-[#2D2D2D]/60">
                      {uploading ? "Enviando..." : "Clique para adicionar imagem"}
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="font-montserrat text-[#2D2D2D]">
                Nome da Obra *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Galeão Santa Maria"
                required
                className="bg-white border-[#4B3619]/20 font-montserrat"
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price" className="font-montserrat text-[#2D2D2D]">
                Preço (R$)
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || "" })}
                placeholder="Ex: 1500.00"
                className="bg-white border-[#4B3619]/20 font-montserrat"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label className="font-montserrat text-[#2D2D2D]">Categoria *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="bg-white border-[#4B3619]/20 font-montserrat">
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
            <div className="space-y-2">
              <Label htmlFor="description" className="font-montserrat text-[#2D2D2D]">
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
            <div className="space-y-2">
              <Label className="font-montserrat text-[#2D2D2D]">Tamanhos Disponíveis</Label>
              <div className="flex gap-2">
                <Input
                  value={newSize}
                  onChange={(e) => setNewSize(e.target.value)}
                  placeholder="Ex: 60x40cm"
                  className="bg-white border-[#4B3619]/20 font-montserrat"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSize())}
                />
                <Button
                  type="button"
                  onClick={handleAddSize}
                  variant="outline"
                  className="border-[#C5A059] text-[#4B3619] hover:bg-[#C5A059] hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.sizes.map((size, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1 px-3 py-1 bg-[#4B3619] text-white rounded-full font-montserrat text-sm"
                  >
                    {size}
                    <button
                      type="button"
                      onClick={() => handleRemoveSize(size)}
                      className="ml-1 hover:text-red-300 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-[#4B3619]/20">
              <div>
                <Label className="font-montserrat text-[#2D2D2D] font-semibold">
                  Marcar como Destaque
                </Label>
                <p className="font-montserrat text-xs text-[#2D2D2D]/60 mt-1">
                  Aparecerá na seção "Obras em Destaque" da página inicial
                </p>
              </div>
              <Switch
                checked={formData.is_featured}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_featured: checked })
                }
                className="data-[state=checked]:bg-[#C5A059]"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 font-montserrat"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={saveMutation.isPending || !formData.name || formData.image_urls.length === 0}
                className="flex-1 bg-[#C5A059] hover:bg-[#B89952] text-white font-montserrat"
              >
                {saveMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>{product ? "Atualizar" : "Cadastrar"}</>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}