
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (product: any) => {
    addToCart({
      product_id: product.id,
      name: product.name,
      price: product.price / 100, // Convert from cents to dollars
      image_url: product.image_url,
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (loading) {
    return (
      <section id="products" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="products" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <p className="text-destructive">Error loading products: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  // Get unique categories from products
  const categories = [
    { id: "all", name: "All Products" },
    ...Array.from(new Set(products.map(p => p.category).filter(Boolean))).map(cat => ({
      id: cat!,
      name: cat!.charAt(0).toUpperCase() + cat!.slice(1).replace('-', ' ')
    }))
  ];

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <section id="products" className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Products in Stock
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our selection of ready-to-ship products. All items are printed with premium materials and quality finishes.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="mb-2"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const isInStock = product.stock_quantity && product.stock_quantity > 0;
            const displayPrice = product.price / 100; // Convert from cents to dollars
            
            return (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image_url || "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {product.name}
                    </h3>
                    <Badge variant={isInStock ? "default" : "secondary"}>
                      {isInStock ? `${product.stock_quantity} in stock` : "Out of Stock"}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">
                    {product.description || "High-quality 3D printed product"}
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">
                    Category: {product.category || "General"}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">
                      ${displayPrice.toFixed(2)}
                    </span>
                    <Button 
                      disabled={!isInStock}
                      onClick={() => handleAddToCart(product)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      {isInStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
