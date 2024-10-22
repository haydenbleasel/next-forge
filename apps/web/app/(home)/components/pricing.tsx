import { Badge } from '@repo/design-system/components/ui/badge';
import { Button } from '@repo/design-system/components/ui/button';
import { Check, Minus, MoveRight, PhoneCall } from 'lucide-react';
import type { FC } from 'react';

export const Pricing: FC = () => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="flex text-center justify-center items-center gap-4 flex-col">
        <Badge>Pricing</Badge>
        <div className="flex gap-2 flex-col">
          <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular">
            Prices that make sense!
          </h2>
          <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
            Managing a small business today is already tough.
          </p>
        </div>
        <div className="grid text-left w-full grid-cols-3 lg:grid-cols-4 divide-x pt-20">
          <div className="col-span-3 lg:col-span-1" />
          <div className="px-3 py-1 md:px-6 md:py-4  gap-2 flex flex-col">
            <p className="text-2xl">Startup</p>
            <p className="text-sm text-muted-foreground">
              Our goal is to streamline SMB trade, making it easier and faster
              than ever for everyone and everywhere.
            </p>
            <p className="flex flex-col lg:flex-row lg:items-center gap-2 text-xl mt-8">
              <span className="text-4xl">$40</span>
              <span className="text-sm text-muted-foreground"> / month</span>
            </p>
            <Button variant="outline" className="gap-4 mt-8">
              Try it <MoveRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="px-3 py-1 md:px-6 md:py-4 gap-2 flex flex-col">
            <p className="text-2xl">Growth</p>
            <p className="text-sm text-muted-foreground">
              Our goal is to streamline SMB trade, making it easier and faster
              than ever for everyone and everywhere.
            </p>
            <p className="flex flex-col lg:flex-row lg:items-center gap-2 text-xl mt-8">
              <span className="text-4xl">$40</span>
              <span className="text-sm text-muted-foreground"> / month</span>
            </p>
            <Button className="gap-4 mt-8">
              Try it <MoveRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="px-3 py-1 md:px-6 md:py-4 gap-2 flex flex-col">
            <p className="text-2xl">Enterprise</p>
            <p className="text-sm text-muted-foreground">
              Our goal is to streamline SMB trade, making it easier and faster
              than ever for everyone and everywhere.
            </p>
            <p className="flex flex-col lg:flex-row lg:items-center gap-2 text-xl mt-8">
              <span className="text-4xl">$40</span>
              <span className="text-sm text-muted-foreground"> / month</span>
            </p>
            <Button variant="outline" className="gap-4 mt-8">
              Contact us <PhoneCall className="w-4 h-4" />
            </Button>
          </div>
          <div className="px-3 lg:px-6 col-span-3 lg:col-span-1  py-4">
            <b>Features</b>
          </div>
          <div />
          <div />
          <div />
          {/* New Line */}
          <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4">SSO</div>
          <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
            <Check className="w-4 h-4 text-primary" />
          </div>
          <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
            <Check className="w-4 h-4 text-primary" />
          </div>
          <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
            <Check className="w-4 h-4 text-primary" />
          </div>
          {/* New Line */}
          <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4">
            AI Assistant
          </div>
          <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
            <Minus className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
            <Check className="w-4 h-4 text-primary" />
          </div>
          <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
            <Check className="w-4 h-4 text-primary" />
          </div>
          {/* New Line */}
          <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4">
            Version Control
          </div>
          <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
            <Minus className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
            <Check className="w-4 h-4 text-primary" />
          </div>
          <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
            <Check className="w-4 h-4 text-primary" />
          </div>
          {/* New Line */}
          <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4">
            Members
          </div>
          <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
            <p className="text-muted-foreground text-sm">5 members</p>
          </div>
          <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
            <p className="text-muted-foreground text-sm">25 members</p>
          </div>
          <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
            <p className="text-muted-foreground text-sm">100+ members</p>
          </div>
          {/* New Line */}
          <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4">
            Multiplayer Mode
          </div>
          <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
            <Minus className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
            <Check className="w-4 h-4 text-primary" />
          </div>
          <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
            <Check className="w-4 h-4 text-primary" />
          </div>
          {/* New Line */}
          <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4">
            Orchestration
          </div>
          <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
            <Minus className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
            <Check className="w-4 h-4 text-primary" />
          </div>
          <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
            <Check className="w-4 h-4 text-primary" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
