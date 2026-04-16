export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 mt-12 bg-slate-950">
      <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} CodeVault. All rights reserved.</p>
        <p className="mt-2 text-xs">Curated coding problems in Python, C++, and Java.</p>
      </div>
    </footer>
  );
}
