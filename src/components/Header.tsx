
import { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { CartIcon } from "@/components/CartIcon";
import { Cart } from "@/components/Cart";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">
            Precision3D
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection("hero")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("services")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection("products")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Products
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
            
            {/* Cart and Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
                <DialogTrigger asChild>
                  <div>
                    <CartIcon onClick={() => setIsCartOpen(true)} />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Shopping Cart</DialogTitle>
                  </DialogHeader>
                  <Cart />
                </DialogContent>
              </Dialog>
              
              {user ? (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <User size={16} />
                    <span>{user.email}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignOut}
                    className="flex items-center space-x-1"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/auth')}
                >
                  Sign In
                </Button>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-4">
            <button 
              onClick={() => scrollToSection("hero")}
              className="block text-foreground hover:text-primary transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("services")}
              className="block text-foreground hover:text-primary transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection("products")}
              className="block text-foreground hover:text-primary transition-colors"
            >
              Products
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="block text-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
            
            {/* Mobile Cart and Auth Buttons */}
            <div className="pt-4 border-t border-border space-y-3">
              <Button 
                variant="outline"
                onClick={() => {
                  setIsCartOpen(true);
                  setIsMenuOpen(false);
                }}
                className="w-full"
              >
                View Cart
              </Button>
              
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <User size={16} />
                    <span>{user.email}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignOut}
                    className="w-full flex items-center justify-center space-x-1"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigate('/auth');
                    setIsMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Sign In
                </Button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
