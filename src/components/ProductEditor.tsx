
import React, { useState } from 'react';
import { Upload, Check, X, Image as ImageIcon, SlidersHorizontal, Eye, Code, Save } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ColorPicker from './ColorPicker';
import { ProductData, LayoutType, ExportFormat } from '@/types/product';

const initialProductData: ProductData = {
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

const ProductEditor: React.FC<{
  onPreview: (data: ProductData) => void;
  onExport: (data: ProductData, format: ExportFormat) => void;
}> = ({ onPreview, onExport }) => {
  const [activeTab, setActiveTab] = useState('content');
  const [product, setProduct] = useState<ProductData>(initialProductData);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...product.features];
    newFeatures[index] = value;
    setProduct(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setProduct(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index: number) => {
    const newFeatures = product.features.filter((_, i) => i !== index);
    setProduct(prev => ({ ...prev, features: newFeatures.length ? newFeatures : [''] }));
  };

  const handleTestimonialChange = (index: number, field: 'author' | 'content', value: string) => {
    const newTestimonials = [...product.testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    setProduct(prev => ({ ...prev, testimonials: newTestimonials }));
  };

  const addTestimonial = () => {
    setProduct(prev => ({
      ...prev,
      testimonials: [...prev.testimonials, { author: '', content: '' }]
    }));
  };

  const removeTestimonial = (index: number) => {
    const newTestimonials = product.testimonials.filter((_, i) => i !== index);
    setProduct(prev => ({ 
      ...prev, 
      testimonials: newTestimonials.length ? newTestimonials : [{ author: '', content: '' }]
    }));
  };

  const handleColorChange = (colorType: 'primaryColor' | 'secondaryColor', color: string) => {
    setProduct(prev => ({ ...prev, [colorType]: color }));
  };

  const handleLayoutChange = (layout: LayoutType) => {
    setProduct(prev => ({ ...prev, layout }));
  };

  const handleFontChange = (font: string) => {
    setProduct(prev => ({ ...prev, fontFamily: font }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const handleImageUpload = (files: FileList) => {
    const newImages = [...product.images];
    
    Array.from(files).forEach(file => {
      if (!file.type.match('image.*')) {
        toast.error("Only image files are allowed");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          newImages.push(e.target.result.toString());
          setProduct(prev => ({ ...prev, images: newImages }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    const newImages = product.images.filter((_, i) => i !== index);
    setProduct(prev => ({ ...prev, images: newImages }));
  };

  const handlePreview = () => {
    onPreview(product);
    toast.success("Preview updated!");
  };

  const handleExport = (format: ExportFormat) => {
    onExport(product, format);
    toast.success(`Exported as ${format}!`);
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full mb-6">
          <TabsTrigger value="content" className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-current opacity-70"></div>
            Content
          </TabsTrigger>
          <TabsTrigger value="style" className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-current opacity-70"></div>
            Style
          </TabsTrigger>
          <TabsTrigger value="export" className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-current opacity-70"></div>
            Export
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-6 animate-fade-in">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium">Product Name</Label>
              <Input 
                id="name" 
                name="name" 
                placeholder="Enter product name" 
                value={product.name} 
                onChange={handleChange}
                className="mt-1.5 input-fade-in"
              />
            </div>
            
            <div>
              <Label htmlFor="description" className="text-sm font-medium">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                placeholder="Enter product description" 
                value={product.description} 
                onChange={handleChange}
                className="mt-1.5 min-h-24 input-fade-in"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price" className="text-sm font-medium">Price</Label>
                <Input 
                  id="price" 
                  name="price" 
                  placeholder="$99.99" 
                  value={product.price} 
                  onChange={handleChange}
                  className="mt-1.5 input-fade-in"
                />
              </div>
              <div>
                <Label htmlFor="category" className="text-sm font-medium">Category</Label>
                <Select 
                  value={product.category} 
                  onValueChange={(value) => setProduct(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger id="category" className="mt-1.5 input-fade-in">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="home">Home & Kitchen</SelectItem>
                    <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                    <SelectItem value="sports">Sports & Outdoors</SelectItem>
                    <SelectItem value="books">Books & Media</SelectItem>
                    <SelectItem value="food">Food & Beverages</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="callToAction" className="text-sm font-medium">Call to Action</Label>
              <Input 
                id="callToAction" 
                name="callToAction" 
                placeholder="Buy Now" 
                value={product.callToAction} 
                onChange={handleChange}
                className="mt-1.5 input-fade-in"
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Product Features</Label>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={addFeature}
                  className="h-8 px-2 text-xs"
                >
                  Add Feature
                </Button>
              </div>
              <div className="space-y-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input 
                      placeholder={`Feature ${index + 1}`} 
                      value={feature} 
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="input-fade-in"
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeFeature(index)}
                      className="shrink-0 text-muted-foreground hover:text-destructive"
                      disabled={product.features.length <= 1}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Testimonials</Label>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={addTestimonial}
                  className="h-8 px-2 text-xs"
                >
                  Add Testimonial
                </Button>
              </div>
              <div className="space-y-4">
                {product.testimonials.map((testimonial, index) => (
                  <Card key={index} className="overflow-hidden input-fade-in">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-medium text-muted-foreground">Testimonial {index + 1}</Label>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeTestimonial(index)}
                          className="h-6 w-6 text-muted-foreground hover:text-destructive"
                          disabled={product.testimonials.length <= 1}
                        >
                          <X size={14} />
                        </Button>
                      </div>
                      <Textarea 
                        placeholder="Testimonial content" 
                        value={testimonial.content} 
                        onChange={(e) => handleTestimonialChange(index, 'content', e.target.value)}
                        className="min-h-[60px]"
                      />
                      <Input 
                        placeholder="Author name" 
                        value={testimonial.author} 
                        onChange={(e) => handleTestimonialChange(index, 'author', e.target.value)}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Product Images</Label>
              </div>
              <div 
                className={`border-2 border-dashed rounded-lg p-4 transition-colors ${dragActive ? 'border-primary bg-primary/5' : 'border-muted'}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center justify-center py-4 text-center">
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium mb-1">Drag and drop images here</p>
                  <p className="text-xs text-muted-foreground mb-3">PNG, JPG up to 5MB</p>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                      <span>Select files</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        multiple
                        onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                      />
                    </div>
                  </label>
                </div>
              </div>
              
              {product.images.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {product.images.map((image, index) => (
                    <div key={index} className="relative group rounded-md overflow-hidden border bg-muted aspect-square">
                      <img 
                        src={image} 
                        alt={`Product preview ${index}`} 
                        className="w-full h-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="style" className="space-y-6 animate-fade-in">
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-2 block">Color Scheme</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor" className="text-xs text-muted-foreground">Primary Color</Label>
                  <ColorPicker 
                    id="primaryColor"
                    color={product.primaryColor} 
                    onChange={(color) => handleColorChange('primaryColor', color)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor" className="text-xs text-muted-foreground">Secondary Color</Label>
                  <ColorPicker 
                    id="secondaryColor"
                    color={product.secondaryColor} 
                    onChange={(color) => handleColorChange('secondaryColor', color)} 
                  />
                </div>
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium mb-4 block">Layout Style</Label>
              <RadioGroup 
                defaultValue={product.layout} 
                onValueChange={(value) => handleLayoutChange(value as LayoutType)}
                className="grid grid-cols-3 gap-4"
              >
                <div>
                  <RadioGroupItem
                    value="centered"
                    id="layout-centered"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="layout-centered"
                    className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="w-full h-16 mb-3 flex flex-col items-center justify-center gap-2">
                      <div className="w-8 h-2 bg-muted rounded-sm"></div>
                      <div className="w-12 h-4 bg-muted rounded-sm"></div>
                    </div>
                    <span className="text-xs font-medium">Centered</span>
                  </Label>
                </div>
                
                <div>
                  <RadioGroupItem
                    value="split"
                    id="layout-split"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="layout-split"
                    className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="w-full h-16 mb-3 flex flex-row items-center justify-center gap-2">
                      <div className="w-8 h-12 bg-muted rounded-sm"></div>
                      <div className="flex flex-col gap-1">
                        <div className="w-8 h-2 bg-muted rounded-sm"></div>
                        <div className="w-8 h-2 bg-muted rounded-sm"></div>
                      </div>
                    </div>
                    <span className="text-xs font-medium">Split</span>
                  </Label>
                </div>
                
                <div>
                  <RadioGroupItem
                    value="zigzag"
                    id="layout-zigzag"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="layout-zigzag"
                    className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="w-full h-16 mb-3 flex flex-col items-start justify-center gap-2">
                      <div className="flex w-full justify-start">
                        <div className="w-12 h-2 bg-muted rounded-sm"></div>
                      </div>
                      <div className="flex w-full justify-end">
                        <div className="w-12 h-2 bg-muted rounded-sm"></div>
                      </div>
                      <div className="flex w-full justify-start">
                        <div className="w-12 h-2 bg-muted rounded-sm"></div>
                      </div>
                    </div>
                    <span className="text-xs font-medium">Zigzag</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label className="text-sm font-medium mb-2 block">Typography</Label>
              <Select 
                value={product.fontFamily} 
                onValueChange={handleFontChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose font family" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inter">Inter (Modern & Clean)</SelectItem>
                  <SelectItem value="Playfair Display">Playfair Display (Elegant)</SelectItem>
                  <SelectItem value="Roboto">Roboto (Classic)</SelectItem>
                  <SelectItem value="Montserrat">Montserrat (Contemporary)</SelectItem>
                  <SelectItem value="Poppins">Poppins (Friendly)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="export" className="space-y-6 animate-fade-in">
          <div className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <h3 className="text-lg font-medium mb-1">Ready to export your landing page?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Preview your design or export it in your preferred format.
              </p>
              <div className="flex flex-col gap-3">
                <Button 
                  onClick={handlePreview}
                  className="premium-button w-full py-6 text-base"
                >
                  <span className="flex items-center gap-2">
                    <Eye size={18} />
                    Update Live Preview
                  </span>
                </Button>
                
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <Button 
                    variant="outline"
                    onClick={() => handleExport('html')}
                    className="ghost-button h-10"
                  >
                    <span className="flex items-center gap-2">
                      <Code size={16} />
                      Export as HTML
                    </span>
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleExport('react')}
                    className="ghost-button h-10"
                  >
                    <span className="flex items-center gap-2">
                      <Save size={16} />
                      Export as React
                    </span>
                  </Button>
                </div>
              </div>
            </div>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm">Responsive design</span>
                  </div>
                  <div className="flex items-center">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm">Optimized images</span>
                  </div>
                  <div className="flex items-center">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm">SEO friendly structure</span>
                  </div>
                  <div className="flex items-center">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm">Cross-browser compatibility</span>
                  </div>
                  <div className="flex items-center">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm">Fast loading performance</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductEditor;
