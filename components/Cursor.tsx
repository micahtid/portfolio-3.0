'use client';

import React, { useEffect, useRef } from 'react';

interface CursorProps {
  children: React.ReactNode;
}

const Cursor: React.FC<CursorProps> = ({ children }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    
    const onMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${Math.round(e.clientX)}px`;
      cursor.style.top = `${Math.round(e.clientY)}px`;
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.body.style.cursor = 'none';
    
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="cursor-cross"
      />
      
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        .cursor-cross {
          position: fixed;
          z-index: 999;
          pointer-events: none;
          width: 16px;
          height: 16px;
          transform: translate(-50%, -50%);
          mix-blend-mode: difference;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-font-smoothing: subpixel-antialiased;
        }
        
        .cursor-cross::before,
        .cursor-cross::after {
          content: '';
          position: absolute;
          background-color: white;
          transform-origin: center;
        }
        
        .cursor-cross::before {
          width: 16px;
          height: 2px;
          top: 7px;
          left: 0;
        }
        
        .cursor-cross::after {
          width: 2px;
          height: 16px;
          left: 7px;
          top: 0;
        }
      `}</style>
      
      {children}
    </>
  );
};

export default Cursor;