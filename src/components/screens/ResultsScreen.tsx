// ABOUTME: Results screen - third step of the quiz
// ABOUTME: Shows product suitability results with status cards

'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';
import { Product } from '@/types/product';
import { ResultCard } from '@/components/ui/ResultCard';
import { Button } from '@/components/ui/Button';
import { ProgressIndicator } from '@/components/ui/ProgressIndicator';

interface ResultsScreenProps {
  products: Product[];
  age: number;
  onContinue: () => void;
  onBack: () => void;
}

export function ResultsScreen({ products, age, onContinue, onBack }: ResultsScreenProps) {
  const approved = products.filter((p) => p.status === 'approved');
  const notApproved = products.filter((p) => p.status === 'not_approved');
  const limited = products.filter((p) => p.status === 'limited');

  // Track results screen view
  useEffect(() => {
    track('results_screen_viewed', {
      age,
      totalProducts: products.length,
      approvedCount: approved.length,
      notApprovedCount: notApproved.length,
      limitedCount: limited.length,
      productIds: products.map(p => p.id).join(','),
      productNames: products.map(p => p.name).join('|'),
      approvedIds: approved.map(p => p.id).join(','),
      notApprovedIds: notApproved.map(p => p.id).join(','),
      limitedIds: limited.map(p => p.id).join(','),
    });
  }, [products, age, approved.length, notApproved.length, limited.length]);

  return (
    <div className="min-h-screen bg-[var(--magnolia)] pb-24">
      {/* Header */}
      <div className="bg-[var(--purple)] text-white">
        {/* Progress */}
        <div className="px-4 pt-4 pb-2">
          <ProgressIndicator currentStep={3} totalSteps={4} variant="dark" />
        </div>

        {/* Centered title */}
        <div className="px-4 py-4 text-center">
          <h2 className="text-xl md:text-2xl font-bold">התוצאות שלך</h2>
          <p className="text-white/70 text-sm">בדקנו {products.length} מוצרים</p>
        </div>
      </div>

      {/* Young age warning */}
      {age < 12 && (
        <div className="max-w-2xl mx-auto px-3 md:px-4 mt-4">
          <div className="bg-[var(--citrus)] rounded-2xl p-3 md:p-4">
            <p className="text-[var(--purple)] text-sm font-medium text-center">
              זכרי: בגילך אין חובה להשתמש במוצרי טיפוח.
              <br />
              אם את בוחרת להשתמש - עשי זאת בעדינות ובמוצרים עדינים בלבד.
            </p>
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="max-w-2xl mx-auto flex justify-center gap-2 md:gap-4 p-3 md:p-4">
        <div className="bg-green-100 rounded-xl px-3 md:px-4 py-2 text-center flex-1 max-w-[100px]">
          <p className="text-xl md:text-2xl font-bold text-green-700">{approved.length}</p>
          <p className="text-xs text-green-600">מתאימים</p>
        </div>
        <div className="bg-red-100 rounded-xl px-3 md:px-4 py-2 text-center flex-1 max-w-[100px]">
          <p className="text-xl md:text-2xl font-bold text-red-700">{notApproved.length}</p>
          <p className="text-xs text-red-600">לא מתאימים</p>
        </div>
        <div className="bg-amber-100 rounded-xl px-3 md:px-4 py-2 text-center flex-1 max-w-[100px]">
          <p className="text-xl md:text-2xl font-bold text-amber-700">{limited.length}</p>
          <p className="text-xs text-amber-600">מוגבלים</p>
        </div>
      </div>

      {/* Results cards */}
      <div className="px-3 md:px-4 max-w-2xl mx-auto space-y-6 pb-8">
        {/* Not approved first - most important */}
        {notApproved.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-base md:text-lg font-bold text-red-700 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              לא מתאימים לעור צעיר
            </h3>
            <div className="space-y-3">
              {notApproved.map((product) => (
                <ResultCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Limited */}
        {limited.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-base md:text-lg font-bold text-amber-700 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
              שימוש מוגבל
            </h3>
            <div className="space-y-3">
              {limited.map((product) => (
                <ResultCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Approved */}
        {approved.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-base md:text-lg font-bold text-green-700 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              מתאימים לעור צעיר
            </h3>
            <div className="space-y-3">
              {approved.map((product) => (
                <ResultCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky bottom buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom">
        <div className="max-w-2xl mx-auto p-3 md:p-4 flex gap-3">
          <Button 
            onClick={() => {
              track('results_back_clicked', {
                age,
                productsCount: products.length,
              });
              onBack();
            }} 
            variant="secondary" 
            className="flex-1"
          >
            עדכון בחירה
          </Button>
          <Button 
            onClick={() => {
              track('results_continue_clicked', {
                age,
                productsCount: products.length,
              });
              onContinue();
            }} 
            className="flex-[2]"
          >
            רוצה לדעת עוד?
          </Button>
        </div>
      </div>
    </div>
  );
}
