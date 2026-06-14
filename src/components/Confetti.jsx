import React, { useEffect, useRef } from 'react';

/**
 * Confetti component that renders a canvas particle system for celebration.
 * @param {boolean} active - Triggers the animation when true.
 */
export default function Confetti({ active }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = (canvas.width = window.innerWidth);
      height = (canvas.height = window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const colors = [
      '#6366f1', // indigo
      '#818cf8', // light indigo
      '#10b981', // emerald
      '#34d399', // light emerald
      '#f43f5e', // rose
      '#fb7185', // light rose
      '#f59e0b', // amber
      '#fbbf24', // light amber
      '#3b82f6', // blue
      '#ec4899', // pink
    ];

    const confettiCount = 120;
    const confettis = [];

    // Initialize confetti particles
    for (let i = 0; i < confettiCount; i++) {
      confettis.push({
        x: Math.random() * width,
        y: Math.random() * -height - 20, // Start above viewport
        r: Math.random() * 6 + 4, // size
        d: Math.random() * confettiCount,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 5,
        tiltAngleIncremental: Math.random() * 0.05 + 0.02,
        tiltAngle: Math.random() * Math.PI,
        speed: Math.random() * 3 + 2, // falling speed
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      let activeParticles = false;

      confettis.forEach((c) => {
        c.tiltAngle += c.tiltAngleIncremental;
        c.y += c.speed;
        c.x += Math.sin(c.tiltAngle) * 0.5;
        c.tilt = Math.sin(c.tiltAngle - c.r / 2) * 10;

        // Draw particle
        ctx.beginPath();
        ctx.lineWidth = c.r;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
        ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 2);
        ctx.stroke();

        // Recycle particles that fall off bottom to loop for 3.5 seconds
        if (c.y < height + 20) {
          activeParticles = true;
        }
      });

      if (activeParticles) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    draw();

    // Auto-deactivate after 5 seconds to prevent continuous CPU usage
    const timeoutId = setTimeout(() => {
      cancelAnimationFrame(animationFrameId);
    }, 5000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);

  if (!active) return null;

  return <canvas ref={canvasRef} className="confetti-canvas" />;
}
