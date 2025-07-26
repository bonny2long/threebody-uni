'use client'

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThreatLevelBadge } from './ThreatLevelBadge';
import { Button } from '@/components/ui/button';
import { Eye, ExternalLink } from 'lucide-react';
import { CivilizationQuickView } from './CivilizationQuickView';
import civilizationsData from '@/data/civilizations.json';

interface CivilizationCardProps {
  name: string;
  class: 0 | 1 | 2 | 3 | 4 | 5;
  description: string;
  firstAppearance: string;
  slug: string;
}

export function CivilizationCard({ 
  name, 
  class: threatClass, 
  description, 
  firstAppearance, 
  slug 
}: CivilizationCardProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  
  // Find the full civilization data for the modal
  const fullCivilizationData = civilizationsData.find(civ => civ.id === slug);

  return (
    <Card className="hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {name}
          </CardTitle>
          <ThreatLevelBadge level={threatClass} />
        </div>
        <p className="text-sm text-muted-foreground">
          First seen in: {firstAppearance}
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {description}
        </p>
        
        <div className="flex gap-2">
          <Button asChild variant="default" size="sm" className="flex items-center gap-2">
            <Link href={`/civilizations/${slug}`}>
              <Eye className="h-4 w-4" />
              View Details
            </Link>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => setIsQuickViewOpen(true)}
          >
            <ExternalLink className="h-4 w-4" />
            Quick View
          </Button>
        </div>
      </CardContent>
      {/* Quick View Modal */}
      {fullCivilizationData && (
        <CivilizationQuickView
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
          civilization={fullCivilizationData}
        />
      )}
    </Card>
  );
}