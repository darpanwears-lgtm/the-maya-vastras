"use client";

import { useEffect, useRef } from 'react';

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      // Re-initialize columns on resize
      columns = Array.from({ length: Math.floor(width / fontSize) }, () => Math.floor(Math.random() * height));
    };
    window.addEventListener('resize', handleResize);

    const characters = 'अआइईउऊऋएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसहॐ';
    const charactersArray = characters.split('');
    const fontSize = 16;
    let columns = Array.from({ length: Math.floor(width / fontSize) }, () => Math.floor(Math.random() * height));

    let frameId: number;

    const draw = () => {
      ctx.fillStyle = 'rgba(8, 8, 8, 0.04)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#39FF14'; // Neon Green
      ctx.font = `${fontSize}px 'Space Grotesk'`;

      for (let i = 0; i < columns.length; i++) {
        const text = charactersArray[Math.floor(Math.random() * charactersArray.length)];
        const x = i * fontSize;
        const y = columns[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          columns[i] = 0;
        }
        columns[i]++;
      }
      frameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-screen z-0" />;
};

export default MatrixBackground;
