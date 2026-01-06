import React from "react";
import { CartProvider } from "@/components/cart/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";

export default function Layout({ children, currentPageName }) {
  return (
    <CartProvider>
      <div className="min-h-screen">
        {children}
        <CartDrawer />
      </div>
    </CartProvider>
  );
}