import type { Metadata } from 'next';
import { CertificationsSection } from '@/components/sections/certifications/CertificationsSection';

export const metadata: Metadata = {
  title: 'Certifications',
  description: 'Google Cloud Professional Cloud Architect, Professional Data Engineer, TensorFlow Developer Certificate, AWS Solutions Architect.',
};

export default function CertificationsPage() {
  return (
    <div className="pt-16">
      <CertificationsSection />
    </div>
  );
}
