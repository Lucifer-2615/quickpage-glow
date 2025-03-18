
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg overflow-hidden shadow-sm">
        <div className="absolute inset-0 flex items-center justify-center text-white font-display font-bold text-lg">L</div>
        <div className="absolute inset-0 bg-white/10 shimmer"></div>
      </div>
      <span className="font-display font-semibold tracking-tight text-primary text-xl">LandingAI</span>
    </div>
  );
};

export default Logo;
