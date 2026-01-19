// ABOUTME: Product selection screen - second step of the quiz
// ABOUTME: Grid of products with multi-select and category filters

'use client';

import { useState, useMemo, useEffect } from 'react';
import { track } from '@vercel/analytics';
import { Product } from '@/types/product';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/Button';
import { ProgressIndicator } from '@/components/ui/ProgressIndicator';

interface ProductsScreenProps {
  products: Product[];
  onSubmit: (selectedIds: string[]) => void;
  onBack: () => void;
}

const PRODUCT_TYPES = ['הכל', 'סבון', 'קרם לחות', 'סרום', 'טונר', 'מסיכה', 'טיפול נקודתי'];

export function ProductsScreen({ products, onSubmit, onBack }: ProductsScreenProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeFilter, setActiveFilter] = useState('הכל');

  // Track products screen view
  useEffect(() => {
    track('products_screen_viewed', {
      totalProducts: products.length,
      categoriesCount: [...new Set(products.map(p => p.type))].length,
      categories: [...new Set(products.map(p => p.type))].join(','),
    });
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'הכל') return products;
    return products.filter((p) => p.type === activeFilter);
  }, [products, activeFilter]);

  const handleToggle = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      const product = products.find(p => p.id === id);
      const isSelected = next.has(id);
      
      if (isSelected) {
        next.delete(id);
        track('product_deselected', {
          productId: id,
          productName: product?.name || 'unknown',
          productType: product?.type || 'unknown',
          totalSelected: next.size,
        });
      } else {
        next.add(id);
        track('product_selected', {
          productId: id,
          productName: product?.name || 'unknown',
          productType: product?.type || 'unknown',
          productStatus: product?.status || 'unknown',
          totalSelected: next.size + 1,
        });
      }
      return next;
    });
  };

  const handleSubmit = () => {
    const selectedProducts = products.filter(p => selectedIds.has(p.id));
    const selectedProductIds = Array.from(selectedIds);
    
    track('products_submitted', {
      totalSelected: selectedProductIds.length,
      productIds: selectedProductIds.join(','),
      productNames: selectedProducts.map(p => p.name).join('|'),
      productTypes: selectedProducts.map(p => p.type).join(','),
      approvedCount: selectedProducts.filter(p => p.status === 'approved').length,
      notApprovedCount: selectedProducts.filter(p => p.status === 'not_approved').length,
      limitedCount: selectedProducts.filter(p => p.status === 'limited').length,
    });
    
    onSubmit(selectedProductIds);
  };

  return (
    <div className="min-h-screen bg-[var(--magnolia)] pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-[var(--magnolia)] z-10 border-b border-gray-200 shadow-sm">
        {/* Progress */}
        <div className="px-4 pt-4 pb-2">
          <ProgressIndicator currentStep={2} totalSteps={4} />
        </div>

        {/* Centered title */}
        <div className="px-4 pb-3 text-center">
          <h2 className="text-lg md:text-xl font-bold text-[var(--purple)]">
            בחרי את המוצרים שלך
          </h2>
          {selectedIds.size > 0 && (
            <span className="inline-block mt-1 bg-[var(--lime)] text-[var(--purple)] text-sm font-bold px-3 py-1 rounded-full">
              {selectedIds.size} נבחרו
            </span>
          )}
        </div>

        {/* Category filters */}
        <div className="flex justify-center gap-2 flex-wrap pb-3 px-4">
          {PRODUCT_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => {
                setActiveFilter(type);
                track('category_filter_used', {
                  category: type,
                  productsInCategory: type === 'הכל' 
                    ? products.length 
                    : products.filter(p => p.type === type).length,
                });
              }}
              className={`
                px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap
                transition-all duration-200
                ${activeFilter === type
                  ? 'bg-[var(--purple)] text-white'
                  : 'bg-white text-[var(--purple)] border border-gray-200 hover:border-[var(--pink)]'
                }
              `}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-2xl mx-auto p-3 md:p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              selected={selectedIds.has(product.id)}
              onToggle={handleToggle}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            אין מוצרים בקטגוריה זו
          </p>
        )}
      </div>

      {/* Sticky bottom buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom">
        <div className="max-w-2xl mx-auto p-3 md:p-4 flex gap-3">
          <Button 
            onClick={() => {
              track('products_back_clicked', { selectedCount: selectedIds.size });
              onBack();
            }} 
            variant="secondary" 
            className="flex-1"
          >
            חזרה
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={selectedIds.size === 0}
            className="flex-[2]"
          >
            {selectedIds.size === 0
              ? 'בחרי לפחות מוצר אחד'
              : `הצג תוצאות (${selectedIds.size})`
            }
          </Button>
        </div>
      </div>
    </div>
  );
}
