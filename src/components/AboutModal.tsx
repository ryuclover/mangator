import React from 'react';
import { ShieldCheck, Heart, X } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 300,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(12px)',
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
          maxWidth: '560px',
          width: '100%',
          padding: '2.2rem',
          position: 'relative',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 245, 160, 0.15)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.2rem',
            right: '1.2rem',
            background: 'none',
            border: 'none',
            color: '#94A3B8',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.5rem' }}>
          <img
            src="/brand/logo-polygon.jpg"
            alt="Mangator Logo"
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '14px',
              border: '2px solid var(--accent-emerald)',
              boxShadow: '0 0 15px rgba(0, 245, 160, 0.3)'
            }}
          />
          <div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.1
            }}>
              MANGATOR
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', marginTop: '2px' }}>
              Alligator Themed • Manga Portfolio Project
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          <div style={{
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(0, 245, 160, 0.08)',
            border: '1px solid rgba(0, 245, 160, 0.2)',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start'
          }}>
            <ShieldCheck size={22} color="#00F5A0" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ color: '#fff', display: 'block', marginBottom: '2px' }}>100% Obras em Domínio Público</strong>
              <span>
                Este site foi concebido especificamente como projeto de portfólio. Todas as obras expostas pertencem ao domínio público mundial ou contos clássicos preservados e adaptados.
              </span>
            </div>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600, marginBottom: '6px' }}>
              Recursos de Destaque da Aplicação:
            </h4>
            <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li><strong>Leitor Híbrido Triplo:</strong> Suporte a Webtoon vertical contínuo, Página Única e Página Dupla estilo mangá tradicional japonês (RTL - Right to Left).</li>
              <li><strong>Mascote Alligator & Ícones Dinâmicos:</strong> Clique no ícone do cabeçalho para alternar entre os visuais estilizados do aligátor!</li>
              <li><strong>Experiência e Ajustes:</strong> Controle de brilho, temas (Preto OLED, Grafite, Papel Sépia), atalhos de teclado ágeis e tela cheia.</li>
              <li><strong>Design System Escuro & Glassmorphism:</strong> Inspirado nas interfaces mais modernas de Tóquio e plataformas de alta fidelidade.</li>
            </ul>
          </div>
        </div>

        <div style={{
          marginTop: '2rem',
          paddingTop: '1.2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Desenvolvido com <Heart size={14} color="#FF3366" fill="#FF3366" /> para portfólio de alto nível.
          </span>
          <button
            onClick={onClose}
            className="glow-btn-primary"
            style={{ padding: '8px 18px', fontSize: '0.82rem' }}
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
