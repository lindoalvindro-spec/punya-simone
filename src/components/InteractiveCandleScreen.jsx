import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import confetti from 'canvas-confetti';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function InteractiveCandleScreen({ onNext }) {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const flameRef = useRef(null);
  const smokeRef = useRef(null);
  const pulseRingRef = useRef(null);
  const hintRef = useRef(null);
  const nextBtnRef = useRef(null);

  const [isBlown, setIsBlown] = useState(false);
  const [title, setTitle] = useState('Make a Wish, Simone! 🕯️');
  const [subtitle, setSubtitle] = useState('TAP the cake to blow out your 24 candles~');

  useGSAP(() => {
    // Card entrance
    gsap.fromTo(cardRef.current,
      { opacity: 0, scale: 0.88, y: 25 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.5)' }
    );
  }, { scope: containerRef });

  const handleBlowCandle = () => {
    if (isBlown) return;
    setIsBlown(true);

    setTitle('Happy 24th Birthday! ✨');
    setSubtitle('Your wishes are safely locked in my heart, Simone 🤍');

    // Confetti burst
    confetti({
      particleCount: 85,
      spread: 60,
      origin: { y: 0.55 },
      colors: ['#38bdf8', '#60a5fa', '#ffffff', '#ffd700', '#2563eb'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 45,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#7dd3fc', '#ffffff'],
      });
    }, 350);

    // 1. Extinguish flame
    if (flameRef.current) {
      gsap.to(flameRef.current, {
        opacity: 0,
        scaleY: 0,
        y: -14,
        duration: 0.35,
        ease: 'power2.out',
      });
    }

    // 2. Animate smoke rising
    if (smokeRef.current) {
      gsap.fromTo(smokeRef.current,
        { strokeDashoffset: 45, opacity: 0.8, y: 0 },
        { strokeDashoffset: 0, opacity: 0, y: -24, duration: 1.8, ease: 'power1.out' }
      );
    }

    // 3. Fade out pulse ring & hint
    if (pulseRingRef.current) gsap.to(pulseRingRef.current, { opacity: 0, duration: 0.3 });
    if (hintRef.current) gsap.to(hintRef.current, { opacity: 0, duration: 0.3 });

    // 4. Reveal Next Button
    if (nextBtnRef.current) {
      gsap.fromTo(nextBtnRef.current,
        { opacity: 0, scale: 0.7, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(2)', delay: 0.4 }
      );
    }
  };

  const handleProceed = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        if (onNext) onNext();
      }
    });
  };

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
      {/* Soft Card Container */}
      <div
        ref={cardRef}
        className="candle-card"
        style={{
          width: '100%',
          maxWidth: '320px',
          background: 'rgba(13, 23, 44, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '26px',
          border: '1.5px solid rgba(56, 189, 248, 0.35)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(56, 189, 248, 0.15)',
          padding: '28px 18px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {/* Dynamic Title */}
        <h2
          style={{
            fontFamily: 'var(--font-handwriting)',
            fontSize: '2.1rem',
            color: '#ffffff',
            textShadow: '0 0 15px rgba(56, 189, 248, 0.5)',
            marginBottom: '4px',
            lineHeight: 1.2,
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontSize: '0.78rem',
            color: '#38bdf8',
            letterSpacing: '0.5px',
            marginBottom: '18px',
            fontFamily: 'var(--font-body)',
          }}
        >
          {subtitle}
        </p>

        {/* Cake & Candle Interactive SVG */}
        <div
          onClick={handleBlowCandle}
          style={{
            position: 'relative',
            display: 'inline-block',
            cursor: !isBlown ? 'pointer' : 'default',
            margin: '6px 0 12px',
          }}
        >
          {/* Pulsing Hint Ring */}
          {!isBlown && (
            <div
              ref={pulseRingRef}
              style={{
                position: 'absolute',
                inset: '-14px',
                borderRadius: '50%',
                border: '2.5px solid rgba(56, 189, 248, 0.65)',
                animation: 'pulseRing 1.8s ease-out infinite',
                pointerEvents: 'none',
              }}
            />
          )}

          <svg width="200" height="220" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Cake Glow Radial */}
              <radialGradient id="cakePlateGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.4" />
              </radialGradient>
              <linearGradient id="cakeBodyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </linearGradient>
              <linearGradient id="candleBodyGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>

            {/* Background Halo Circle */}
            <circle cx="100" cy="118" r="90" fill="url(#cakePlateGrad)" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="2" />

            {/* Cake Plate Shadow */}
            <ellipse cx="100" cy="172" rx="60" ry="9" fill="rgba(0, 0, 0, 0.5)" />

            {/* Cake Bottom Tier */}
            <rect x="44" y="138" width="112" height="36" rx="10" fill="url(#cakeBodyGrad)" />
            <rect x="44" y="138" width="112" height="13" rx="8" fill="#38bdf8" opacity="0.4" />

            {/* Frosting Waves */}
            <path
              d="M44 142 Q52 150 60 142 Q68 150 76 142 Q84 150 92 142 Q100 150 108 142 Q116 150 124 142 Q132 150 140 142 Q148 150 156 142"
              stroke="#ffffff"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.65"
            />

            {/* Cake Decorative Dots & 24 Badge */}
            <circle cx="62" cy="158" r="3.5" fill="#38bdf8" opacity="0.7" />
            <g transform="translate(86, 146)">
              <rect width="28" height="19" rx="6" fill="#091329" stroke="#38bdf8" strokeWidth="1.2" opacity="0.9" />
              <text x="14" y="14" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="800" fontFamily="sans-serif">24</text>
            </g>
            <circle cx="138" cy="158" r="3.5" fill="#38bdf8" opacity="0.7" />

            {/* Candle Body */}
            <rect x="92" y="96" width="16" height="44" rx="4" fill="url(#candleBodyGrad)" />
            {/* Candle Stripes */}
            <line x1="92" y1="108" x2="108" y2="108" stroke="#ffffff" strokeWidth="2.5" opacity="0.8" />
            <line x1="92" y1="120" x2="108" y2="120" stroke="#ffffff" strokeWidth="2.5" opacity="0.8" />
            {/* Candle Top Cap */}
            <rect x="90" y="93" width="20" height="6" rx="3" fill="#60a5fa" />

            {/* Candle Wick */}
            <line x1="100" y1="78" x2="100" y2="94" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />

            {/* Smoke Path (Rises when blown) */}
            <path
              ref={smokeRef}
              d="M100 75 Q94 60 104 48 Q112 36 100 24"
              stroke="#e2e8f0"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="45"
              strokeDashoffset="45"
              fill="none"
              opacity="0"
            />

            {/* Flickering Flame */}
            <g
              ref={flameRef}
              style={{
                transformOrigin: '50% 100%',
                animation: !isBlown ? 'flicker 0.5s ease-in-out infinite' : 'none',
              }}
            >
              {/* Outer Glow */}
              <ellipse cx="100" cy="65" rx="14" ry="19" fill="#38bdf8" opacity="0.35" />
              {/* Main Flame */}
              <path d="M100 50 C94 58 93 70 100 73 C107 70 106 58 100 50 Z" fill="#fbbf24" />
              {/* Inner Hot Center */}
              <path d="M100 57 C97 62 97 68 100 70 C103 68 103 62 100 57 Z" fill="#fef08a" />
              {/* Cyan tip for magical aesthetic */}
              <ellipse cx="100" cy="53" rx="4" ry="5" fill="#38bdf8" opacity="0.75" />
            </g>

            {/* Sparkle Embellishments */}
            <text x="36" y="80" fontSize="14" opacity="0.8">✨</text>
            <text x="154" y="78" fontSize="12" opacity="0.8">💙</text>
            <text x="38" y="160" fontSize="11" opacity="0.7">⭐</text>
            <text x="156" y="158" fontSize="12" opacity="0.8">✨</text>
          </svg>
        </div>

        {/* Tap Prompt Hint */}
        {!isBlown ? (
          <p
            ref={hintRef}
            style={{
              fontSize: '0.72rem',
              color: '#38bdf8',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              fontWeight: '700',
              animation: 'blinkCursor 1.4s ease-in-out infinite',
              marginTop: '4px',
            }}
          >
            ✦ Tap the cake above ✦
          </p>
        ) : null}

        {/* Next to Book & Memories Button */}
        <div style={{ marginTop: '16px', width: '100%' }}>
          <button
            ref={nextBtnRef}
            onClick={handleProceed}
            style={{
              display: isBlown ? 'inline-flex' : 'none',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              color: '#ffffff',
              border: '1.5px solid rgba(56, 189, 248, 0.7)',
              borderRadius: '9999px',
              padding: '12px 24px',
              fontSize: '0.8rem',
              fontWeight: '700',
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              boxShadow: '0 6px 20px rgba(37, 99, 235, 0.5)',
              cursor: 'pointer',
              animation: 'bounceBtn 1.5s infinite ease-in-out',
            }}
          >
            <span>Read Special Letter 💌</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
