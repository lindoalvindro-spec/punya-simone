import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import confetti from 'canvas-confetti';
import { ArrowRight, Sparkles, RotateCw, Heart } from 'lucide-react';

export default function PhotoGridFlipScreen({ onNext }) {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const bottomBtnRef = useRef(null);

  // Status flip kartu 1 sampai 6 (true = membalik ke teks, false = sisi foto)
  const [flippedCards, setFlippedCards] = useState([false, false, false, false, false, false]);

  const photosData = [
    {
      id: 0,
      image: '/c 1.jpeg',
      title: 'La Tua Bellezza',
      quote: 'Se tutto ciò che il mondo vede è la tua bellezza, allora lascia che le tue imperfezioni diventino anche mie.',
    },
    {
      id: 1,
      image: '/c 2.jpeg',
      title: 'La Mia Luna',
      quote: 'Se la luna potesse parlare, quanto sarebbe gelosa—perché non avrei mai bisogno di guardarla, perché per me, la bellezza sei sempre stata tu.',
    },
    {
      id: 2,
      image: '/c 3.jpeg',
      title: 'Un Luogo Sicuro',
      quote: 'E se, un giorno, i tuoi passi diventassero più pesanti in questo mondo incerto, spero che tu possa sempre ricordare che ci sarà un luogo per te dove poter deporre ogni affanno che verrà.',
    },
    {
      id: 3,
      image: '/c 4.jpeg',
      title: 'Senza Paura',
      quote: 'Rompi, per quanto tu abbia bisogno di farlo. Crolla, per quanto tu debba crollare. Perché non c’è parte di te che tu debba nascondere perché io possa continuare ad amarti.',
    },
    {
      id: 4,
      image: '/c 5.jpeg',
      title: 'Scegliere Te',
      quote: 'Non devi essere intera perché io possa amarti. Anche nelle tue crepe, anche nelle tue rovine, io continuerò a scegliere te.',
    },
    {
      id: 5,
      image: '/c 6.jpeg',
      fallback: '/c 2.jpeg',
      title: 'Ti Amo',
      quote: 'Ti amo, amore mio 🤍',
    },
  ];

  useGSAP(() => {
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.6)' }
    );

    gsap.fromTo('.photo-flip-card',
      { opacity: 0, scale: 0.85, y: 25 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'back.out(1.4)', delay: 0.2 }
    );

    gsap.fromTo(bottomBtnRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.7, ease: 'power2.out' }
    );
  }, { scope: containerRef });

  const handleFlipCard = (index) => {
    setFlippedCards((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });

    confetti({
      particleCount: 20,
      spread: 45,
      origin: { y: 0.5 },
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
      className="photo-screen-container"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 100,
        background: 'repeating-linear-gradient(45deg, #091329, #091329 14px, #0e1d3e 14px, #0e1d3e 28px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 12px 30px',
        overflowY: 'auto',
        overflowX: 'hidden',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Header */}
      <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '14px', flexShrink: 0 }}>
        <h2
          style={{
            fontFamily: 'var(--font-handwriting)',
            fontSize: '2.3rem',
            color: '#ffffff',
            textShadow: '0 0 15px rgba(56, 189, 248, 0.5)',
            marginBottom: '2px',
            lineHeight: 1.15,
          }}
        >
          Favorite Memories
        </h2>
        <p
          style={{
            fontSize: '0.74rem',
            color: '#38bdf8',
            letterSpacing: '1px',
            fontFamily: 'var(--font-body)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span>tap each photo to reveal the message</span>
          <RotateCw size={12} />
        </p>
      </div>

      {/* 6 Polaroid Photos Grid (2 Kolom x 3 Baris di HP, 3 Kolom x 2 Baris di MacBook) */}
      <div
        ref={gridRef}
        className="photo-cards-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          width: '100%',
          maxWidth: '345px',
          marginBottom: '22px',
          flexShrink: 0,
        }}
      >
        {photosData.map((item) => {
          const isFlipped = flippedCards[item.id];
          return (
            <div
              key={item.id}
              className="photo-flip-card"
              onClick={() => handleFlipCard(item.id)}
              style={{
                height: '188px',
                perspective: '1000px',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              {/* Flipping 3D Container */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  transition: 'transform 0.65s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* SISI DEPAN: FOTO POLAROID */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    background: '#ffffff',
                    padding: '6px 6px 14px 6px',
                    borderRadius: '8px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), 0 0 15px rgba(56, 189, 248, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* Gambar */}
                  <div
                    style={{
                      width: '100%',
                      height: '130px',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      background: '#091329',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                      onError={(e) => {
                        e.currentTarget.src = item.fallback || '/c 1.jpeg';
                      }}
                    />
                  </div>

                  {/* Caption Bawah Polaroid */}
                  <span
                    style={{
                      fontFamily: 'var(--font-handwriting)',
                      fontSize: '0.98rem',
                      color: '#0f172a',
                      fontWeight: '700',
                      lineHeight: 1.1,
                      marginTop: '4px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '100%',
                    }}
                  >
                    {item.title} 🤍
                  </span>
                </div>

                {/* SISI BELAKANG: KATA-KATA ROMANTIS */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: 'linear-gradient(135deg, #172554 0%, #1e3a8a 50%, #2563eb 100%)',
                    border: '1.5px solid #38bdf8',
                    borderRadius: '10px',
                    boxShadow: '0 10px 30px rgba(37, 99, 235, 0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px 9px',
                    textAlign: 'center',
                    color: '#ffffff',
                    overflowY: 'auto',
                  }}
                >
                  <Heart size={14} color="#38bdf8" fill="#38bdf8" style={{ marginBottom: '4px', flexShrink: 0 }} />
                  <h4
                    style={{
                      fontFamily: 'var(--font-handwriting)',
                      fontSize: '1.18rem',
                      color: '#ffffff',
                      marginBottom: '4px',
                      lineHeight: 1.1,
                      flexShrink: 0,
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      fontSize: item.id === 5 ? '0.88rem' : '0.71rem',
                      color: '#e0f2fe',
                      lineHeight: 1.35,
                      fontFamily: 'var(--font-body)',
                      margin: 0,
                      fontStyle: 'italic',
                      fontWeight: item.id === 5 ? '700' : '400',
                    }}
                  >
                    "{item.quote}"
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Proceed Button */}
      <div
        ref={bottomBtnRef}
        className="photo-bottom-btn-box"
        style={{ width: '100%', maxWidth: '345px', textAlign: 'center', flexShrink: 0 }}
      >
        <button
          onClick={handleProceed}
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
            boxShadow: '0 6px 20px rgba(37, 99, 235, 0.45)',
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
          <span>Next: Last Page 🤍</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
