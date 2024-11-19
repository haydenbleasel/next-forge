import BlurFade from "@/components/ui/blur-fade";
import React, { useMemo } from "react";

interface MasonryProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  columns?: number;
  gap?: number;
}

export function Masonry<T>({
  items,
  renderItem,
  columns = 3,
  gap = 4,
}: MasonryProps<T>) {
  return (
    <section id="masonry">
      <div
        className={`columns-${columns} gap-${gap}`}
        style={{ columnCount: columns, columnGap: `${gap * 0.25}rem` }}
      >
        {items.map((item, idx) => (
          <BlurFade key={idx} delay={0.25 + idx * 0.05} inView>
            <div className="mb-4 break-inside-avoid">
              {renderItem(item, idx)}
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}

// Example usage with images
const ExampleMasonry: React.FC = () => {
  const images = useMemo(() => {
    return Array.from({ length: 9 }, (_, i) => {
      // const isLandscape = Math.random() > 0.5;
      const width = Math.floor(Math.random() * (800 - 600 + 1) + 600);
      const height = Math.floor(Math.random() * (800 - 600 + 1) + 600);
      return `https://picsum.photos/seed/${i + 1}/${width}/${height}`;
    });
  }, []);

  return (
    <Masonry
      items={images}
      renderItem={(imageUrl, idx) => (
        <img
          className="w-full rounded-lg object-contain"
          src={imageUrl}
          alt={`Random stock image ${idx + 1}`}
          loading="lazy"
        />
      )}
    />
  );
};

export default ExampleMasonry;
