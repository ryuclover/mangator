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
  // Campos estruturais do MangaFire
  hid?: string;
  slug?: string;
  mangaType?: 'manga' | 'manhwa' | 'manhua' | 'other';
  rank?: number;
  latestChapterNum?: number;
  chapterUpdatedAt?: string;
  url?: string;
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
    description: 'Leu os pergaminhos históricos de Chōjū-jinbutsu-giga do século XII.',
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
    description: 'Completou a leitura de 3 ou mais obras históricas.',
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

export const MANGA_DATA: Manga[] = [
  {
    id: 'choju-giga',
    title: 'Chōjū-jinbutsu-giga (Pergaminhos dos Animais)',
    originalTitle: '鳥獣人物戯画 (Chōjū-giga)',
    author: 'Monge Toba Sōjō (Atribuído / Séc. XII)',
    artist: 'Acervo Nacional de Kyoto / Templo Kōzan-ji',
    year: 1150,
    coverImage: '/manga/choju_cover.jpg',
    bannerImage: '/manga/choju_cover.jpg',
    synopsis: 'O ancestral histórico primordial de toda a linguagem visual de mangás do Japão. Animais antropomórficos (coelhos, sapos e macacos) disputam lutas ferozes de sumô, celebram festivais budistas, roubam banquetes e satirizam a aristocracia com linhas expressivas pintadas com tinta sumi-ê em rolos contínuos de pergaminho preservados desde o século XII.',
    genres: ['Origem do Mangá', 'Patrimônio Nacional', 'Folclore', 'Comédia Antiga'],
    status: 'Completo',
    license: 'Domínio Público Mundial (Pergaminhos Históricos Séc. XII)',
    rating: 5.0,
    views: '345.8K',
    accentColor: '#10B981',
    featured: true,
    chapters: [
      {
        id: 'choju-ch-1',
        number: 1,
        title: 'Pergaminho 1: O Sumô dos Sapos e Coelhos & As Festas dos Bichos',
        releaseDate: 'Preservação Nacional de Quioto',
        pagesCount: 5,
        pages: [
          '/manga/choju_p1.jpg',
          '/manga/choju_p2.jpg',
          '/manga/choju_p3.jpg',
          '/manga/choju_p4.jpg',
          '/manga/choju_p5.jpg'
        ],
        comments: [
          {
            id: 'cc1',
            userName: 'Dra. Kenji Tanaka',
            userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
            date: 'Há 2 dias',
            text: 'A cena do sapo derrotando o coelho no sumô com o riso dos outros animais é a gênese da narrativa sequencial bem-humorada japonesa!',
            likes: 48,
            isSpoiler: false
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rc1',
        userName: 'Historiador Sato',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        storyRating: 5.0,
        artRating: 5.0,
        charactersRating: 5.0,
        date: '05 de Março, 2026',
        content: 'Preservação impecável em alta definição. Poder ler o primeiro mangá da história da humanidade em tela cheia e modo contínuo é uma experiência indescritível.',
        likes: 62
      }
    ]
  },
  {
    id: 'hokusai-manga',
    title: 'Hokusai Manga (Estudos Visuais e Esboços)',
    originalTitle: '北斎漫画 (Hokusai Manga)',
    author: 'Katsushika Hokusai (1814)',
    artist: 'Katsushika Hokusai',
    year: 1814,
    coverImage: '/manga/hokusai_cover.jpg',
    bannerImage: '/manga/hokusai_cover.jpg',
    synopsis: 'A obra seminal de onde surgiu o termo oficial "MANGÁ" (desenhos espontâneos/fantasiosos) pelas mãos do maior mestre do ukiyo-e do mundo, Katsushika Hokusai. Reúne esboços revolucionários de lutadores de sumô em pleno movimento, monstros lendários, mágicos de Edo e estudos anatômicos que influenciaram tanto os mangakás modernos quanto os impressionistas europeus.',
    genres: ['Ukiyo-e', 'Origem do Termo Mangá', 'Artes Marciais', 'Histórico'],
    status: 'Completo',
    license: 'Domínio Público Mundial (Publicado em 1814)',
    rating: 4.99,
    views: '412.0K',
    accentColor: '#00F5A0',
    featured: true,
    chapters: [
      {
        id: 'hokusai-ch-1',
        number: 1,
        title: 'Livro 1: Os Lutadores de Sumô e a Dinâmica do Movimento',
        releaseDate: '1814 (Edição de Edo)',
        pagesCount: 3,
        pages: [
          '/manga/hokusai_p1.jpg',
          '/manga/hokusai_p2.jpg',
          '/manga/hokusai_p3.jpg'
        ],
        comments: [
          {
            id: 'ch1',
            userName: 'Lucas Prado',
            userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
            date: 'Ontem',
            text: 'A precisão com que Hokusai desenha as quedas e os músculos dos lutadores de sumô sem perder a leveza do traço é pura genialidade.',
            likes: 31,
            isSpoiler: false
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rh1',
        userName: 'Marina Costa',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        storyRating: 4.9,
        artRating: 5.0,
        charactersRating: 4.8,
        date: '02 de Março, 2026',
        content: 'Hokusai Manga é a bíblia de todo desenhista. Os traços em xilogravura restaurados ficaram cristalinos no leitor.',
        likes: 39
      }
    ]
  },
  {
    id: 'tagosaku-tokyo-real',
    title: 'Tagosaku e Mokube no Tokyo Kenbutsu',
    originalTitle: '田吾作と杢兵衛の東京見物',
    author: 'Kitazawa Rakuten (1902)',
    artist: 'Kitazawa Rakuten (Pioneiro do Mangá Moderno)',
    year: 1902,
    coverImage: '/manga/tagosaku_real_cover.jpg',
    bannerImage: '/manga/tagosaku_real_cover.jpg',
    synopsis: 'Scans originais e autênticos da publicação de 1902 considerada pelos historiadores como o primeiro mangá moderno com personagens fixos, balões de fala e narrativa sequencial cômica. Dois caipiras ingênuos do interior viajam até a recém-modernizada Tóquio da era Meiji e se espantam com os bondes, cafés e ferrovias.',
    genres: ['Primeiro Mangá Moderno', 'Comédia Clássica', 'Era Meiji', 'Histórico'],
    status: 'Completo',
    license: 'Domínio Público Mundial (Publicado em 1902)',
    rating: 4.95,
    views: '198.4K',
    accentColor: '#10B981',
    featured: false,
    chapters: [
      {
        id: 'tagosaku-real-ch-1',
        number: 1,
        title: 'Capítulo Original: A Chegada à Capital e a Surpresa em Ginza',
        releaseDate: '1902 (Jiji Shimpō)',
        pagesCount: 2,
        pages: [
          '/manga/tagosaku_real_p1.jpg',
          '/manga/tagosaku_real_p2.jpg'
        ],
        comments: [
          {
            id: 'ct1',
            userName: 'Prof. Nakamura',
            userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
            date: 'Há 3 dias',
            text: 'Ver o primeiro mangá moderno com as tiras reais desenhadas por Rakuten Kitazawa em 1902 acessível assim é um marco para qualquer portfólio.',
            likes: 42,
            isSpoiler: false
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rt1',
        userName: 'Eduardo Neves',
        userAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        storyRating: 4.8,
        artRating: 4.9,
        charactersRating: 5.0,
        date: '28 de Fevereiro, 2026',
        content: 'O humor visual de 1902 continua divertidíssimo. Excelente restauração.',
        likes: 27
      }
    ]
  }
];
