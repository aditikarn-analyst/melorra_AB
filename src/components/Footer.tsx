export function Footer() {
  return (
    <footer className="bg-secondary mt-20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h4 className="font-display text-xl text-primary mb-3">MELORRA</h4>
          <p className="text-muted-foreground">Lightweight, trendy jewellery for the modern woman.</p>
        </div>
        <div>
          <h5 className="font-semibold mb-3">Shop</h5>
          <ul className="space-y-2 text-muted-foreground">
            <li>Rings</li><li>Earrings</li><li>Necklaces</li><li>Bangles</li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-3">Help</h5>
          <ul className="space-y-2 text-muted-foreground">
            <li>Contact Us</li><li>Find a Store</li><li>Shipping</li><li>Returns</li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-3">About</h5>
          <ul className="space-y-2 text-muted-foreground">
            <li>Our Story</li><li>Careers</li><li>Press</li><li>Sustainability</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-border text-xs text-muted-foreground text-center">
        © 2026 Melorra Clone. Demo project — not affiliated with Melorra.
      </div>
    </footer>
  );
}
