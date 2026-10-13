import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';

export default function InteractiveEnvelopeScreen({ onOpen, onPlayMusic }) {
  const containerRef = useRef(null);
  const envelopeWrapperRef = useRef(null);
  const flapRef = useRef(null);
  const cardRef = useRef(null);
  const sealRef = useRef(null);
  const promptRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  useGSAP(() => {
    // Entrance animation
    gsap.fromTo(envelopeWrapperRef.current,
      { opacity: 0, scale: 0.8, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'back.out(1.6)' }
    );

    gsap.fromTo(promptRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.7, delay: 0.4 }
    );

    // Gentle floating motion
    gsap.to(envelopeWrapperRef.current, {
      y: '-=10',
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, { scope: containerRef });

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);

    if (onPlayMusic) onPlayMusic();

    // Semburan konfeti sapphire, cyan, dan silver
    confetti({
      particleCount: 70,
      spread: 75,
      origin: { y: 0.55 },
      colors: ['#38bdf8', '#60a5fa', '#ffffff', '#2563eb', '#93c5fd'],
    });

    const tl = gsap.timeline({
      onComplete: () => {
        // Pindah ke layar kartu ulang tahun
        if (onOpen) onOpen();
      }
    });

    // 1. Pecah / pudarkan segel lilin
    tl.to(sealRef.current, {
      scale: 1.4,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.out',
    })
    // 2. Tutup segitiga amplop melipat ke atas 180 derajat secara 3D
    .to(flapRef.current, {
      rotateX: 180,
      duration: 0.55,
      ease: 'power2.inOut',
    })
    // 3. Kartu meluncur ke atas dari dalam amplop
    .to(cardRef.current, {
      y: -140,
      zIndex: 50,
      duration: 0.65,
      ease: 'power2.out',
    }, '-=0.2')
    // 4. Seluruh amplop memudar lembut untuk membuka kartu penuh
    .to(containerRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.5,
      delay: 0.2,
      ease: 'power2.inOut',
    });
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 100,
        background: 'radial-gradient(ellipse at 50% 45%, #0f1d38 0%, #091329 55%, #040814 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
      }}
    >
      {/* Background Stardust Accent */}
      <div
        style={{
          position: 'absolute',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.18) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      {/* 3D Envelope Wrapper */}
      <div
        ref={envelopeWrapperRef}
        onClick={handleOpenEnvelope}
        style={{
          perspective: '1200px',
          cursor: 'pointer',
          position: 'relative',
          width: '290px',
          height: '190px',
          userSelect: 'none',
        }}
      >
        {/* Envelope Body (Main Pocket) */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(145deg, #1e3a8a 0%, #172554 100%)',
            borderRadius: '0 0 16px 16px',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.65), 0 0 25px rgba(56, 189, 248, 0.25)',
            border: '1.5px solid rgba(56, 189, 248, 0.35)',
            borderTop: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Triangular Top Flap */}
          <div
            ref={flapRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 0,
              height: 0,
              borderLeft: '145px solid transparent',
              borderRight: '145px solid transparent',
              borderTop: '105px solid #2563eb',
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
              zIndex: 30,
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))',
            }}
          />

          {/* Inner Letter Card (slides up) */}
          <div
            ref={cardRef}
            style={{
              position: 'absolute',
              bottom: '6px',
              left: '12px',
              right: '12px',
              height: '170px',
              background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
              borderRadius: '10px',
              border: '1.5px solid rgba(56, 189, 248, 0.4)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              zIndex: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px 12px',
              textAlign: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Sparkles size={14} color="#38bdf8" />
              <p
                style={{
                  fontSize: '0.74rem',
                  fontWeight: '700',
                  color: '#38bdf8',
                  textTransform: 'uppercase',
                  letterSpacing: '2.5px',
                  fontFamily: 'var(--font-body)',
                  margin: 0,
                }}
              >
                Tap to open letter
              </p>
              <Sparkles size={14} color="#38bdf8" />
            </div>
            <p style={{ fontSize: '0.68rem', color: '#94a3b8', margin: 0 }}>
              Special Letter for You 🤍
            </p>
          </div>

          {/* Center Heart Wax Seal */}
          <div
            ref={sealRef}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #38bdf8 0%, #2563eb 60%, #1d4ed8 100%)',
              border: '2.5px solid #ffffff',
              boxShadow: '0 6px 20px rgba(56, 189, 248, 0.6), 0 2px 6px rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 40,
              cursor: 'pointer',
              animation: 'pulseGlow 2s infinite alternate',
            }}
          >
            <Heart size={26} color="#ffffff" fill="#ffffff" />
          </div>
        </div>
      </div>

      {/* Floating Prompt Text Underneath */}
      <p
        ref={promptRef}
        style={{
          marginTop: '38px',
          fontSize: '0.92rem',
          fontFamily: 'var(--font-handwriting)',
          color: '#38bdf8',
          letterSpacing: '1px',
          textAlign: 'center',
          animation: 'pulseGlow 1.8s infinite alternate',
          userSelect: 'none',
        }}
      >
        Open the envelope, my love... ✨
      </p>
    </div>
  );
}
