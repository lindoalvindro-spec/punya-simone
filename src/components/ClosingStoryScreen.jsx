import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import confetti from 'canvas-confetti';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';

export default function ClosingStoryScreen({ onRestart }) {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, scale: 0.85, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.5)' }
    );

    // Celebration confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#38bdf8', '#60a5fa', '#ffffff', '#2563eb', '#ffd700'],
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 100,
        background: 'repeating-linear-gradient(45deg, #091329, #091329 14px, #0e1d3e 14px, #0e1d3e 28px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 14px',
        overflowY: 'auto',
        overflowX: 'hidden',
        width: '100%',
        height: '100%',
      }}
    >
      {/* Background Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, transparent 70%)',
          filter: 'blur(45px)',
          pointerEvents: 'none',
        }}
      />

      {/* Main Closing Card */}
      <div
        ref={cardRef}
        className="closing-card"
        style={{
          width: '100%',
          maxWidth: '340px',
          background: 'rgba(13, 23, 44, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '28px',
          border: '1.5px solid rgba(56, 189, 248, 0.35)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(56, 189, 248, 0.15)',
          padding: '36px 24px 28px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {/* Top Mini Heart Badge */}
        <div
          style={{
            position: 'absolute',
            top: '-20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)',
            border: '3px solid #091329',
            boxShadow: '0 4px 14px rgba(56, 189, 248, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Heart size={20} color="#ffffff" fill="#ffffff" />
        </div>

        {/* Small Header */}
        <p
          style={{
            fontSize: '0.72rem',
            fontWeight: '700',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#38bdf8',
            marginBottom: '8px',
            fontFamily: 'var(--font-body)',
          }}
        >
          LAST PAGE
        </p>

        {/* Cursive Title */}
        <h2
          style={{
            fontFamily: 'var(--font-handwriting)',
            fontSize: '2.4rem',
            color: '#ffffff',
            textShadow: '0 0 15px rgba(56, 189, 248, 0.5)',
            marginBottom: '10px',
            lineHeight: 1.15,
          }}
        >
          To be continued, Simone
        </h2>

        {/* Center Glowing White Heart */}
        <div style={{ fontSize: '2rem', marginBottom: '12px', animation: 'pulseGlow 2s infinite alternate' }}>
          🤍
        </div>

        {/* Final Message */}
        <p
          style={{
            fontSize: '0.88rem',
            lineHeight: 1.6,
            color: '#e0f2fe',
            fontFamily: 'var(--font-body)',
            marginBottom: '14px',
          }}
        >
          "Buon compleanno, amore della mia vita. Thank you for being here and for being the most beautiful part of my life."
        </p>

        <p
          style={{
            fontFamily: 'var(--font-handwriting)',
            fontSize: '1.4rem',
            color: '#38bdf8',
            marginBottom: '22px',
          }}
        >
          Love, Tata 🤍
        </p>

        {/* Restart Button */}
        <button
          onClick={onRestart}
          style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            color: '#ffffff',
            border: '1.5px solid rgba(56, 189, 248, 0.7)',
            borderRadius: '9999px',
            padding: '12px 28px',
            fontSize: '0.8rem',
            fontWeight: '700',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            boxShadow: '0 4px 20px rgba(37, 99, 235, 0.45)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.04)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <RotateCcw size={15} />
          <span>Replay From Beginning</span>
        </button>
      </div>
    </div>
  );
}
