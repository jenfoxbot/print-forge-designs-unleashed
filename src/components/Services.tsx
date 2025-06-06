
import { Card, CardContent } from "@/components/ui/card";

export const Services = () => {
  const services = [
    {
      title: "Custom Aerospace Components",
      description: "Precision manufacturing for aerospace applications with tight tolerances and specialized materials.",
      features: ["High-precision tolerances", "Aerospace-grade materials", "Rapid prototyping", "Complex geometries"],
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Home Goods & Lifestyle",
      description: "Beautiful, functional items for your home. From decorative pieces to practical solutions.",
      features: ["Custom designs", "Durable materials", "Aesthetic finishes", "Functional design"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Game Pieces & Miniatures",
      description: "Detailed game pieces, miniatures, and custom gaming accessories with intricate details.",
      features: ["Fine detail work", "Custom miniatures", "Gaming accessories", "Rapid delivery"],
      image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section id="services" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From high-precision aerospace components to creative home goods, 
            we deliver excellence across all our 3D printing services.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
