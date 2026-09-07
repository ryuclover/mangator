import React, { useState } from 'react';
import type { Manga, Chapter, Review } from '../data/mangaData';
import { ReviewsSection } from './ReviewsSection';
import { BookOpen, Star, ArrowLeft, Bookmark, MessageSquare, Download, Loader2 } from 'lucide-react';
import { downloadChapterZip } from '../utils/downloader';

interface MangaDetailProps {
  manga: Manga;
  onBack: () => void;
  onStartReading: (chapter: Chapter) => void;
  isBookmarked: boolean;
  onToggleBookmark: (mangaId: string) => void;
  isLoadingChapters?: boolean;
}

export const MangaDetail: React.FC<MangaDetailProps> = ({
  manga,
  onBack,
  onStartReading,
  isBookmarked,
  onToggleBookmark,
  isLoadingChapters = false
}) => {
  const [reviewsList, setReviewsList] = useState<Review[]>(manga.reviews);
  const [downloadingChapterId, setDownloadingChapterId] = useState<string | null>(null);

  const firstChapter = manga.chapters[0];

  const handleAddReview = (newRev: Omit<Review, 'id' | 'likes'>) => {
    const fullRev: Review = {
      ...newRev,
      id: `rev-${Date.now()}`,
      likes: 0
    };
    setReviewsList([fullRev, ...reviewsList]);
  };

  const handleDownload = async (ch: Chapter, e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloadingChapterId(ch.id);
    try {
      await downloadChapterZip(manga.title, ch.number, ch.pages);
    } catch (err) {
      console.error(err);
    } finally {
      setDownloadingChapterId(null);
    }
  };

  return (
    <div style={{
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '2rem 1.5rem 5rem'
    }}>
      {/* Back button */}
      <button
        onClick={onBack}
        className="glow-btn-secondary"
        style={{
          marginBottom: '2rem',
          fontSize: '0.85rem'
        }}
      >
        <ArrowLeft size={16} />
        Voltar ao Catálogo
      </button>

      {/* Hero Banner Section */}
      <div style={{
        position: 'relative',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backgroundColor: '#0F131D',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${manga.bannerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          filter: 'blur(35px) brightness(0.25)',
          transform: 'scale(1.1)',
          pointerEvents: 'none'
        }} />

        <div style={{
          position: 'relative',
          zIndex: 2,
          padding: '2.5rem',
          display: 'grid',
          gridTemplateColumns: 'minmax(240px, 320px) 1fr',
          gap: '2.5rem',
          alignItems: 'start'
        }}>
          {/* Cover Art */}
          <div style={{
            position: 'relative',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            boxShadow: '0 20px 35px rgba(0,0,0,0.8), 0 0 20px rgba(0, 245, 160, 0.2)',
            border: '2px solid rgba(255, 255, 255, 0.12)'
          }}>
            <img
              src={manga.coverImage}
              alt={manga.title}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>

          {/* Details Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                <span className="badge-tag public-domain">
                  {manga.license}
                </span>
                <span className="badge-tag accent">
                  Status: {manga.status}
                </span>
                <span className="badge-tag">
                  Ano {manga.year > 0 ? manga.year : 'Antigo'}
                </span>
              </div>

              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.6rem',
                fontWeight: 800,
                color: '#fff',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: '8px'
              }}>
                {manga.title}
              </h1>

              {manga.originalTitle && (
                <p style={{
                  fontSize: '1.1rem',
                  color: 'var(--accent-emerald)',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600
                }}>
                  {manga.originalTitle}
                </p>
              )}
            </div>

            {/* Author & Stats */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '12px 0'
            }}>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>AUTOR</span>
                <strong style={{ color: '#fff' }}>{manga.author}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>ILUSTRAÇÃO / EDIÇÃO</span>
                <strong style={{ color: '#fff' }}>{manga.artist}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>AVALIAÇÃO</span>
                <strong style={{ color: '#FBBF24', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={14} fill="#FBBF24" /> {manga.rating} / 5.0
                </strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>VISUALIZAÇÕES</span>
                <strong style={{ color: '#fff' }}>{manga.views}</strong>
              </div>
            </div>

            {/* Synopsis */}
            <div>
              <h3 style={{ fontSize: '1rem', color: '#fff', marginBottom: '8px', fontWeight: 600 }}>
                Sinopse da Obra
              </h3>
              <p style={{
                fontSize: '0.95rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)'
              }}>
                {manga.synopsis}
              </p>
            </div>

            {/* Genres */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {manga.genres.map((genre) => (
                <span key={genre} className="badge-tag">
                  {genre}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '1rem',
              flexWrap: 'wrap'
            }}>
              {firstChapter && (
                <button
                  onClick={() => onStartReading(firstChapter)}
                  className="glow-btn-primary"
                  style={{ fontSize: '1rem', padding: '14px 28px' }}
                >
                  <BookOpen size={20} />
                  Começar a Ler Agora (Cap. {firstChapter.number})
                </button>
              )}

              <button
                onClick={() => onToggleBookmark(manga.id)}
                className="glow-btn-secondary"
              >
                <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
                {isBookmarked ? 'Salvo nos Favoritos' : 'Salvar nos Favoritos'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters Index Section */}
      <div style={{ marginTop: '3.5rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem'
        }}>
          <div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.6rem',
              color: '#fff',
              fontWeight: 700
            }}>
              Capítulos Disponíveis
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Selecione qualquer capítulo para abrir o leitor ou baixe em ZIP para leitura offline
            </p>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
            {manga.chapters.length} Total
          </span>
        </div>

        {isLoadingChapters && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(0, 245, 160, 0.08)',
            border: '1px solid rgba(0, 245, 160, 0.25)',
            color: '#00F5A0',
            fontSize: '0.9rem',
            fontWeight: 600,
            marginBottom: '1.25rem'
          }}>
            <Loader2 size={20} className="animate-spin" />
            <span>Sincronizando capítulos reais e scans online em tempo real...</span>
          </div>
        )}

        <div style={{ display: 'grid', gap: '12px' }}>
          {manga.chapters.map((ch) => (
            <div
              key={ch.id}
              onClick={() => onStartReading(ch)}
              className="glass-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 24px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(21, 27, 39, 0.7)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(0, 245, 160, 0.1)',
                  color: 'var(--accent-emerald)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.1rem'
                }}>
                  {ch.number}
                </div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '0.98rem', fontWeight: 600, marginBottom: '2px' }}>
                    {ch.title}
                  </h4>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>{ch.pagesCount} Páginas</span>
                    <span>•</span>
                    <span>{ch.releaseDate}</span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MessageSquare size={12} /> {ch.comments?.length ?? 0} comentários
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={(e) => handleDownload(ch, e)}
                  title="Baixar capítulo em ZIP para leitura offline"
                  className="glow-btn-secondary"
                  style={{ padding: '8px 12px', fontSize: '0.8rem' }}
                >
                  <Download size={14} />
                  <span>{downloadingChapterId === ch.id ? 'Baixando...' : 'ZIP'}</span>
                </button>

                <button
                  className="glow-btn-primary"
                  style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                >
                  Ler Cap. {ch.number} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Reviews Section */}
      <ReviewsSection
        mangaTitle={manga.title}
        reviews={reviewsList}
        onAddReview={handleAddReview}
      />
    </div>
  );
};
