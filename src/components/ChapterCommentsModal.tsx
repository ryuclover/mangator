import React, { useState } from 'react';
import type { ChapterComment } from '../data/mangaData';
import { MessageSquare, ThumbsUp, Eye, Send, ShieldAlert } from 'lucide-react';

interface ChapterCommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapterNumber: number;
  comments: ChapterComment[];
  onAddComment: (text: string, isSpoiler: boolean) => void;
}

export const ChapterCommentsModal: React.FC<ChapterCommentsModalProps> = ({
  isOpen,
  onClose,
  chapterNumber,
  comments,
  onAddComment
}) => {
  const [newCommentText, setNewCommentText] = useState('');
  const [isSpoilerChecked, setIsSpoilerChecked] = useState(false);
  const [revealedSpoilers, setRevealedSpoilers] = useState<Record<string, boolean>>({});
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});

  if (!isOpen) return null;

  const handleToggleSpoiler = (id: string) => {
    setRevealedSpoilers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLike = (id: string, initialLikes: number) => {
    setLikesMap((prev) => ({
      ...prev,
      [id]: (prev[id] ?? initialLikes) + 1
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    onAddComment(newCommentText.trim(), isSpoilerChecked);
    setNewCommentText('');
    setIsSpoilerChecked(false);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 250,
      backgroundColor: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}
    onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#0F131D',
          border: '1px solid rgba(0, 245, 160, 0.3)',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: '650px',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 25px rgba(0, 245, 160, 0.15)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MessageSquare size={20} color="#00F5A0" />
            <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700 }}>
              Comentários do Capítulo {chapterNumber}
            </h3>
            <span style={{
              fontSize: '0.75rem',
              backgroundColor: 'rgba(255,255,255,0.08)',
              color: 'var(--text-secondary)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)'
            }}>
              {comments.length}
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '1.2rem'
            }}
          >
            ✕
          </button>
        </div>

        {/* Comment list */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          {comments.map((c) => {
            const isSpoiler = c.isSpoiler && !revealedSpoilers[c.id];
            const currentLikes = likesMap[c.id] ?? c.likes;

            return (
              <div
                key={c.id}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px 16px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={c.userAvatar}
                      alt={c.userName}
                      style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>{c.userName}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{c.date}</div>
                    </div>
                  </div>

                  {c.isSpoiler && (
                    <span style={{
                      fontSize: '0.7rem',
                      color: '#F59E0B',
                      backgroundColor: 'rgba(245, 158, 11, 0.12)',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <ShieldAlert size={12} /> Spoiler
                    </span>
                  )}
                </div>

                {isSpoiler ? (
                  <div
                    onClick={() => handleToggleSpoiler(c.id)}
                    style={{
                      cursor: 'pointer',
                      padding: '12px',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(245, 158, 11, 0.08)',
                      border: '1px dashed rgba(245, 158, 11, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      color: '#FBBF24',
                      fontSize: '0.82rem',
                      userSelect: 'none'
                    }}
                  >
                    <Eye size={15} />
                    <span>Este comentário contém spoiler da história. Clique para revelar.</span>
                  </div>
                ) : (
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                    {c.text}
                  </p>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <button
                    onClick={() => handleLike(c.id, c.likes)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.78rem',
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

        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            padding: '1.25rem 1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: 'rgba(0, 0, 0, 0.4)'
          }}
        >
          <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
            <input
              type="text"
              placeholder="Deixe sua reflexão sobre o capítulo..."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              className="glow-btn-primary"
              style={{ padding: '10px 18px', fontSize: '0.85rem' }}
            >
              <Send size={15} />
              Enviar
            </button>
          </div>

          <label style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}>
            <input
              type="checkbox"
              checked={isSpoilerChecked}
              onChange={(e) => setIsSpoilerChecked(e.target.checked)}
              style={{ accentColor: '#F59E0B' }}
            />
            <span>Marcar comentário como Spoiler</span>
          </label>
        </form>
      </div>
    </div>
  );
};
