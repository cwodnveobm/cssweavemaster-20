import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const HennaMoments = () => {
  const controls = useAnimation();
  const containerRef = useRef(null);
  
  useEffect(() => {
    console.log('HennaMoments component mounted');
    let animationFrameId;
    
    const startAutoScroll = async () => {
      if (!containerRef.current) {
        console.log('Container ref not ready');
        return;
      }
      
      const scrollWidth = containerRef.current.scrollWidth;
      const clientWidth = containerRef.current.clientWidth;
      const scrollDistance = scrollWidth - clientWidth;
      
      console.log('Scroll width:', scrollWidth, 'Client width:', clientWidth, 'Scroll distance:', scrollDistance);
      
      if (scrollDistance <= 0) {
        console.log('No need to scroll - content fits in container');
        return;
      }

      try {
        // Reset position
        await controls.start({ x: 0 });
        
        // Start continuous scroll
        await controls.start({
          x: -scrollDistance,
          transition: {
            duration: 20,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse"
          }
        });
      } catch (error) {
        console.error('Animation error:', error);
      }
    };

    // Start animation after a short delay to ensure proper initialization
    const timeoutId = setTimeout(() => {
      animationFrameId = requestAnimationFrame(startAutoScroll);
    }, 500);

    // Cleanup function
    return () => {
      console.log('Cleaning up HennaMoments animations');
      clearTimeout(timeoutId);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      controls.stop();
    };
  }, [controls]);

  return (
    <div className="overflow-hidden w-full my-8">
      <motion.div
        ref={containerRef}
        className="flex gap-4"
        animate={controls}
      >
        {/* Image items */}
        <div className="flex-shrink-0">
          <img 
            src="/henna1.jpg" 
            alt="Henna Design 1" 
            className="w-64 h-64 object-cover rounded-lg shadow-md" 
            loading="lazy"
          />
        </div>
        <div className="flex-shrink-0">
          <img 
            src="/henna2.jpg" 
            alt="Henna Design 2" 
            className="w-64 h-64 object-cover rounded-lg shadow-md" 
            loading="lazy"
          />
        </div>
        <div className="flex-shrink-0">
          <img 
            src="/henna3.jpg" 
            alt="Henna Design 3" 
            className="w-64 h-64 object-cover rounded-lg shadow-md" 
            loading="lazy"
          />
        </div>
        <div className="flex-shrink-0">
          <img 
            src="/henna4.jpg" 
            alt="Henna Design 4" 
            className="w-64 h-64 object-cover rounded-lg shadow-md" 
            loading="lazy"
          />
        </div>
        <div className="flex-shrink-0">
          <img 
            src="/henna5.jpg" 
            alt="Henna Design 5" 
            className="w-64 h-64 object-cover rounded-lg shadow-md" 
            loading="lazy"
          />
        </div>
        {/* Duplicate first few images to create seamless loop */}
        <div className="flex-shrink-0">
          <img 
            src="/henna1.jpg" 
            alt="Henna Design 1" 
            className="w-64 h-64 object-cover rounded-lg shadow-md" 
            loading="lazy"
          />
        </div>
        <div className="flex-shrink-0">
          <img 
            src="/henna2.jpg" 
            alt="Henna Design 2" 
            className="w-64 h-64 object-cover rounded-lg shadow-md" 
            loading="lazy"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default HennaMoments;