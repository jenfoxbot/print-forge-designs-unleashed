
export const Footer = () => {
  return (
    <footer className="bg-muted py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">Precision3D</h3>
            <p className="text-muted-foreground">
              Professional 3D printing services for aerospace, home goods, and gaming. 
              Precision engineering meets creative design.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Custom Aerospace Components</li>
              <li>Home Goods & Decor</li>
              <li>Game Pieces & Miniatures</li>
              <li>Rapid Prototyping</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Materials</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>PLA & PLA+</li>
              <li>PETG</li>
              <li>ABS</li>
              <li>Aerospace Composites</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 Precision3D. All rights reserved. Bringing your ideas to life with precision and quality.
          </p>
        </div>
      </div>
    </footer>
  );
};
