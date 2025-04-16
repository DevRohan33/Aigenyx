
import React from "react";
import { motion } from "framer-motion";

const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-accent/30"></div>
      
      {/* Animated circles */}
      {Array.from({ length: 20 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-primary/10"
          style={{
            width: Math.random() * 400 + 100,
            height: Math.random() * 400 + 100,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0.1, scale: 0.6 }}
          animate={{ 
            opacity: [0.1, 0.15, 0.1], 
            scale: [0.7, 0.9, 0.7],
            x: [0, Math.random() * 50 - 25, 0],
            y: [0, Math.random() * 50 - 25, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            ease: "easeInOut",
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
      
      {/* Floating particles */}
      {Array.from({ length: 30 }).map((_, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute rounded-full bg-secondary/30"
          style={{
            width: Math.random() * 8 + 2,
            height: Math.random() * 8 + 2,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
          }}
          transition={{
            duration: 15 + Math.random() * 15,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
