import React, { useState, useEffect, useRef } from 'react';
import type { Manga, Chapter } from '../data/mangaData';
import { ChapterCommentsModal } from './ChapterCommentsModal';
import { downloadChapterZip } from '../utils/downloader';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  Sliders,
  Columns,
  Square,
  Scroll,
  HelpCircle,
  X,
  Sparkles,
  MessageSquare,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReaderProps {
  manga: Manga;
  chapter: Chapter;
  initialPage?: number;
  onBackToManga: () => void;
  onNextChapter?: () => void;
  onPrevChapter?: () => void;
  hasPrevChapter: boolean;
  hasNextChapter: boolean;
  onUpdateProgress: (pageIndex: number, totalPages: number) => void;
}

type ReadingMode = 'webtoon' | 'single' | 'double';
type BackgroundTheme = 'black' | 'dark' | 'sepia';

export const Reader: React.FC<ReaderProps> = ({
  manga,
  chapter,
  initialPage = 0,
  onBackToManga,
  onNextChapter,
  onPrevChapter,
  hasPrevChapter,
  hasNextChapter,
  onUpdateProgress
}) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [readingMode, setReadingMode] = useState<ReadingMode>('single');
  const [theme, setTheme] = useState<BackgroundTheme>('black');
  const [brightness, setBrightness] = useState<number>(100);
  const [readerWidth, setReaderWidth] = useState<number>(850);
  const [invertColors, setInvertColors] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [controlsVisible, setControlsVisible] = useState<boolean>(true);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showShortcuts, setShowShortcuts] = useState<boolean>(false);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [, setIsDownloading] = useState<boolean>(false);
  const [commentsList, setCommentsList] = useState(chapter.comments || []);

  const containerRef = useRef<HTMLDivElement>(null);
  const totalPages = chapter.pages.length;

  // Persist reading progress
  useEffect(() => {
    onUpdateProgress(currentPage, totalPages);
  }, [currentPage, totalPages]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  };

  const handleChapterFinished = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#00F5A0', '#10B981', '#FFFFFF']
    });
  };

  const goToNextPage = () => {
    if (readingMode === 'double') {
      if (currentPage + 2 < totalPages) {
        setCurrentPage((p) => p + 2);
      } else if (currentPage + 1 < totalPages) {
        setCurrentPage((p) => p + 1);
      } else {
        handleChapterFinished();
      }
    } else {
      if (currentPage + 1 < totalPages) {
        setCurrentPage((p) => p + 1);
      } else {
        handleChapterFinished();
      }
    }
  };

  const goToPrevPage = () => {
    if (readingMode === 'double') {
      if (currentPage >= 2) {
        setCurrentPage((p) => p - 2);
      } else {
        setCurrentPage(0);
      }
    } else {
      if (currentPage > 0) {
        setCurrentPage((p) => p - 1);
      }
    }
  };

  const handleDownloadChapter = async () => {
    setIsDownloading(true);
    try {
      await downloadChapterZip(manga.title, chapter.number, chapter.pages);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleAddComment = (text: string, isSpoiler: boolean) => {
    const newComment = {
      id: `comm-${Date.now()}`,
      userName: 'Você (Leitor)',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      date: 'Agora mesmo',
      text,
      likes: 0,
      isSpoiler
    };
    setCommentsList([newComment, ...commentsList]);
  };

  // Keyboard navigation & shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showComments) return;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        goToPrevPage();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'h' || e.key === 'H') {
        setControlsVisible((prev) => !prev);
      } else if (e.key === 'i' || e.key === 'I') {
        setInvertColors((prev) => !prev);
      } else if (e.key === 'Escape') {
        if (showSettings) setShowSettings(false);
        if (showShortcuts) setShowShortcuts(false);
        if (showComments) setShowComments(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, readingMode, totalPages, showSettings, showShortcuts, showComments]);

  const getThemeBackground = () => {
    if (theme === 'black') return '#000000';
    if (theme === 'dark') return '#10141D';
    return '#EAE3D2';
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: getThemeBackground(),
        color: theme === 'sepia' ? '#2B231C' : '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'background-color 0.3s ease'
      }}
    >
      {/* Top Floating Control Bar */}
      <header style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'linear-gradient(180deg, rgba(8, 10, 15, 0.95) 0%, rgba(8, 10, 15, 0) 100%)',
        padding: '1rem 1.5rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        opacity: controlsVisible ? 1 : 0,
        pointerEvents: controlsVisible ? 'auto' : 'none',
        transition: 'opacity 0.25s ease'
      }}>
        {/* Back and Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onBackToManga}
            className="glow-btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.82rem', backgroundColor: 'rgba(0,0,0,0.6)' }}
          >
            <ArrowLeft size={16} />
            <span>Voltar</span>
          </button>

          <div>
            <h2 style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: '#fff',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {manga.title}
              <span style={{
                fontSize: '0.72rem',
                backgroundColor: 'rgba(0, 245, 160, 0.15)',
                color: '#00F5A0',
                border: '1px solid rgba(0, 245, 160, 0.3)',
                padding: '2px 8px',
                borderRadius: '6px'
              }}>
                Capítulo {chapter.number}
              </span>
            </h2>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
              {chapter.title}
            </p>
          </div>
        </div>

        {/* Reader Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Mode Selector */}
          <div style={{
            display: 'flex',
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '3px'
          }}>
            <button
              onClick={() => setReadingMode('webtoon')}
              title="Cascata Vertical (Webtoon)"
              style={{
                padding: '6px 10px',
                border: 'none',
                borderRadius: '6px',
                backgroundColor: readingMode === 'webtoon' ? '#00F5A0' : 'transparent',
                color: readingMode === 'webtoon' ? '#000' : '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.75rem',
                fontWeight: 600
              }}
            >
              <Scroll size={14} />
              <span>Cascata</span>
            </button>

            <button
              onClick={() => setReadingMode('single')}
              title="Página Única"
              style={{
                padding: '6px 10px',
                border: 'none',
                borderRadius: '6px',
                backgroundColor: readingMode === 'single' ? '#00F5A0' : 'transparent',
                color: readingMode === 'single' ? '#000' : '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.75rem',
                fontWeight: 600
              }}
            >
              <Square size={14} />
              <span>Única</span>
            </button>

            <button
              onClick={() => setReadingMode('double')}
              title="Página Dupla (Manga Tradicional RTL)"
              style={{
                padding: '6px 10px',
                border: 'none',
                borderRadius: '6px',
                backgroundColor: readingMode === 'double' ? '#00F5A0' : 'transparent',
                color: readingMode === 'double' ? '#000' : '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.75rem',
                fontWeight: 600
              }}
            >
              <Columns size={14} />
              <span>Dupla RTL</span>
            </button>
          </div>

          {/* Comments Button */}
          <button
            onClick={() => setShowComments(true)}
            className="glow-btn-secondary"
            title="Comentários da Comunidade"
            style={{ padding: '8px 12px', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <MessageSquare size={15} color="#00F5A0" />
            <span style={{ fontSize: '0.75rem' }}>{commentsList.length}</span>
          </button>

          {/* Download Chapter */}
          <button
            onClick={handleDownloadChapter}
            className="glow-btn-secondary"
            title="Baixar Capítulo Completo em ZIP"
            style={{ padding: '8px 12px', backgroundColor: 'rgba(0,0,0,0.6)' }}
          >
            <Download size={16} />
          </button>

          {/* Settings Drawer Toggle */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="glow-btn-secondary"
            title="Ajustes de Leitura"
            style={{ padding: '8px 12px', backgroundColor: 'rgba(0,0,0,0.6)' }}
          >
            <Sliders size={16} />
          </button>

          {/* Shortcuts Info */}
          <button
            onClick={() => setShowShortcuts(true)}
            className="glow-btn-secondary"
            title="Atalhos do Teclado"
            style={{ padding: '8px 12px', backgroundColor: 'rgba(0,0,0,0.6)' }}
          >
            <HelpCircle size={16} />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="glow-btn-secondary"
            title="Tela Cheia (F)"
            style={{ padding: '8px 12px', backgroundColor: 'rgba(0,0,0,0.6)' }}
          >
            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
          </button>
        </div>
      </header>

      {/* Main Canvas / Reading Container */}
      <div
        onClick={() => setControlsVisible((prev) => !prev)}
        style={{
          flex: 1,
          overflowY: readingMode === 'webtoon' ? 'auto' : 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: readingMode === 'webtoon' ? 'flex-start' : 'center',
          padding: readingMode === 'webtoon' ? '80px 1rem 120px' : '60px 1rem 90px',
          filter: `brightness(${brightness}%) ${invertColors ? 'invert(1) hue-rotate(180deg)' : ''}`,
          cursor: readingMode === 'webtoon' ? 'default' : 'pointer',
          transition: 'filter 0.2s ease'
        }}
      >
        {/* Webtoon Mode */}
        {readingMode === 'webtoon' && (
          <div style={{
            maxWidth: `${readerWidth}px`,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            margin: '0 auto'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            {chapter.pages.map((pageUrl, idx) => (
              <div key={idx} style={{
                position: 'relative',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                lineHeight: 0
              }}>
                <img
                  src={pageUrl}
                  alt={`Página ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                  loading="lazy"
                />
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: '#fff',
                  fontSize: '0.7rem',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>
                  {idx + 1} / {totalPages}
                </div>
              </div>
            ))}

            {/* End of Chapter Card */}
            <div style={{
              textAlign: 'center',
              padding: '3rem 1.5rem',
              marginTop: '2rem',
              border: '1px dashed rgba(255,255,255,0.2)',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'rgba(255,255,255,0.02)'
            }}>
              <Sparkles size={32} color="#00F5A0" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ color: '#fff', marginBottom: '8px' }}>Fim do Capítulo {chapter.number}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Você concluiu a leitura deste capítulo em alta definição.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                {hasPrevChapter && onPrevChapter && (
                  <button
                    onClick={onPrevChapter}
                    className="glow-btn-secondary"
                  >
                    ← Capítulo Anterior
                  </button>
                )}
                {hasNextChapter ? (
                  <button
                    onClick={onNextChapter}
                    className="glow-btn-primary"
                    style={{ padding: '12px 24px' }}
                  >
                    Próximo Capítulo →
                  </button>
                ) : (
                  <button
                    onClick={onBackToManga}
                    className="glow-btn-secondary"
                  >
                    Voltar à Obra
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Single Page Mode */}
        {readingMode === 'single' && (
          <div
            style={{
              maxWidth: `${readerWidth * zoomLevel}px`,
              maxHeight: '85vh',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'max-width 0.2s ease'
            }}
            onClick={(e) => {
              e.stopPropagation();
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              if (clickX > rect.width / 2) {
                goToNextPage();
              } else {
                goToPrevPage();
              }
            }}
          >
            <img
              src={chapter.pages[currentPage]}
              alt={`Página ${currentPage + 1}`}
              referrerPolicy="no-referrer"
              style={{
                maxWidth: '100%',
                maxHeight: '85vh',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.06)'
              }}
            />
          </div>
        )}

        {/* Double Page Mode (Japanese Manga RTL Simulation) */}
        {readingMode === 'double' && (
          <div
            style={{
              maxWidth: `${Math.min(readerWidth * 1.5 * zoomLevel, 1500)}px`,
              maxHeight: '85vh',
              display: 'flex',
              justifyContent: 'center',
              gap: '4px',
              position: 'relative'
            }}
            onClick={(e) => {
              e.stopPropagation();
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              if (clickX < rect.width / 2) {
                goToNextPage();
              } else {
                goToPrevPage();
              }
            }}
          >
            {currentPage + 1 < totalPages ? (
              <img
                src={chapter.pages[currentPage + 1]}
                alt={`Página ${currentPage + 2}`}
                referrerPolicy="no-referrer"
                style={{
                  maxHeight: '85vh',
                  maxWidth: '48%',
                  objectFit: 'contain',
                  borderRadius: '4px 0 0 4px',
                  boxShadow: '-10px 10px 30px rgba(0,0,0,0.7)',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}
              />
            ) : (
              <div style={{
                width: '450px',
                height: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255,255,255,0.02)',
                borderRadius: '4px 0 0 4px',
                color: 'var(--text-muted)'
              }}>
                Fim do capítulo
              </div>
            )}

            <img
              src={chapter.pages[currentPage]}
              alt={`Página ${currentPage + 1}`}
              referrerPolicy="no-referrer"
              style={{
                maxHeight: '85vh',
                maxWidth: '48%',
                objectFit: 'contain',
                borderRadius: '0 4px 4px 0',
                boxShadow: '10px 10px 30px rgba(0,0,0,0.7)',
                border: '1px solid rgba(255,255,255,0.06)'
              }}
            />
          </div>
        )}
      </div>

      {/* Floating Bottom Nav Controls */}
      <footer style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'linear-gradient(0deg, rgba(8, 10, 15, 0.95) 0%, rgba(8, 10, 15, 0) 100%)',
        padding: '2rem 1.5rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        opacity: controlsVisible ? 1 : 0,
        pointerEvents: controlsVisible ? 'auto' : 'none',
        transition: 'opacity 0.25s ease'
      }}>
        {readingMode !== 'webtoon' && (
          <div style={{
            width: '100%',
            maxWidth: '650px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 0}
              style={{
                background: 'rgba(0,0,0,0.6)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: currentPage === 0 ? 'rgba(255,255,255,0.3)' : '#fff',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: currentPage === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              <ChevronLeft size={20} />
            </button>

            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="range"
                min={0}
                max={totalPages - 1}
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#00F5A0', cursor: 'pointer' }}
              />
              <span style={{
                fontSize: '0.8rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                color: '#fff',
                minWidth: '55px',
                textAlign: 'right'
              }}>
                {currentPage + 1} / {totalPages}
              </span>
            </div>

            <button
              onClick={goToNextPage}
              disabled={currentPage >= totalPages - 1}
              style={{
                background: 'rgba(0,0,0,0.6)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: currentPage >= totalPages - 1 ? 'rgba(255,255,255,0.3)' : '#fff',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: currentPage >= totalPages - 1 ? 'not-allowed' : 'pointer'
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* Thumbnail Preview strip */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          maxWidth: '850px',
          padding: '4px'
        }}>
          {chapter.pages.map((p, idx) => (
            <div
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentPage(idx);
              }}
              style={{
                width: '42px',
                height: '60px',
                borderRadius: '4px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: currentPage === idx ? '2px solid #00F5A0' : '1px solid rgba(255,255,255,0.2)',
                opacity: currentPage === idx ? 1 : 0.5,
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
            >
              <img src={p} alt={`Thumb ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </footer>

      {/* Settings Modal Drawer */}
      {showSettings && (
        <div style={{
          position: 'absolute',
          top: '75px',
          right: '20px',
          zIndex: 60,
          width: '320px',
          backgroundColor: '#121722',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
          padding: '1.25rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700 }}>Ajustes do Leitor</h4>
            <button
              onClick={() => setShowSettings(false)}
              style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Invert Colors (OLED Night Reading) */}
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.8rem',
              color: '#fff',
              cursor: 'pointer',
              padding: '8px 10px',
              backgroundColor: 'rgba(255,255,255,0.04)',
              borderRadius: '6px'
            }}>
              <span>Inverter Cores (Modo Escuro P&B)</span>
              <input
                type="checkbox"
                checked={invertColors}
                onChange={(e) => setInvertColors(e.target.checked)}
                style={{ accentColor: '#00F5A0' }}
              />
            </label>
          </div>

          {/* Zoom Level */}
          <div style={{ marginBottom: '1.2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>ZOOM DA PÁGINA</label>
              <span style={{ fontSize: '0.78rem', color: '#fff' }}>{Math.round(zoomLevel * 100)}%</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
                className="glow-btn-secondary"
                style={{ padding: '6px 12px', flex: 1, justifyContent: 'center' }}
              >
                <ZoomOut size={14} />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="glow-btn-secondary"
                style={{ padding: '6px 12px' }}
                title="Resetar Zoom"
              >
                <RotateCcw size={14} />
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.min(1.5, z + 0.1))}
                className="glow-btn-secondary"
                style={{ padding: '6px 12px', flex: 1, justifyContent: 'center' }}
              >
                <ZoomIn size={14} />
              </button>
            </div>
          </div>

          {/* Theme background */}
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
              TEMA DE FUNDO
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              <button
                onClick={() => setTheme('black')}
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  border: theme === 'black' ? '2px solid #00F5A0' : '1px solid rgba(255,255,255,0.1)',
                  backgroundColor: '#000',
                  color: '#fff',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                Preto Puro
              </button>
              <button
                onClick={() => setTheme('dark')}
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  border: theme === 'dark' ? '2px solid #00F5A0' : '1px solid rgba(255,255,255,0.1)',
                  backgroundColor: '#10141D',
                  color: '#fff',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                Grafite
              </button>
              <button
                onClick={() => setTheme('sepia')}
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  border: theme === 'sepia' ? '2px solid #00F5A0' : '1px solid rgba(255,255,255,0.1)',
                  backgroundColor: '#EAE3D2',
                  color: '#2B231C',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                Sépia Papel
              </button>
            </div>
          </div>

          {/* Reader Width */}
          <div style={{ marginBottom: '1.2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>LARGURA MÁXIMA</label>
              <span style={{ fontSize: '0.78rem', color: '#fff' }}>{readerWidth}px</span>
            </div>
            <input
              type="range"
              min={600}
              max={1200}
              step={50}
              value={readerWidth}
              onChange={(e) => setReaderWidth(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#00F5A0', cursor: 'pointer' }}
            />
          </div>

          {/* Brightness */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>BRILHO DAS PÁGINAS</label>
              <span style={{ fontSize: '0.78rem', color: '#fff' }}>{brightness}%</span>
            </div>
            <input
              type="range"
              min={40}
              max={100}
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#00F5A0', cursor: 'pointer' }}
            />
          </div>
        </div>
      )}

      {/* Chapter Comments Modal */}
      <ChapterCommentsModal
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        chapterNumber={chapter.number}
        comments={commentsList}
        onAddComment={handleAddComment}
      />

      {/* Keyboard Shortcuts Modal */}
      {showShortcuts && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          backgroundColor: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={() => setShowShortcuts(false)}
        >
          <div
            style={{
              backgroundColor: '#11151F',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 'var(--radius-md)',
              padding: '2rem',
              maxWidth: '400px',
              width: '90%',
              boxShadow: '0 25px 50px rgba(0,0,0,0.9)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700 }}>Atalhos do Teclado</h3>
              <button
                onClick={() => setShowShortcuts(false)}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Próxima Página</span>
                <kbd style={{ background: '#1E293B', padding: '2px 8px', borderRadius: '4px', color: '#00F5A0' }}>→ ou D</kbd>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Página Anterior</span>
                <kbd style={{ background: '#1E293B', padding: '2px 8px', borderRadius: '4px', color: '#00F5A0' }}>← ou A</kbd>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Inverter Cores</span>
                <kbd style={{ background: '#1E293B', padding: '2px 8px', borderRadius: '4px', color: '#00F5A0' }}>I</kbd>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Ocultar/Mostrar Controles</span>
                <kbd style={{ background: '#1E293B', padding: '2px 8px', borderRadius: '4px', color: '#00F5A0' }}>H</kbd>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Tela Cheia</span>
                <kbd style={{ background: '#1E293B', padding: '2px 8px', borderRadius: '4px', color: '#00F5A0' }}>F</kbd>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Fechar Diálogos</span>
                <kbd style={{ background: '#1E293B', padding: '2px 8px', borderRadius: '4px', color: '#00F5A0' }}>ESC</kbd>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
