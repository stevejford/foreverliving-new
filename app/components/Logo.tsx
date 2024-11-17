'use client';

import { FaInfinity } from 'react-icons/fa';
import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark';
  href?: string;
}

export default function Logo({ variant = 'dark', href }: LogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-gray-800';
  const glowColor = variant === 'light' ? 'bg-white/20' : 'bg-blue-500/10';
  const hoverGlowColor = variant === 'light' ? 'bg-white/30' : 'bg-blue-500/20';
  const iconColor = variant === 'light' ? 'text-white' : 'text-blue-600';

  const LogoContent = () => (
    <div className="flex items-center gap-2 group">
      <div className="relative p-1">
        <FaInfinity 
          className={`text-3xl ${iconColor} transform rotate-0 group-hover:rotate-180 transition-all duration-700 relative z-10`} 
        />
        <div 
          className={`absolute -inset-1 ${glowColor} group-hover:${hoverGlowColor} rounded-full blur-sm transition-all duration-700`} 
        />
      </div>
      <span className={`text-xl font-semibold ${textColor}`}>Forever Living</span>
    </div>
  );

  if (href) {
    return (
      <Link href={href}>
        <LogoContent />
      </Link>
    );
  }

  return <LogoContent />;
}
