// ABOUTME: Result card showing product suitability assessment
// ABOUTME: Displays status, ingredients, reason, and usage notes

'use client';

import { Product, ProductStatus } from '@/types/product';

interface ResultCardProps {
  product: Product;
}

const statusConfig: Record<ProductStatus, { icon: string; bg: string; border: string; label: string; textColor: string }> = {
  approved: {
    icon: '✓',
    bg: 'bg-green-50',
    border: 'border-green-400',
    label: 'מתאים',
    textColor: 'text-green-700',
  },
  not_approved: {
    icon: '✕',
    bg: 'bg-red-50',
    border: 'border-red-400',
    label: 'לא מתאים',
    textColor: 'text-red-700',
  },
  limited: {
    icon: '!',
    bg: 'bg-amber-50',
    border: 'border-amber-400',
    label: 'שימוש מוגבל',
    textColor: 'text-amber-700',
  },
};

export function ResultCard({ product }: ResultCardProps) {
  const config = statusConfig[product.status];

  return (
    <div className={`${config.bg} border-2 ${config.border} rounded-2xl p-3 md:p-4 space-y-2 md:space-y-3`}>
      {/* Header with status */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-[var(--purple)] font-bold text-base md:text-lg truncate">{product.name}</h3>
          <p className="text-gray-500 text-xs md:text-sm">{product.type}</p>
        </div>
        <div className={`flex items-center gap-1.5 ${config.bg} border ${config.border} px-2 py-1 rounded-full shrink-0`}>
          <span className={`${config.textColor} font-bold text-sm`}>{config.icon}</span>
          <span className={`${config.textColor} font-medium text-xs md:text-sm whitespace-nowrap`}>{config.label}</span>
        </div>
      </div>

      {/* Problematic ingredients */}
      {product.problematicIngredients && product.problematicIngredients !== '-' && (
        <div className="bg-white/60 rounded-xl p-2 md:p-3">
          <p className="text-xs text-gray-500 mb-1">רכיבים בעייתיים:</p>
          <p className="text-xs md:text-sm text-[var(--purple)] break-words">{product.problematicIngredients}</p>
        </div>
      )}

      {/* Reason */}
      {product.reason && (
        <div>
          <p className="text-xs text-gray-500 mb-1">סיבה:</p>
          <p className="text-xs md:text-sm text-[var(--purple)]">{product.reason}</p>
        </div>
      )}

      {/* Usage note */}
      {product.usageNote && (
        <div className="bg-white/60 rounded-xl p-2 md:p-3">
          <p className="text-xs text-gray-500 mb-1">הערת שימוש:</p>
          <p className="text-xs md:text-sm font-medium text-[var(--purple)]">{product.usageNote}</p>
        </div>
      )}
    </div>
  );
}
