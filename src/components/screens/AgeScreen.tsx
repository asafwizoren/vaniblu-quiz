// ABOUTME: Age input screen - first step of the quiz
// ABOUTME: Collects age and shows appropriate message based on age range

'use client';

import { useState, useEffect } from 'react';
import { track } from '@vercel/analytics';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { ProgressIndicator } from '@/components/ui/ProgressIndicator';

interface AgeScreenProps {
  onSubmit: (age: number) => void;
}

export function AgeScreen({ onSubmit }: AgeScreenProps) {
  const [age, setAge] = useState<string>('');
  const [showWarning, setShowWarning] = useState<'young' | 'old' | null>(null);

  // Track page view and referrer
  useEffect(() => {
    const referrer = typeof window !== 'undefined' ? document.referrer : '';
    const utmSource = typeof window !== 'undefined' 
      ? new URLSearchParams(window.location.search).get('utm_source') 
      : null;
    
    track('quiz_started', {
      referrer: referrer || 'direct',
      utm_source: utmSource || 'none',
      timestamp: new Date().toISOString(),
    });
  }, []);

  const handleSubmit = () => {
    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) return;

    if (ageNum < 12) {
      setShowWarning('young');
      track('age_warning_shown', { age: ageNum, warningType: 'young' });
    } else if (ageNum > 15) {
      setShowWarning('old');
      track('age_warning_shown', { age: ageNum, warningType: 'old' });
    } else {
      track('age_submitted', { age: ageNum, warningType: 'none' });
      onSubmit(ageNum);
    }
  };

  const handleContinueAnyway = () => {
    const ageNum = parseInt(age, 10);
    track('age_continued_despite_warning', { 
      age: ageNum, 
      warningType: showWarning || 'unknown' 
    });
    onSubmit(ageNum);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--magnolia)]">
      {/* Header with progress */}
      <div className="p-4">
        <ProgressIndicator currentStep={1} totalSteps={4} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {/* Logo */}
        <div className="mb-6 animate-fade-in">
          <Logo size="lg" />
        </div>

        {/* Headline */}
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[var(--purple)] text-center mb-3 leading-relaxed">
          המבחן שיגלה אם הסקינקייר שלך
          <br />
          באמת מתאים לך!
        </h1>

        {/* Subtext */}
        <p className="text-gray-600 text-sm md:text-base text-center mb-8 max-w-md leading-relaxed px-4">
          פה תוכלי לבחור את המוצרים שאת משתמשת בהם או שוקלת לנסות
          ולקבל תשובה אמיתית: האם זה מתאים לעור שלך, או פחות.
        </p>

        {/* Age input */}
        {!showWarning && (
          <div className="w-full max-w-xs space-y-6 px-4">
            <div>
              <label className="block text-[var(--purple)] font-medium mb-2 text-center">
                בת כמה את?
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="הכניסי את הגיל שלך"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200
                  focus:border-[var(--pink)] focus:outline-none
                  text-center text-xl text-[var(--purple)]
                  placeholder:text-gray-400 placeholder:text-base
                  transition-all duration-200"
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!age || parseInt(age, 10) < 1}
              className="w-full"
            >
              התחילי בבחירת מוצרים
            </Button>
          </div>
        )}

        {/* Warning for young users */}
        {showWarning === 'young' && (
          <div className="w-full max-w-md space-y-6 text-center px-4">
            <div className="bg-[var(--citrus)] rounded-2xl p-6">
              <p className="text-[var(--purple)] font-medium leading-relaxed">
                בגילך הצעיר אין חובה להשתמש במוצרי טיפוח.
                <br />
                אם תחליטי להשתמש - חשוב לעשות זאת בזהירות רבה!
              </p>
            </div>
            <Button onClick={handleContinueAnyway} variant="secondary">
              בכל זאת רוצה לבדוק מוצרים
            </Button>
          </div>
        )}

        {/* Message for older users */}
        {showWarning === 'old' && (
          <div className="w-full max-w-md space-y-6 text-center px-4">
            <div className="bg-[var(--pink)]/20 rounded-2xl p-6">
              <p className="text-[var(--purple)] leading-relaxed">
                המבחן מיועד בעיקר לגילאי 12-15,
                <br />
                אבל את מוזמנת להמשיך
              </p>
            </div>
            <Button onClick={handleContinueAnyway}>
              המשיכי לבחירת מוצרים
            </Button>
          </div>
        )}
      </div>

      {/* Footer wave decoration */}
      <div className="h-16 bg-gradient-to-t from-[var(--pink)]/10 to-transparent" />
    </div>
  );
}
