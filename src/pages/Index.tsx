
import React, { useState, useRef } from 'react';
import Logo from '@/components/Logo';
import ProductEditor from '@/components/ProductEditor';
import Preview from '@/components/Preview';
import PreviewControls from '@/components/PreviewControls';
import { ProductData, ExportFormat } from '@/types/product';
import { generateHTML, generateReactCode, downloadCode } from '@/utils/generator';
import { toast } from 'sonner';

const emptyProduct: ProductData = {
  name: '',
  description: '',
  price: '',
  images: [],
  category: '',
  features: [''],
  callToAction: 'Buy Now',
  testimonials: [{ author: '', content: '' }],
  primaryColor: '#000000',
  secondaryColor: '#ffffff',
  fontFamily: 'Inter',
  layout: 'centered',
};

const Index = () => {
  const [product, setProduct] = useState<ProductData>(emptyProduct);
  const previewRef = useRef<HTMLDivElement>(null);

  const handlePreview = (updatedProduct: ProductData) => {
    setProduct(updatedProduct);
  };

  const handleExport = (data: ProductData, format: ExportFormat) => {
    if (format === 'html') {
      const html = generateHTML(data);
      downloadCode(html, 'html');
    } else if (format === 'react') {
      const reactCode = generateReactCode(data);
      downloadCode(reactCode, 'react');
    }
  };

  const handleRefresh = () => {
    toast.info("Preview refreshed");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between py-4">
          <Logo />
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
      
      <main className="container py-6">
        <div className="flex flex-col gap-8 md:gap-12">
          <div className="space-y-4 text-center max-w-3xl mx-auto animate-fade-in">
            <div className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              AI-Powered E-commerce Landing Page Generator
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Create stunning landing pages for your products
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter your product details and watch as AI instantly generates a beautiful, conversion-focused landing page that's ready to publish.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 pb-16">
            <div className="flex flex-col space-y-4 animate-slide-in md:sticky md:top-24 md:self-start" style={{animationDelay: '0.2s'}}>
              <div className="p-6 rounded-xl border bg-card shadow-sm">
                <ProductEditor onPreview={handlePreview} onExport={handleExport} />
              </div>
            </div>
            
            <div className="flex flex-col space-y-4 animate-slide-in" style={{animationDelay: '0.4s'}}>
              <div className="flex flex-col shadow-sm rounded-xl overflow-hidden border" ref={previewRef}>
                <PreviewControls onRefresh={handleRefresh} onExport={() => handleExport(product, 'html')} />
                <div className="flex-1 relative w-full aspect-[9/16] md:aspect-auto md:h-[700px]">
                  <Preview product={product} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t py-8 md:py-12">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-sm text-muted-foreground ml-2">
              © {new Date().getFullYear()} All rights reserved
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
