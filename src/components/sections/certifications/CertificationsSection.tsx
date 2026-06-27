'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Award, CheckCircle } from 'lucide-react';
import { certifications } from '@/lib/data/certifications';
import { AnimatedText } from '@/components/shared/AnimatedText';

export function CertificationsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} id="certifications" className="section section-bg-alt" aria-label="Certifications">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            className="section-label"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            Credentials
          </motion.p>
          <AnimatedText
            text="Certifications"
            className="heading-section block"
            delay={0.1}
          />
          <motion.p
            className="text-gray-500 text-sm mt-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Industry-recognised cloud and AI certifications.
          </motion.p>
        </div>

        {/* Cert grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              className="glass rounded-2xl p-6 hover:shadow-md transition-all duration-300 group flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              {/* Badge icon */}
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-50 border border-blue-200/60">
                  <Award className="w-6 h-6 text-blue-600" aria-hidden="true" />
                </div>
                <div className="flex items-center gap-1 text-xs text-blue-600">
                  <CheckCircle className="w-3 h-3" aria-hidden="true" />
                  <span>Verified</span>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-1">{cert.issuer}</p>
                <h3 className="text-sm font-bold text-gray-900 leading-tight">{cert.name}</h3>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-600 border border-gray-200/60">
                    {cert.category}
                  </span>
                  <span className="text-xs text-gray-400">{cert.date}</span>
                </div>
              </div>

              {cert.verifyUrl && (
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-900 transition-colors mt-auto"
                  aria-label={`Verify ${cert.name} certificate`}
                >
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  Verify Certificate
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
