'use client'

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThreatLevelBadge } from '@/components/ThreatLevelBadge';
import { ArrowLeft, Shield, AlertTriangle, Eye, Quote } from 'lucide-react';

export default function ZeroHomersThreatAssessment() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Database
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold">Zero-Homers</h1>
          <ThreatLevelBadge level={5} />
        </div>
        <p className="text-muted-foreground">First documented: Death&apos;s End</p>
      </div>

      {/* Threat Assessment Card */}
      <Card className="mb-8 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-background/50">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <CardTitle className="text-2xl text-red-600 dark:text-red-400">
                THREAT LEVEL: CRITICAL
              </CardTitle>
              <CardDescription className="text-base mt-1">
                Recommended Protocol: Immediate isolation and monitoring
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Primary Intelligence */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Intelligence Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed">
                Cryptic entities mentioned in Death&apos;s End who attempted to end the universe by rewriting fundamental physics. 
                They launched attacks on the basic constants of the universe to make it uninhabitable for life - a form of 
                cosmic-scale annihilation beyond mere destruction.
              </p>
            </CardContent>
          </Card>

          {/* Detailed Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Detailed Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Physical Form</h4>
                <p className="text-muted-foreground">
                  Unknown - possibly post-biological entities
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Origin</h4>
                <p className="text-muted-foreground">
                  Unknown cosmic region
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Weaponry & Capabilities</h4>
                <p className="text-muted-foreground">
                  Universal constant manipulation, physics law alteration
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quotes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Quote className="h-5 w-5" />
                Recorded Communications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                &quot;Return everything to zero.&quot;
              </blockquote>
              <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                &quot;No home shall remain.&quot;
              </blockquote>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Classification */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Classification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">Class V</div>
                <p className="text-sm text-muted-foreground">Cosmic Threat Level</p>
              </div>
            </CardContent>
          </Card>

          {/* Dark Forest Protocol */}
          <Card className="bg-gradient-to-br from-red-950/20 to-purple-950/20 border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="text-red-800 dark:text-red-200 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Dark Forest Protocol
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-red-700 dark:text-red-300">
                This intelligence is classified under Dark Forest Protocol guidelines. 
                Distribution is restricted to authorized personnel only.
              </p>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/civilizations">
                View All Civilizations
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/timeline">
                View Timeline
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}