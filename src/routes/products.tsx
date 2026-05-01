import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { api, Product } from "@/lib/mockApi";
import { ProductCard } from "@/components/ProductCard";

type Search = { category?: string };

export const Route = createFileRoute("/products")({
  validateSearch: (s: Record<string, unknown>): Search => ({ category: s.category as string | undefined }),
  component: Products,
  head: () => ({ meta: [{ title: "All Jewellery — Melorra" }, { name: "description", content: "Browse our full collection of jewellery." }] }),
});

function Products() {
  const { category } = Route.useSearch();
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<string>(category || "All");
  const [sort, setSort] = useState("featured");

  useEffect(() => { api.getProducts().then(setProducts); }, []);
  useEffect(() => { setFilter(category || "All"); }, [category]);

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  let filtered = filter === "All" ? products : products.filter((p) => p.category === filter);
  if (sort === "low") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "high") filtered = [...filtered].sort((a, b) => b.price - a.price);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-display font-bold">{filter === "All" ? "All Jewellery" : filter}</h1>
        <p className="text-muted-foreground mt-2">{filtered.length} pieces crafted with love</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-border">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-sm transition ${filter === c ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-accent"}`}>
              {c}
            </button>
          ))}
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-muted px-4 py-2 rounded-full text-sm border-none focus:outline-none focus:ring-2 focus:ring-primary/30">
          <option value="featured">Featured</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-20">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
