import React, { useState, useMemo } from 'react';
import { MANGA_DATA, INITIAL_ACHIEVEMENTS } from './data/mangaData';
import type { Manga, Chapter, ReadingProgress } from './data/mangaData';
import { Navbar } from './components/Navbar';
import { MangaCard } from './components/MangaCard';
import { MangaDetail } from './components/MangaDetail';
import { Reader } from './components/Reader';
import { AboutModal } from './components/AboutModal';
import { AchievementsModal } from './components/AchievementsModal';
import { HeroSlider } from './components/HeroSlider';
import { GenreRibbon } from './components/GenreRibbon';
import { PopularToday } from './components/PopularToday';
import { Sidebar } from './components/Sidebar';
import { Bookmark, Sparkles } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'bookmarks' | 'about'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('Todos');
  const [selectedManga, setSelectedManga] = useState<Manga | null>(null);
  const [readingState, setReadingState] = useState<{ manga: Manga; chapter: Chapter; initialPage?: number } | null>(null);
  
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('mangator_bookmarks');
    return saved ? JSON.parse(saved) : ['choju-giga'];
  });

  const [readingHistory, setReadingHistory] = useState<ReadingProgress | null>(() => {
    const saved = localStorage.getItem('mangator_history');
    if (saved) return JSON.parse(saved);
    return {
      mangaId: 'choju-giga',
      mangaTitle: 'Chōjū-jinbutsu-giga (Pergaminhos dos Animais)',
      mangaCover: '/manga/choju_cover.jpg',
      chapterId: 'choju-ch-1',
      chapterNumber: 1,
      chapterTitle: 'Pergaminho 1: O Sumô dos Sapos e Coelhos & As Festas dos Bichos',
      pageIndex: 0,
      totalPages: 5,
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
            
            {/* Kingofshojo Structure 1: Hero Swiper Banner */}
            {activeTab === 'catalog' && searchQuery === '' && selectedGenre === 'Todos' && (
              <HeroSlider
                featuredMangaList={MANGA_DATA}
                onSelectManga={(m) => setSelectedManga(m)}
                onStartReading={(m) => setReadingState({ manga: m, chapter: m.chapters[0], initialPage: 0 })}
              />
            )}

            {/* Kingofshojo Structure 2: Fast Genres Ribbon */}
            {activeTab === 'catalog' && searchQuery === '' && (
              <GenreRibbon
                genres={allGenres.filter(g => g !== 'Todos')}
                selectedGenre={selectedGenre}
                onSelectGenre={(g) => setSelectedGenre(selectedGenre === g ? 'Todos' : g)}
                onResetGenre={() => { setSelectedGenre('Todos'); setSearchQuery(''); }}
              />
            )}

            {/* Kingofshojo Structure 3: Popular Today Carousel */}
            {activeTab === 'catalog' && searchQuery === '' && selectedGenre === 'Todos' && (
              <PopularToday
                mangaList={MANGA_DATA}
                onSelectManga={(m) => setSelectedManga(m)}
              />
            )}

            {/* Kingofshojo Structure 4 & 5: Main 2-Column Portal Layout */}
            <div className="portal-layout">
              {/* Left Column: Latest Updates & Catalog Releases (.postbody) */}
              <div className="postbody">
                <div className="releases-header">
                  <h2>
                    <span>{activeTab === 'bookmarks' ? 'Meus Favoritos' : 'Últimos Lançamentos'}</span>
                    <span style={{
                      fontSize: '0.75rem',
                      color: 'var(--accent-emerald)',
                      backgroundColor: 'rgba(0, 245, 160, 0.12)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: 700
                    }}>
                      {filteredManga.length} {filteredManga.length === 1 ? 'série' : 'séries'}
                    </span>
                  </h2>

                  {selectedGenre !== 'Todos' && (
                    <span
                      onClick={() => setSelectedGenre('Todos')}
                      className="vl-link"
                    >
                      Limpar filtro: {selectedGenre} ✕
                    </span>
                  )}
                </div>

                {/* Manga Cards Grid with Stylefiv Chapter rows */}
                {filteredManga.length > 0 ? (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '2rem'
                  }}>
                    {filteredManga.map((manga) => (
                      <MangaCard
                        key={manga.id}
                        manga={manga}
                        onSelect={(m) => setSelectedManga(m)}
                        isBookmarked={bookmarks.includes(manga.id)}
                        onToggleBookmark={(id, e) => toggleBookmark(id, e)}
                        onSelectChapter={(m, chapter) => setReadingState({ manga: m, chapter, initialPage: 0 })}
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

                {/* Portfolio Info Pill */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 18px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '10px',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)'
                }}>
                  <Sparkles size={16} color="#00F5A0" />
                  <span>
                    Todas as páginas são scans reais restauradas para proporcionar uma experiência fiel e autêntica de leitura contínua.
                  </span>
                </div>
              </div>

              {/* Right Column: Sidebar with Popular Rankings & History */}
              <Sidebar
                mangaList={MANGA_DATA}
                onSelectManga={(m) => setSelectedManga(m)}
                readingHistory={readingHistory}
                onResumeReading={(progress) => {
                  const targetManga = MANGA_DATA.find((m) => m.id === progress.mangaId);
                  if (targetManga) {
                    const targetChapter = targetManga.chapters.find((c) => c.id === progress.chapterId) || targetManga.chapters[0];
                    setReadingState({
                      manga: targetManga,
                      chapter: targetChapter,
                      initialPage: progress.pageIndex
                    });
                  }
                }}
              />
            </div>
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
