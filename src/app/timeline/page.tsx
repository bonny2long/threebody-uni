import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Clock, Calendar, AlertTriangle } from 'lucide-react';

export default function TimelinePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Universal Timeline</h1>
        <p className="text-lg text-muted-foreground">
          Chronological events across the Three-Body universe and beyond
        </p>
      </div>

      {/* Construction Notice */}
      <Card className="mb-8 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
            <AlertTriangle className="h-5 w-5" />
            Timeline Under Construction
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700 dark:text-blue-300">
          <p className="text-sm">
            The Universal Timeline is currently being compiled from classified sources. 
            Temporal data verification is ongoing across multiple dimensional reference frames.
          </p>
        </CardContent>
      </Card>

      {/* Sample Timeline Entries */}
      <div className="space-y-8">
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted"></div>
          
          <div className="relative flex items-start gap-6 pb-8">
            <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <Clock className="h-4 w-4 text-white" />
            </div>
            <Card className="flex-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Crisis Era Begins</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    2008 CE
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  First contact with Trisolaran civilization through the Red Coast Base incident. 
                  Humanity learns of the impending invasion, marking the beginning of the Crisis Era.
                </p>
                <div className="mt-3">
                  <span className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded">
                    First Contact Event
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="relative flex items-start gap-6 pb-8">
            <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <Clock className="h-4 w-4 text-white" />
            </div>
            <Card className="flex-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Dark Forest Theory Revealed</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    ~2200 CE
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Luo Ji discovers the fundamental law governing cosmic civilizations: 
                  the Dark Forest theory. Universe revealed as a hostile environment 
                  where civilizations must remain hidden or face destruction.
                </p>
                <div className="mt-3">
                  <span className="text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded">
                    Cosmic Revelation
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="relative flex items-start gap-6 pb-8">
            <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <Clock className="h-4 w-4 text-white" />
            </div>
            <Card className="flex-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Dimensional Collapse Initiated</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Far Future
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Advanced civilizations begin systematic reduction of universal dimensions 
                  as a defensive strategy. Three-dimensional space becomes increasingly rare.
                </p>
                <div className="mt-3">
                  <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded">
                    Universal Event
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="relative flex items-start gap-6 pb-8">
            <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Clock className="h-4 w-4 text-white" />
            </div>
            <Card className="flex-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Return Movement Formation</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Timeline Classified
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Human faction dedicated to universal restoration makes contact with 
                  higher-dimensional entities. Technology acquired for potential 
                  reality reset operations.
                </p>
                <div className="mt-3">
                  <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded">
                    Redemption Era
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>

      <Separator className="my-12" />

      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-center">Temporal Classification Notice</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            This timeline represents a simplified overview of major cosmic events. 
            Many entries remain classified under Dark Forest Protocol restrictions.
          </p>
          <p className="text-xs text-muted-foreground">
            Time flows differently across dimensional boundaries. 
            Dates may be approximate or exist in superposition.
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="text-xs px-3 py-1 bg-muted rounded">Earth Reference Frame</span>
            <span className="text-xs px-3 py-1 bg-muted rounded">Trisolaran Chronology</span>
            <span className="text-xs px-3 py-1 bg-muted rounded">Universal Standard Time</span>
          </div>
        </CardContent>
      </Card>

      <div className="text-center mt-12 p-6 border rounded-lg">
        <h3 className="font-semibold mb-2">Complete Timeline Archive</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Full chronological records are being processed and will be available in future updates.
          Check back regularly for expanded temporal data.
        </p>
        <div className="text-xs text-muted-foreground">
          Last Updated: Stardate 2024.365 • Next Review: [REDACTED]
        </div>
      </div>
    </div>
  );
}