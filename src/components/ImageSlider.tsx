
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageSliderProps {
  images: string[];
  title?: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, title }) => {
  // If no images are provided, use placeholder images
  const defaultImages = [
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    "https://images.unsplash.com/photo-1518770660439-4636190af475",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  ];

  const displayImages = images.length > 0 ? images : defaultImages;

  return (
    <div className="w-full">
      <Carousel className="w-full max-w-6xl mx-auto">
        <CarouselContent>
          {displayImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[500px] w-full overflow-hidden rounded-xl">
                <img
                  src={image}
                  alt={title ? `${title} - Image ${index + 1}` : `Slide ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-center gap-2 mt-4">
          <CarouselPrevious className="static transform-none mx-1" />
          <CarouselNext className="static transform-none mx-1" />
        </div>
      </Carousel>
    </div>
  );
};

export default ImageSlider;
