import React, { useState, useMemo, useEffect } from 'react';
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
import { Bookmark, Sparkles, Loader2, Zap, Flame, LayoutGrid, List } from 'lucide-react';
import { fetchOnlineManga, fetchOnlineChapters, fetchOnlineChapterPages } from './services/onlineMangaService';

export function App() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'bookmarks' | 'about'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('Todos');
  const [selectedManga, setSelectedManga] = useState<Manga | null>(null);
  const [readingState, setReadingState] = useState<{ manga: Manga; chapter: Chapter; initialPage?: number } | null>(null);
  const [isLoadingChapters, setIsLoadingChapters] = useState(false);
  const [isLoadingPages, setIsLoadingPages] = useState(false);

  // MODO 2: Alterna entre Acervo Histórico e Conexão com Banco de Mangás Online (MangaFire Live)
  const [isMode2, setIsMode2] = useState<boolean>(() => {
    return localStorage.getItem('mangator_mode2') === 'true';
  });
  const [onlineMangaList, setOnlineMangaList] = useState<Manga[]>([]);
  const [isLoadingOnline, setIsLoadingOnline] = useState(false);
  const [timeframe, setTimeframe] = useState<1 | 7 | 30 | 365>(1);
  const [mangaTypeFilter, setMangaTypeFilter] = useState<'all' | 'manga' | 'manhwa' | 'manhua'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'rows'>('grid');

  const toggleMode2 = () => {
    setIsMode2((prev) => {
      const next = !prev;
      localStorage.setItem('mangator_mode2', String(next));
      return next;
    });
  };

  // Carrega catálogo online quando Modo 2 estiver ativo ou quando o usuário pesquisar ou alternar filtros
  useEffect(() => {
    if (!isMode2) return;
    let isMounted = true;
    setIsLoadingOnline(true);
    fetchOnlineManga(
      searchQuery,
      timeframe,
      mangaTypeFilter === 'all' ? undefined : mangaTypeFilter
    ).then((results) => {
      if (isMounted) {
        setOnlineMangaList(results);
        setIsLoadingOnline(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [isMode2, searchQuery, timeframe, mangaTypeFilter]);
  
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

  // Active dataset depends on Mode
  const activeDataset = isMode2 ? onlineMangaList : MANGA_DATA;

  // Extract all unique genres
  const allGenres = useMemo(() => {
    const genres = new Set<string>();
    activeDataset.forEach((m) => m.genres.forEach((g) => genres.add(g)));
    return ['Todos', ...Array.from(genres)];
  }, [activeDataset]);

  // Filtered manga list
  const filteredManga = useMemo(() => {
    return activeDataset.filter((m) => {
      if (activeTab === 'bookmarks' && !bookmarks.includes(m.id)) {
        return false;
      }
      if (isMode2) {
        if (mangaTypeFilter !== 'all' && m.mangaType && m.mangaType !== mangaTypeFilter) {
          return false;
        }
        if (searchQuery.trim() !== '') {
          const query = searchQuery.toLowerCase();
          const matchTitle = m.title.toLowerCase().includes(query);
          const matchSlug = m.slug?.toLowerCase().includes(query);
          return matchTitle || matchSlug;
        }
      } else {
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
      }
      return true;
    });
  }, [activeDataset, activeTab, bookmarks, selectedGenre, searchQuery, isMode2, mangaTypeFilter]);

  // Handler to open Manga details (fetches chapters if online)
  const handleSelectManga = async (manga: Manga) => {
    setSelectedManga(manga);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (isMode2) {
      const hasRealChapters = manga.chapters.some(
        (c) => !c.id.startsWith('mf-ch-') && !c.id.startsWith('ch-default')
      );
      if (!hasRealChapters) {
        setIsLoadingChapters(true);
        try {
          const fetchedChapters = await fetchOnlineChapters(manga);
          if (fetchedChapters && fetchedChapters.length > 0) {
            const updatedManga: Manga = { ...manga, chapters: fetchedChapters };
            setSelectedManga(updatedManga);
            setOnlineMangaList((prev) =>
              prev.map((m) => (m.id === manga.id ? updatedManga : m))
            );
          }
        } catch (e) {
          console.error('Falha ao sincronizar capítulos reais:', e);
        } finally {
          setIsLoadingChapters(false);
        }
      }
    }
  };

  // Handler to open reader on chapter (fetches page scans if online)
  const handleStartReading = async (manga: Manga, chapter: Chapter) => {
    if (!chapter.pages || chapter.pages.length === 0) {
      setIsLoadingPages(true);
      try {
        const pages = await fetchOnlineChapterPages(manga, chapter);
        const filledChapter: Chapter = { ...chapter, pages, pagesCount: pages.length };
        const updatedManga: Manga = {
          ...manga,
          chapters: manga.chapters.map((c) => (c.id === chapter.id ? filledChapter : c))
        };
        setSelectedManga(updatedManga);
        setReadingState({ manga: updatedManga, chapter: filledChapter, initialPage: 0 });
      } catch (err) {
        console.error('Falha ao abrir leitor com scans reais:', err);
      } finally {
        setIsLoadingPages(false);
      }
    } else {
      setReadingState({ manga, chapter, initialPage: 0 });
    }
  };

  const handleNextChapter = async () => {
    if (!readingState) return;
    const { manga, chapter } = readingState;
    const currentIndex = manga.chapters.findIndex((c) => c.id === chapter.id);
    if (currentIndex < manga.chapters.length - 1) {
      const nextCh = manga.chapters[currentIndex + 1];
      await handleStartReading(manga, nextCh);
    }
  };

  const handlePrevChapter = async () => {
    if (!readingState) return;
    const { manga, chapter } = readingState;
    const currentIndex = manga.chapters.findIndex((c) => c.id === chapter.id);
    if (currentIndex > 0) {
      const prevCh = manga.chapters[currentIndex - 1];
      await handleStartReading(manga, prevCh);
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
      {/* Loading Overlay when fetching pages */}
      {(isLoadingPages || isLoadingChapters) && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(5, 8, 14, 0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px'
        }}>
          <Loader2 size={38} color="#C084FC" className="animate-spin" />
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.05rem' }}>
            {isLoadingPages ? 'Carregando páginas do capítulo online...' : 'Buscando lista de capítulos no banco online...'}
          </div>
          <div style={{ color: '#C084FC', fontSize: '0.8rem' }}>
            Requisição em tempo real via MangaFire/API Network
          </div>
        </div>
      )}

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
        isMode2={isMode2}
        onToggleMode2={toggleMode2}
      />

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        {/* Banner Indicativo de Modo */}
        {isMode2 && (
          <div style={{
            backgroundColor: 'rgba(168, 85, 247, 0.12)',
            borderBottom: '1px solid rgba(168, 85, 247, 0.3)',
            padding: '8px 1.5rem',
            textAlign: 'center',
            fontSize: '0.82rem',
            color: '#E9D5FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <Zap size={14} color="#C084FC" />
            <span>
              <strong>MODO 2 ATIVADO:</strong> Conexão e requisições online em tempo real ativas! Pesquise qualquer obra como <em>One Piece, Berserk, Frieren, Solo Leveling</em>. Clique no ícone do mascote para retornar ao Modo 1.
            </span>
          </div>
        )}

        {selectedManga ? (
          <MangaDetail
            manga={selectedManga}
            onBack={() => setSelectedManga(null)}
            onStartReading={(chapter) => handleStartReading(selectedManga, chapter)}
            isBookmarked={bookmarks.includes(selectedManga.id)}
            onToggleBookmark={(id) => toggleBookmark(id)}
            isLoadingChapters={isLoadingChapters}
          />
        ) : (
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '1.5rem 1.5rem 5rem' }}>
            {/* Loading indicator for Mode 2 items */}
            {isLoadingOnline && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '1.5rem',
                color: '#C084FC',
                fontWeight: 600
              }}>
                <Loader2 size={20} className="animate-spin" />
                <span>Conectando e extraindo catálogo online...</span>
              </div>
            )}

            {/* MODO 2: Seção MangaFire Trending (Em Alta) */}
            {isMode2 && activeTab === 'catalog' && searchQuery === '' && (
              <div style={{ marginBottom: '2.5rem' }}>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  marginBottom: '1.25rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid rgba(168, 85, 247, 0.25)'
                }}>
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      color: '#C084FC',
                      textTransform: 'uppercase',
                      marginBottom: '4px'
                    }}>
                      <Flame size={14} color="#F97316" fill="#F97316" />
                      <span>TRENDING NOW • MANGAFIRE LIVE</span>
                    </div>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff', margin: 0 }}>
                      Tendências em Tempo Real
                    </h2>
                  </div>

                  {/* Timeframe Segment Switcher */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    padding: '4px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    gap: '2px'
                  }}>
                    {[
                      { id: 1, label: 'Hoje' },
                      { id: 7, label: 'Semana' },
                      { id: 30, label: 'Mês' },
                      { id: 365, label: 'Geral' }
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTimeframe(t.id as any)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: 'var(--radius-full)',
                          border: 'none',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          backgroundColor: timeframe === t.id ? '#9333EA' : 'transparent',
                          color: timeframe === t.id ? '#fff' : 'var(--text-secondary)',
                          transition: 'all 0.2s ease',
                          boxShadow: timeframe === t.id ? '0 2px 10px rgba(147, 51, 234, 0.5)' : 'none'
                        }}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trending Horizontal Cards Track */}
                {filteredManga.length > 0 && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '1.25rem'
                  }}>
                    {filteredManga.slice(0, 6).map((manga) => (
                      <MangaCard
                        key={`trending-${manga.id}`}
                        manga={manga}
                        onSelect={(m) => handleSelectManga(m)}
                        isBookmarked={bookmarks.includes(manga.id)}
                        onToggleBookmark={(id, e) => toggleBookmark(id, e)}
                        onSelectChapter={(m, chapter) => handleStartReading(m, chapter)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* MODO 1: Kingofshojo Structure (Hero, Ribbon, Popular Today) */}
            {!isMode2 && activeTab === 'catalog' && searchQuery === '' && selectedGenre === 'Todos' && (
              <HeroSlider
                featuredMangaList={activeDataset}
                onSelectManga={(m) => handleSelectManga(m)}
                onStartReading={(m) => {
                  if (m.chapters.length > 0) {
                    handleStartReading(m, m.chapters[0]);
                  } else {
                    handleSelectManga(m);
                  }
                }}
              />
            )}

            {!isMode2 && activeTab === 'catalog' && searchQuery === '' && (
              <GenreRibbon
                genres={allGenres.filter(g => g !== 'Todos')}
                selectedGenre={selectedGenre}
                onSelectGenre={(g) => setSelectedGenre(selectedGenre === g ? 'Todos' : g)}
                onResetGenre={() => { setSelectedGenre('Todos'); setSearchQuery(''); }}
              />
            )}

            {!isMode2 && activeTab === 'catalog' && searchQuery === '' && selectedGenre === 'Todos' && (
              <PopularToday
                mangaList={activeDataset}
                onSelectManga={(m) => handleSelectManga(m)}
              />
            )}

            {/* Main 2-Column Portal Layout */}
            <div className="portal-layout">
              {/* Left Column: Latest Updates & Catalog Releases (.postbody) */}
              <div className="postbody">
                <div className="releases-header" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      color: isMode2 ? '#C084FC' : 'var(--accent-emerald)',
                      textTransform: 'uppercase',
                      marginBottom: '2px'
                    }}>
                      {isMode2 ? 'FRESH CHAPTERS • MANGAFIRE' : 'OBRAS RESTAURADAS'}
                    </div>
                    <h2 style={{ margin: 0 }}>
                      <span>{activeTab === 'bookmarks' ? 'Meus Favoritos' : isMode2 ? 'Todos os Lançamentos' : 'Últimos Lançamentos'}</span>
                      <span style={{
                        fontSize: '0.75rem',
                        color: isMode2 ? '#C084FC' : 'var(--accent-emerald)',
                        backgroundColor: isMode2 ? 'rgba(168, 85, 247, 0.15)' : 'rgba(0, 245, 160, 0.12)',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: 700,
                        marginLeft: '8px'
                      }}>
                        {filteredManga.length} {filteredManga.length === 1 ? 'série' : 'séries'}
                      </span>
                    </h2>
                  </div>

                  {/* Mode 2 Controls: Type Filter & Dual View Mode */}
                  {isMode2 ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      {/* Type Filter Pills */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        padding: '3px',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid rgba(255, 255, 255, 0.08)'
                      }}>
                        {[
                          { id: 'all', label: 'Todos' },
                          { id: 'manga', label: 'Mangá' },
                          { id: 'manhwa', label: 'Manhwa' },
                          { id: 'manhua', label: 'Manhua' }
                        ].map((t) => (
                          <button
                            key={t.id}
                            onClick={() => setMangaTypeFilter(t.id as any)}
                            style={{
                              padding: '4px 12px',
                              borderRadius: 'var(--radius-full)',
                              border: 'none',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              backgroundColor: mangaTypeFilter === t.id ? '#9333EA' : 'transparent',
                              color: mangaTypeFilter === t.id ? '#fff' : 'var(--text-secondary)',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>

                      {/* View Mode Toggle: Grid vs Rows */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        padding: '3px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.08)'
                      }}>
                        <button
                          onClick={() => setViewMode('grid')}
                          title="Visualização em Grade"
                          style={{
                            padding: '6px',
                            borderRadius: '6px',
                            border: 'none',
                            backgroundColor: viewMode === 'grid' ? 'rgba(168, 85, 247, 0.3)' : 'transparent',
                            color: viewMode === 'grid' ? '#C084FC' : 'var(--text-muted)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <LayoutGrid size={16} />
                        </button>
                        <button
                          onClick={() => setViewMode('rows')}
                          title="Visualização em Linhas (MangaFire Row Cards)"
                          style={{
                            padding: '6px',
                            borderRadius: '6px',
                            border: 'none',
                            backgroundColor: viewMode === 'rows' ? 'rgba(168, 85, 247, 0.3)' : 'transparent',
                            color: viewMode === 'rows' ? '#C084FC' : 'var(--text-muted)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <List size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    selectedGenre !== 'Todos' && (
                      <span
                        onClick={() => setSelectedGenre('Todos')}
                        className="vl-link"
                      >
                        Limpar filtro: {selectedGenre} ✕
                      </span>
                    )
                  )}
                </div>

                {/* Manga Cards: Grid Mode or Row Mode */}
                {filteredManga.length > 0 ? (
                  isMode2 && viewMode === 'rows' ? (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      marginBottom: '2rem'
                    }}>
                      {filteredManga.map((manga) => (
                        <MangaCard
                          key={manga.id}
                          manga={manga}
                          isRowView={true}
                          onSelect={(m) => handleSelectManga(m)}
                          isBookmarked={bookmarks.includes(manga.id)}
                          onToggleBookmark={(id, e) => toggleBookmark(id, e)}
                          onSelectChapter={(m, chapter) => handleStartReading(m, chapter)}
                        />
                      ))}
                    </div>
                  ) : (
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
                          isRowView={false}
                          onSelect={(m) => handleSelectManga(m)}
                          isBookmarked={bookmarks.includes(manga.id)}
                          onToggleBookmark={(id, e) => toggleBookmark(id, e)}
                          onSelectChapter={(m, chapter) => handleStartReading(m, chapter)}
                        />
                      ))}
                    </div>
                  )
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
                  {isMode2 ? <Zap size={16} color="#C084FC" /> : <Sparkles size={16} color="#00F5A0" />}
                  <span>
                    {isMode2
                      ? 'Conexão viva com a rede de mangás online ativa. Requisições e leitura acontecem em tempo real.'
                      : 'Todas as páginas são scans reais restauradas para proporcionar uma experiência fiel e autêntica de leitura contínua.'}
                  </span>
                </div>
              </div>

              {/* Right Column: Sidebar with Popular Rankings & History */}
              <Sidebar
                mangaList={activeDataset}
                onSelectManga={(m) => handleSelectManga(m)}
                readingHistory={readingHistory}
                onResumeReading={(progress) => {
                  const targetManga = activeDataset.find((m) => m.id === progress.mangaId) || MANGA_DATA.find((m) => m.id === progress.mangaId);
                  if (targetManga) {
                    const targetChapter = targetManga.chapters.find((c) => c.id === progress.chapterId) || targetManga.chapters[0];
                    if (targetChapter) {
                      handleStartReading(targetManga, targetChapter);
                    } else {
                      handleSelectManga(targetManga);
                    }
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
              src="/brand/logo.jpg"
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
