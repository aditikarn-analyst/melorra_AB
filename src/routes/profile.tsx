import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { api, User } from "@/lib/mockApi";
import { User as UserIcon, Mail, Phone, MapPin, LogOut, Package, Heart, Settings } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  component: Profile,
  head: () => ({ meta: [{ title: "My Profile — Melorra" }] }),
});

function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const u = api.getCurrentUser();
    setUser(u);
    if (u) setForm({ name: u.name, phone: u.phone, address: u.address });
    setHydrated(true);
  }, []);

  if (!hydrated) return <div className="max-w-4xl mx-auto px-4 py-20 text-center text-muted-foreground">Loading...</div>;

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <UserIcon size={56} className="mx-auto text-muted-foreground mb-6" />
        <h1 className="text-3xl font-display font-bold mb-3">Sign in required</h1>
        <p className="text-muted-foreground mb-8">Please sign in to view your profile.</p>
        <Link to="/signin" className="inline-block bg-primary text-primary-foreground px-7 py-3 rounded-full font-medium hover:opacity-90">Sign In</Link>
      </div>
    );
  }

  const save = () => {
    const updated = api.updateUser(form);
    setUser(updated);
    setEditing(false);
    toast.success("Profile updated");
  };

  const logout = () => { api.signOut(); toast.success("Signed out"); router.navigate({ to: "/" }); };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="rounded-2xl p-8 md:p-10 mb-8 text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
        <div className="flex items-center gap-5">
          <div className="h-20 w-20 rounded-full bg-background/20 backdrop-blur flex items-center justify-center text-3xl font-display font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold">Hi, {user.name}</h1>
            <p className="opacity-90 text-sm">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <aside className="space-y-2">
          {[
            { icon: UserIcon, label: "Personal Info", active: true },
            { icon: Package, label: "Orders" },
            { icon: Heart, label: "Wishlist" },
            { icon: Settings, label: "Settings" },
          ].map((m, i) => (
            <button key={i} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition ${m.active ? "bg-accent font-medium" : "hover:bg-muted"}`}>
              <m.icon size={16} /> {m.label}
            </button>
          ))}
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition">
            <LogOut size={16} /> Sign Out
          </button>
        </aside>

        <div className="md:col-span-2 bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-semibold">Personal Info</h2>
            {!editing && <button onClick={() => setEditing(true)} className="text-primary text-sm font-medium hover:underline">Edit</button>}
          </div>

          {editing ? (
            <div className="space-y-4">
              <Field label="Name"><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-muted px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30" /></Field>
              <Field label="Phone"><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-muted px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30" /></Field>
              <Field label="Address"><textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} rows={3} className="w-full bg-muted px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" /></Field>
              <div className="flex gap-3 pt-2">
                <button onClick={save} className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-medium hover:opacity-90">Save Changes</button>
                <button onClick={() => setEditing(false)} className="px-6 py-2.5 rounded-full hover:bg-muted">Cancel</button>
              </div>
            </div>
          ) : (
            <dl className="space-y-5">
              <Row icon={UserIcon} label="Name" value={user.name} />
              <Row icon={Mail} label="Email" value={user.email} />
              <Row icon={Phone} label="Phone" value={user.phone} />
              <Row icon={MapPin} label="Address" value={user.address} />
            </dl>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wide text-muted-foreground mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function Row({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-primary flex-shrink-0">
        <Icon size={16} />
      </div>
      <div>
        <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
        <dd className="font-medium mt-0.5">{value}</dd>
      </div>
    </div>
  );
}
