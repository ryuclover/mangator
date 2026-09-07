import React, { useState, useMemo } from 'react';
import { MANGA_DATA, INITIAL_ACHIEVEMENTS } from './data/mangaData';
import type { Manga, Chapter, ReadingProgress } from './data/mangaData';
import { Navbar } from './components/Navbar';
import { MangaCard } from './components/MangaCard';
import { MangaDetail } from './components/MangaDetail';
import { Reader } from './components/Reader';
import { AboutModal } from './components/AboutModal';
import { AchievementsModal } from './components/AchievementsModal';
import {
  BookOpen,
  Flame,
  Bookmark,
  ShieldCheck,
  ArrowRight,
  PlayCircle,
  Award,
  Clock
} from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'bookmarks' | 'about'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('Todos');
  const [selectedManga, setSelectedManga] = useState<Manga | null>(null);
  const [readingState, setReadingState] = useState<{ manga: Manga; chapter: Chapter; initialPage?: number } | null>(null);
  
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('mangator_bookmarks');
    return saved ? JSON.parse(saved) : ['kaguya-hime'];
  });

  const [readingHistory, setReadingHistory] = useState<ReadingProgress | null>(() => {
    const saved = localStorage.getItem('mangator_history');
    if (saved) return JSON.parse(saved);
    return {
      mangaId: 'kaguya-hime',
      mangaTitle: 'O Conto da Princesa Kaguya',
      mangaCover: '/manga/cover-kaguya.jpg',
      chapterId: 'kaguya-ch-1',
      chapterNumber: 1,
      chapterTitle: 'Capítulo 1: A Donzela que Nasceu do Bambu',
      pageIndex: 2,
      totalPages: 6,
      updatedAt: Date.now()
    };
  });

  const [achievements] = useState(INITIAL_ACHIEVEMENTS);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);

  // Toggle Bookmark
  const toggleBookmark = (mangaId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarks((prev) => {
      const updated = prev.includes(mangaId)
        ? prev.filter((id) => id !== mangaId)
        : [...prev, mangaId];
      localStorage.setItem('mangator_bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  // Update progress in reader
  const handleUpdateProgress = (manga: Manga, chapter: Chapter, pageIndex: number, totalPages: number) => {
    const progress: ReadingProgress = {
      mangaId: manga.id,
      mangaTitle: manga.title,
      mangaCover: manga.coverImage,
      chapterId: chapter.id,
      chapterNumber: chapter.number,
      chapterTitle: chapter.title,
      pageIndex,
      totalPages,
      updatedAt: Date.now()
    };
    setReadingHistory(progress);
    localStorage.setItem('mangator_history', JSON.stringify(progress));
  };

  // Extract all unique genres
  const allGenres = useMemo(() => {
    const genres = new Set<string>();
    MANGA_DATA.forEach((m) => m.genres.forEach((g) => genres.add(g)));
    return ['Todos', ...Array.from(genres)];
  }, []);

  // Filtered manga list
  const filteredManga = useMemo(() => {
    return MANGA_DATA.filter((m) => {
      if (activeTab === 'bookmarks' && !bookmarks.includes(m.id)) {
        return false;
      }
      if (selectedGenre !== 'Todos' && !m.genres.includes(selectedGenre)) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchTitle = m.title.toLowerCase().includes(query);
        const matchAuthor = m.author.toLowerCase().includes(query);
        const matchGenre = m.genres.some((g) => g.toLowerCase().includes(query));
        return matchTitle || matchAuthor || matchGenre;
      }
      return true;
    });
  }, [activeTab, bookmarks, selectedGenre, searchQuery]);

  const featuredManga = MANGA_DATA[0];

  const handleNextChapter = () => {
    if (!readingState) return;
    const { manga, chapter } = readingState;
    const currentIndex = manga.chapters.findIndex((c) => c.id === chapter.id);
    if (currentIndex < manga.chapters.length - 1) {
      setReadingState({
        manga,
        chapter: manga.chapters[currentIndex + 1],
        initialPage: 0
      });
    }
  };

  const handlePrevChapter = () => {
    if (!readingState) return;
    const { manga, chapter } = readingState;
    const currentIndex = manga.chapters.findIndex((c) => c.id === chapter.id);
    if (currentIndex > 0) {
      setReadingState({
        manga,
        chapter: manga.chapters[currentIndex - 1],
        initialPage: 0
      });
    }
  };

  // If Reader is active
  if (readingState) {
    const currentIndex = readingState.manga.chapters.findIndex((c) => c.id === readingState.chapter.id);
    return (
      <Reader
        manga={readingState.manga}
        chapter={readingState.chapter}
        initialPage={readingState.initialPage ?? 0}
        onBackToManga={() => setReadingState(null)}
        onNextChapter={handleNextChapter}
        onPrevChapter={handlePrevChapter}
        hasPrevChapter={currentIndex > 0}
        hasNextChapter={currentIndex < readingState.manga.chapters.length - 1}
        onUpdateProgress={(pageIndex, totalPages) =>
          handleUpdateProgress(readingState.manga, readingState.chapter, pageIndex, totalPages)
        }
      />
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          if (tab === 'about') {
            setIsAboutOpen(true);
          } else {
            setActiveTab(tab);
            setSelectedManga(null);
          }
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAboutModal={() => setIsAboutOpen(true)}
        bookmarksCount={bookmarks.length}
      />

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        {selectedManga ? (
          <MangaDetail
            manga={selectedManga}
            onBack={() => setSelectedManga(null)}
            onStartReading={(chapter) => setReadingState({ manga: selectedManga, chapter, initialPage: 0 })}
            isBookmarked={bookmarks.includes(selectedManga.id)}
            onToggleBookmark={(id) => toggleBookmark(id)}
          />
        ) : (
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '1.5rem 1.5rem 5rem' }}>
            
            {/* Quick Resume Reading Widget */}
            {readingHistory && (
              <div
                onClick={() => {
                  const targetManga = MANGA_DATA.find((m) => m.id === readingHistory.mangaId);
                  if (targetManga) {
                    const targetChapter = targetManga.chapters.find((c) => c.id === readingHistory.chapterId) || targetManga.chapters[0];
                    setReadingState({
                      manga: targetManga,
                      chapter: targetChapter,
                      initialPage: readingHistory.pageIndex
                    });
                  }
                }}
                className="glass-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 20px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '2rem',
                  cursor: 'pointer',
                  border: '1px solid rgba(0, 245, 160, 0.3)',
                  backgroundColor: 'rgba(10, 15, 25, 0.85)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <img
                    src={readingHistory.mangaCover}
                    alt={readingHistory.mangaTitle}
                    style={{ width: '38px', height: '54px', borderRadius: '4px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={13} color="#00F5A0" />
                      <span style={{ fontSize: '0.72rem', color: '#00F5A0', fontWeight: 700, textTransform: 'uppercase' }}>
                        Continuar Lendo de Onde Parou
                      </span>
                    </div>
                    <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, margin: '2px 0' }}>
                      {readingHistory.mangaTitle} — Cap. {readingHistory.chapterNumber} (Pág. {readingHistory.pageIndex + 1}/{readingHistory.totalPages})
                    </h4>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    className="glow-btn-primary"
                    style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                  >
                    <PlayCircle size={15} />
                    Retomar Leitura
                  </button>
                </div>
              </div>
            )}

            {/* Hero Showcase */}
            {activeTab === 'catalog' && searchQuery === '' && selectedGenre === 'Todos' && (
              <section style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                marginBottom: '3rem',
                backgroundColor: '#0c0f17',
                border: '1px solid rgba(0, 245, 160, 0.25)',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 245, 160, 0.12)'
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${featuredManga.coverImage})`,
                  backgroundPosition: 'center 25%',
                  backgroundSize: 'cover',
                  filter: 'blur(30px) brightness(0.22)',
                  transform: 'scale(1.15)',
                  pointerEvents: 'none'
                }} />

                <div style={{
                  position: 'relative',
                  zIndex: 2,
                  display: 'grid',
                  gridTemplateColumns: 'minmax(280px, 1fr) 280px',
                  gap: '2.5rem',
                  padding: '3rem',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                      <span className="badge-tag accent">
                        <Flame size={13} color="#00F5A0" /> DESTAQUE DA SEMANA
                      </span>
                      <span className="badge-tag public-domain">
                        <ShieldCheck size={13} /> 100% Domínio Público
                      </span>
                    </div>

                    <h1 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '3rem',
                      fontWeight: 900,
                      lineHeight: 1.1,
                      color: '#fff',
                      marginBottom: '10px',
                      letterSpacing: '-0.02em'
                    }}>
                      {featuredManga.title}
                    </h1>

                    <p style={{
                      fontSize: '1rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      maxWidth: '680px',
                      marginBottom: '1.8rem'
                    }}>
                      {featuredManga.synopsis}
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => setReadingState({ manga: featuredManga, chapter: featuredManga.chapters[0], initialPage: 0 })}
                        className="glow-btn-primary"
                        style={{ padding: '14px 28px', fontSize: '1rem' }}
                      >
                        <BookOpen size={20} />
                        Ler Agora (Capítulo 1)
                      </button>

                      <button
                        onClick={() => setSelectedManga(featuredManga)}
                        className="glow-btn-secondary"
                        style={{ padding: '14px 22px' }}
                      >
                        Ver Detalhes da Obra
                        <ArrowRight size={16} />
                      </button>

                      <button
                        onClick={() => setIsAchievementsOpen(true)}
                        className="glow-btn-secondary"
                        style={{ padding: '14px 20px' }}
                      >
                        <Award size={18} color="#00F5A0" />
                        Conquistas
                      </button>
                    </div>
                  </div>

                  {/* Hero Floating 3D Cover */}
                  <div
                    onClick={() => setSelectedManga(featuredManga)}
                    style={{
                      cursor: 'pointer',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.8), 0 0 25px rgba(0, 245, 160, 0.3)',
                      border: '2px solid rgba(0, 245, 160, 0.4)',
                      transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      maxHeight: '380px'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0) scale(1)')}
                  >
                    <img
                      src={featuredManga.coverImage}
                      alt={featuredManga.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Filter Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '2rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              paddingBottom: '1.2rem'
            }}>
              <div>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  {activeTab === 'bookmarks' ? 'Meus Mangás Salvos' : 'Catálogo de Mangás'}
                  <span style={{
                    fontSize: '0.85rem',
                    color: 'var(--accent-emerald)',
                    backgroundColor: 'rgba(0, 245, 160, 0.1)',
                    padding: '2px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 600
                  }}>
                    {filteredManga.length} {filteredManga.length === 1 ? 'obra' : 'obras'}
                  </span>
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {activeTab === 'bookmarks'
                    ? 'Obras que você favoritou para ler ou acompanhar.'
                    : 'Grandes clássicos da literatura e pioneiros do mangá sob domínio público mundial.'}
                </p>
              </div>

              {/* Genre Pills */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {allGenres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-full)',
                      border: selectedGenre === genre
                        ? '1px solid #00F5A0'
                        : '1px solid rgba(255, 255, 255, 0.08)',
                      backgroundColor: selectedGenre === genre
                        ? 'rgba(0, 245, 160, 0.15)'
                        : 'rgba(255, 255, 255, 0.03)',
                      color: selectedGenre === genre ? '#00F5A0' : 'var(--text-secondary)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Manga Cards */}
            {filteredManga.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '1.8rem'
              }}>
                {filteredManga.map((manga) => (
                  <MangaCard
                    key={manga.id}
                    manga={manga}
                    onSelect={(m) => setSelectedManga(m)}
                    isBookmarked={bookmarks.includes(manga.id)}
                    onToggleBookmark={(id, e) => toggleBookmark(id, e)}
                  />
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '4rem 1.5rem',
                border: '1px dashed rgba(255, 255, 255, 0.12)',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'rgba(255, 255, 255, 0.01)'
              }}>
                <Bookmark size={36} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
                <h3 style={{ color: '#fff', marginBottom: '6px' }}>Nenhum mangá encontrado</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                  {activeTab === 'bookmarks'
                    ? 'Você ainda não adicionou nenhum mangá aos favoritos.'
                    : 'Tente buscar por outro termo ou selecione outro gênero.'}
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        backgroundColor: '#06080C',
        padding: '2.5rem 1.5rem',
        marginTop: 'auto'
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src="/brand/logo-polygon.jpg"
              alt="Mangator Alligator Mascot"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                border: '1px solid rgba(0, 245, 160, 0.4)'
              }}
            />
            <div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.1rem',
                color: '#fff',
                letterSpacing: '-0.01em'
              }}>
                MANGATOR
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                The Alligator-Themed Public Domain Manga Reader • Portfolio Showcase
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => setIsAboutOpen(true)}>Sobre o Projeto</span>
            <span style={{ cursor: 'pointer' }} onClick={() => setIsAchievementsOpen(true)}>Conquistas</span>
            <span style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('catalog'); setSelectedGenre('Todos'); }}>Catálogo</span>
            <span style={{ cursor: 'pointer' }} onClick={() => setActiveTab('bookmarks')}>Favoritos</span>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Mangator. Obras em Domínio Público Mundial.
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
        achievements={achievements}
      />
    </div>
  );
}
export default App;
