'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';

export function ContactCTA() {
  return (
    <section className="section section-bg" aria-label="Contact call to action">
      <div className="container-wide">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.7 }}
        >
          {/* Divider line */}
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent mx-auto mb-12" />

          <p className="section-label mx-auto">Say Hello</p>
          <h2 className="heading-section mb-4">
            Let&apos;s work{' '}
            <span className="text-gradient-blue">together</span>
          </h2>
          <p className="text-gray-500 text-base leading-relaxed mb-10 max-w-md mx-auto">
            I&apos;m Anand — AI Architect at Verizon, Chennai.
            Open to AI engineering and architecture roles globally.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="btn-primary"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              Get In Touch
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href="/AnandAnathurElangovanKCMVL.pdf"
              download
              className="btn-outline"
            >
              Download Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
