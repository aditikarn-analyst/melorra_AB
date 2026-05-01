// Mock API simulating MockAPI.io endpoints with localStorage persistence
export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  description: string;
  metal: string;
};

export type CartItem = { productId: string; quantity: number };
export type User = { id: string; name: string; email: string; phone: string; address: string };

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

const PRODUCTS: Product[] = [
  { id: "1", name: "Mother's Day Floral Earrings", category: "Earrings", price: 18999, originalPrice: 24999, image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=600&q=80", description: "Delicate floral diamond earrings in 18KT gold, perfect for everyday elegance.", metal: "18KT Gold" },
  { id: "2", name: "Eternal Love Pendant", category: "Necklaces & Pendants", price: 12499, originalPrice: 15999, image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80", description: "A timeless pendant featuring a brilliant solitaire diamond.", metal: "14KT Gold" },
  { id: "3", name: "Classic Solitaire Ring", category: "Rings", price: 32999, originalPrice: 39999, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80", description: "Timeless solitaire ring crafted in lustrous 18KT gold.", metal: "18KT Gold" },
  { id: "4", name: "Royal Heritage Bangles", category: "Bracelets & Bangles", price: 45999, originalPrice: 54999, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80", description: "A pair of intricately designed bangles inspired by royal heritage.", metal: "22KT Gold" },
  { id: "5", name: "Twinkle Star Nose Pin", category: "Nose Pins", price: 4999, originalPrice: 6499, image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80", description: "A subtle star-shaped nose pin with a single diamond accent.", metal: "18KT Gold" },
  { id: "6", name: "Layered Charm Chain", category: "Chains", price: 22499, originalPrice: 28999, image: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=80", description: "A delicate layered chain with charming pendants.", metal: "18KT Gold" },
  { id: "7", name: "Silver Moonlight Earrings", category: "Silver", price: 2999, originalPrice: 3999, image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80", description: "Elegant sterling silver drop earrings for a contemporary look.", metal: "925 Silver" },
  { id: "8", name: "Heart of Gold Pendant", category: "Necklaces & Pendants", price: 8999, originalPrice: 11999, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80", description: "A romantic heart pendant with diamond detailing.", metal: "14KT Gold" },
  { id: "9", name: "Stardust Diamond Ring", category: "Rings", price: 28999, originalPrice: 35999, image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&q=80", description: "Cluster diamond ring with a stardust setting.", metal: "18KT Gold" },
  { id: "10", name: "Boho Tribal Earrings", category: "Earrings", price: 15499, originalPrice: 19999, image: "https://images.unsplash.com/photo-1630019852942-7a3592136ce1?w=600&q=80", description: "Bold boho-inspired drop earrings.", metal: "18KT Gold" },
  { id: "11", name: "Infinity Bracelet", category: "Bracelets & Bangles", price: 19999, originalPrice: 24999, image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&q=80", description: "Symbol of forever, an infinity charm bracelet.", metal: "14KT Gold" },
  { id: "12", name: "Pearl Drop Pendant", category: "Necklaces & Pendants", price: 11499, originalPrice: 14999, image: "https://images.unsplash.com/photo-1620656798932-902a78a8d2d4?w=600&q=80", description: "Lustrous pearl drop suspended from a fine gold chain.", metal: "18KT Gold" },
];

export const api = {
  async getProducts(): Promise<Product[]> { await delay(300); return PRODUCTS; },
  async getProduct(id: string): Promise<Product | undefined> { await delay(200); return PRODUCTS.find((p) => p.id === id); },
  async signIn(email: string, password: string): Promise<User> {
    await delay(600);
    if (!email || !password) throw new Error("Email and password required");
    if (password.length < 4) throw new Error("Invalid credentials");
    const user: User = {
      id: "u_" + Date.now(),
      name: email.split("@")[0].replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      phone: "+91 98765 43210",
      address: "Mumbai, Maharashtra, India",
    };
    localStorage.setItem("melorra_user", JSON.stringify(user));
    return user;
  },
  signOut() { localStorage.removeItem("melorra_user"); },
  getCurrentUser(): User | null {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem("melorra_user");
    return raw ? JSON.parse(raw) : null;
  },
  updateUser(patch: Partial<User>): User {
    const u = this.getCurrentUser();
    if (!u) throw new Error("Not signed in");
    const next = { ...u, ...patch };
    localStorage.setItem("melorra_user", JSON.stringify(next));
    return next;
  },
  getCart(): CartItem[] {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem("melorra_cart");
    return raw ? JSON.parse(raw) : [];
  },
  saveCart(items: CartItem[]) { localStorage.setItem("melorra_cart", JSON.stringify(items)); window.dispatchEvent(new Event("cart-updated")); },
  addToCart(productId: string) {
    const cart = this.getCart();
    const existing = cart.find((c) => c.productId === productId);
    if (existing) existing.quantity += 1; else cart.push({ productId, quantity: 1 });
    this.saveCart(cart);
  },
  updateQuantity(productId: string, qty: number) {
    let cart = this.getCart();
    if (qty <= 0) cart = cart.filter((c) => c.productId !== productId);
    else cart = cart.map((c) => (c.productId === productId ? { ...c, quantity: qty } : c));
    this.saveCart(cart);
  },
  clearCart() { this.saveCart([]); },
};

export const formatINR = (n: number) => "₹" + n.toLocaleString("en-IN");
