import React, { useState, useRef } from 'react';
import PasscodeScreen from './components/PasscodeScreen';
import InteractiveCandleScreen from './components/InteractiveCandleScreen';
import SpecialWishLetterScreen from './components/SpecialWishLetterScreen';
import ThingsToNeverForgetScreen from './components/ThingsToNeverForgetScreen';
import PhotoGridFlipScreen from './components/PhotoGridFlipScreen';
import ClosingStoryScreen from './components/ClosingStoryScreen';
import FloatingVinylDisc from './components/FloatingVinylDisc';

export default function App() {
  // Urutan 6 Langkah:
  // 1. 'passcode'    (PIN Code)
  // 2. 'candle'      (Tiup Lilin)
  // 3. 'letter'      (Surat / Letter)
  // 4. 'four-notes'  (4 Kolom "Things I hope you never forget")
  // 5. 'photos-grid' (6 Foto Grid Flip)
  // 6. 'closing'     (Penutup / Closing)
  const [currentStep, setCurrentStep] = useState('passcode');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleToggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const handleStartMusic = () => {
    if (!audioRef.current) return;
    audioRef.current.play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  };

  const handleRestart = () => {
    setCurrentStep('passcode');
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div className="mobile-app-shell">
      {/* Background Audio - Good Looking by Suki Waterhouse */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/Good Looking.mp3" type="audio/mpeg" />
        <source src="/Good%20Looking.mp3" type="audio/mpeg" />
        <source src="/special-song.mp3" type="audio/mpeg" />
      </audio>

      {/* 1. Pin Code Screen */}
      {currentStep === 'passcode' && (
        <PasscodeScreen
          onUnlock={() => {
            handleStartMusic();
            setCurrentStep('candle');
          }}
        />
      )}

      {/* 2. Lilin Screen (Interactive Candle SVG) */}
      {currentStep === 'candle' && (
        <InteractiveCandleScreen
          onNext={() => setCurrentStep('letter')}
        />
      )}

      {/* 3. Letter Screen (Special Wish Letter) */}
      {currentStep === 'letter' && (
        <SpecialWishLetterScreen
          onNext={() => setCurrentStep('four-notes')}
        />
      )}

      {/* 4. Empat Kolom "Things I hope you never forget" (3D Flip Cards) */}
      {currentStep === 'four-notes' && (
        <ThingsToNeverForgetScreen
          onNext={() => setCurrentStep('photos-grid')}
        />
      )}

      {/* 5. Enam Foto Grid Flip (3D Card Flip to Romantic Words) */}
      {currentStep === 'photos-grid' && (
        <PhotoGridFlipScreen
          onNext={() => setCurrentStep('closing')}
        />
      )}

      {/* 6. Closing Screen (Last Page & Restart) */}
      {currentStep === 'closing' && (
        <ClosingStoryScreen
          onRestart={handleRestart}
        />
      )}

      {/* Floating Vinyl Disc Music Player (Sesuai Video Referensi TikTok) */}
      <FloatingVinylDisc
        isPlaying={isPlaying}
        onToggleMusic={handleToggleMusic}
      />
    </div>
  );
}
