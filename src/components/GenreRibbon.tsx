import React from 'react';

interface GenreRibbonProps {
  genres: string[];
  selectedGenre: string;
  onSelectGenre: (genre: string) => void;
  onResetGenre: () => void;
}

export const GenreRibbon: React.FC<GenreRibbonProps> = ({
  genres,
  selectedGenre,
  onSelectGenre,
  onResetGenre,
}) => {
  return (
    <div className="home-genres">
      <div className="genre-listx">
        {genres.map((g) => (
          <button
            key={g}
            className={selectedGenre === g ? 'active' : ''}
            onClick={() => onSelectGenre(g)}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="alman">
        <button onClick={onResetGenre}>
          Ver Catálogo Completo
        </button>
      </div>
    </div>
  );
};
