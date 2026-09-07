import React, { useState } from 'react';
import type { Manga, ReadingProgress } from '../data/mangaData';
import { PlayCircle, Clock, TrendingUp, Sparkles } from 'lucide-react';

interface SidebarProps {
  mangaList: Manga[];
  onSelectManga: (manga: Manga) => void;
  readingHistory: ReadingProgress | null;
  onResumeReading: (progress: ReadingProgress) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  mangaList,
  onSelectManga,
  readingHistory,
  onResumeReading,
}) => {
  const [rankingRange, setRankingRange] = useState<'weekly' | 'monthly' | 'all'>('weekly');

  // Sorted list for rankings
  const rankedManga = [...mangaList].sort((a, b) => {
    if (rankingRange === 'weekly') return b.rating - a.rating;
    if (rankingRange === 'monthly') return parseFloat(b.views) - parseFloat(a.views);
    return b.year - a.year;
  });

  return (
    <aside style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Resume Reading Mini Widget */}
      {readingHistory && (
        <div
          className="glass-card"
          style={{
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(0, 245, 160, 0.35)',
            backgroundColor: 'rgba(10, 15, 25, 0.95)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
            <Clock size={13} color="#00F5A0" />
            <span style={{ fontSize: '0.72rem', color: '#00F5A0', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Histórico Recente
            </span>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
            <img
              src={readingHistory.mangaCover}
              alt={readingHistory.mangaTitle}
              style={{
                width: '44px',
                height: '62px',
                borderRadius: '6px',
                objectFit: 'cover',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <h4 style={{
                fontSize: '0.86rem',
                fontWeight: 700,
                color: '#fff',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginBottom: '4px'
              }}>
                {readingHistory.mangaTitle}
              </h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Cap. {readingHistory.chapterNumber} • Pág. {readingHistory.pageIndex + 1}/{readingHistory.totalPages}
              </p>
              {/* Progress bar */}
              <div style={{
                height: '4px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '2px',
                marginTop: '6px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${Math.round(((readingHistory.pageIndex + 1) / readingHistory.totalPages) * 100)}%`,
                  height: '100%',
                  backgroundColor: '#00F5A0'
                }} />
              </div>
            </div>
          </div>

          <button
            onClick={() => onResumeReading(readingHistory)}
            className="glow-btn-primary"
            style={{ width: '100%', padding: '8px 14px', fontSize: '0.8rem', justifyContent: 'center' }}
          >
            <PlayCircle size={14} />
            Continuar de Onde Parou
          </button>
        </div>
      )}

      {/* Popular Series Ranking Section (Kingofshojo #sidebar .ts-wpop-series-gen) */}
      <div className="glass-card" style={{ padding: '18px', borderRadius: 'var(--radius-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={16} color="#00F5A0" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff' }}>
              Mais Populares
            </h3>
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Top Ranking</span>
        </div>

        {/* Weekly / Monthly / All Time Tabs */}
        <ul className="ts-wpop-nav-tabs">
          <li className={rankingRange === 'weekly' ? 'active' : ''}>
            <button onClick={() => setRankingRange('weekly')}>Semanal</button>
          </li>
          <li className={rankingRange === 'monthly' ? 'active' : ''}>
            <button onClick={() => setRankingRange('monthly')}>Mensal</button>
          </li>
          <li className={rankingRange === 'all' ? 'active' : ''}>
            <button onClick={() => setRankingRange('all')}>Geral</button>
          </li>
        </ul>

        {/* Ranking List */}
        <div>
          {rankedManga.map((manga, idx) => {
            const badgeClass = idx === 0 ? 'rank-badge top-1' : idx === 1 ? 'rank-badge top-2' : idx === 2 ? 'rank-badge top-3' : 'rank-badge';
            return (
              <div
                key={manga.id}
                onClick={() => onSelectManga(manga)}
                className="sidebar-rank-item"
              >
                <div className={badgeClass}>
                  {idx + 1}
                </div>

                <img
                  src={manga.coverImage}
                  alt={manga.title}
                  style={{
                    width: '38px',
                    height: '52px',
                    borderRadius: '4px',
                    objectFit: 'cover',
                    flexShrink: 0
                  }}
                />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    color: '#fff',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginBottom: '2px'
                  }}>
                    {manga.title}
                  </h4>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)'
                  }}>
                    <span>{manga.chapters.length} cap.</span>
                    <span style={{ color: '#00F5A0', fontWeight: 600 }}>★ {manga.rating}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Curator Banner (Public domain preservation) */}
      <div style={{
        padding: '16px',
        borderRadius: 'var(--radius-md)',
        background: 'linear-gradient(135deg, rgba(0, 245, 160, 0.1) 0%, rgba(16, 185, 129, 0.03) 100%)',
        border: '1px solid rgba(0, 245, 160, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Sparkles size={15} color="#00F5A0" />
          <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fff' }}>
            Preservação e Legado
          </h4>
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          Todas as obras neste acervo possuem alta resolução e são de livre circulação cultural pelo Domínio Público Mundial.
        </p>
      </div>
    </aside>
  );
};
