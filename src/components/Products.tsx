
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Sample products based on typical 3D printing inventory
  const products = [
    {
      id: 1,
      name: "Custom Phone Stand",
      category: "home-goods",
      price: 15.99,
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      inStock: true,
      description: "Adjustable phone stand with clean design"
    },
    {
      id: 2,
      name: "Dragon Miniature Set",
      category: "game-pieces",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      inStock: true,
      description: "Detailed dragon miniatures for tabletop games"
    },
    {
      id: 3,
      name: "Desk Organizer",
      category: "home-goods",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      inStock: true,
      description: "Multi-compartment desk organizer"
    },
    {
      id: 4,
      name: "Chess Set",
      category: "game-pieces",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      inStock: false,
      description: "Classic chess set with modern design"
    },
    {
      id: 5,
      name: "Wall Hook Set",
      category: "home-goods",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      inStock: true,
      description: "Set of 4 decorative wall hooks"
    },
    {
      id: 6,
      name: "Dice Set",
      category: "game-pieces",
      price: 18.99,
      image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      inStock: true,
      description: "Complete polyhedral dice set"
    }
  ];

  const categories = [
    { id: "all", name: "All Products" },
    { id: "home-goods", name: "Home Goods" },
    { id: "game-pieces", name: "Game Pieces" }
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
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {product.name}
                  </h3>
                  <Badge variant={product.inStock ? "default" : "secondary"}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm mb-3">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">
                    ${product.price}
                  </span>
                  <Button 
                    disabled={!product.inStock}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {product.inStock ? "Add to Cart" : "Notify When Available"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
