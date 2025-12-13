// ABOUTME: TypeScript types for product data
// ABOUTME: Defines Product interface and status types

export type ProductStatus = 'approved' | 'not_approved' | 'limited';

export interface Product {
  id: string;
  name: string;
  type: string;
  rinseOrLeave: string;
  problematicIngredients: string;
  reason: string;
  usageNote: string;
  status: ProductStatus;
  statusText: string;
}

export type ProductType = 'סבון' | 'קרם לחות' | 'סרום' | 'טונר' | 'מסיכה';

export interface QuizState {
  age: number | null;
  selectedProducts: string[];
  currentScreen: 'age' | 'products' | 'results' | 'cta';
}
