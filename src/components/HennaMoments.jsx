import React, { useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

const HennaMoments = () => {
  const scrollRef = useRef(null);
  const controls = useAnimationControls();
  const animationRef = useRef(null);

  const images = [
    "https://i.postimg.cc/2SGPxtQr/Screenshot-2024-10-13-173602.png",
    "https://i.postimg.cc/sDddf7fd/Screenshot-2024-10-13-173328.png",
    "https://i.postimg.cc/MGXrmpZm/Screenshot-2024-10-13-173745.png",
    "https://i.postimg.cc/bNxXZrdG/Screenshot-2024-10-13-173523.png",
  ];

  useEffect(() => {
    let isMounted = true;
    console.log('HennaMoments component mounted');

    const startAnimation = async () => {
      if (!isMounted) return;
      
      const container = scrollRef.current;
      if (!container) {
        console.log('Container ref not found');
        return;
      }

      const scrollWidth = container.scrollWidth - container.clientWidth;
      console.log('Scroll width calculated:', scrollWidth);

      const animate = async () => {
        if (!isMounted) return;

        try {
          console.log('Starting scroll animation');
          await controls.start({
            x: -scrollWidth,
            transition: { duration: 20, ease: "linear" }
          });

          if (!isMounted) return;

          console.log('Resetting scroll position');
          await controls.start({
            x: 0,
            transition: { duration: 0 }
          });

          if (isMounted) {
            animationRef.current = requestAnimationFrame(animate);
          }
        } catch (error) {
          console.error('Animation error:', error);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation after a short delay to ensure component is mounted
    const timeoutId = setTimeout(startAnimation, 100);

    return () => {
      console.log('Cleaning up animation');
      isMounted = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearTimeout(timeoutId);
      controls.stop();
    };
  }, [controls]);

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-green-800 mb-4">
          Henna Moments
        </h2>
        <p className="text-center mb-8 sm:mb-12 text-sm sm:text-base text-gray-600">
          Follow our instagram page{' '}
          <a
            href="https://www.instagram.com/hennabyfathima.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-800 hover:underline"
          >
            @hennabyfathima.in
          </a>{' '}
          for more updates and designs
        </p>

        <motion.div
          ref={scrollRef}
          animate={controls}
          className="flex gap-4 overflow-hidden"
        >
          {[...images, ...images].map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Henna design ${index + 1}`}
              className="w-64 h-64 object-cover rounded-lg flex-shrink-0"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HennaMoments;