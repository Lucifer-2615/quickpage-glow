
export type LayoutType = 'centered' | 'split' | 'zigzag';
export type ExportFormat = 'html' | 'react';

export interface ProductData {
  name: string;
  description: string;
  price: string;
  images: string[];
  category: string;
  features: string[];
  callToAction: string;
  testimonials: Testimonial[];
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  layout: LayoutType;
}

export interface Testimonial {
  author: string;
  content: string;
}
