import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Science & Applied AI',
  description:
    'Machine learning, data engineering, and applied AI projects — from predictive maintenance on 50,000+ IoT machines to NL-to-SQL analytics at Verizon.',
  openGraph: {
    title: 'Data Science & Applied AI — Anand Anathur Elangovan',
    description: 'Production ML systems at enterprise scale: BigQuery ML, Vertex AI AutoML, time-series forecasting, anomaly detection and more.',
  },
};

export default function DataScienceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
