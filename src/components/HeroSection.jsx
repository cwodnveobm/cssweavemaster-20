import React, { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      skipSnaps: false,
      dragFree: false
    }, 
    [
      Autoplay({ 
        delay: 5000,
        stopOnInteraction: false,
        playOnInit: true
      })
    ]
  );
  
  const images = [
    "https://i.ibb.co/nRc8Y29/IMG-0528.jpg",
    "https://i.ibb.co/C7FdMfY/Whats-App-Image-2024-12-07-at-22-53-32-95d14174.jpg",
    "https://i.ibb.co/WzrLjQH/f326d2f8-4802-4000-b53b-b987f7a5a291.jpg",
  ];

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[250px] sm:h-[400px] md:h-[500px] lg:h-[570px] group">
        <div className="embla h-full" ref={emblaRef}>
          <div className="embla__container h-full flex">
            {images.map((image, index) => (
              <div 
                key={index} 
                className="embla__slide relative flex-[0_0_100%] h-full"
              >
                <img 
                  src={image} 
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollPrev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 sm:p-3 shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 z-10 touch-manipulation"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-green-800" />
        </button>
        
        <button
          onClick={scrollNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 sm:p-3 shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 z-10 touch-manipulation"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-green-800" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === selectedIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;