import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { api } from "@/lib/mockApi";
import { toast } from "sonner";

export const Route = createFileRoute("/signin")({
  component: SignIn,
  head: () => ({ meta: [{ title: "Sign In — Melorra" }] }),
});

function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.signIn(email, password);
      toast.success("Welcome back!");
      router.navigate({ to: "/profile" });
    } catch (err: any) {
      toast.error(err.message);
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-[80vh] grid md:grid-cols-2">
      <div className="hidden md:block relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <img src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=900&q=80" alt="Jewellery" className="w-full h-full object-cover mix-blend-multiply opacity-90" />
        <div className="absolute bottom-10 left-10 right-10 text-foreground">
          <h2 className="font-display text-4xl font-bold mb-2">Welcome to Melorra</h2>
          <p className="text-muted-foreground">Lightweight luxury, delivered to your door.</p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <h1 className="font-display text-4xl font-bold mb-2">Sign In</h1>
          <p className="text-muted-foreground mb-8">Enter your details to access your account.</p>

          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-muted px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-muted px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="••••••••" />
              <p className="text-xs text-muted-foreground mt-2">Demo: any email + password (4+ chars)</p>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-primary text-primary-foreground py-3.5 rounded-full font-medium hover:opacity-90 transition disabled:opacity-50"
              style={{ boxShadow: "var(--shadow-elegant)" }}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            New to Melorra? <Link to="/signin" className="text-primary font-medium hover:underline">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
