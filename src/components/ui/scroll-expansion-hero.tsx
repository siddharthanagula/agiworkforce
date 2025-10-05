'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollExpansionHeroProps {
  className?: string;
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
}

export function ScrollExpansionHero({
  className,
  children,
  title = "Welcome to AGI Workforce",
  subtitle = "Transforming the future with AI employees",
  backgroundImage,
  backgroundVideo
}: ScrollExpansionHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothScrollY = useSpring(scrollYProgress, springConfig);

  // Transform values for animations
  const opacity = useTransform(smoothScrollY, [0, 0.5, 1], [1, 0.5, 0]);
  const textY = useTransform(smoothScrollY, [0, 1], ['0%', '-100%']);
  const videoScale = useTransform(smoothScrollY, [0, 1], [1, 1.2]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative min-h-[200vh] flex items-start justify-center overflow-hidden bg-background",
        className
      )}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Layer */}
        {isClient && (
          <motion.div
            className="absolute inset-0 z-0"
            style={{ scale: videoScale }}
          >
            {backgroundVideo ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={backgroundVideo} type="video/mp4" />
              </video>
            ) : backgroundImage ? (
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImage})` }}
              />
            ) : (
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/20 via-background to-accent/20" />
            )}

            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-background/60 backdrop-blur-sm"
              style={{ opacity: useTransform(smoothScrollY, [0, 0.5], [0, 0.8]) }}
            />
          </motion.div>
        )}

        {/* Content Layer */}
        <motion.div
          className="relative z-10 text-center px-4 max-w-5xl"
          style={isClient ? { opacity, y: textY } : {}}
        >
          {children || (
            <>
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {title}
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {subtitle}
              </motion.p>
            </>
          )}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 1,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={isClient ? { opacity: useTransform(smoothScrollY, [0, 0.3], [1, 0]) } : {}}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-muted-foreground">Scroll to explore</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-muted-foreground"
            >
              <path
                d="M12 5V19M12 19L5 12M12 19L19 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
