import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';

export const Cart = () => {
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const cartItems = items.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        name: item.name,
        price: Math.round(item.price * 100), // Convert to cents
      }));

      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { cart_items: cartItems },
        headers: user ? {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        } : undefined,
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
        
        toast({
          title: "Redirecting to checkout",
          description: "Please complete your payment in the new tab.",
        });
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout failed",
        description: "There was an error processing your checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Your cart is empty</h3>
          <p className="text-muted-foreground text-center">
            Start shopping to add items to your cart
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.product_id} className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.name}
                className="h-16 w-16 object-cover rounded-md"
              />
            )}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground truncate">
                {item.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                ${item.price.toFixed(2)} each
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleQuantityChange(item.product_id, item.quantity - 1)}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <Badge variant="secondary" className="min-w-[2rem] text-center">
                {item.quantity}
              </Badge>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleQuantityChange(item.product_id, item.quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => removeFromCart(item.product_id)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}

        <Separator />

        <div className="flex justify-between items-center pt-4">
          <div className="flex space-x-2">
            <Button variant="outline" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-foreground">
              Total: ${total.toFixed(2)}
            </p>
          </div>
        </div>

        <Button 
          className="w-full" 
          onClick={handleCheckout}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
        </Button>

        {!user && (
          <p className="text-xs text-muted-foreground text-center">
            You can checkout as a guest or sign in for order tracking
          </p>
        )}
      </CardContent>
    </Card>
  );
};