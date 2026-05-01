import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { api, Product, formatINR } from "@/lib/mockApi";
import { ShoppingBag, Heart, Truck, ShieldCheck, RotateCw } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/products/$id")({ component: ProductPage });

function ProductPage() {
  const { id } = Route.useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  useEffect(() => { api.getProduct(id).then((p) => setProduct(p ?? null)); }, [id]);

  if (!product) return <div className="max-w-7xl mx-auto px-4 py-20 text-center text-muted-foreground">Loading...</div>;

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <nav className="text-xs text-muted-foreground mb-6">
        <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/products" className="hover:text-primary">Jewellery</Link> / <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-primary font-semibold">{product.category}</p>
          <h1 className="text-3xl md:text-4xl font-display font-bold mt-2">{product.name}</h1>
          <p className="text-sm text-muted-foreground mt-2">{product.metal}</p>

          <div className="flex items-baseline gap-3 mt-6">
            <span className="text-3xl font-semibold">{formatINR(product.price)}</span>
            <span className="text-muted-foreground line-through">{formatINR(product.originalPrice)}</span>
            {discount > 0 && <span className="text-primary font-medium text-sm">({discount}% off)</span>}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Inclusive of all taxes</p>

          <p className="text-foreground/80 mt-6 leading-relaxed">{product.description}</p>

          <div className="flex gap-3 mt-8">
            <button
              onClick={() => { api.addToCart(product.id); toast.success("Added to cart"); }}
              className="flex-1 bg-primary text-primary-foreground py-4 rounded-full font-medium hover:opacity-90 transition flex items-center justify-center gap-2"
              style={{ boxShadow: "var(--shadow-elegant)" }}>
              <ShoppingBag size={18} /> Add to Cart
            </button>
            <button
              onClick={() => { api.addToCart(product.id); router.navigate({ to: "/cart" }); }}
              className="flex-1 bg-foreground text-background py-4 rounded-full font-medium hover:opacity-90 transition">
              Buy Now
            </button>
            <button className="h-14 w-14 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition" aria-label="Wishlist">
              <Heart size={18} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border text-xs">
            {[
              { icon: Truck, label: "Free Shipping" },
              { icon: ShieldCheck, label: "BIS Certified" },
              { icon: RotateCw, label: "30-Day Returns" },
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center gap-2 text-center">
                <f.icon size={22} className="text-primary" />
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
