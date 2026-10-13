import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';

export default function SpecialWishLetterScreen({ onNext }) {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, scale: 0.88, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.5)' }
    );

    gsap.fromTo(contentRef.current?.children,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.3 }
    );
  }, { scope: containerRef });

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
      {/* Background Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.18) 0%, transparent 70%)',
          filter: 'blur(45px)',
          pointerEvents: 'none',
        }}
      />

      {/* Main Letter Card */}
      <div
        ref={cardRef}
        className="letter-card"
        style={{
          width: '100%',
          maxWidth: '340px',
          background: 'rgba(13, 23, 44, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '26px',
          border: '1.5px solid rgba(56, 189, 248, 0.35)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(56, 189, 248, 0.15)',
          padding: '28px 20px 22px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {/* Top Heart Badge */}
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

        {/* Header Title */}
        <h2
          style={{
            fontFamily: 'var(--font-handwriting)',
            fontSize: '2.5rem',
            color: '#ffffff',
            textShadow: '0 0 15px rgba(56, 189, 248, 0.5)',
            marginBottom: '2px',
            lineHeight: 1.15,
            marginTop: '6px',
          }}
        >
          Special Wish
        </h2>
        <p
          style={{
            fontSize: '0.68rem',
            color: '#38bdf8',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontWeight: '700',
            marginBottom: '18px',
            fontFamily: 'var(--font-body)',
          }}
        >
          A Little Wish For You
        </p>

        {/* Letter Body Content */}
        <div
          ref={contentRef}
          className="letter-body-content"
          style={{
            maxHeight: '48vh',
            overflowY: 'auto',
            paddingRight: '6px',
            textAlign: 'justify',
            fontSize: '0.84rem',
            lineHeight: 1.62,
            color: '#e0f2fe',
            fontFamily: 'var(--font-body)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-handwriting)',
              fontSize: '1.7rem',
              color: '#38bdf8',
              textAlign: 'left',
              marginBottom: '2px',
              textShadow: '0 0 10px rgba(56, 189, 248, 0.4)',
            }}
          >
            Dear Simone,
          </div>

          <p>
            Twenty-four candles will glow on your cake, and not one of them will find me by your side. Yet, today, being given the chance to simply wish you a happy birthday already means more to me than words could ever express. How fortunate I am to have been given such a beautiful opportunity, even if all I can do is send my wishes from afar.
          </p>

          <p>
            Thank you for being you. Thank you for allowing me to know you, to care for you, and to hold space for your whole self. I will continue to love you in ways that are soft and steady, and I will continue to wish you happiness, the kind that feels warm, safe, and lasting.
          </p>

          <p>
            May you bloom, slowly and fully, in your own time. May the people you love water you with care, patience, and joy.
          </p>

          <p>
            You are deeply loved, even on days you might forget it. Your existence matters to so many people. Your kindness settles softly in the lives you touch. Thank you for the gentle love you give, for the laughter you share so freely, for the comfort you offer without ever asking for anything in return.
          </p>

          <p
            style={{
              fontStyle: 'italic',
              textAlign: 'center',
              color: '#38bdf8',
              fontWeight: '700',
              fontSize: '0.92rem',
              marginTop: '4px',
              textShadow: '0 0 12px rgba(56, 189, 248, 0.35)',
            }}
          >
            "Buon compleanno, amore della mia vita."
          </p>

          <div
            style={{
              textAlign: 'right',
              fontFamily: 'var(--font-handwriting)',
              fontSize: '1.5rem',
              color: '#ffffff',
              marginTop: '2px',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.4)',
            }}
          >
            Love, Tata 🤍
          </div>
        </div>

        {/* Divider & Next Button */}
        <div
          style={{
            width: '100%',
            paddingTop: '18px',
            borderTop: '1px solid rgba(56, 189, 248, 0.25)',
            marginTop: '16px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={handleProceed}
            style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              color: '#ffffff',
              border: '1.5px solid rgba(56, 189, 248, 0.7)',
              borderRadius: '9999px',
              padding: '11px 26px',
              fontSize: '0.78rem',
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
            <span>Things For You</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
