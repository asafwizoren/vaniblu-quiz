// ABOUTME: WhatsApp integration utilities
// ABOUTME: Creates WhatsApp links for sharing and lead capture

const NITZAN_PHONE = '972545779912';

export function createShareLink(quizUrl: string): string {
  const text = `היי! גיליתי מבחן מגניב לבדוק אם מוצרי הסקינקייר שלך מתאימים לעור צעיר. נסי גם!\n${quizUrl}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function createLeadLink(
  age: number,
  productNames: string[],
  summary: { approved: number; notApproved: number; limited: number }
): string {
  const message = `היי! עשיתי את מבחן הסקינקייר ורוצה לקבל את השגרה שלי.

גיל: ${age}
מוצרים שבדקתי: ${productNames.join(', ')}

תוצאות:
- מתאימים: ${summary.approved}
- לא מתאימים: ${summary.notApproved}
- מוגבלים: ${summary.limited}`;

  return `https://wa.me/${NITZAN_PHONE}?text=${encodeURIComponent(message)}`;
}

export function validateIsraeliPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return /^05\d{8}$/.test(cleaned);
}
