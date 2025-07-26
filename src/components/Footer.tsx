import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-3">Three-Body Universe</h3>
            <p className="text-sm text-muted-foreground">
              A comprehensive database cataloging civilizations from the Three-Body Problem and Redemption of Time series.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Navigation</h3>
            <div className="space-y-2 text-sm">
              <Link href="/civilizations" className="block text-muted-foreground hover:text-foreground">
                Civilizations
              </Link>
              <Link href="/timeline" className="block text-muted-foreground hover:text-foreground">
                Timeline
              </Link>
              <Link href="/about" className="block text-muted-foreground hover:text-foreground">
                About
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Developer</h3>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                Created by Bonny Makaniankhondo
              </p>
              <Link 
                href="https://github.com/bonny2long" 
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-foreground"
              >
                GitHub: @bonny2long
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Three-Body Universe Database by Bonny Makaniankhondo. Fan project for educational purposes.</p>
          <p className="mt-2 text-xs">
            This is a fan-created project. All content is based on the works of Liu Cixin and Baoshu. Not affiliated with the authors or publishers.
          </p>
        </div>
      </div>
    </footer>
  );
}