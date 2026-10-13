import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';

export default function ThingsToNeverForgetScreen({ onNext }) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const bottomCardRef = useRef(null);

  // Status flip untuk masing-masing dari 4 kartu
  const [flippedCards, setFlippedCards] = useState([false, false, false, false]);

  const notes = [
    { id: 0, text: 'You are enough.' },
    { id: 1, text: 'You are loved.' },
    { id: 2, text: 'You are doing better than you think.' },
    { id: 3, text: 'You deserve good things.' },
  ];

  useGSAP(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.6)' }
    );

    gsap.fromTo('.note-card-flip',
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'back.out(1.4)', delay: 0.2 }
    );

    gsap.fromTo(bottomCardRef.current,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.7, delay: 0.6, ease: 'power2.out' }
    );
  }, { scope: containerRef });

  const handleToggleCard = (index) => {
    setFlippedCards((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });

    // Letupan konfeti mini saat membuka kartu
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.4 },
      colors: ['#38bdf8', '#60a5fa', '#ffffff'],
    });
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
      className="notes-screen-container"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 100,
        background: 'repeating-linear-gradient(45deg, #091329, #091329 14px, #0e1d3e 14px, #0e1d3e 28px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '24px 14px 28px',
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
          top: '20%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.16) 0%, transparent 70%)',
          filter: 'blur(45px)',
          pointerEvents: 'none',
        }}
      />

      {/* Top Header */}
      <div ref={titleRef} style={{ textAlign: 'center', marginTop: '6px' }}>
        <h2
          style={{
            fontFamily: 'var(--font-handwriting)',
            fontSize: '2.3rem',
            color: '#ffffff',
            textShadow: '0 0 15px rgba(56, 189, 248, 0.5)',
            marginBottom: '4px',
            lineHeight: 1.15,
          }}
        >
          Things I Hope You Never Forget
        </h2>
        <p
          style={{
            fontSize: '0.78rem',
            color: '#38bdf8',
            letterSpacing: '1px',
            fontFamily: 'var(--font-body)',
          }}
        >
          tap each note to open it ✨
        </p>
      </div>

      {/* 2x2 Interactive 3D Flip Card Grid */}
      <div
        ref={gridRef}
        className="notes-flip-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          width: '100%',
          maxWidth: '340px',
          margin: '14px 0',
        }}
      >
        {notes.map((note) => {
          const isFlipped = flippedCards[note.id];
          return (
            <div
              key={note.id}
              className="note-card-flip"
              onClick={() => handleToggleCard(note.id)}
              style={{
                height: '110px',
                perspective: '1000px',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              {/* Inner Flipping Flipper */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  transition: 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* SISI DEPAN: "tap to open" */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    background: 'rgba(13, 23, 44, 0.88)',
                    backdropFilter: 'blur(10px)',
                    border: '1.5px solid rgba(56, 189, 248, 0.3)',
                    borderRadius: '18px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px',
                    textAlign: 'center',
                  }}
                >
                  <Sparkles size={18} color="#38bdf8" style={{ marginBottom: '6px', opacity: 0.8 }} />
                  <span
                    style={{
                      fontSize: '0.82rem',
                      color: '#94a3b8',
                      fontWeight: '600',
                      letterSpacing: '0.8px',
                    }}
                  >
                    tap to open
                  </span>
                </div>

                {/* SISI BELAKANG: Teks Pesan Penguat Hati */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
                    border: '1.5px solid #38bdf8',
                    borderRadius: '18px',
                    boxShadow: '0 10px 25px rgba(37, 99, 235, 0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '14px',
                    textAlign: 'center',
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.92rem',
                      color: '#ffffff',
                      fontWeight: '700',
                      lineHeight: 1.3,
                      fontFamily: 'var(--font-body)',
                      textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                      margin: 0,
                    }}
                  >
                    {note.text}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Card: "Do you know how special you are to me?" */}
      <div
        ref={bottomCardRef}
        className="notes-bottom-card"
        style={{
          width: '100%',
          maxWidth: '340px',
          background: 'rgba(13, 23, 44, 0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '24px',
          border: '1.5px solid rgba(56, 189, 248, 0.35)',
          boxShadow: '0 15px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(56, 189, 248, 0.15)',
          padding: '18px 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-handwriting)',
            fontSize: '1.55rem',
            color: '#ffffff',
            textShadow: '0 0 10px rgba(56, 189, 248, 0.4)',
            marginBottom: '12px',
            lineHeight: 1.25,
          }}
        >
          Do you know how special you are to me? 🤍
        </p>

        <button
          onClick={handleProceed}
          style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            color: '#ffffff',
            border: '1.5px solid rgba(56, 189, 248, 0.7)',
            borderRadius: '9999px',
            padding: '10px 28px',
            fontSize: '0.8rem',
            fontWeight: '700',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            boxShadow: '0 4px 18px rgba(37, 99, 235, 0.45)',
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
          <span>MAYBE... ✨</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
