import { CivilizationCard } from '@/components/CivilizationCard';
import civilizationsData from '@/data/civilizations.json';

export default function CivilizationsPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Known Civilizations</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          A comprehensive catalog of civilizations encountered throughout the Three-Body Problem and 
          Redemption of Time series. Each entry includes threat classification, known capabilities, 
          and documented encounters.
        </p>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {civilizationsData.length} civilizations cataloged
          </span>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Threat Levels:</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-class1 rounded-full" title="Class I" />
              <div className="w-3 h-3 bg-class2 rounded-full" title="Class II" />
              <div className="w-3 h-3 bg-class3 rounded-full" title="Class III" />
              <div className="w-3 h-3 bg-class4 rounded-full" title="Class IV" />
              <div className="w-3 h-3 bg-class5 rounded-full" title="Class V" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {civilizationsData.map((civilization) => (
          <CivilizationCard
            key={civilization.id}
            name={civilization.name}
            class={civilization.class as 0 | 1 | 2 | 3 | 4 | 5}
            description={civilization.description}
            firstAppearance={civilization.first_appearance}
            slug={civilization.id}
          />
        ))}
      </div>

      <div className="mt-12 p-6 bg-muted/50 rounded-lg border">
        <h2 className="text-xl font-semibold mb-3">Threat Classification System</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-class1 rounded-full" />
            <div>
              <div className="font-medium">Class I</div>
              <div className="text-muted-foreground">Planetary level threat</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-class2 rounded-full" />
            <div>
              <div className="font-medium">Class II</div>
              <div className="text-muted-foreground">Stellar system threat</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-class3 rounded-full" />
            <div>
              <div className="font-medium">Class III</div>
              <div className="text-muted-foreground">Galactic threat</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-class4 rounded-full" />
            <div>
              <div className="font-medium">Class IV</div>
              <div className="text-muted-foreground">Universal threat</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-class5 rounded-full" />
            <div>
              <div className="font-medium">Class V</div>
              <div className="text-muted-foreground">Multiversal threat</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-class0 rounded-full" />
            <div>
              <div className="font-medium">Unknown</div>
              <div className="text-muted-foreground">Classification pending</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}