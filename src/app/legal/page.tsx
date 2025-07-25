'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import GradientHeading from '@/components/ui/GradientHeading';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

function LegalDocumentsContent() {
  const searchParams = useSearchParams();
  const documentName = searchParams?.get('document') || '';
  const [airtableUrl, setAirtableUrl] = useState('');

  useEffect(() => {
    // Base Airtable embed URL
    const baseUrl = 'https://airtable.com/embed/appMlzBsqiq8vNz5X/shrv2Qy8ZDAazuBep?layout=card';
    const filteredUrl = documentName 
      ? `${baseUrl}&filter_Document+Name=${encodeURIComponent(documentName)}`
      : baseUrl;
    setAirtableUrl(filteredUrl);
  }, [documentName]);

  return (
    <div className="min-h-screen bg-white">
      <GradientHeading
        title="Legal Documents"
        subtitle="Access our comprehensive collection of legal documents including privacy policies, terms of service, and cookie policies. All documents are regularly updated to ensure compliance with the latest regulations."
      />

      <div className="container mx-auto px-4 py-16">
        <div className="w-full rounded-lg overflow-hidden shadow-lg">
          {airtableUrl && (
            <iframe
              className="airtable-embed w-full"
              src={airtableUrl}
              frameBorder="0"
              width="100%"
              height="533"
              style={{ background: 'transparent', border: '1px solid #ccc' }}
              title="Legal Documents"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function LegalDocumentsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white">
        <GradientHeading
          title="Legal Documents"
          subtitle="Loading..."
        />
      </div>
    }>
      <LegalDocumentsContent />
    </Suspense>
  );
} 