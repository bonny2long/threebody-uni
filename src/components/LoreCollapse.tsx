'use client';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, FileText } from 'lucide-react';
import { useState } from 'react';

interface LoreCollapseProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
}

export function LoreCollapse({ title, children, defaultOpen = false, icon }: LoreCollapseProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border rounded-lg">
      <CollapsibleTrigger className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors">
        <div className="flex items-center gap-3">
          {icon || <FileText className="h-5 w-5 text-muted-foreground" />}
          <span className="font-semibold">{title}</span>
        </div>
        <ChevronDown 
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4 pt-0 border-t">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}