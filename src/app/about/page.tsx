import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Users, Shield, ExternalLink } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About the Database</h1>
        <p className="text-lg text-muted-foreground">
          Learn about this Three-Body Universe project and the source material
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Source Material
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">The Three-Body Trilogy</h3>
              <p className="text-muted-foreground text-sm">
                Original series by Liu Cixin, featuring <em>The Three-Body Problem</em>, 
                <em>The Dark Forest</em>, and <em>Death's End</em>. This groundbreaking 
                science fiction series explores first contact, cosmic sociology, and humanity's 
                place in a hostile universe.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Redemption of Time</h3>
              <p className="text-muted-foreground text-sm">
                Authorized sequel by Baoshu, expanding the Three-Body universe with new 
                civilizations, dimensions, and cosmic-scale threats. Features advanced 
                concepts like universal restoration and multiversal entities.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Project Purpose
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              This database serves as a comprehensive catalog of the various civilizations, 
              entities, and cosmic threats introduced throughout the Three-Body universe. 
              Designed as an interactive reference for fans of the series.
            </p>
            <div className="bg-muted/50 p-4 rounded border">
              <h4 className="font-semibold mb-2">Features Include:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Threat classification system (Class I-V)</li>
                <li>• Interactive civilization cards with detailed profiles</li>
                <li>• Dark/light theme support</li>
                <li>• Responsive design for all devices</li>
                <li>• Expandable lore sections</li>
                <li>• Immersive "Dark Forest Protocol" theming</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Cosmic Civilization Classification
            </CardTitle>
            <CardDescription>
              Threat levels based on technological capability and cosmic impact
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 rounded-r">
                <div className="font-mono text-sm font-bold text-green-700 dark:text-green-400">CLASS I</div>
                <div className="text-sm">
                  <div className="font-semibold">Planetary Civilizations</div>
                  <div className="text-muted-foreground">Earth Humanity - Limited to planetary resources, vulnerable to detection</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20 rounded-r">
                <div className="font-mono text-sm font-bold text-yellow-700 dark:text-yellow-400">CLASS II</div>
                <div className="text-sm">
                  <div className="font-semibold">Interstellar Civilizations</div>
                  <div className="text-muted-foreground">Trisolarans, Edge World - Interplanetary capabilities, basic dark forest awareness</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950/20 rounded-r">
                <div className="font-mono text-sm font-bold text-orange-700 dark:text-orange-400">CLASS III</div>
                <div className="text-sm">
                  <div className="font-semibold">Dark Forest Survivors</div>
                  <div className="text-muted-foreground">Returners, Return Movement - Advanced concealment and dimensional manipulation</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 border-l-4 border-red-500 bg-red-50 dark:bg-red-950/20 rounded-r">
                <div className="font-mono text-sm font-bold text-red-700 dark:text-red-400">CLASS IV</div>
                <div className="text-sm">
                  <div className="font-semibold">Dimensional Architects</div>
                  <div className="text-muted-foreground">Singer Civilization - Spacetime manipulation, stellar-scale weapons</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950/20 rounded-r">
                <div className="font-mono text-sm font-bold text-purple-700 dark:text-purple-400">CLASS V</div>
                <div className="text-sm">
                  <div className="font-semibold">Transcendent Entities</div>
                  <div className="text-muted-foreground">Zero-Homers, Descendants - Universal constant manipulation, multiversal influence</div>
                </div>
              </div>
            </div>
            
            <div className="bg-red-950/20 border border-red-800 rounded p-4 mt-4">
              <p className="text-red-200 text-xs">
                ⚠️ <strong>Dark Forest Protocol:</strong> Higher classification levels pose existential 
                threats to all lower-tier civilizations. Detection by Class IV+ entities typically 
                results in immediate annihilation.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Technology Stack
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="p-3 border rounded text-center">
                <div className="font-semibold">Next.js 15</div>
                <div className="text-muted-foreground">React Framework</div>
              </div>
              <div className="p-3 border rounded text-center">
                <div className="font-semibold">TypeScript</div>
                <div className="text-muted-foreground">Type Safety</div>
              </div>
              <div className="p-3 border rounded text-center">
                <div className="font-semibold">Tailwind CSS</div>
                <div className="text-muted-foreground">Styling</div>
              </div>
              <div className="p-3 border rounded text-center">
                <div className="font-semibold">shadcn/ui</div>
                <div className="text-muted-foreground">Components</div>
              </div>
              <div className="p-3 border rounded text-center">
                <div className="font-semibold">Firebase</div>
                <div className="text-muted-foreground">Database</div>
              </div>
              <div className="p-3 border rounded text-center">
                <div className="font-semibold">Lucide Icons</div>
                <div className="text-muted-foreground">Iconography</div>
              </div>
              <div className="p-3 border rounded text-center">
                <div className="font-semibold">Vercel</div>
                <div className="text-muted-foreground">Deployment</div>
              </div>
              <div className="p-3 border rounded text-center">
                <div className="font-semibold">Git</div>
                <div className="text-muted-foreground">Version Control</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        <div className="space-y-6">
          <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
            <CardHeader>
              <CardTitle className="text-yellow-800 dark:text-yellow-200">
                ⚠️ Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="text-yellow-700 dark:text-yellow-300 space-y-3">
              <p className="text-sm">
                This is an unofficial fan-created project and is not affiliated with, endorsed by, 
                or connected to Liu Cixin, Baoshu, or their publishers. All content is based on 
                publicly available information from the published works.
              </p>
              <p className="text-sm">
                The Three-Body Problem series and Redemption of Time are the intellectual property 
                of their respective authors and publishers. This database is created for educational 
                and entertainment purposes only.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Support the Original Creators</CardTitle>
              <CardDescription>
                If you enjoy this database, please support the original works
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Consider purchasing the official books, supporting translations, or exploring 
                other works by Liu Cixin and Baoshu. Their visionary science fiction has 
                inspired fans worldwide.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-muted rounded">The Three-Body Problem</span>
                <span className="text-xs px-2 py-1 bg-muted rounded">The Dark Forest</span>
                <span className="text-xs px-2 py-1 bg-muted rounded">Death's End</span>
                <span className="text-xs px-2 py-1 bg-muted rounded">Redemption of Time</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center py-8 border-t">
          <p className="text-sm text-muted-foreground">
            "Give civilization to time, and time to civilization."
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            — Three-Body Universe Database • 2024
          </p>
        </div>
      </div>
    </div>
  );
}