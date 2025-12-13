// ABOUTME: VaniBlu logo component
// ABOUTME: Reusable logo with size variants

'use client';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: { width: 100, height: 40 },
  md: { width: 150, height: 60 },
  lg: { width: 200, height: 80 },
};

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const { width, height } = sizes[size];

  return (
    <img
      src="/logo.svg"
      alt="VaniBlu"
      width={width}
      height={height}
      className={`object-contain ${className}`}
    />
  );
}
