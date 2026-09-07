import React, { useState } from 'react';
import { Compass, Bookmark, Search, Info, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: 'catalog' | 'bookmarks' | 'about';
  onSelectTab: (tab: 'catalog' | 'bookmarks' | 'about') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenAboutModal: () => void;
  bookmarksCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
  onOpenAboutModal,
  bookmarksCount,
}) => {
  const logos = [
    { id: 'polygon', src: '/brand/logo-polygon.jpg', label: 'Polygon Tech' },
    { id: 'book', src: '/brand/logo-book.jpg', label: 'Book Maw' },
    { id: 'comic', src: '/brand/logo-comic.jpg', label: 'Manga Panels' },
    { id: 'chibi', src: '/brand/logo-chibi.jpg', label: 'Chibi Mascot' }
  ];

  const [currentLogoIdx, setCurrentLogoIdx] = useState(0);

  const toggleNextLogo = () => {
    setCurrentLogoIdx((prev) => (prev + 1) % logos.length);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      background: 'rgba(8, 10, 15, 0.85)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
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
            title="Clique para alternar o estilo do ícone Mangator!"
            onClick={(e) => {
              e.stopPropagation();
              toggleNextLogo();
            }}
            style={{
              position: 'relative',
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '2px solid rgba(0, 245, 160, 0.4)',
              boxShadow: '0 0 15px rgba(0, 245, 160, 0.25)',
              transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#05070A',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08) rotate(3deg)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1) rotate(0deg)')}
          >
            <img
              src={logos[currentLogoIdx].src}
              alt="Mangator Alligator Mascot Icon"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 1,
              right: 1,
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#00F5A0',
              border: '1px solid #000'
            }} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: '1.45rem',
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #FFFFFF 30%, #00F5A0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1
              }}>
                MANGATOR
              </span>
              <span style={{
                fontSize: '0.65rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                backgroundColor: 'rgba(0, 245, 160, 0.15)',
                color: '#00F5A0',
                border: '1px solid rgba(0, 245, 160, 0.3)',
                padding: '2px 7px',
                borderRadius: '6px'
              }}>
                PORTFÓLIO
              </span>
            </div>
            <div style={{
              fontSize: '0.73rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              marginTop: '2px'
            }}>
              <ShieldCheck size={11} color="#10B981" />
              <span>Domínio Público & Experiência HD</span>
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
