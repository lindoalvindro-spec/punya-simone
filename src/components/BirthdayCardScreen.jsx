import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Flame } from 'lucide-react';

export default function BirthdayCardScreen({ onNext }) {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const photoContainerRef = useRef(null);
  const balloonLeftRef = useRef(null);
  const balloonRightRef = useRef(null);
  const showBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  const [isRevealed, setIsRevealed] = useState(false);

  useGSAP(() => {
    // Card entrance animation
    gsap.fromTo(cardRef.current,
      { opacity: 0, scale: 0.85, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.5)' }
    );
  }, { scope: containerRef });

  const handleRevealBirthdayBoy = () => {
    if (isRevealed) return;
    setIsRevealed(true);

    // Confetti burst
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.55 },
      colors: ['#38bdf8', '#60a5fa', '#ffffff', '#2563eb', '#ffd700'],
    });

    const tl = gsap.timeline();

    // 1. Scale in photo container
    tl.fromTo(photoContainerRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.8)' }
    )
    // 2. Float balloons up with bounce
    .fromTo(balloonLeftRef.current,
      { opacity: 0, y: 80, rotate: -15 },
      { opacity: 1, y: 0, rotate: -5, duration: 1.2, ease: 'bounce.out' },
      '-=0.4'
    )
    .fromTo(balloonRightRef.current,
      { opacity: 0, y: 80, rotate: 15 },
      { opacity: 1, y: 0, rotate: 5, duration: 1.2, ease: 'bounce.out' },
      '-=1.0'
    )
    // 3. Show next button with bouncy pulse
    .fromTo(nextBtnRef.current,
      { opacity: 0, scale: 0.8, y: 15 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(2)' },
      '-=0.3'
    );
  };

  const handleProceedToCandle = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.04,
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
      {/* Floating Left Balloon (Revealed on click) */}
      <div
        ref={balloonLeftRef}
        style={{
          position: 'absolute',
          top: '8%',
          left: '6px',
          zIndex: 25,
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        <svg width="70" height="110" viewBox="0 0 70 110">
          <defs>
            <radialGradient id="balloonGrad1" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="60%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </radialGradient>
          </defs>
          <ellipse cx="35" cy="40" rx="30" ry="38" fill="url(#balloonGrad1)" filter="drop-shadow(0 6px 10px rgba(0,0,0,0.4))" />
          <ellipse cx="24" cy="28" rx="8" ry="12" fill="#ffffff" opacity="0.45" transform="rotate(-20 24 28)" />
          <polygon points="32,78 38,78 35,84" fill="#0284c7" />
          <path d="M 35 84 Q 38 94, 33 100 T 36 110" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Floating Right Balloon (Revealed on click) */}
      <div
        ref={balloonRightRef}
        style={{
          position: 'absolute',
          top: '12%',
          right: '6px',
          zIndex: 25,
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        <svg width="65" height="105" viewBox="0 0 65 105">
          <defs>
            <radialGradient id="balloonGrad2" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="60%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </radialGradient>
          </defs>
          <ellipse cx="32" cy="38" rx="28" ry="35" fill="url(#balloonGrad2)" filter="drop-shadow(0 6px 10px rgba(0,0,0,0.4))" />
          <ellipse cx="22" cy="26" rx="7" ry="10" fill="#ffffff" opacity="0.45" transform="rotate(-20 22 26)" />
          <polygon points="29,73 35,73 32,79" fill="#1e3a8a" />
          <path d="M 32 79 Q 30 89, 34 95 T 32 105" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Main Soft Card */}
      <div
        ref={cardRef}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '340px',
          background: 'rgba(13, 23, 44, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '28px',
          border: '1.5px solid rgba(56, 189, 248, 0.35)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(56, 189, 248, 0.15)',
          padding: '36px 20px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          zIndex: 30,
        }}
      >
        {/* Top Center Heart Badge */}
        <div
          style={{
            position: 'absolute',
            top: '-24px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)',
            border: '4px solid #091329',
            boxShadow: '0 6px 18px rgba(56, 189, 248, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 40,
          }}
        >
          <Heart size={22} color="#ffffff" fill="#ffffff" />
        </div>

        {/* Date Subtitle */}
        <p
          style={{
            fontSize: '0.72rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '2.5px',
            color: '#38bdf8',
            marginBottom: '6px',
            fontFamily: 'var(--font-body)',
          }}
        >
          SPECIAL DAY FOR YOU
        </p>

        {/* Calligraphic Headline */}
        <h1
          style={{
            fontFamily: 'var(--font-handwriting)',
            fontSize: '2.4rem',
            color: '#ffffff',
            textShadow: '0 0 15px rgba(56, 189, 248, 0.5)',
            marginBottom: '16px',
            lineHeight: 1.15,
          }}
        >
          Happy Birthday, Darling
        </h1>

        {/* Default Icons (Cake & Flowers) or Revealed Photo */}
        {!isRevealed ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              fontSize: '2.4rem',
              marginBottom: '16px',
              filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.3))',
            }}
          >
            <span>🎂</span>
            <span>💐</span>
          </div>
        ) : (
          <div
            ref={photoContainerRef}
            style={{
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3.5px solid #38bdf8',
              boxShadow: '0 0 25px rgba(56, 189, 248, 0.6), 0 8px 20px rgba(0,0,0,0.6)',
              marginBottom: '16px',
              background: '#091329',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src="/c 4.jpeg"
              alt="Simone"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 20%',
              }}
              onError={(e) => {
                e.currentTarget.src = '/c 1.jpeg';
              }}
            />
          </div>
        )}

        {/* Heartfelt Quotes */}
        <p
          style={{
            fontSize: '0.88rem',
            fontStyle: 'italic',
            color: '#e0f2fe',
            marginBottom: '8px',
            lineHeight: 1.35,
            fontFamily: 'var(--font-body)',
          }}
        >
          "Happy birthday to my favorite person ever 🤍"
        </p>
        <p
          style={{
            fontSize: '0.84rem',
            fontStyle: 'italic',
            color: '#94a3b8',
            marginBottom: '20px',
            lineHeight: 1.35,
            fontFamily: 'var(--font-body)',
          }}
        >
          "So lucky to love you and celebrate another beautiful year of your life."
        </p>

        {/* Divider & Action Buttons */}
        <div
          style={{
            width: '100%',
            paddingTop: '16px',
            borderTop: '1px solid rgba(56, 189, 248, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {!isRevealed ? (
            <button
              ref={showBtnRef}
              onClick={handleRevealBirthdayBoy}
              style={{
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                color: '#ffffff',
                border: '1.5px solid rgba(56, 189, 248, 0.6)',
                borderRadius: '9999px',
                padding: '12px 24px',
                fontSize: '0.78rem',
                fontWeight: '700',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                boxShadow: '0 4px 20px rgba(37, 99, 235, 0.45)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <span>Who is the most handsome today?</span>
              <Sparkles size={14} color="#38bdf8" />
            </button>
          ) : (
            <button
              ref={nextBtnRef}
              onClick={handleProceedToCandle}
              style={{
                background: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)',
                color: '#ffffff',
                border: '1.5px solid #ffffff',
                borderRadius: '9999px',
                padding: '12px 28px',
                fontSize: '0.82rem',
                fontWeight: '700',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                boxShadow: '0 6px 25px rgba(56, 189, 248, 0.6)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                animation: 'bounceBtn 1.5s infinite ease-in-out',
              }}
            >
              <Flame size={16} color="#ffd700" />
              <span>Blow the candle! 🕯️</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
