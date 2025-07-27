"use client"

import { useState, useEffect, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThreatLevelBadge } from './ThreatLevelBadge';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, ExternalLink, Quote, Zap, Globe } from 'lucide-react';
import Link from 'next/link';
import civilizationsData from '@/data/civilizations.json';

interface SearchResult {
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
  matchType: 'name' | 'description' | 'quote' | 'capability' | 'origin' | 'source';
  matchText: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export function SearchModal({ isOpen, onClose, initialQuery = '' }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filterOptions = [
    { id: 'class1', label: 'Class I', color: 'bg-green-500' },
    { id: 'class2', label: 'Class II', color: 'bg-yellow-500' },
    { id: 'class3', label: 'Class III', color: 'bg-orange-500' },
    { id: 'class4', label: 'Class IV', color: 'bg-red-500' },
    { id: 'class5', label: 'Class V', color: 'bg-purple-500' },
    { id: 'trilogy', label: 'Original Trilogy', color: 'bg-blue-500' },
    { id: 'redemption', label: 'Redemption of Time', color: 'bg-cyan-500' },
  ];

  const searchCivilizations = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase().trim();
    const searchResults: SearchResult[] = [];

    civilizationsData.forEach((civ) => {
      const matches: Array<{matchType: SearchResult['matchType'], matchText: string}> = [];

      // Search in name
      if (civ.name.toLowerCase().includes(searchTerm)) {
        matches.push({ matchType: 'name', matchText: civ.name });
      }

      // Search in description
      if (civ.description.toLowerCase().includes(searchTerm)) {
        matches.push({ matchType: 'description', matchText: civ.description });
      }

      // Search in quotes
      civ.details.quotes?.forEach((quote) => {
        if (quote.toLowerCase().includes(searchTerm)) {
          matches.push({ matchType: 'quote', matchText: quote });
        }
      });

      // Search in capabilities/weaponry
      if (civ.details.weaponry.toLowerCase().includes(searchTerm)) {
        matches.push({ matchType: 'capability', matchText: civ.details.weaponry });
      }

      // Search in origin
      if (civ.details.origin.toLowerCase().includes(searchTerm)) {
        matches.push({ matchType: 'origin', matchText: civ.details.origin });
      }

      // Search in source book
      if (civ.first_appearance.toLowerCase().includes(searchTerm)) {
        matches.push({ matchType: 'source', matchText: civ.first_appearance });
      }

      // Add results for each match type
      matches.forEach((match) => {
        searchResults.push({
          ...civ,
          matchType: match.matchType,
          matchText: match.matchText
        });
      });
    });

    return searchResults;
  }, [query]);

  const filteredResults = useMemo(() => {
    if (selectedFilters.length === 0) return searchCivilizations;

    return searchCivilizations.filter((result) => {
      // Class filters
      const classFilters = selectedFilters.filter(f => f.startsWith('class'));
      if (classFilters.length > 0) {
        const hasMatchingClass = classFilters.some(filter => {
          const classNum = parseInt(filter.replace('class', ''));
          return result.class === classNum;
        });
        if (!hasMatchingClass) return false;
      }

      // Source filters
      const hasTrilogyFilter = selectedFilters.includes('trilogy');
      const hasRedemptionFilter = selectedFilters.includes('redemption');
      
      if (hasTrilogyFilter || hasRedemptionFilter) {
        const isRedemptionBook = result.first_appearance.includes('Redemption');
        if (hasTrilogyFilter && isRedemptionBook) return false;
        if (hasRedemptionFilter && !isRedemptionBook) return false;
      }

      return true;
    });
  }, [searchCivilizations, selectedFilters]);

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const getMatchIcon = (matchType: SearchResult['matchType']) => {
    switch (matchType) {
      case 'name': return <Search className="h-3 w-3" />;
      case 'quote': return <Quote className="h-3 w-3" />;
      case 'capability': return <Zap className="h-3 w-3" />;
      case 'origin': return <Globe className="h-3 w-3" />;
      default: return <Search className="h-3 w-3" />;
    }
  };

  const getMatchLabel = (matchType: SearchResult['matchType']) => {
    switch (matchType) {
      case 'name': return 'Name';
      case 'description': return 'Description';
      case 'quote': return 'Intelligence Fragment';
      case 'capability': return 'Capability';
      case 'origin': return 'Origin';
      case 'source': return 'Source';
      default: return 'Match';
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-900 px-1 rounded">{part}</mark> : 
        part
    );
  };

  // Set initial query and reset when modal opens/closes
  useEffect(() => {
    if (isOpen && initialQuery) {
      setQuery(initialQuery);
    } else if (!isOpen) {
      setQuery('');
      setSelectedFilters([]);
    }
  }, [isOpen, initialQuery]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Three-Body Universe Database
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search civilizations, quotes, capabilities, origins..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
          </div>

          {/* Filters */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((filter) => (
                <Button
                  key={filter.id}
                  variant={selectedFilters.includes(filter.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter(filter.id)}
                  className="text-xs"
                >
                  <div className={`w-2 h-2 rounded-full mr-1 ${filter.color}`} />
                  {filter.label}
                </Button>
              ))}
              {selectedFilters.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedFilters([])}
                  className="text-xs text-muted-foreground"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="overflow-y-auto max-h-96 space-y-3">
            {query.trim() === '' ? (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">Search the Dark Forest Database</p>
                <p className="text-sm">
                  Find civilizations by name, threat class, capabilities, quotes, or source material
                </p>
              </div>
            ) : filteredResults.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No Results Found</p>
                <p className="text-sm">
                  No civilizations match &quot;{query}&quot; with current filters
                </p>
              </div>
            ) : (
              <>
                <div className="text-sm text-muted-foreground mb-4">
                  Found {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} for &quot;{query}&quot;
                </div>
                {filteredResults.map((result, index) => (
                  <Card key={`${result.id}-${index}`} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {highlightMatch(result.name, query)}
                            <ThreatLevelBadge level={result.class as 0 | 1 | 2 | 3 | 4 | 5} />
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {getMatchIcon(result.matchType)}
                              <span className="ml-1">{getMatchLabel(result.matchType)}</span>
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {result.first_appearance}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        {result.matchType === 'name' && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {highlightMatch(result.description, query)}
                          </p>
                        )}
                        {result.matchType === 'description' && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {highlightMatch(result.description, query)}
                          </p>
                        )}
                        {result.matchType === 'quote' && (
                          <blockquote className="border-l-2 border-primary pl-3 italic text-sm">
                            &quot;{highlightMatch(result.matchText, query)}&quot;
                          </blockquote>
                        )}
                        {result.matchType === 'capability' && (
                          <div className="text-sm">
                            <span className="font-medium">Capabilities: </span>
                            {highlightMatch(result.matchText, query)}
                          </div>
                        )}
                        {result.matchType === 'origin' && (
                          <div className="text-sm">
                            <span className="font-medium">Origin: </span>
                            {highlightMatch(result.matchText, query)}
                          </div>
                        )}
                        {result.matchType === 'source' && (
                          <div className="text-sm">
                            <span className="font-medium">Source: </span>
                            {highlightMatch(result.matchText, query)}
                          </div>
                        )}
                        <div className="flex gap-2 mt-2">
                          <Button asChild size="sm" variant="default" onClick={onClose}>
                            <Link href={`/civilizations/${result.id}`}>
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}