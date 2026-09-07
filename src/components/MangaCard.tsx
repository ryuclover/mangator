import React from 'react';
import type { Manga } from '../data/mangaData';
import { Star, ShieldCheck } from 'lucide-react';

interface MangaCardProps {
  manga: Manga;
  onSelect: (manga: Manga) => void;
  isBookmarked: boolean;
  onToggleBookmark: (mangaId: string, e: React.MouseEvent) => void;
  onSelectChapter?: (manga: Manga, chapter: any) => void;
  isRowView?: boolean;
}

export const MangaCard: React.FC<MangaCardProps> = ({
  manga,
  onSelect,
  isBookmarked,
  onToggleBookmark,
  onSelectChapter,
  isRowView = false
}) => {
  const isMangaFire = Boolean(manga.mangaType || manga.id.startsWith('mf-'));
  const typeLabel = (manga.mangaType || 'manga').toUpperCase();
  const typeBg =
    manga.mangaType === 'manhwa'
      ? 'linear-gradient(135deg, #9333EA, #7E22CE)'
      : manga.mangaType === 'manhua'
      ? 'linear-gradient(135deg, #059669, #047857)'
      : 'linear-gradient(135deg, #EA580C, #C2410C)';

  // ROW VIEW (MangaFire title-row-card)
  if (isRowView) {
    return (
      <div
        onClick={() => onSelect(manga)}
        className="glass-card"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          padding: '10px 14px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: '#101420',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          cursor: 'pointer',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#151B2B';
          e.currentTarget.style.borderColor = 'rgba(0, 245, 160, 0.4)';
          e.currentTarget.style.transform = 'translateX(4px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#101420';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.transform = 'translateX(0)';
        }}
      >
        {/* Thumbnail */}
        <div style={{
          width: '54px',
          height: '76px',
          flexShrink: 0,
          borderRadius: '6px',
          overflow: 'hidden',
          backgroundColor: '#0a0d14'
        }}>
          <img
            src={manga.coverImage}
            alt={manga.title}
            referrerPolicy="no-referrer"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{
              fontSize: '0.68rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              padding: '2px 7px',
              borderRadius: '4px',
              background: typeBg,
              color: '#fff'
            }}>
              {typeLabel}
            </span>
            {manga.rank ? (
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: '#FBBF24',
                background: 'rgba(251, 191, 36, 0.15)',
                padding: '2px 6px',
                borderRadius: '4px'
              }}>
                #{manga.rank}
              </span>
            ) : null}
          </div>

          <h4 style={{
            fontSize: '0.92rem',
            fontWeight: 700,
            color: '#fff',
            margin: '0 0 4px 0',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {manga.title}
          </h4>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            <span style={{ color: '#00F5A0', fontWeight: 600 }}>
              Ch. {manga.latestChapterNum || manga.chapters?.[0]?.number || 1}
            </span>
            <span>•</span>
            <span>{manga.chapterUpdatedAt || 'Atualizado'}</span>
          </div>
        </div>

        {/* Star action */}
        <button
          onClick={(e) => onToggleBookmark(manga.id, e)}
          style={{
            background: isBookmarked ? '#00F5A0' : 'rgba(255, 255, 255, 0.06)',
            color: isBookmarked ? '#05080E' : '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0
          }}
          title={isBookmarked ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          ★
        </button>
      </div>
    );
  }

  // STANDARD GRID CARD
  return (
    <div
      className="glass-card"
      style={{
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        height: '100%',
        backgroundColor: '#11151F',
        border: '1px solid rgba(255, 255, 255, 0.07)'
      }}
    >
      {/* Cover Container with Hover Zoom */}
      <div
        onClick={() => onSelect(manga)}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '2/3',
          overflow: 'hidden',
          backgroundColor: '#0a0d14',
          cursor: 'pointer'
        }}
      >
        <img
          src={manga.coverImage}
          alt={manga.title}
          referrerPolicy="no-referrer"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />

        {/* Gradient Overlay */}
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
          {isMangaFire ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                fontSize: '0.68rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                padding: '3px 8px',
                borderRadius: '4px',
                background: typeBg,
                color: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
              }}>
                {typeLabel}
              </span>
              {manga.rank ? (
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  color: '#05080E',
                  background: '#FBBF24',
                  padding: '2px 7px',
                  borderRadius: '4px'
                }}>
                  #{manga.rank}
                </span>
              ) : null}
            </div>
          ) : (
            <span className="badge-tag public-domain" style={{
              backdropFilter: 'blur(8px)',
              background: 'rgba(9, 13, 22, 0.85)'
            }}>
              <ShieldCheck size={12} />
              Domínio Público
            </span>
          )}

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

        {/* Floating Metadata at bottom of cover */}
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
            {isMangaFire
              ? `Ch. ${manga.latestChapterNum || manga.chapters?.[0]?.number || 1}`
              : manga.year > 0
              ? `Ano ${manga.year}`
              : 'Clássico'}
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
          <h3
            onClick={() => onSelect(manga)}
            style={{
              fontSize: '1.02rem',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.3,
              marginBottom: '4px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              cursor: 'pointer'
            }}
          >
            {manga.title}
          </h3>

          <p style={{
            fontSize: '0.78rem',
            color: 'var(--text-secondary)',
            marginBottom: '8px'
          }}>
            {isMangaFire && manga.chapterUpdatedAt ? `Atualizado ${manga.chapterUpdatedAt}` : manga.author}
          </p>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '5px',
            marginBottom: '10px'
          }}>
            {manga.genres.slice(0, 2).map((g) => (
              <span key={g} className="badge-tag">
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Chapter Fast Access Rows */}
        <div>
          <ul className="chfiv-list">
            {manga.chapters.slice(0, 2).map((chapter) => (
              <li key={chapter.id}>
                <div
                  className="chfiv-item"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectChapter) {
                      onSelectChapter(manga, chapter);
                    } else {
                      onSelect(manga);
                    }
                  }}
                >
                  <span className="fivchap">Cap. {chapter.number}</span>
                  <span className="fivtime">{chapter.releaseDate.includes('(') ? chapter.releaseDate.split('(')[0] : chapter.releaseDate || 'Disponível'}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

