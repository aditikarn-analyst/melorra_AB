import { Link, useRouter } from "@tanstack/react-router";
import { ShoppingBag, User, Search, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/lib/mockApi";

const navLinks = [
  { to: "/products", label: "All Jewellery" },
  { to: "/products", label: "Rings", search: { category: "Rings" } },
  { to: "/products", label: "Earrings", search: { category: "Earrings" } },
  { to: "/products", label: "Necklaces", search: { category: "Necklaces & Pendants" } },
  { to: "/products", label: "Bangles", search: { category: "Bracelets & Bangles" } },
  { to: "/products", label: "Silver", search: { category: "Silver" } },
];

export function Header() {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const update = () => setCount(api.getCart().reduce((s, c) => s + c.quantity, 0));
    update();
    window.addEventListener("cart-updated", update);
    return () => window.removeEventListener("cart-updated", update);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link to="/" className="font-display text-3xl font-bold tracking-tight text-primary">
            MELORRA
          </Link>

          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search for gold, diamond, silver..."
              className="w-full bg-muted rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              onKeyDown={(e) => { if (e.key === "Enter") router.navigate({ to: "/products" }); }}
            />
          </div>

          <div className="flex items-center gap-5">
            <Link to="/profile" className="flex flex-col items-center text-xs hover:text-primary transition">
              <User size={20} />
              <span className="hidden sm:block mt-0.5">Profile</span>
            </Link>
            <Link to="/cart" className="flex flex-col items-center text-xs hover:text-primary transition relative">
              <div className="relative">
                <ShoppingBag size={20} />
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                    {count}
                  </span>
                )}
              </div>
              <span className="hidden sm:block mt-0.5">Cart</span>
            </Link>
          </div>
        </div>

        <nav className="hidden md:flex items-center justify-center gap-8 py-3 border-t border-border text-sm font-medium">
          {navLinks.map((l, i) => (
            <Link key={i} to={l.to} search={l.search as any} className="hover:text-primary transition uppercase tracking-wide text-xs">
              {l.label}
            </Link>
          ))}
        </nav>

        {open && (
          <nav className="md:hidden flex flex-col gap-3 pb-4 text-sm">
            {navLinks.map((l, i) => (
              <Link key={i} to={l.to} search={l.search as any} onClick={() => setOpen(false)} className="hover:text-primary py-1">
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
