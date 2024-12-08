import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const HennaMoments = () => {
  const controls = useAnimation();
  const containerRef = useRef(null);
  
  useEffect(() => {
    console.log('HennaMoments component mounted');
    let animationFrameId;
    
    const startAutoScroll = async () => {
      if (!containerRef.current) return;
      
      const scrollWidth = containerRef.current.scrollWidth;
      const clientWidth = containerRef.current.clientWidth;
      console.log('Scroll width calculated:', scrollWidth);
      
      try {
        await controls.start({
          x: [0, -(scrollWidth - clientWidth)],
          transition: {
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }
        });
      } catch (error) {
        console.error('Animation error:', error);
      }
    };

    const initAnimation = () => {
      console.log('Starting scroll animation');
      animationFrameId = requestAnimationFrame(startAutoScroll);
    };

    // Start animation with a small delay to ensure component is mounted
    const timeoutId = setTimeout(initAnimation, 100);

    return () => {
      console.log('Cleaning up HennaMoments animations');
      if (timeoutId) clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
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
          <img src="/henna1.jpg" alt="Henna Design 1" className="w-64 h-64 object-cover rounded-lg" />
        </div>
        <div className="flex-shrink-0">
          <img src="/henna2.jpg" alt="Henna Design 2" className="w-64 h-64 object-cover rounded-lg" />
        </div>
        <div className="flex-shrink-0">
          <img src="/henna3.jpg" alt="Henna Design 3" className="w-64 h-64 object-cover rounded-lg" />
        </div>
        <div className="flex-shrink-0">
          <img src="/henna4.jpg" alt="Henna Design 4" className="w-64 h-64 object-cover rounded-lg" />
        </div>
        <div className="flex-shrink-0">
          <img src="/henna5.jpg" alt="Henna Design 5" className="w-64 h-64 object-cover rounded-lg" />
        </div>
      </motion.div>
    </div>
  );
};

export default HennaMoments;