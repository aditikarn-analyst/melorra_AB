import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { api, Product } from "@/lib/mockApi";
import { ProductCard } from "@/components/ProductCard";
import { Sparkles, Truck, ShieldCheck, Gem } from "lucide-react";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => { api.getProducts().then(setProducts); }, []);

  const categories = [
    { name: "Rings", img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80" },
    { name: "Earrings", img: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=400&q=80" },
    { name: "Necklaces & Pendants", img: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&q=80" },
    { name: "Bracelets & Bangles", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">New Collection</p>
            <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight mb-6">
              Lightweight Luxury for <span className="text-primary italic">Every Moment</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
              Discover handcrafted gold, diamond, and silver jewellery designed for the modern you.
            </p>
            <div className="flex gap-4">
              <Link to="/products" className="bg-primary text-primary-foreground px-7 py-3.5 rounded-full font-medium hover:opacity-90 transition shadow-elegant" style={{ boxShadow: "var(--shadow-elegant)" }}>
                Shop Now
              </Link>
              <Link to="/signin" className="border border-foreground/20 px-7 py-3.5 rounded-full font-medium hover:bg-foreground/5 transition">
                Sign In
              </Link>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="aspect-square rounded-full overflow-hidden shadow-elegant" style={{ boxShadow: "var(--shadow-elegant)" }}>
              <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80" alt="Featured jewellery" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-background rounded-2xl px-5 py-3 shadow-card">
              <div className="flex items-center gap-2"><Sparkles size={18} className="text-primary" /><span className="font-medium text-sm">Up to 30% Off</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-border">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          {[
            { icon: Truck, title: "Free Shipping", sub: "On all orders" },
            { icon: ShieldCheck, title: "Certified", sub: "BIS Hallmark" },
            { icon: Gem, title: "Lifetime", sub: "Exchange" },
            { icon: Sparkles, title: "100% Real", sub: "Diamond & Gold" },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <f.icon className="text-primary" size={24} />
              <div>
                <p className="font-semibold">{f.title}</p>
                <p className="text-muted-foreground text-xs">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-display font-bold text-center mb-2">Shop by Category</h2>
        <p className="text-muted-foreground text-center mb-10">Curated collections for every occasion</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((c) => (
            <Link key={c.name} to="/products" search={{ category: c.name } as any} className="group relative overflow-hidden rounded-lg aspect-[3/4]">
              <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-display text-xl font-semibold">{c.name}</h3>
                <p className="text-xs opacity-90 mt-1">Shop now →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-display font-bold">Trending Now</h2>
            <p className="text-muted-foreground mt-1">Our bestsellers this week</p>
          </div>
          <Link to="/products" className="text-primary font-medium text-sm hover:underline hidden sm:block">View All →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="rounded-2xl p-10 md:p-16 text-center" style={{ background: "var(--gradient-primary)" }}>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-3">Mother's Day Special</h2>
          <p className="text-primary-foreground/90 mb-6 max-w-xl mx-auto">Up to 100% off on diamond making charges. Celebrate her with the perfect gift.</p>
          <Link to="/products" className="inline-block bg-background text-foreground px-7 py-3 rounded-full font-medium hover:bg-background/90 transition">Shop the Edit</Link>
        </div>
      </section>
    </div>
  );
}
