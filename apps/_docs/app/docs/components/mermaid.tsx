'use client';

import mermaid from 'mermaid';
import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';
interface MermaidProps {
  chart: string;
}

export function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  mermaid.initialize({
    startOnLoad: false,
    theme: 'neutral',
    securityLevel: 'loose',
    darkMode: resolvedTheme === 'dark',
  });

  useEffect(() => {
    if (containerRef.current) {
      mermaid.render('mermaid', chart).then(({ svg }) => {
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      });
    }
  }, [chart]);

  return (
    <div className="overflow-x-auto rounded-2xl border bg-background p-8">
      <div ref={containerRef} />
    </div>
  );
}
