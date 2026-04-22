import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function ScrollAnimation({ children, delay = 0, duration = 0.5, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
