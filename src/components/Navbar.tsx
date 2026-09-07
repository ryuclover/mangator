import React from 'react';
import { Compass, Bookmark, Search, Info, ShieldCheck, Zap } from 'lucide-react';

interface NavbarProps {
  activeTab: 'catalog' | 'bookmarks' | 'about';
  onSelectTab: (tab: 'catalog' | 'bookmarks' | 'about') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenAboutModal: () => void;
  bookmarksCount: number;
  isMode2: boolean;
  onToggleMode2: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
  onOpenAboutModal,
  bookmarksCount,
  isMode2,
  onToggleMode2,
}) => {
  const logoSrc = '/brand/logo.jpg';

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleMode2();
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      background: isMode2 ? 'rgba(18, 10, 30, 0.92)' : 'rgba(8, 10, 15, 0.85)',
      borderBottom: isMode2 ? '1px solid rgba(168, 85, 247, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
      padding: '0 1.5rem',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '74px',
        gap: '1rem'
      }}>
        {/* Brand Logo & Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}
             onClick={() => onSelectTab('catalog')}>
          <div
            title="CLIQUE AQUI PARA ALTERNAR ENTRE MODO 1 (DOMÍNIO PÚBLICO) E MODO 2 (SCRAPING ONLINE MANGAFIRE EM TEMPO REAL)!"
            onClick={handleIconClick}
            style={{
              position: 'relative',
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              overflow: 'hidden',
              border: isMode2 ? '2px solid #C084FC' : '2px solid rgba(0, 245, 160, 0.4)',
              boxShadow: isMode2 ? '0 0 20px rgba(168, 85, 247, 0.6), 0 0 10px #A855F7' : '0 0 15px rgba(0, 245, 160, 0.25)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#05070A',
              cursor: 'pointer',
              transform: isMode2 ? 'scale(1.05)' : 'scale(1)'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.12) rotate(4deg)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = isMode2 ? 'scale(1.05) rotate(0deg)' : 'scale(1) rotate(0deg)')}
          >
            <img
              src={logoSrc}
              alt="Mangator Alligator Mascot Icon"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 2,
              right: 2,
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: isMode2 ? '#C084FC' : '#00F5A0',
              border: '2px solid #000',
              boxShadow: isMode2 ? '0 0 8px #C084FC' : '0 0 6px #00F5A0'
            }} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: '1.45rem',
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
                lineHeight: 1,
                display: 'inline-flex',
                alignItems: 'center'
              }}>
                MANGA
                <span style={{
                  color: isMode2 ? '#C084FC' : '#00F5A0',
                  textShadow: isMode2 ? '0 0 16px rgba(192, 132, 252, 0.6)' : '0 0 16px rgba(0, 245, 160, 0.5)'
                }}>
                  TOR
                </span>
              </span>
              <span
                onClick={handleIconClick}
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  backgroundColor: isMode2 ? 'rgba(168, 85, 247, 0.25)' : 'rgba(0, 245, 160, 0.15)',
                  color: isMode2 ? '#C084FC' : '#00F5A0',
                  border: isMode2 ? '1px solid rgba(192, 132, 252, 0.6)' : '1px solid rgba(0, 245, 160, 0.3)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: isMode2 ? '0 0 12px rgba(168, 85, 247, 0.4)' : 'none',
                  cursor: 'pointer'
                }}
              >
                {isMode2 ? (
                  <>
                    <Zap size={11} fill="#C084FC" />
                    🔥 MODO 2: MANGAFIRE LIVE
                  </>
                ) : (
                  'MODO 1 (ACERVO)'
                )}
              </span>
            </div>
            <div style={{
              fontSize: '0.73rem',
              color: isMode2 ? '#E9D5FF' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              marginTop: '2px'
            }}>
              {isMode2 ? (
                <>
                  <Zap size={11} color="#C084FC" />
                  <span>Requisições e dados reais do MangaFire (Clique no ícone p/ Modo 1)</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={11} color="#10B981" />
                  <span>Domínio Público Autêntico (Clique no ícone p/ ativar Modo 2)</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{
          flex: '1',
          maxWidth: '420px',
          position: 'relative',
          margin: '0 1rem'
        }}>
          <Search size={17} style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)'
          }} />
          <input
            type="text"
            placeholder="Pesquisar por título, autor ou gênero..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 42px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--text-primary)',
              fontSize: '0.88rem',
              outline: 'none',
              transition: 'all 0.2s ease',
              boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 245, 160, 0.5)';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.07)';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 245, 160, 0.2)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
              e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.3)';
            }}
          />
        </div>

        {/* Navigation Tabs & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => onSelectTab('catalog')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.88rem',
              fontWeight: 600,
              backgroundColor: activeTab === 'catalog' ? 'rgba(0, 245, 160, 0.15)' : 'transparent',
              color: activeTab === 'catalog' ? '#00F5A0' : 'var(--text-secondary)',
              transition: 'all 0.2s'
            }}
          >
            <Compass size={17} />
            <span>Explorar</span>
          </button>

          <button
            onClick={() => onSelectTab('bookmarks')}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.88rem',
              fontWeight: 600,
              backgroundColor: activeTab === 'bookmarks' ? 'rgba(0, 245, 160, 0.15)' : 'transparent',
              color: activeTab === 'bookmarks' ? '#00F5A0' : 'var(--text-secondary)',
              transition: 'all 0.2s'
            }}
          >
            <Bookmark size={17} />
            <span>Favoritos</span>
            {bookmarksCount > 0 && (
              <span style={{
                fontSize: '0.7rem',
                backgroundColor: '#FF3366',
                color: '#fff',
                padding: '2px 6px',
                borderRadius: '10px',
                fontWeight: 700
              }}>
                {bookmarksCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenAboutModal}
            title="Sobre o Projeto Portfólio & Domínio Público"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            <Info size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
