import Link from 'next/link';
import { Mail, MapPin } from 'lucide-react';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

const footerLinks = [
  { section: 'Navigation', links: [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
    { href: '/skills', label: 'Skills' },
    { href: '/contact', label: 'Contact' },
  ]},
  { section: 'Projects', links: [
    { href: '/projects/vzgpt', label: 'VZGPT' },
    { href: '/projects/vzgenie', label: 'VZGenie' },
    { href: '/projects/vzsql-editor', label: 'VZSQL Editor' },
    { href: '/projects/vzflix', label: 'VZFlix' },
    { href: '/projects/cam-to-code', label: 'CamToCode' },
    { href: '/projects/living-fire-australia', label: 'Living Fire AU' },
    { href: '/projects/ai-ocr', label: 'AI OCR Platform' },
  ]},
  { section: 'Connect', links: [
    { href: 'https://github.com/Anand-Anathur-Elangovan', label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/anandanathur-elangovan-50339b419', label: 'LinkedIn' },
    { href: 'mailto:anandanathurelangovan94@gmail.com', label: 'Email' },
  ]},
];

export function Footer() {
  return (
    <footer className="border-t border-gray-200/60 bg-gray-50/50" role="contentinfo">
      <div className="container-wide py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center text-white font-bold text-xs">
                AE
              </div>
              <span className="font-semibold text-gray-900 text-sm">Anand Anathur Elangovan</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              System Architect Engineer & AI Engineer building enterprise-grade AI products.
            </p>
            <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
              <MapPin className="w-3 h-3" aria-hidden="true" />
              <span>Chennai, India</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/Anand-Anathur-Elangovan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors"
                aria-label="GitHub profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/anandanathur-elangovan-50339b419"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors"
                aria-label="LinkedIn profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:anandanathurelangovan94@gmail.com"
                className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors"
                aria-label="Send email"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.section}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 mb-4">
                {section.section}
              </h3>
              <ul className="flex flex-col gap-2" role="list">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Anand Anathur Elangovan. Built with Next.js 15, Three.js & Framer Motion.
          </p>
          <p className="text-xs text-gray-400">
            Open to <span className="text-gray-600 font-medium">AI / System Architect roles globally</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
