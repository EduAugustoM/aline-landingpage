import React from 'react';

export const Badge = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-block py-1.5 px-4 rounded-full border border-primary/30 text-xs font-semibold tracking-widest uppercase text-primary mb-6 ${className}`}>
    {children}
  </span>
);

export const Button = ({ children, href, target, rel, variant = 'primary', className = '' }: { children: React.ReactNode, href?: string, target?: string, rel?: string, variant?: 'primary' | 'secondary', className?: string }) => {
  const baseClasses = "inline-flex items-center justify-center px-8 py-4 rounded-full transition-all duration-300 font-medium font-body text-base";
  const variants = {
    primary: "bg-primary text-white hover:scale-105 hover:bg-primary/90 shadow-lg shadow-primary/20",
    secondary: "bg-transparent text-foreground border border-foreground/20 hover:border-primary hover:text-primary"
  };

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={`${baseClasses} ${variants[variant]} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export const DividerOrnamental = ({ className = '' }: { className?: string }) => (
  <div className={`flex items-center gap-3 w-full max-w-[700px] mx-auto mt-6 mb-10 ${className}`}>
    <div className="flex-1 h-[1px] bg-primary/30"></div>
    <div className="w-1.5 h-1.5 bg-primary rotate-45 shrink-0"></div>
    <div className="flex-1 h-[1px] bg-primary/30"></div>
  </div>
);

