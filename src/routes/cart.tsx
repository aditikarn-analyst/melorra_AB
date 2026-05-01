import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { api, Product, CartItem, formatINR } from "@/lib/mockApi";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  component: Cart,
  head: () => ({ meta: [{ title: "Your Cart — Melorra" }] }),
});

function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const refresh = () => setItems(api.getCart());
  useEffect(() => {
    refresh();
    api.getProducts().then(setProducts);
    window.addEventListener("cart-updated", refresh);
    return () => window.removeEventListener("cart-updated", refresh);
  }, []);

  const lines = items.map((i) => ({ ...i, product: products.find((p) => p.id === i.productId) })).filter((l) => l.product);
  const subtotal = lines.reduce((s, l) => s + (l.product!.price * l.quantity), 0);
  const savings = lines.reduce((s, l) => s + ((l.product!.originalPrice - l.product!.price) * l.quantity), 0);
  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal + shipping;

  if (lines.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <ShoppingBag size={56} className="mx-auto text-muted-foreground mb-6" />
        <h1 className="text-3xl font-display font-bold mb-3">Your bag is empty</h1>
        <p className="text-muted-foreground mb-8">Discover beautiful pieces to add to your collection.</p>
        <Link to="/products" className="inline-block bg-primary text-primary-foreground px-7 py-3 rounded-full font-medium hover:opacity-90">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Shopping Bag</h1>
      <p className="text-muted-foreground mb-8">{lines.length} item{lines.length > 1 ? "s" : ""}</p>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {lines.map((l) => (
            <div key={l.productId} className="flex gap-4 bg-card rounded-xl p-4 border border-border">
              <Link to="/products/$id" params={{ id: l.product!.id }} className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                <img src={l.product!.image} alt={l.product!.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{l.product!.metal}</p>
                <Link to="/products/$id" params={{ id: l.product!.id }} className="font-medium hover:text-primary line-clamp-2">{l.product!.name}</Link>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-semibold">{formatINR(l.product!.price)}</span>
                  <span className="text-xs text-muted-foreground line-through">{formatINR(l.product!.originalPrice)}</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-border rounded-full">
                    <button onClick={() => api.updateQuantity(l.productId, l.quantity - 1)} className="h-8 w-8 flex items-center justify-center hover:text-primary"><Minus size={14} /></button>
                    <span className="w-8 text-center text-sm font-medium">{l.quantity}</span>
                    <button onClick={() => api.updateQuantity(l.productId, l.quantity + 1)} className="h-8 w-8 flex items-center justify-center hover:text-primary"><Plus size={14} /></button>
                  </div>
                  <button onClick={() => { api.updateQuantity(l.productId, 0); toast.success("Removed"); }} className="text-muted-foreground hover:text-destructive flex items-center gap-1 text-sm">
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="bg-card rounded-xl p-6 border border-border h-fit lg:sticky lg:top-32">
          <h2 className="font-display text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatINR(subtotal)}</span></div>
            <div className="flex justify-between text-primary"><span>You save</span><span>−{formatINR(savings)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>FREE</span></div>
            <div className="border-t border-border pt-3 flex justify-between font-semibold text-base">
              <span>Total</span><span>{formatINR(total)}</span>
            </div>
          </div>
          <button onClick={() => { toast.success("Order placed! (demo)"); api.clearCart(); }} className="w-full mt-6 bg-primary text-primary-foreground py-3.5 rounded-full font-medium hover:opacity-90" style={{ boxShadow: "var(--shadow-elegant)" }}>
            Checkout
          </button>
          <Link to="/products" className="block text-center text-sm text-muted-foreground hover:text-primary mt-4">Continue shopping</Link>
        </aside>
      </div>
    </div>
  );
}
