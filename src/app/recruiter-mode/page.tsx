'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePortfolioStore } from '@/lib/store';

export default function RecruiterModePage() {
  const router = useRouter();
  const { setRecruiterMode } = usePortfolioStore();

  useEffect(() => {
    setRecruiterMode(true);
    router.push('/');
  }, [router, setRecruiterMode]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-slate-400 text-sm">Loading Recruiter Mode...</div>
    </div>
  );
}
