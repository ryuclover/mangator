import React, { useState } from 'react';
import type { Manga } from '../data/mangaData';
import { BookOpen, ArrowRight, Flame, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSliderProps {
  featuredMangaList: Manga[];
  onSelectManga: (manga: Manga) => void;
  onStartReading: (manga: Manga) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  featuredMangaList,
  onSelectManga,
  onStartReading,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!featuredMangaList.length) return null;

  const current = featuredMangaList[currentIndex] || featuredMangaList[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredMangaList.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredMangaList.length) % featuredMangaList.length);
  };

  return (
    <div className="slider-wrapper">
      <div className="mainslider">
        {/* Background Blurred Banner (Kingofshojo .bigbanner .img-blur) */}
        <div
          className="img-blur"
          style={{ backgroundImage: `url(${current.coverImage})` }}
        />

        {/* Slide Content */}
        <div className="slider-inner">
          <div className="sliderinfo">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <div className="slidlc">
                Capítulo: {current.chapters[0]?.number || 1}
              </div>
              <span className="badge-tag accent" style={{ marginBottom: '0.75rem' }}>
                <Flame size={12} color="#00F5A0" /> DESTAQUE
              </span>
              <span className="badge-tag public-domain" style={{ marginBottom: '0.75rem' }}>
                <ShieldCheck size={12} /> {current.license.split(' ')[0]} {current.license.split(' ')[1]}
              </span>
            </div>

            <h1
              onClick={() => onSelectManga(current)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.4rem',
                fontWeight: 900,
                color: '#fff',
                margin: '0.2rem 0 0.8rem',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                cursor: 'pointer'
              }}
            >
              {current.title}
            </h1>

            <p style={{
              fontSize: '0.92rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxHeight: '4.8rem',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              marginBottom: '1.2rem'
            }}>
              {current.synopsis}
            </p>

            {/* Genre Pills */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {current.genres.map((g) => (
                <span
                  key={g}
                  style={{
                    fontSize: '0.74rem',
                    color: '#94A3B8',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    padding: '3px 9px',
                    borderRadius: '4px'
                  }}
                >
                  {g}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button
                className="start-reading-btn"
                onClick={() => onStartReading(current)}
              >
                <span>Começar a Ler</span>
                <ArrowRight size={17} />
              </button>

              <button
                className="glow-btn-secondary"
                onClick={() => onSelectManga(current)}
                style={{ padding: '10px 18px', fontSize: '0.88rem' }}
              >
                <BookOpen size={16} />
                Ver Detalhes
              </button>

              {/* Slider Arrows */}
              <div style={{ display: 'flex', gap: '6px', marginLeft: 'auto' }}>
                <button
                  onClick={handlePrev}
                  title="Anterior"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    borderRadius: '8px',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={handleNext}
                  title="Próximo"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    borderRadius: '8px',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Floating Poster Cover (Kingofshojo .slidtrithumb) */}
          <div
            className="slidtrithumb"
            onClick={() => onSelectManga(current)}
            style={{
              cursor: 'pointer',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 245, 160, 0.3)',
              border: '2px solid rgba(0, 245, 160, 0.4)',
              aspectRatio: '2/3',
              height: '330px',
              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <img
              src={current.coverImage}
              alt={current.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>

      {/* Slide Pagination Bullets */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        padding: '10px 0 14px',
        background: 'rgba(5, 8, 14, 0.6)'
      }}>
        {featuredMangaList.map((m, idx) => (
          <button
            key={m.id}
            onClick={() => setCurrentIndex(idx)}
            style={{
              width: currentIndex === idx ? '28px' : '9px',
              height: '8px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: currentIndex === idx ? '#00F5A0' : 'rgba(255, 255, 255, 0.2)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
};
