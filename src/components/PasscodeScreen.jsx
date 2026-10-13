import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Delete, X, Sparkles } from 'lucide-react';

export default function PasscodeScreen({ onUnlock }) {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const dotsRef = useRef(null);
  const keypadRef = useRef(null);
  const iconRingRef = useRef(null);
  
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const PIN_LENGTH = 6;

  // Background floating stars & celestial dust in cool navy/cyan
  const bgParticles = Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 92}%`,
    size: Math.random() * 12 + 10,
    duration: Math.random() * 6 + 5,
    delay: Math.random() * 4,
    symbol: i % 4 === 0 ? '✨' : i % 4 === 1 ? '✦' : i % 4 === 2 ? '💙' : '💫',
  }));

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'back.out(1.5)', duration: 0.7 } });
    
    tl.fromTo(cardRef.current, 
      { opacity: 0, scale: 0.88, y: 25 },
      { opacity: 1, scale: 1, y: 0 }
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.45 },
      '-=0.4'
    )
    .fromTo(dotsRef.current,
      { opacity: 0, scale: 0.75 },
      { opacity: 1, scale: 1, duration: 0.35 },
      '-=0.25'
    )
    .fromTo('.keypad-btn-navy',
      { opacity: 0, scale: 0.5, y: 15 },
      { opacity: 1, scale: 1, y: 0, stagger: 0.03, duration: 0.4 },
      '-=0.2'
    );

    gsap.to(iconRingRef.current, {
      rotation: 360,
      duration: 16,
      repeat: -1,
      ease: 'none',
    });
  }, { scope: containerRef });

  const handleKeyPress = (e, num) => {
    if (pin.length < PIN_LENGTH) {
      const newPin = pin + num;
      setPin(newPin);
      setErrorMsg('');

      const btn = e.currentTarget;
      gsap.timeline()
        .to(btn, { scale: 0.88, backgroundColor: '#1d4ed8', duration: 0.1 })
        .to(btn, { scale: 1, backgroundColor: 'rgba(21, 32, 58, 0.85)', duration: 0.25, ease: 'back.out(2)' });

      const targetDot = dotsRef.current?.children[pin.length];
      if (targetDot) {
        gsap.fromTo(targetDot,
          { scale: 0.6, rotate: -20 },
          { scale: 1.3, rotate: 0, duration: 0.2, yoyo: true, repeat: 1 }
        );
      }

      if (newPin.length === PIN_LENGTH) {
        verifyPin(newPin);
      }
    }
  };

  const handleDelete = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
      setErrorMsg('');
    }
  };

  const handleClear = () => {
    setPin('');
    setErrorMsg('');
  };

  const TARGET_PIN = '141002';

  const verifyPin = (enteredPin) => {
    // Validasi kode PIN tanggal lahir Simone (14-10-02)
    if (enteredPin === TARGET_PIN) {
      const tl = gsap.timeline();
      
      tl.to(dotsRef.current, {
        scale: 1.15,
        filter: 'drop-shadow(0 0 16px #38bdf8)',
        duration: 0.3,
      })
      .to(cardRef.current, {
        scale: 1.03,
        boxShadow: '0 20px 50px rgba(56, 189, 248, 0.45)',
        duration: 0.3,
      })
      .to(containerRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          if (onUnlock) onUnlock();
        }
      });
    } else {
      setErrorMsg('Incorrect passcode, please try again my love 🤍');
      
      gsap.to(dotsRef.current, {
        x: [-12, 12, -8, 8, -4, 4, 0],
        duration: 0.45,
        ease: 'power2.inOut',
      });
      
      gsap.fromTo(cardRef.current,
        { border: '1.5px solid #ef4444', boxShadow: '0 0 25px rgba(239, 68, 68, 0.35)' },
        { border: '1.5px solid rgba(56, 189, 248, 0.3)', boxShadow: '0 20px 45px rgba(2, 6, 23, 0.8)', duration: 0.8 }
      );
      
      setTimeout(() => {
        setPin('');
      }, 700);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 100,
        background: 'radial-gradient(circle at 50% 30%, #0d1b2a 0%, #0a1128 55%, #050814 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px 14px',
        overflowY: 'auto',
        overflowX: 'hidden',
        width: '100%',
        height: '100%',
      }}
    >
      {/* Background Floating Stardust Particles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {bgParticles.map((p) => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: p.left,
              bottom: '-20px',
              fontSize: `${p.size}px`,
              opacity: 0.45,
              animation: `floatPetal ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
            }}
          >
            {p.symbol}
          </div>
        ))}
      </div>

      {/* Gentle Navy/Cyan Ambient Aura Behind Card */}
      <div
        style={{
          position: 'absolute',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, rgba(30, 58, 138, 0.15) 50%, transparent 70%)',
          filter: 'blur(45px)',
          pointerEvents: 'none',
        }}
      />

      {/* Main Dark Navy Passcode Glass Card */}
      <div
        ref={cardRef}
        className="passcode-card"
        style={{
          width: '100%',
          maxWidth: '330px',
          background: 'rgba(13, 23, 44, 0.88)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: '32px',
          border: '1.5px solid rgba(56, 189, 248, 0.3)',
          boxShadow: '0 20px 50px rgba(2, 6, 23, 0.8), 0 0 30px rgba(56, 189, 248, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
          padding: '24px 18px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          margin: 'auto 0',
        }}
      >
        {/* Decorative Sparkles */}
        <div style={{ position: 'absolute', top: '16px', left: '18px', opacity: 0.8 }}>
          <Sparkles size={16} color="#38bdf8" />
        </div>
        <div style={{ position: 'absolute', top: '16px', right: '18px', opacity: 0.8 }}>
          <Sparkles size={16} color="#38bdf8" />
        </div>

        {/* Top Profile Picture Frame with Rotating Orbit */}
        <div
          style={{
            position: 'relative',
            width: '68px',
            height: '68px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px',
          }}
        >
          {/* Rotating Dashed Orbit Ring */}
          <div
            ref={iconRingRef}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '1.5px dashed rgba(56, 189, 248, 0.55)',
            }}
          />

          {/* Profile Picture Circle */}
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid rgba(56, 189, 248, 0.85)',
              boxShadow: '0 0 20px rgba(56, 189, 248, 0.4), 0 6px 14px rgba(0,0,0,0.5)',
              background: '#0f172a',
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
                display: 'block',
              }}
              onError={(e) => {
                e.currentTarget.src = '/c 1.jpeg';
              }}
            />
          </div>
        </div>

        {/* Title Header: Ciao, Amore */}
        <div ref={titleRef} style={{ textAlign: 'center', marginBottom: '18px' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              fontFamily: 'var(--font-display)',
              color: '#f8fafc',
              marginBottom: '3px',
              letterSpacing: '0.4px',
              textShadow: '0 0 15px rgba(56, 189, 248, 0.35)',
            }}
          >
            Ciao, Amore 🤍
          </h2>
          <p
            style={{
              fontSize: '0.85rem',
              color: '#94a3b8',
              fontFamily: 'var(--font-body)',
            }}
          >
            Enter our secret passcode
          </p>
          <p
            style={{
              fontSize: '0.78rem',
              color: '#38bdf8',
              fontWeight: '600',
              fontFamily: 'var(--font-body)',
              marginTop: '6px',
              background: 'rgba(30, 58, 138, 0.4)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              padding: '3px 14px',
              borderRadius: '14px',
              display: 'inline-block',
              letterSpacing: '0.3px',
              boxShadow: '0 0 12px rgba(56, 189, 248, 0.2)',
            }}
          >
            Clue: dateofbirth 🤍
          </p>
        </div>

        {/* 6-PIN Dots Container */}
        <div
          ref={dotsRef}
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '20px',
            padding: '10px 18px',
            background: 'rgba(10, 18, 38, 0.7)',
            borderRadius: '24px',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.4)',
          }}
        >
          {Array.from({ length: 6 }).map((_, idx) => {
            const isFilled = idx < pin.length;
            return (
              <div
                key={idx}
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  border: isFilled ? '1.5px solid #38bdf8' : '1.5px solid rgba(71, 85, 105, 0.7)',
                  background: isFilled
                    ? 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)'
                    : 'rgba(30, 41, 59, 0.6)',
                  boxShadow: isFilled
                    ? '0 0 12px rgba(56, 189, 248, 0.8)'
                    : 'none',
                  transition: 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                }}
              />
            );
          })}
        </div>

        {/* Error Feedback Message */}
        {errorMsg && (
          <p
            style={{
              fontSize: '0.78rem',
              color: '#f87171',
              marginBottom: '10px',
              textAlign: 'center',
              fontWeight: '600',
            }}
          >
            {errorMsg}
          </p>
        )}

        {/* Keypad Grid 3x4 in Dark Navy Glass */}
        <div
          ref={keypadRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            width: '100%',
            maxWidth: '245px',
            marginBottom: '10px',
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              className="keypad-btn-navy"
              onClick={(e) => handleKeyPress(e, num.toString())}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(21, 32, 58, 0.85)',
                border: '1.5px solid rgba(56, 189, 248, 0.25)',
                color: '#f8fafc',
                fontSize: '1.35rem',
                fontWeight: '600',
                fontFamily: 'var(--font-body)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                transition: 'all 0.15s ease',
              }}
            >
              {num}
            </button>
          ))}

          {/* Clear Button */}
          <button
            className="keypad-btn-navy"
            onClick={handleClear}
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(71, 85, 105, 0.4)',
              color: '#94a3b8',
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
            }}
          >
            <X size={18} />
          </button>

          {/* 0 Button */}
          <button
            className="keypad-btn-navy"
            onClick={(e) => handleKeyPress(e, '0')}
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(21, 32, 58, 0.85)',
              border: '1.5px solid rgba(56, 189, 248, 0.25)',
              color: '#f8fafc',
              fontSize: '1.35rem',
              fontWeight: '600',
              fontFamily: 'var(--font-body)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
            }}
          >
            0
          </button>

          {/* Backspace Delete Button */}
          <button
            className="keypad-btn-navy"
            onClick={handleDelete}
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(30, 58, 138, 0.35)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              color: '#38bdf8',
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              boxShadow: '0 2px 10px rgba(30, 58, 138, 0.3)',
            }}
          >
            <Delete size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
