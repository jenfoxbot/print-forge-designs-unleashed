
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Your actual company inventory
  const products = [
    {
      id: 1,
      name: "Aerospace Bracket",
      category: "aerospace",
      price: 120.50,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      inStock: true,
      stockCount: 15,
      material: "Carbon Fiber",
      description: "Lightweight bracket for aerospace applications"
    },
    {
      id: 2,
      name: "Custom Vase",
      category: "home-goods",
      price: 25.00,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      inStock: true,
      stockCount: 30,
      material: "PLA",
      description: "Decorative vase with intricate design"
    },
    {
      id: 3,
      name: "Flower Pot",
      category: "home-goods",
      price: 15.75,
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      inStock: true,
      stockCount: 50,
      material: "ABS",
      description: "Small flower pot for indoor plants"
    },
    {
      id: 4,
      name: "Door Handle",
      category: "home-goods",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      inStock: true,
      stockCount: 20,
      material: "PETG",
      description: "Replacement handle for doors"
    },
    {
      id: 5,
      name: "Chess Set Pieces",
      category: "game-pieces",
      price: 45.00,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      inStock: true,
      stockCount: 10,
      material: "Resin",
      description: "Complete set of chess pieces"
    },
    {
      id: 6,
      name: "Drone Frame",
      category: "aerospace",
      price: 85.00,
      image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      inStock: true,
      stockCount: 12,
      material: "Carbon Fiber",
      description: "Lightweight frame for drones"
    },
    {
      id: 7,
      name: "Phone Stand",
      category: "home-goods",
      price: 12.50,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      inStock: true,
      stockCount: 40,
      material: "PLA",
      description: "Adjustable stand for smartphones"
    },
    {
      id: 8,
      name: "Gear Wheel",
      category: "aerospace",
      price: 18.00,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      inStock: true,
      stockCount: 25,
      material: "Nylon",
      description: "Replacement gear for machinery"
    },
    {
      id: 9,
      name: "Board Game Tokens",
      category: "game-pieces",
      price: 5.00,
      image: "https://images.unsplash.com/photo-1487252665478-49b61b47f302?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      inStock: true,
      stockCount: 100,
      material: "Resin",
      description: "Custom tokens for board games"
    },
    {
      id: 10,
      name: "Car Cup Holder Insert",
      category: "home-goods",
      price: 10.25,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      inStock: true,
      stockCount: 35,
      material: "ABS",
      description: "Replacement insert for car cup holders"
    }
  ];

  const categories = [
    { id: "all", name: "All Products" },
    { id: "aerospace", name: "Aerospace" },
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
                    {product.inStock ? `${product.stockCount} in stock` : "Out of Stock"}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm mb-2">
                  {product.description}
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  Material: {product.material}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">
                    ${product.price.toFixed(2)}
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
