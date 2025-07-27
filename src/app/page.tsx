'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThreatLevelBadge } from '@/components/ThreatLevelBadge';
import { Shield, Database, Clock, BookOpen, Search, Zap } from 'lucide-react';
import { SearchModal } from '@/components/SearchModal';
import civilizationsData from '@/data/civilizations.json';

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const threatLevels = civilizationsData.reduce((acc, civ) => {
    acc[civ.class] = (acc[civ.class] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const openSearchWithQuery = (query: string) => {
    setSearchQuery(query);
    setIsSearchOpen(true);
  };

  if (!isMounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="container mx-auto max-w-7xl px-4">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Three-Body Universe Database
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            A comprehensive catalog of civilizations, entities, and threats from the Three-Body Problem 
            and Redemption of Time series. Explore the dark forest of the universe through classified 
            intelligence reports and threat assessments.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/civilizations">
                <Database className="mr-2 h-5 w-5" />
                Browse Civilizations
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link href="/timeline">
                <Clock className="mr-2 h-5 w-5" />
                View Timeline
              </Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Known Civilizations - Links to civilizations page */}
          <Link href="/civilizations">
            <div className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:bg-primary/5">
              <Card>
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-3xl font-bold text-primary group-hover:scale-105 transition-transform">
                    {civilizationsData.length}
                  </CardTitle>
                  <CardDescription className="group-hover:text-foreground transition-colors">
                    Known Civilizations
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Database className="h-4 w-4 mx-auto text-primary" />
                </CardContent>
              </Card>
            </div>
          </Link>

          {/* Class V Threats - Opens search for Class V */}
          <Card 
            className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:bg-red-50 dark:hover:bg-red-950/20"
            onClick={() => openSearchWithQuery('class 5')}
          >
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-3xl font-bold text-red-500 group-hover:scale-105 transition-transform">
                {threatLevels[5] || 0}
              </CardTitle>
              <CardDescription className="group-hover:text-foreground transition-colors">
                Class V Threats
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Shield className="h-4 w-4 mx-auto text-red-500" />
            </CardContent>
          </Card>

          {/* Threat Classifications - Opens search modal */}
          <Card 
            className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:bg-yellow-50 dark:hover:bg-yellow-950/20"
            onClick={() => setIsSearchOpen(true)}
          >
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-3xl font-bold text-yellow-500 group-hover:scale-105 transition-transform">
                {Object.keys(threatLevels).length}
              </CardTitle>
              <CardDescription className="group-hover:text-foreground transition-colors">
                Threat Classifications
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Search className="h-4 w-4 mx-auto text-yellow-500" />
            </CardContent>
          </Card>

          {/* Dark Forest Vectors - Opens search for dark forest */}
          <Card 
            className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:bg-purple-50 dark:hover:bg-purple-950/20"
            onClick={() => openSearchWithQuery('dark forest')}
          >
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-3xl font-bold text-purple-500 group-hover:scale-105 transition-transform">
                ∞
              </CardTitle>
              <CardDescription className="group-hover:text-foreground transition-colors">
                Dark Forest Vectors
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Zap className="h-4 w-4 mx-auto text-purple-500" />
            </CardContent>
          </Card>
        </div>
      </section>
      {/* Featured Civilizations */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Most Dangerous Threats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {civilizationsData
            .filter(civ => civ.class >= 4)
            .sort((a, b) => b.class - a.class)
            .slice(0, 3)
            .map((civ) => (
              <Card key={civ.id} className="border-2 border-red-200 dark:border-red-900 flex flex-col h-full">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl">{civ.name}</CardTitle>
                    <ThreatLevelBadge level={civ.class as 0 | 1 | 2 | 3 | 4 | 5} />
                  </div>
                  <CardDescription>{civ.first_appearance}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
                    {civ.description}
                  </p>
                  <Button asChild variant="destructive" size="sm" className="w-full mt-auto text-xs">
                    <Link href={`/civilizations/${civ.id}`}>
                      <Shield className="mr-1 h-3 w-3" />
                      <span className="hidden sm:inline">View Threat Assessment</span>
                      <span className="sm:hidden">View Threat</span>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </section>
      {/* Dark Forest Warning */}
      <section className="py-16">
        <Card className="bg-gradient-to-r from-red-950/20 to-purple-950/20 border-red-200 dark:border-red-800">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <CardTitle className="text-2xl text-red-800 dark:text-red-200">
              Dark Forest Protocol Active
            </CardTitle>
            <CardDescription className="text-red-700 dark:text-red-300">
              This database contains classified information about cosmic threats
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-red-800 dark:text-red-200 mb-6">
              &quot;The universe is a dark forest. Every civilization is an armed hunter stalking through the trees...&quot;
            </p>
            <p className="text-sm text-red-600 dark:text-red-400">
              Exercise extreme caution when accessing threat data. Information contained within 
              may be subject to cosmic censorship or worse.
            </p>
          </CardContent>
        </Card>
      </section>
      {/* Quick Access */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Database Sections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/civilizations">
            <div className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <Card>
                <CardHeader>
                  <Database className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle>Civilizations Database</CardTitle>
                  <CardDescription>
                    Comprehensive catalog of all known cosmic civilizations and entities
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </Link>
          
          <Link href="/timeline">
            <div className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <Card>
                <CardHeader>
                  <Clock className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle>Universal Timeline</CardTitle>
                  <CardDescription>
                    Chronological events across the Three-Body saga and beyond
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </Link>
          
          <Link href="/about">
            <div className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <Card>
                <CardHeader>
                  <BookOpen className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle>About the Database</CardTitle>
                  <CardDescription>
                    Learn about this project and the Three-Body Problem series
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </Link>
        </div>
      </section>
      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)}
        initialQuery={searchQuery}
      />
    </div>
  );
}