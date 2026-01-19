// ABOUTME: CTA screen - final step with WhatsApp group join and share
// ABOUTME: Join VaniBlu skincare community and share quiz with friends

'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';
import { Button } from '@/components/ui/Button';
import { createShareLink } from '@/lib/whatsapp';
import { Product } from '@/types/product';

interface CTAScreenProps {
  age: number;
  selectedProducts: Product[];
}

const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/HhsDPVQAWmM7UXShjXpjMY';

export function CTAScreen({ age, selectedProducts }: CTAScreenProps) {
  useEffect(() => {
    const referrer = typeof window !== 'undefined' ? document.referrer : '';
    const utmSource = typeof window !== 'undefined' 
      ? new URLSearchParams(window.location.search).get('utm_source') 
      : null;
    const utmMedium = typeof window !== 'undefined' 
      ? new URLSearchParams(window.location.search).get('utm_medium') 
      : null;
    const utmCampaign = typeof window !== 'undefined' 
      ? new URLSearchParams(window.location.search).get('utm_campaign') 
      : null;

    track('quiz_completed', {
      age,
      productsCount: selectedProducts.length,
      productIds: selectedProducts.map(p => p.id).join(','),
      productNames: selectedProducts.map(p => p.name).join('|'),
      productTypes: selectedProducts.map(p => p.type).join(','),
      approvedCount: selectedProducts.filter(p => p.status === 'approved').length,
      notApprovedCount: selectedProducts.filter(p => p.status === 'not_approved').length,
      limitedCount: selectedProducts.filter(p => p.status === 'limited').length,
      referrer: referrer || 'direct',
      utm_source: utmSource || 'none',
      utm_medium: utmMedium || 'none',
      utm_campaign: utmCampaign || 'none',
      timestamp: new Date().toISOString(),
    });
  }, [age, selectedProducts]);

  const handleShare = () => {
    track('whatsapp_share_clicked', {
      age,
      productsCount: selectedProducts.length,
      shareUrl: typeof window !== 'undefined' ? window.location.href : 'https://vaniblu.co.il/quiz',
    });
    const url = typeof window !== 'undefined' ? window.location.href : 'https://vaniblu.co.il/quiz';
    window.open(createShareLink(url), '_blank');
  };

  const handleJoinCommunity = () => {
    track('whatsapp_community_clicked', {
      age,
      productsCount: selectedProducts.length,
      communityLink: WHATSAPP_GROUP_LINK,
    });
    window.open(WHATSAPP_GROUP_LINK, '_blank');
  };

  return (
    <div className="min-h-screen bg-[var(--magnolia)] flex flex-col items-center justify-center p-6">
      {/* WhatsApp Community section */}
      <div className="w-full max-w-md bg-[var(--purple)] rounded-3xl p-6 shadow-lg mb-6">
        <div className="text-center mb-6">
          <img
            src="/icons/community.svg"
            alt=""
            className="w-16 h-16 mx-auto mb-4"
          />
          <h3 className="text-xl font-bold text-white mb-2">
            הצטרפי לקהילת ה-Skincare של VaniBlu
          </h3>
          <p className="text-white/80 text-sm">
            טיפים, שאלות ותשובות, ועדכונים על מוצרים חדשים
          </p>
        </div>

        <Button onClick={handleJoinCommunity} variant="whatsapp" className="w-full">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          הצטרפי לקהילה
        </Button>
      </div>

      {/* Share section */}
      <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-lg">
        <div className="text-center mb-6">
          <img
            src="/icons/share.svg"
            alt=""
            className="w-16 h-16 mx-auto mb-4"
          />
          <h3 className="text-xl font-bold text-[var(--purple)] mb-2">
            חברה שלך גם מתעניינת בסקינקייר?
          </h3>
          <p className="text-gray-600">שלחי לה את המבחן!</p>
        </div>

        <Button onClick={handleShare} variant="whatsapp" className="w-full">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          שתפי בוואטסאפ
        </Button>
      </div>

      {/* Footer */}
      <p className="mt-8 text-gray-500 text-sm text-center">
        VaniBlu - טיפוח לעור צעיר
        <br />
        Own Your Way
      </p>
    </div>
  );
}
