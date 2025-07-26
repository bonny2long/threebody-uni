import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ThreatLevelBadgeProps {
  level: 0 | 1 | 2 | 3 | 4 | 5;
  className?: string;
}

const threatConfig = {
  0: { label: 'Unknown', color: 'bg-class0 text-white' },
  1: { label: 'Class I', color: 'bg-class1 text-white' },
  2: { label: 'Class II', color: 'bg-class2 text-white' },
  3: { label: 'Class III', color: 'bg-class3 text-white' },
  4: { label: 'Class IV', color: 'bg-class4 text-white' },
  5: { label: 'Class V', color: 'bg-class5 text-white' },
};

export function ThreatLevelBadge({ level, className }: ThreatLevelBadgeProps) {
  const config = threatConfig[level];
  
  return (
    <Badge 
      className={cn(
        config.color,
        'font-semibold tracking-wide',
        level >= 3 && 'shadow-lg animate-pulse',
        className
      )}
    >
      {config.label}
    </Badge>
  );
}