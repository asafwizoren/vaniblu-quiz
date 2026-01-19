// ABOUTME: Selectable product card for product selection screen
// ABOUTME: Shows product image and name with multi-select support

'use client';

import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  selected: boolean;
  onToggle: (id: string) => void;
}

const typeColors: Record<string, string> = {
  'סבון': 'bg-[var(--indigo)]',
  'קרם לחות': 'bg-[var(--pink)]',
  'סרום': 'bg-[var(--orange)]',
  'טונר': 'bg-[var(--green)]',
  'מסיכה': 'bg-[var(--citrus)]',
  'טיפול נקודתי': 'bg-purple-500',
};

const typeTextColors: Record<string, string> = {
  'סבון': 'text-white',
  'קרם לחות': 'text-[var(--purple)]',
  'סרום': 'text-white',
  'טונר': 'text-white',
  'מסיכה': 'text-[var(--purple)]',
  'טיפול נקודתי': 'text-white',
};

export function ProductCard({ product, selected, onToggle }: ProductCardProps) {
  const bgColor = typeColors[product.type] || 'bg-[var(--indigo)]';
  const textColor = typeTextColors[product.type] || 'text-white';

  return (
    <button
      onClick={() => onToggle(product.id)}
      className={`
        relative w-full rounded-xl md:rounded-2xl overflow-hidden
        transition-all duration-200 ease-in-out active:scale-95
        ${selected
          ? 'ring-3 md:ring-4 ring-[var(--lime)] shadow-lg scale-[1.02]'
          : 'ring-1 ring-gray-200 hover:ring-2 hover:ring-[var(--pink)] hover:shadow-md'
        }
      `}
    >
      {/* Product image */}
      <div className={`${bgColor} aspect-[4/3] flex items-center justify-center p-2 md:p-4 overflow-hidden`}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        ) : (
          <span className={`${textColor} text-xs md:text-sm font-medium text-center leading-tight opacity-80`}>
            {product.type}
          </span>
        )}
      </div>

      {/* Product name */}
      <div className="bg-white p-2 md:p-3">
        <p className="text-[var(--purple)] text-xs md:text-sm font-medium line-clamp-2 text-right min-h-[2.5em]">
          {product.name}
        </p>
      </div>

      {/* Selection indicator */}
      {selected && (
        <div className="absolute top-1.5 left-1.5 md:top-2 md:left-2 w-5 h-5 md:w-6 md:h-6 bg-[var(--lime)] rounded-full flex items-center justify-center shadow-md">
          <svg className="w-3 h-3 md:w-4 md:h-4 text-[var(--purple)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  );
}
