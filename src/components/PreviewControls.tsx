
import React, { useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, RefreshCw, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface PreviewControlsProps {
  onRefresh: () => void;
  onExport: () => void;
}

const PreviewControls: React.FC<PreviewControlsProps> = ({ onRefresh, onExport }) => {
  const [viewportSize, setViewportSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const handleViewportChange = (size: 'desktop' | 'tablet' | 'mobile') => {
    setViewportSize(size);
    toast.success(`Switched to ${size} view`);
  };

  return (
    <div className="flex items-center justify-between w-full p-3 bg-muted/30 backdrop-blur-sm border-b rounded-t-lg">
      <div className="flex items-center gap-1">
        <Button
          variant={viewportSize === 'desktop' ? 'secondary' : 'ghost'}
          size="icon"
          onClick={() => handleViewportChange('desktop')}
          className="h-8 w-8"
        >
          <ArrowUp size={16} />
        </Button>
        <Button
          variant={viewportSize === 'tablet' ? 'secondary' : 'ghost'}
          size="icon"
          onClick={() => handleViewportChange('tablet')}
          className="h-8 w-8"
        >
          <ArrowRight size={16} />
        </Button>
        <Button
          variant={viewportSize === 'mobile' ? 'secondary' : 'ghost'} 
          size="icon"
          onClick={() => handleViewportChange('mobile')}
          className="h-8 w-8"
        >
          <ArrowDown size={16} />
        </Button>
      </div>
      
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onRefresh}
          className="h-8 w-8"
        >
          <RefreshCw size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onExport}
          className="h-8 w-8"
        >
          <Download size={16} />
        </Button>
      </div>
    </div>
  );
};

export default PreviewControls;
