import React, { useState } from 'react';
import type { Review } from '../data/mangaData';
import { Star, ThumbsUp, Send } from 'lucide-react';

interface ReviewsSectionProps {
  mangaTitle: string;
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'likes'>) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  mangaTitle,
  reviews,
  onAddReview
}) => {
  const [showForm, setShowForm] = useState(false);
  const [storyRating, setStoryRating] = useState(5);
  const [artRating, setArtRating] = useState(5);
  const [charactersRating, setCharactersRating] = useState(5);
  const [reviewContent, setReviewContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});

  const handleLike = (id: string, initialLikes: number) => {
    setLikesMap((prev) => ({
      ...prev,
      [id]: (prev[id] ?? initialLikes) + 1
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewContent.trim() || !authorName.trim()) return;

    const overallRating = Math.round(((storyRating + artRating + charactersRating) / 3) * 10) / 10;

    onAddReview({
      userName: authorName.trim(),
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      rating: overallRating,
      storyRating,
      artRating,
      charactersRating,
      date: 'Hoje',
      content: reviewContent.trim()
    });

    setReviewContent('');
    setAuthorName('');
    setShowForm(false);
  };

  return (
    <div style={{ marginTop: '3.5rem' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.8rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        paddingBottom: '1.2rem'
      }}>
        <div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.6rem',
            color: '#fff',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            Avaliações e Críticas da Comunidade
            <span style={{
              fontSize: '0.8rem',
              backgroundColor: 'rgba(0, 245, 160, 0.12)',
              color: '#00F5A0',
              padding: '2px 10px',
              borderRadius: 'var(--radius-full)'
            }}>
              {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            </span>
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Notas técnicas sobre narrativa, arte e personagens de {mangaTitle}
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="glow-btn-primary"
          style={{ padding: '10px 20px', fontSize: '0.85rem' }}
        >
          {showForm ? 'Cancelar Avaliação' : 'Escrever Avaliação'}
        </button>
      </div>

      {/* Review Submission Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="glass-card"
          style={{
            padding: '1.8rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '2rem',
            border: '1px solid rgba(0, 245, 160, 0.3)',
            backgroundColor: 'rgba(15, 19, 29, 0.9)'
          }}
        >
          <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1.2rem' }}>Sua Avaliação Técnica</h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.2rem',
            marginBottom: '1.5rem'
          }}>
            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                HISTÓRIA / ENREDO ({storyRating} ★)
              </label>
              <input
                type="range"
                min={1}
                max={5}
                step={0.5}
                value={storyRating}
                onChange={(e) => setStoryRating(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#00F5A0' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                QUALIDADE DA ARTE ({artRating} ★)
              </label>
              <input
                type="range"
                min={1}
                max={5}
                step={0.5}
                value={artRating}
                onChange={(e) => setArtRating(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#00F5A0' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                PERSONAGENS ({charactersRating} ★)
              </label>
              <input
                type="range"
                min={1}
                max={5}
                step={0.5}
                value={charactersRating}
                onChange={(e) => setCharactersRating(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#00F5A0' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gap: '12px', marginBottom: '1.2rem' }}>
            <input
              type="text"
              placeholder="Seu nome ou apelido de leitor..."
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              required
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '0.85rem'
              }}
            />

            <textarea
              placeholder="Descreva o que achou da narrativa clássica, pacing e arte..."
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              rows={4}
              required
              style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '0.85rem',
                resize: 'vertical'
              }}
            />
          </div>

          <button
            type="submit"
            className="glow-btn-primary"
            style={{ padding: '10px 22px' }}
          >
            <Send size={15} />
            Publicar Avaliação
          </button>
        </form>
      )}

      {/* Reviews Cards List */}
      <div style={{ display: 'grid', gap: '16px' }}>
        {reviews.map((r) => {
          const currentLikes = likesMap[r.id] ?? r.likes;

          return (
            <div
              key={r.id}
              className="glass-card"
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(17, 21, 31, 0.7)'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '10px',
                marginBottom: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={r.userAvatar}
                    alt={r.userName}
                    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700 }}>{r.userName}</h4>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{r.date}</span>
                  </div>
                </div>

                {/* Score Breakdown Pill */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#FBBF24', fontWeight: 800 }}>
                    <Star size={14} fill="#FBBF24" />
                    <span>{r.rating}</span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'flex', gap: '8px' }}>
                    <span>História: <strong>{r.storyRating}</strong></span>
                    <span>•</span>
                    <span>Arte: <strong>{r.artRating}</strong></span>
                    <span>•</span>
                    <span>Personagens: <strong>{r.charactersRating}</strong></span>
                  </div>
                </div>
              </div>

              <p style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '1rem'
              }}>
                {r.content}
              </p>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleLike(r.id, r.likes)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.8rem',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#00F5A0')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  <ThumbsUp size={14} />
                  <span>{currentLikes} curtidas</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
