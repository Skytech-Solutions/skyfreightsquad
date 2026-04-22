import { useState, useEffect } from 'react';

export function ScrollProgress() {
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setWidth(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setVisible(scrollTop > 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 z-[60] h-0.5 bg-cta transition-[width] duration-100"
      style={{ width: `${width}%` }}
    />
  );
}
