import React from 'react';

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  glow?: boolean;
}

export const ObhinLogo = ({
  className = 'w-8 h-8',
  glow = false,
  alt = 'OBHIN Logo',
  ...props
}: LogoProps) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src="/logo.svg"
    alt={alt}
    className={`${className} object-contain transition-all duration-300 ${
      glow ? 'drop-shadow-[0_0_12px_rgba(56,189,248,0.45)]' : ''
    }`}
    {...props}
  />
);
