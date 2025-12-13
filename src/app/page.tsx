// ABOUTME: Main quiz page with state management
// ABOUTME: Orchestrates flow between all 4 quiz screens

'use client';

import { useState } from 'react';
import { AgeScreen } from '@/components/screens/AgeScreen';
import { ProductsScreen } from '@/components/screens/ProductsScreen';
import { ResultsScreen } from '@/components/screens/ResultsScreen';
import { CTAScreen } from '@/components/screens/CTAScreen';
import { Product } from '@/types/product';
import productsData from '@/data/products.json';

type Screen = 'age' | 'products' | 'results' | 'cta';

export default function QuizPage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('age');
  const [age, setAge] = useState<number>(0);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  const products = productsData as Product[];

  const selectedProducts = products.filter((p) =>
    selectedProductIds.includes(p.id)
  );

  const handleAgeSubmit = (submittedAge: number) => {
    setAge(submittedAge);
    setCurrentScreen('products');
  };

  const handleProductsSubmit = (ids: string[]) => {
    setSelectedProductIds(ids);
    setCurrentScreen('results');
  };

  const handleResultsContinue = () => {
    setCurrentScreen('cta');
  };

  const handleBackToAge = () => {
    setCurrentScreen('age');
  };

  const handleBackToProducts = () => {
    setCurrentScreen('products');
  };

  return (
    <main className="min-h-screen">
      {currentScreen === 'age' && (
        <AgeScreen onSubmit={handleAgeSubmit} />
      )}

      {currentScreen === 'products' && (
        <ProductsScreen
          products={products}
          onSubmit={handleProductsSubmit}
          onBack={handleBackToAge}
        />
      )}

      {currentScreen === 'results' && (
        <ResultsScreen
          products={selectedProducts}
          age={age}
          onContinue={handleResultsContinue}
          onBack={handleBackToProducts}
        />
      )}

      {currentScreen === 'cta' && (
        <CTAScreen
          age={age}
          selectedProducts={selectedProducts}
        />
      )}
    </main>
  );
}
