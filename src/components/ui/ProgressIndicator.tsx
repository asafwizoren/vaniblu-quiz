// ABOUTME: Progress indicator showing current quiz step
// ABOUTME: Visual progress bar with step numbers

'use client';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  variant?: 'light' | 'dark';
}

export function ProgressIndicator({ currentStep, totalSteps, variant = 'light' }: ProgressIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100;
  const isDark = variant === 'dark';

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className={`flex justify-between text-xs mb-1 ${isDark ? 'text-white/70' : 'text-gray-500'}`}>
        <span>שלב {currentStep} מתוך {totalSteps}</span>
      </div>
      <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-white/20' : 'bg-gray-200'}`}>
        <div
          className="h-full bg-[var(--lime)] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
