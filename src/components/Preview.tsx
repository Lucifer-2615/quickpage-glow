
import React, { useEffect, useRef } from 'react';
import { ProductData } from '@/types/product';
import { generateHTML } from '@/utils/generator';

interface PreviewProps {
  product: ProductData;
}

const Preview: React.FC<PreviewProps> = ({ product }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    updatePreview();
  }, [product]);

  const updatePreview = () => {
    if (iframeRef.current) {
      const html = generateHTML(product);
      
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(html);
        iframeDoc.close();
      }
    }
  };

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden bg-white border shadow-sm">
      <div className="absolute inset-0">
        <iframe 
          ref={iframeRef}
          className="w-full h-full border-0"
          title="Landing Page Preview"
        />
      </div>
    </div>
  );
};

export default Preview;
