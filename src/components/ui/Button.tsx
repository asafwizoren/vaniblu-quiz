// ABOUTME: Styled button component for VaniBlu
// ABOUTME: Primary and secondary variants with brand colors

'use client';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'whatsapp';
  className?: string;
  type?: 'button' | 'submit';
}

export function Button({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseStyles = `
    px-6 py-3 rounded-full font-medium text-lg
    transition-all duration-200 ease-in-out
    disabled:opacity-50 disabled:cursor-not-allowed
    flex items-center justify-center gap-2
  `;

  const variants = {
    primary: `
      bg-[var(--lime)] text-[var(--purple)]
      hover:bg-[var(--citrus)] hover:shadow-lg
      active:scale-95
    `,
    secondary: `
      bg-transparent border-2 border-[var(--purple)] text-[var(--purple)]
      hover:bg-[var(--purple)] hover:text-white
    `,
    whatsapp: `
      bg-[#25D366] text-white
      hover:bg-[#128C7E] hover:shadow-lg
      active:scale-95
    `,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
