import React from 'react';
import type { Manga } from '../data/mangaData';
import { Star, ShieldCheck } from 'lucide-react';

interface MangaCardProps {
  manga: Manga;
  onSelect: (manga: Manga) => void;
  isBookmarked: boolean;
  onToggleBookmark: (mangaId: string, e: React.MouseEvent) => void;
}

export const MangaCard: React.FC<MangaCardProps> = ({
  manga,
  onSelect,
  isBookmarked,
  onToggleBookmark
}) => {
  return (
    <div
      onClick={() => onSelect(manga)}
      className="glass-card"
      style={{
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        height: '100%',
        backgroundColor: '#11151F',
        border: '1px solid rgba(255, 255, 255, 0.07)'
      }}
    >
      {/* Cover Container with Hover Zoom */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '2/3',
        overflow: 'hidden',
        backgroundColor: '#0a0d14'
      }}>
        <img
          src={manga.coverImage}
          alt={manga.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />

        {/* Gradient Overlay for bottom text legibility */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(8, 10, 15, 0.95) 100%)',
          pointerEvents: 'none'
        }} />

        {/* Top Badges */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          right: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none'
        }}>
          <span className="badge-tag public-domain" style={{
            backdropFilter: 'blur(8px)',
            background: 'rgba(9, 13, 22, 0.85)'
          }}>
            <ShieldCheck size={12} />
            Domínio Público
          </span>

          <button
            onClick={(e) => onToggleBookmark(manga.id, e)}
            style={{
              pointerEvents: 'auto',
              background: isBookmarked ? '#00F5A0' : 'rgba(0, 0, 0, 0.6)',
              color: isBookmarked ? '#05080E' : '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
              transition: 'transform 0.2s, background-color 0.2s'
            }}
            title={isBookmarked ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            ★
          </button>
        </div>

        {/* Floating Year/Genre Pill at bottom of cover */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '14px',
          right: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span style={{
            fontSize: '0.75rem',
            color: 'var(--accent-emerald)',
            fontWeight: 700,
            letterSpacing: '0.04em'
          }}>
            {manga.year > 0 ? `Ano ${manga.year}` : 'Clássico'}
          </span>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: '#FBBF24',
            fontSize: '0.78rem',
            fontWeight: 700
          }}>
            <Star size={13} fill="#FBBF24" />
            <span>{manga.rating}</span>
          </div>
        </div>
      </div>

      {/* Manga Information */}
      <div style={{
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between'
      }}>
        <div>
          <h3 style={{
            fontSize: '1.05rem',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.3,
            marginBottom: '6px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {manga.title}
          </h3>

          <p style={{
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            marginBottom: '10px'
          }}>
            {manga.author}
          </p>

          <p style={{
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            marginBottom: '12px'
          }}>
            {manga.synopsis}
          </p>
        </div>

        <div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '5px',
            marginBottom: '14px'
          }}>
            {manga.genres.slice(0, 2).map((g) => (
              <span key={g} className="badge-tag">
                {g}
              </span>
            ))}
          </div>

          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.07)',
            paddingTop: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}>
            <span>{manga.chapters.length} {manga.chapters.length === 1 ? 'Capítulo' : 'Capítulos'}</span>
            <span style={{
              color: 'var(--accent-emerald)',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              Ler agora →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
