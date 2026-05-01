import { Link } from "@tanstack/react-router";
import { Product, formatINR, api } from "@/lib/mockApi";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  return (
    <div className="group">
      <Link to="/products/$id" params={{ id: product.id }} className="block relative overflow-hidden rounded-lg bg-muted aspect-square">
        <img src={product.image} alt={product.name} loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
            {discount}% OFF
          </span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); api.addToCart(product.id); toast.success("Added to cart"); }}
          className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-background shadow-card flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-primary hover:text-primary-foreground"
          aria-label="Add to cart"
        >
          <ShoppingBag size={16} />
        </button>
      </Link>
      <div className="mt-3 space-y-1">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">{product.metal}</p>
        <Link to="/products/$id" params={{ id: product.id }} className="text-sm font-medium hover:text-primary line-clamp-1">
          {product.name}
        </Link>
        <div className="flex items-baseline gap-2">
          <span className="font-semibold">{formatINR(product.price)}</span>
          <span className="text-xs text-muted-foreground line-through">{formatINR(product.originalPrice)}</span>
        </div>
      </div>
    </div>
  );
}
