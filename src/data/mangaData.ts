export interface ChapterComment {
  id: string;
  userName: string;
  userAvatar: string;
  date: string;
  text: string;
  likes: number;
  isSpoiler: boolean;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  releaseDate: string;
  pagesCount: number;
  pages: string[];
  comments: ChapterComment[];
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number; // 1 to 5
  storyRating: number;
  artRating: number;
  charactersRating: number;
  date: string;
  content: string;
  likes: number;
}

export interface Manga {
  id: string;
  title: string;
  originalTitle?: string;
  author: string;
  artist: string;
  year: number;
  coverImage: string;
  bannerImage: string;
  synopsis: string;
  genres: string[];
  status: 'Completo' | 'Em Lançamento';
  license: string;
  rating: number;
  views: string;
  accentColor: string;
  featured?: boolean;
  chapters: Chapter[];
  reviews: Review[];
}

export interface ReadingProgress {
  mangaId: string;
  mangaTitle: string;
  mangaCover: string;
  chapterId: string;
  chapterNumber: number;
  chapterTitle: string;
  pageIndex: number;
  totalPages: number;
  updatedAt: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_reader',
    title: 'Primeira Mordida',
    description: 'Abriu seu primeiro capítulo no Mangator.',
    icon: '🐊',
    unlocked: true,
    unlockedAt: 'Hoje'
  },
  {
    id: 'history_buff',
    title: 'Arqueólogo do Mangá',
    description: 'Leu uma obra clássica histórica do catálogo de domínio público.',
    icon: '📜',
    unlocked: true,
    unlockedAt: 'Hoje'
  },
  {
    id: 'night_owl',
    title: 'Leitor Noturno',
    description: 'Leu mangás com modo escuro invertido ou de madrugada.',
    icon: '🌙',
    unlocked: false
  },
  {
    id: 'collector',
    title: 'Devorador de Capítulos',
    description: 'Completou a leitura de 3 ou mais capítulos.',
    icon: '⚡',
    unlocked: false
  },
  {
    id: 'critic',
    title: 'Crítico Literário',
    description: 'Enviou uma avaliação ou comentário detalhado.',
    icon: '✍️',
    unlocked: false
  }
];

import { HISTORICAL_CATALOG } from './historicalCatalog';

const INITIAL_SHOWCASE: Manga[] = [
  {
    id: 'kaguya-hime',
    title: 'O Conto da Princesa Kaguya',
    originalTitle: '竹取物語 (Taketori Monogatari)',
    author: 'Folclore Clássico Japonês (Séc. X)',
    artist: 'Adaptação Mangator Studio',
    year: 900,
    coverImage: '/manga/cover-kaguya.jpg',
    bannerImage: '/manga/cover-kaguya.jpg',
    synopsis: 'A mais antiga narrativa em prosa do Japão e precursora da ficção científica e fantasia. Um cortador de bambu humilde encontra uma pequenina criança que resplandece dentro de um caule de bambu brilhante. Conforme cresce com uma beleza celestial incomparável, Kaguya atrai príncipes e o próprio Imperador com tarefas impossíveis, até que a verdade sobre sua origem na Lua se revela.',
    genres: ['Folclore', 'Fantasia Mística', 'Drama', 'Clássico Japonês'],
    status: 'Completo',
    license: 'Domínio Público Internacional (Folclore Pré-Moderno)',
    rating: 4.98,
    views: '142.5K',
    accentColor: '#10B981',
    featured: true,
    chapters: [
      {
        id: 'kaguya-ch-1',
        number: 1,
        title: 'Capítulo 1: A Donzela que Nasceu do Bambu',
        releaseDate: 'Domínio Público',
        pagesCount: 6,
        pages: [
          '/manga/kaguya-p1.jpg',
          '/manga/kaguya-p2.jpg',
          '/manga/kaguya-p3.jpg',
          '/manga/kaguya-p4.jpg',
          '/manga/kaguya-p5.jpg',
          '/manga/kaguya-p6.jpg'
        ],
        comments: [
          {
            id: 'c1',
            userName: 'Renan Silva',
            userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
            date: 'Há 2 dias',
            text: 'A introdução é mágica! É incrível pensar que essa história foi escrita no século X e já continha elementos que hoje definem o gênero de ficção científica e fantasia.',
            likes: 24,
            isSpoiler: false
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'r1',
        userName: 'Gabriel Arantes',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        storyRating: 5.0,
        artRating: 4.9,
        charactersRating: 5.0,
        date: '02 de Março, 2026',
        content: 'Uma obra-prima atemporal. A forma como Taketori Monogatari mistura poesia com o mistério extraterrestre de Kaguya é simplesmente fascinante.',
        likes: 42
      }
    ]
  },
  {
    id: 'cthulhu-dweller',
    title: 'Cthulhu: O Habitante das Profundezas',
    originalTitle: 'The Call of Cthulhu',
    author: 'H.P. Lovecraft (1928)',
    artist: 'Estilo Junji Ito / Horror Mangator',
    year: 1928,
    coverImage: '/manga/cover-lovecraft.jpg',
    bannerImage: '/manga/cover-lovecraft.jpg',
    synopsis: 'Adaptação visceral e aterrorizante do clássico da literatura de horror cósmico. Quando uma investigação em anotações herdadas de um falecido arqueólogo revela cultos ancestrais, loucura coletiva de artistas e a emersão da cidade ciclópica de R’lyeh, a humanidade depara-se com horrores cósmicos além de sua compreensão.',
    genres: ['Horror Cósmico', 'Mistério', 'Psicológico', 'Sobrenatural'],
    status: 'Completo',
    license: 'Domínio Público (Obra Original Pré-1929)',
    rating: 4.95,
    views: '210.8K',
    accentColor: '#00F5A0',
    featured: true,
    chapters: [
      {
        id: 'cthulhu-ch-1',
        number: 1,
        title: 'Capítulo 1: O Horror na Argila e a Loucura Coletiva',
        releaseDate: 'Domínio Público',
        pagesCount: 3,
        pages: [
          '/manga/cthulhu-p1.jpg',
          '/manga/cthulhu-p2.jpg',
          '/manga/cthulhu-p3.jpg'
        ],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'dracula-nocturne',
    title: 'Drácula: O Noturno Eterno',
    originalTitle: 'Dracula (Bram Stoker)',
    author: 'Bram Stoker (1897)',
    artist: 'Gothic Aesthetic Mangator',
    year: 1897,
    coverImage: '/manga/cover-dracula.jpg',
    bannerImage: '/manga/cover-dracula.jpg',
    synopsis: 'Nas montanhas misteriosas da Transilvânia, o jovem procurador Jonathan Harker viaja para formalizar a aquisição de imóveis em Londres para um nobre misterioso. O que ele encontra é uma fortaleza espectral e o Conde Drácula, o ápice da aristocracia das trevas cujo plano atravessará oceanos em busca de sangue fresco.',
    genres: ['Gótico', 'Vampiro', 'Ação Sombria', 'Clássico Vitoriano'],
    status: 'Completo',
    license: 'Domínio Público Internacional',
    rating: 4.92,
    views: '175.4K',
    accentColor: '#FF3366',
    featured: false,
    chapters: [
      {
        id: 'dracula-ch-1',
        number: 1,
        title: 'Capítulo 1: O Castelo na Névoa dos Cárpatos',
        releaseDate: 'Domínio Público',
        pagesCount: 3,
        pages: [
          '/manga/dracula-p1.jpg',
          '/manga/dracula-p2.jpg',
          '/manga/dracula-p3.jpg'
        ],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'tagosaku-tokyo',
    title: 'Tagosaku e Mokube no Tokyo Kenbutsu',
    originalTitle: '田吾作と杢兵衛の東京見物',
    author: 'Rakuten Kitazawa (1902)',
    artist: 'Rakuten Kitazawa (Pioneiro do Mangá Moderno)',
    year: 1902,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'Considerado historicamente como o primeiro mangá moderno com balões de fala, personagens recorrentes e estrutura sequencial japonesa de tiras. Acompanhe a divertida e ingênua jornada de dois camponeses do interior que chegam à recém-modernizada Tóquio da era Meiji, surpreendendo-se com trens a vapor, cafés e bondes elétricos.',
    genres: ['Histórico', 'Comédia Clássica', 'Pioneiro do Mangá', 'Slice of Life'],
    status: 'Completo',
    license: 'Domínio Público Mundial (Publicado em 1902)',
    rating: 4.88,
    views: '98.3K',
    accentColor: '#10B981',
    featured: false,
    chapters: [
      {
        id: 'tagosaku-ch-1',
        number: 1,
        title: 'Capítulo 1: O Primeiro Trem e as Ruas de Ginza',
        releaseDate: '1902 (Restauração Histórica)',
        pagesCount: 3,
        pages: [
          '/manga/tagosaku-p1.jpg',
          '/manga/tagosaku-p2.jpg',
          '/manga/tagosaku-p3.jpg'
        ],
        comments: []
      }
    ],
    reviews: []
  }
];

export const MANGA_DATA: Manga[] = [
  ...INITIAL_SHOWCASE,
  ...HISTORICAL_CATALOG
];
