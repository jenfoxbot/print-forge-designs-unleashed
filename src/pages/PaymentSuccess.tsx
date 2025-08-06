import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Clear the cart after successful payment
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-xl font-semibold text-foreground">
            Payment Successful!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Thank you for your order. Your payment has been processed successfully.
          </p>
          {sessionId && (
            <p className="text-xs text-muted-foreground">
              Reference: {sessionId}
            </p>
          )}
          <div className="space-y-2">
            <Button onClick={() => navigate('/')} className="w-full">
              Continue Shopping
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            You will receive an order confirmation email shortly.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};