"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ThreatLevelBadge } from './ThreatLevelBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, Shield, Zap, Globe } from 'lucide-react';
import Link from 'next/link';

interface CivilizationData {
  id: string;
  name: string;
  class: number;
  description: string;
  first_appearance: string;
  details: {
    form: string;
    origin: string;
    weaponry: string;
    quotes: string[];
  };
}

interface CivilizationQuickViewProps {
  isOpen: boolean;
  onClose: () => void;
  civilization: CivilizationData;
}

export function CivilizationQuickView({ isOpen, onClose, civilization }: CivilizationQuickViewProps) {
  const getClassificationName = (classLevel: number) => {
    const classifications = {
      0: "Unknown",
      1: "Planetary",
      2: "Interstellar", 
      3: "Dark Forest Survivor",
      4: "Dimensional Architect",
      5: "Transcendent Entity"
    };
    return classifications[classLevel as keyof typeof classifications] || "Unknown";
  };

  const getThreatDescription = (classLevel: number) => {
    const descriptions = {
      0: "Classification pending analysis",
      1: "Limited to planetary resources, vulnerable to detection",
      2: "Interplanetary capabilities, basic dark forest awareness", 
      3: "Advanced concealment and dimensional manipulation",
      4: "Spacetime manipulation, stellar-scale weapons",
      5: "Universal constant manipulation, multiversal influence"
    };
    return descriptions[classLevel as keyof typeof descriptions] || "Unknown threat level";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-2xl font-bold">{civilization.name}</DialogTitle>
              <div className="flex items-center gap-2">
                <ThreatLevelBadge level={civilization.class as 0 | 1 | 2 | 3 | 4 | 5} />
                <span className="text-sm text-muted-foreground">
                  {getClassificationName(civilization.class)}
                </span>
              </div>
            </div>
          </div>
          <DialogDescription className="text-base leading-relaxed">
            {civilization.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Separator />
          
          {/* Threat Assessment Card */}
          <Card className="border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-red-800 dark:text-red-200">
                <Shield className="h-4 w-4" />
                Threat Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <div className="text-sm">
                <span className="font-semibold">Classification: </span>
                <span className="text-red-700 dark:text-red-300">
                  Class {civilization.class} - {getClassificationName(civilization.class)}
                </span>
              </div>
              <div className="text-sm text-red-600 dark:text-red-400">
                {getThreatDescription(civilization.class)}
              </div>
            </CardContent>
          </Card>

          {/* Technical Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4" />
                  Physical Form
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">{civilization.details.form}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <ExternalLink className="h-4 w-4" />
                  Origin
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">{civilization.details.origin}</p>
              </CardContent>
            </Card>
          </div>

          {/* Weaponry/Capabilities */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Zap className="h-4 w-4" />
                Known Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">{civilization.details.weaponry}</p>
            </CardContent>
          </Card>

          {/* Notable Quotes */}
          {civilization.details.quotes && civilization.details.quotes.length > 0 && (
            <Card className="bg-muted/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Intelligence Fragments</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-2">
                {civilization.details.quotes.map((quote, index) => (
                  <blockquote key={index} className="border-l-2 border-primary pl-4 italic text-sm">
                    "{quote}"
                  </blockquote>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Source Information */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-muted-foreground">
              First documented in: <span className="font-medium">{civilization.first_appearance}</span>
            </div>
            <Button asChild variant="default" size="sm">
              <Link href={`/civilizations/${civilization.id}`}>
                <ExternalLink className="h-3 w-3 mr-1" />
                Full Details
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}