import React from 'react';

export default function FloatingVinylDisc({ isPlaying, onToggleMusic }) {
  return (
    <div
      onClick={onToggleMusic}
      title={isPlaying ? 'Pause: Good Looking 🎵' : 'Play: Good Looking 🎵'}
      style={{
        position: 'absolute',
        bottom: '20px',
        right: '16px',
        zIndex: 200,
        width: '54px',
        height: '54px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '1.5px solid rgba(56, 189, 248, 0.6)',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.45), 0 0 15px rgba(56, 189, 248, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {/* Vinyl Disc */}
      <div
        style={{
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #1e293b 0%, #0f172a 60%, #020617 100%)',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: 'inset 0 0 6px rgba(0,0,0,0.8)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: isPlaying ? 'spinVinyl 3s linear infinite' : 'none',
        }}
      >
        {/* Subtle Grooved Ring */}
        <div
          style={{
            position: 'absolute',
            inset: '5px',
            borderRadius: '50%',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        />

        {/* Center Label (Red/Sapphire) */}
        <div
          style={{
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
            border: '1px solid #ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.5)',
          }}
        >
          {/* Spindle Hole */}
          <div
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: '#020617',
            }}
          />
        </div>
      </div>
    </div>
  );
}
