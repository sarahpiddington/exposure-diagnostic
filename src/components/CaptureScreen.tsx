import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CaptureScreenProps {
  onSubmit: (data: { name: string; email: string; business: string; phone: string }) => void;
}

export function CaptureScreen({ onSubmit }: CaptureScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [business, setBusiness] = useState('');
  const [phone, setPhone] = useState('');

  const isValid = name.trim() && email.trim() && business.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onSubmit({ name, email, business, phone });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-[10%] py-6">
      <div className="calm-card w-full animate-fade-in">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Safe and Well Together" className="h-8 mx-auto mb-6" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
            Almost there
          </h2>
          <p className="font-body text-muted-foreground">
            Enter your details to see your personalised results.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-body">
              Your name
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Smith"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="font-body">
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="business" className="font-body">
              Business name
            </Label>
            <Input
              id="business"
              type="text"
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              placeholder="Acme Ltd"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="font-body">
              Phone number <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="07700 900000"
            />
          </div>

          <Button
            type="submit"
            disabled={!isValid}
            size="lg"
            className="w-full mt-6"
          >
            See my results
          </Button>
        </form>

        <p className="font-caption text-xs text-muted-foreground text-center mt-6">
          We'll send you a copy of your results. No spam, ever.
        </p>
      </div>
    </div>
  );
}
