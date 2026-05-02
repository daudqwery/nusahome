import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Package, FolderTree, LayoutDashboard, Menu, ArrowLeft, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Produk", path: "/admin/products", icon: Package },
  { label: "Kategori", path: "/admin/categories", icon: FolderTree },
];

const NavContent = ({ currentPath, onNavigate }: { currentPath: string; onNavigate?: () => void }) => (
  <div className="space-y-1">
    {navItems.map((item) => {
      const isActive = currentPath === item.path || (item.path !== "/admin" && currentPath.startsWith(item.path));
      return (
        <Link
          key={item.path}
          to={item.path}
          onClick={onNavigate}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            isActive
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      );
    })}
  </div>
);

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sheetOpen, setSheetOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    toast.success("Berhasil keluar");
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur">
        <div className="flex items-center h-14 px-4 gap-3">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-4">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-foreground">Admin Panel</h2>
                <p className="text-xs text-muted-foreground">NusaHome Katalog</p>
              </div>
              <NavContent currentPath={location.pathname} onNavigate={() => setSheetOpen(false)} />
            </SheetContent>
          </Sheet>
          <h1 className="text-base font-bold text-foreground">Admin Panel</h1>
          <div className="ml-auto flex items-center gap-2">
            {user && (
              <span className="hidden sm:inline text-xs text-muted-foreground max-w-[140px] truncate">
                {user.email}
              </span>
            )}
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Toko</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">Keluar</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-56 border-r min-h-[calc(100vh-3.5rem)] p-4 bg-card">
          <NavContent currentPath={location.pathname} />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 max-w-5xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
