'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/design-system/components/ui/avatar';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@repo/design-system/components/ui/carousel';
import { User } from 'lucide-react';
import { type FC, useEffect, useState } from 'react';

export const Testimonials: FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 4000);
  }, [api, current]);

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
            Trusted by thousands of businesses worldwide
          </h2>
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {Array.from({ length: 15 }).map((_, index) => (
                <CarouselItem className="lg:basis-1/2" key={index}>
                  <div className="bg-muted rounded-md h-full lg:col-span-2 p-6 aspect-video flex justify-between flex-col">
                    <User className="w-8 h-8 stroke-1" />
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col">
                        <h3 className="text-xl tracking-tight">
                          Best decision
                        </h3>
                        <p className="text-muted-foreground max-w-xs text-base">
                          Our goal was to streamline SMB trade, making it easier
                          and faster than ever and we did it together.
                        </p>
                      </div>
                      <p className="flex flex-row gap-2 text-sm items-center">
                        <span className="text-muted-foreground">By</span>{' '}
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span>John Johnsen</span>
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};
