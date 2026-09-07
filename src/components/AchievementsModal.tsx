import React from 'react';
import type { Achievement } from '../data/mangaData';
import { Award, CheckCircle2, Lock } from 'lucide-react';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievements: Achievement[];
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  onClose,
  achievements
}) => {
  if (!isOpen) return null;

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 300,
      backgroundColor: 'rgba(0,0,0,0.8)',
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
          padding: '2rem',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 245, 160, 0.15)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={24} color="#00F5A0" />
            <h2 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 800 }}>
              Conquistas do Leitor
            </h2>
          </div>
          <span style={{
            fontSize: '0.8rem',
            backgroundColor: 'rgba(0, 245, 160, 0.15)',
            color: '#00F5A0',
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            fontWeight: 700
          }}>
            {unlockedCount} / {achievements.length} Desbloqueadas
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {achievements.map((ach) => (
            <div
              key={ach.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: ach.unlocked ? 'rgba(0, 245, 160, 0.06)' : 'rgba(255, 255, 255, 0.02)',
                border: ach.unlocked ? '1px solid rgba(0, 245, 160, 0.25)' : '1px solid rgba(255, 255, 255, 0.06)',
                opacity: ach.unlocked ? 1 : 0.6
              }}
            >
              <div style={{
                fontSize: '1.8rem',
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {ach.icon}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700 }}>
                    {ach.title}
                  </h4>
                  {ach.unlocked ? (
                    <CheckCircle2 size={15} color="#00F5A0" />
                  ) : (
                    <Lock size={13} color="var(--text-muted)" />
                  )}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginTop: '2px' }}>
                  {ach.description}
                </p>
              </div>

              {ach.unlocked && ach.unlockedAt && (
                <span style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                  {ach.unlockedAt}
                </span>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            className="glow-btn-primary"
            style={{ padding: '8px 20px', fontSize: '0.85rem' }}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
