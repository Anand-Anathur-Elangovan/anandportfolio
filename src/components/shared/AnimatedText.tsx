'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ElementType, createElement } from 'react';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  as?: ElementType;
}

export function AnimatedText({
  text,
  className,
  delay = 0,
  stagger = 0.03,
  once = true,
  as: Tag = 'span',
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once, margin: '-10% 0px' });
  const prefersReducedMotion = useReducedMotion();

  const words = text.split(' ');

  const children = prefersReducedMotion
    ? text
    : words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="inline-block overflow-hidden mr-[0.25em] last:mr-0"
          aria-hidden="true"
        >
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + wordIndex * stagger,
            }}
          >
            {word}
          </motion.span>
        </span>
      ));

  return createElement(
    Tag,
    { ref, className, 'aria-label': text },
    children
  );
}

export function AnimatedChars({
  text,
  className,
  delay = 0,
  stagger = 0.02,
  once = true,
}: AnimatedTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: '-10% 0px' });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <span ref={ref} className={className}>{text}</span>;
  }

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + i * stagger,
          }}
          aria-hidden="true"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}
