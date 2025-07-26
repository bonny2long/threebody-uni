import { Quote } from 'lucide-react';

interface QuoteBlockProps {
  quote: string;
  source?: string;
}

export function QuoteBlock({ quote, source }: QuoteBlockProps) {
  return (
    <div className="relative p-6 bg-muted/30 rounded-lg border-l-4 border-primary">
      <Quote className="absolute top-4 left-4 h-6 w-6 text-primary opacity-50" />
      <blockquote className="ml-8 italic text-lg leading-relaxed">
        "{quote}"
      </blockquote>
      {source && (
        <cite className="ml-8 block mt-3 text-sm text-muted-foreground">
          — {source}
        </cite>
      )}
    </div>
  );
}