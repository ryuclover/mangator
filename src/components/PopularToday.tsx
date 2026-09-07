import React from 'react';
import type { Manga } from '../data/mangaData';
import { Star, ShieldCheck } from 'lucide-react';

interface PopularTodayProps {
  mangaList: Manga[];
  onSelectManga: (manga: Manga) => void;
}

export const PopularToday: React.FC<PopularTodayProps> = ({ mangaList, onSelectManga }) => {
  return (
    <section style={{ marginBottom: '2.5rem' }}>
      <div className="releases-header">
        <h2>
          <span>Em Alta Hoje</span>
          <span style={{ fontSize: '0.8rem', color: '#00F5A0', fontWeight: 600 }}>• Popular Today</span>
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1.2rem'
      }}>
        {mangaList.map((manga) => {
          const scorePercent = Math.min(100, Math.round((manga.rating / 5) * 100));
          return (
            <div
              key={manga.id}
              onClick={() => onSelectManga(manga)}
              className="glass-card"
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                backgroundColor: '#0E121B',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              {/* Image Container with Badges */}
              <div style={{ position: 'relative', aspectRatio: '2/3', overflow: 'hidden' }}>
                <img
                  src={manga.coverImage}
                  alt={manga.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />

                {/* Top Badge: Domínio Público */}
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  backgroundColor: 'rgba(5, 8, 14, 0.85)',
                  border: '1px solid rgba(0, 245, 160, 0.3)',
                  padding: '2px 7px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.68rem',
                  color: '#00F5A0',
                  fontWeight: 700
                }}>
                  <ShieldCheck size={11} />
                  <span>Autêntico</span>
                </div>

                {/* Chapter Pill Overlay at bottom of image */}
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '8px',
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#fff'
                }}>
                  Cap. {manga.chapters[0]?.number || 1}
                </div>
              </div>

              {/* Card Meta & Score Bar (Kingofshojo .bigor style) */}
              <div style={{ padding: '12px' }}>
                <h4 style={{
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: '#fff',
                  lineHeight: 1.3,
                  marginBottom: '6px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {manga.title}
                </h4>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)'
                }}>
                  {/* Rating Score Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1 }}>
                    <div style={{
                      flex: 1,
                      height: '5px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${scorePercent}%`,
                        height: '100%',
                        backgroundColor: '#00F5A0',
                        borderRadius: '3px'
                      }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#FBBF24', fontWeight: 700 }}>
                      <Star size={11} fill="#FBBF24" />
                      <span>{manga.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
