
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProducts = () => {
    const element = document.getElementById("products");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="pt-20 pb-16 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Precision 3D Printing for 
              <span className="text-primary"> Aerospace</span> & 
              <span className="text-primary"> Beyond</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              From custom aerospace components to beautiful home goods and game pieces. 
              We bring your ideas to life with precision engineering and attention to detail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={scrollToContact} size="lg" className="text-lg px-8 py-6">
                Get Custom Quote
              </Button>
              <Button onClick={scrollToProducts} variant="outline" size="lg" className="text-lg px-8 py-6">
                Shop Products
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="3D Printing Technology" 
                className="w-full h-full object-cover rounded-2xl opacity-80"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
