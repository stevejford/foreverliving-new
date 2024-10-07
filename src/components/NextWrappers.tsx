import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const Image: React.FC<{ src: string; alt: string; width: number; height: number; className?: string }> = 
  ({ src, alt, width, height, className }) => (
    <img src={src} alt={alt} width={width} height={height} className={className} />
  );

export const Link: React.FC<{ href: string; className?: string; children: React.ReactNode }> = 
  ({ href, className, children }) => (
    <RouterLink to={href} className={className}>{children}</RouterLink>
  );

const NextWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="next-wrapper">
      {children}
    </div>
  );
};

export default NextWrapper;
