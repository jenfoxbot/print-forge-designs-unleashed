-- Delete existing products
DELETE FROM products;

-- Insert new products based on your inventory
INSERT INTO products (name, description, price, category, stock_quantity, is_active) VALUES
('Aerospace Bracket', 'High-precision aerospace component bracket for aircraft assembly', 15000, 'Aerospace', 25, true),
('Custom Vase', 'Elegant decorative vase with custom design patterns', 8500, 'Home Decor', 15, true),
('Flower Pot', 'Modern geometric flower pot for indoor plants', 3200, 'Home Decor', 40, true),
('Door Handle', 'Premium quality door handle with ergonomic design', 4500, 'Hardware', 30, true),
('Chess Set Pieces', 'Complete set of precision-crafted chess pieces', 12000, 'Games', 12, true),
('Drone Frame', 'Lightweight carbon fiber drone frame for racing drones', 18500, 'Electronics', 8, true),
('Phone Stand', 'Adjustable phone stand with cable management', 2800, 'Electronics', 50, true),
('Gear Wheel', 'Precision mechanical gear wheel for machinery', 6500, 'Mechanical', 20, true),
('Board Game Tokens', 'Custom board game tokens and pieces set', 4200, 'Games', 35, true),
('Car Cup Holder Insert', 'Universal car cup holder insert with adjustable sizing', 1950, 'Automotive', 60, true);

-- Create contact submissions table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on contact submissions
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for service role to manage all contact submissions
CREATE POLICY "Service role can manage contact submissions" 
ON public.contact_submissions 
FOR ALL 
USING (true);

-- Create policy for anyone to insert contact submissions (public form)
CREATE POLICY "Anyone can submit contact forms" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Add trigger for updated_at
CREATE TRIGGER update_contact_submissions_updated_at
BEFORE UPDATE ON public.contact_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();