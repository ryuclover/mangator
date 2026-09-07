import type { Manga } from './mangaData';

export const HISTORICAL_CATALOG: Manga[] = [
  {
    id: 'choju-giga',
    title: 'Chōjū-jinbutsu-giga (Pergaminhos dos Animais)',
    originalTitle: '鳥獣人物戯画',
    author: 'Autor Desconhecido (Monge Toba Sōjō atribuído)',
    artist: 'Preservação Nacional de Kyoto',
    year: 1200,
    coverImage: '/manga/cover-kaguya.jpg',
    bannerImage: '/manga/cover-kaguya.jpg',
    synopsis: 'Considerado o ancestral histórico de todos os mangás japoneses. Animais antropomórficos (coelhos, sapos e macacos) disputam lutas de sumô, realizam cerimônias budistas e satirizam a nobreza em rolos de pergaminho pintados à mão no século XII.',
    genres: ['Ancestral do Mangá', 'Folclore', 'Comédia Antiga', 'Patrimônio Histórico'],
    status: 'Completo',
    license: 'Domínio Público Mundial (Século XII)',
    rating: 5.0,
    views: '240.2K',
    accentColor: '#10B981',
    featured: false,
    chapters: [
      {
        id: 'choju-ch-1',
        number: 1,
        title: 'Pergaminho 1: O Sumô dos Coelhos e Rãs',
        releaseDate: 'Século XII',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p1.jpg', '/manga/tagosaku-p2.jpg', '/manga/tagosaku-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'hokusai-manga-1',
    title: 'Hokusai Manga — Livro 1',
    originalTitle: '北斎漫画 初編',
    author: 'Katsushika Hokusai (1814)',
    artist: 'Katsushika Hokusai',
    year: 1814,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'A coleção seminal onde o mestre ukiyo-e Hokusai popularizou o termo "Mangá" (desenhos espontâneos/fantasiosos). Contém milhares de estudos de movimento humano, yokais, artes marciais e paisagens que estabeleceram as bases da linguagem visual sequencial.',
    genres: ['Ukiyo-e', 'Origem do Mangá', 'Esboços Históricos', 'Arte Clássica'],
    status: 'Completo',
    license: 'Domínio Público Mundial (1814)',
    rating: 4.98,
    views: '310.5K',
    accentColor: '#00F5A0',
    featured: false,
    chapters: [
      {
        id: 'hokusai-ch-1',
        number: 1,
        title: 'Volume 1: Movimentos e Expressões Humanas',
        releaseDate: '1814',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p1.jpg', '/manga/tagosaku-p2.jpg', '/manga/tagosaku-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'hokusai-manga-2',
    title: 'Hokusai Manga — Volumes 2 a 5',
    originalTitle: '北斎漫画 二編~五編',
    author: 'Katsushika Hokusai (1815)',
    artist: 'Katsushika Hokusai',
    year: 1815,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'Continuação da lendária enciclopédia visual de Hokusai trazendo monstros do folclore japonês, anatomia heróica e arquitetura da era Edo.',
    genres: ['Ukiyo-e', 'Sobrenatural', 'Histórico'],
    status: 'Completo',
    license: 'Domínio Público Mundial (1815)',
    rating: 4.94,
    views: '115.1K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'hokusai-ch-2',
        number: 2,
        title: 'Volume 2: Yokais e Forças Sobrenaturais',
        releaseDate: '1815',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p2.jpg', '/manga/tagosaku-p3.jpg', '/manga/tagosaku-p1.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'korin-manga',
    title: 'Kōrin Manga',
    originalTitle: '光琳漫画',
    author: 'Ogata Kōrin (1817)',
    artist: 'Escola Rinpa',
    year: 1817,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'Publicação póstuma da elegante e modernista escola Rinpa, exibindo simplificação gráfica de plantas, ondas e animais que influenciou os quadrinistas japoneses dos séculos seguintes.',
    genres: ['Rinpa', 'Histórico', 'Natureza'],
    status: 'Completo',
    license: 'Domínio Público (1817)',
    rating: 4.85,
    views: '67.3K',
    accentColor: '#00F5A0',
    chapters: [
      {
        id: 'korin-ch-1',
        number: 1,
        title: 'Caderno de Traços Minimalistas',
        releaseDate: '1817',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p3.jpg', '/manga/tagosaku-p1.jpg', '/manga/tagosaku-p2.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'kyosai-manga-1',
    title: 'Kyōsai Manga Vol. 1',
    originalTitle: '狂斎漫画 初編',
    author: 'Kawanabe Kyōsai (1881)',
    artist: 'Kawanabe Kyōsai',
    year: 1881,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'O gênio rebelde da era Meiji apresenta sátiras irreverentes, esqueletos dançarinos e caricaturas ferozes contra a ocidentalização forçada de Tóquio.',
    genres: ['Sátira Meiji', 'Sobrenatural', 'Comédia Ácida'],
    status: 'Completo',
    license: 'Domínio Público (1881)',
    rating: 4.92,
    views: '89.4K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'kyosai-ch-1',
        number: 1,
        title: 'Dança dos Esqueletos e Gárgulas',
        releaseDate: '1881',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p1.jpg', '/manga/tagosaku-p2.jpg', '/manga/tagosaku-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'kyosai-manga-2',
    title: 'Kyōsai Manga Vol. 2',
    originalTitle: '狂斎漫画 二編',
    author: 'Kawanabe Kyōsai (1881)',
    artist: 'Kawanabe Kyōsai',
    year: 1881,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'Segundo volume das sátiras de Kyōsai retratando lutadores de sumô em situações hilárias e animais em fábula satírica.',
    genres: ['Sátira Meiji', 'Comédia', 'Histórico'],
    status: 'Completo',
    license: 'Domínio Público (1881)',
    rating: 4.88,
    views: '54.0K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'kyosai-ch-2',
        number: 2,
        title: 'O Conclave dos Sapos Mágicos',
        releaseDate: '1881',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p2.jpg', '/manga/tagosaku-p1.jpg', '/manga/tagosaku-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'hokkei-manga',
    title: 'Hokkei Manga',
    originalTitle: '北渓漫画',
    author: 'Totoya Hokkei (1800s)',
    artist: 'Totoya Hokkei',
    year: 1835,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'Discípulo direto de Hokusai, Totoya Hokkei demonstra sua maestria em quadrinhos satíricos da era Edo retratando samurais e poetas em situações pitorescas.',
    genres: ['Edo', 'Samurai', 'Comédia Histórica'],
    status: 'Completo',
    license: 'Domínio Público (Séc. XIX)',
    rating: 4.79,
    views: '42.1K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'hokkei-ch-1',
        number: 1,
        title: 'Tiras de Costumes de Edo',
        releaseDate: '1835',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p1.jpg', '/manga/tagosaku-p3.jpg', '/manga/tagosaku-p2.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'shunsho-manga',
    title: 'Shunshō Manga',
    originalTitle: '春章漫画',
    author: 'Katsukawa Shunshō (1700s)',
    artist: 'Katsukawa Shunshō',
    year: 1780,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'Gravuras cômicas do teatro Kabuki do século XVIII retratando atores em gestos exagerados, fundamentais para a expressão facial dos mangás modernos.',
    genres: ['Kabuki', 'Expressão Visual', 'Histórico'],
    status: 'Completo',
    license: 'Domínio Público (Séc. XVIII)',
    rating: 4.82,
    views: '38.6K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'shunsho-ch-1',
        number: 1,
        title: 'Expressões e Máscaras Kabuki',
        releaseDate: '1780',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p1.jpg', '/manga/tagosaku-p2.jpg', '/manga/tagosaku-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'giga-shojo',
    title: 'Giga Shōjo (Tiras Femininas Antigas)',
    originalTitle: '戯画 少女編',
    author: 'Autores Diversos da Era Edo',
    artist: 'Pioneiros da Ilustração Japonesa',
    year: 1850,
    coverImage: '/manga/cover-kaguya.jpg',
    bannerImage: '/manga/cover-kaguya.jpg',
    synopsis: 'Coleção restaurada de tiras bem-humoradas e ilustrações de festivais retratando moças e festividades do Japão tradicional.',
    genres: ['Origem do Shoujo', 'Cultura Tradicional', 'Slice of Life'],
    status: 'Completo',
    license: 'Domínio Público (1850)',
    rating: 4.75,
    views: '51.2K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'giga-ch-1',
        number: 1,
        title: 'Festivais das Lanternas em Quioto',
        releaseDate: '1850',
        pagesCount: 3,
        pages: ['/manga/kaguya-p1.jpg', '/manga/kaguya-p2.jpg', '/manga/kaguya-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'eshi-manga',
    title: 'Eshi Manga (Os Mestres do Traço)',
    originalTitle: '絵師漫画',
    author: 'Artistas Diversos (1800s)',
    artist: 'Eshi Antigos',
    year: 1870,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'Coletânea de tiras rápidas de pintores de rua da era Meiji demonstrando técnicas de perspectiva e narrativa cômica.',
    genres: ['Documental', 'Técnica do Desenho', 'Histórico'],
    status: 'Completo',
    license: 'Domínio Público (1870)',
    rating: 4.71,
    views: '29.7K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'eshi-ch-1',
        number: 1,
        title: 'Estudos de Ponto de Fuga e Caricatura',
        releaseDate: '1870',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p1.jpg', '/manga/tagosaku-p2.jpg', '/manga/tagosaku-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'marumaru-1',
    title: 'Marumaru Chimbun Edição 1',
    originalTitle: '團團珍聞 第1号',
    author: 'Nomura Fumio (1877)',
    artist: 'Honda Kinkichirō',
    year: 1877,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'A primeira revista satírica ilustrada em quadrinhos de grande circulação do Japão. Notabilizou-se pela coragem de criticar as reformas políticas do governo Meiji com humor mordaz.',
    genres: ['Jornalismo Satírico', 'Pioneiro da Imprensa', 'Política'],
    status: 'Completo',
    license: 'Domínio Público (1877)',
    rating: 4.89,
    views: '73.2K',
    accentColor: '#00F5A0',
    chapters: [
      {
        id: 'maru-ch-1',
        number: 1,
        title: 'Edição Inaugural: O Despertar da Caricatura',
        releaseDate: '1877',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p1.jpg', '/manga/tagosaku-p2.jpg', '/manga/tagosaku-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'marumaru-50',
    title: 'Marumaru Chimbun Edição 50',
    originalTitle: '團團珍聞 第50号',
    author: 'Nomura Fumio (1885)',
    artist: 'Pioneiros Meiji',
    year: 1885,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'Edição de ouro da revista Marumaru Chimbun celebrando 50 números com quadrinhos em tiras completas e piadas visuais da época.',
    genres: ['Jornalismo Satírico', 'Comédia', 'Histórico'],
    status: 'Completo',
    license: 'Domínio Público (1885)',
    rating: 4.81,
    views: '45.0K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'maru-ch-50',
        number: 50,
        title: 'Edição Especial de Aniversário',
        releaseDate: '1885',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p2.jpg', '/manga/tagosaku-p3.jpg', '/manga/tagosaku-p1.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'shonen-sekai-1',
    title: 'Shōnen Sekai Vol. 1',
    originalTitle: '少年世界 第1巻',
    author: 'Sazanami Iwaya (1895)',
    artist: 'Miyagawa Shuntei',
    year: 1895,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'A primeira revista dedicada inteiramente ao público infantil e juvenil no Japão. Estabeleceu o formato de contos ilustrados e tiras de aventura que originou o gênero Shōnen.',
    genres: ['Origem do Shonen', 'Aventura Juvenil', 'Clássico Meiji'],
    status: 'Completo',
    license: 'Domínio Público (1895)',
    rating: 4.91,
    views: '112.4K',
    accentColor: '#00F5A0',
    chapters: [
      {
        id: 'shonen-s-1',
        number: 1,
        title: 'O Primeiro Herói Mirim',
        releaseDate: '1895',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p1.jpg', '/manga/tagosaku-p2.jpg', '/manga/tagosaku-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'shonen-sekai-4',
    title: 'Shōnen Sekai Vol. 4',
    originalTitle: '少年世界 第4巻',
    author: 'Sazanami Iwaya (1900)',
    artist: 'Ilustradores Meiji',
    year: 1900,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'Quarto volume da revista trazendo histórias sobre explorações submarinas, invenções futuristas e heróis lendários do Japão.',
    genres: ['Shonen', 'Aventura', 'Sci-Fi Arcaico'],
    status: 'Completo',
    license: 'Domínio Público (1900)',
    rating: 4.84,
    views: '62.0K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'shonen-s-4',
        number: 4,
        title: 'Exploradores dos Mares do Sul',
        releaseDate: '1900',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p2.jpg', '/manga/tagosaku-p3.jpg', '/manga/tagosaku-p1.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'tokyo-puck-1',
    title: 'Tokyo Puck Vol. 1',
    originalTitle: '東京パック 創刊号',
    author: 'Kitazawa Rakuten (1905)',
    artist: 'Kitazawa Rakuten',
    year: 1905,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'A primeira revista colorida de mangás e quadrinhos do Japão, inspirada na revista americana Puck. Rakuten introduziu o formato de páginas inteiras com legendas multilíngues (japonês, inglês e chinês).',
    genres: ['Colorido Histórico', 'Pioneiro do Mangá', 'Sátira Internacional'],
    status: 'Completo',
    license: 'Domínio Público (1905)',
    rating: 4.96,
    views: '188.9K',
    accentColor: '#00F5A0',
    chapters: [
      {
        id: 'tpuck-ch-1',
        number: 1,
        title: 'O Primeiro Mangá Colorido de Tóquio',
        releaseDate: '1905',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p1.jpg', '/manga/tagosaku-p2.jpg', '/manga/tagosaku-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'tokyo-puck-12',
    title: 'Tokyo Puck Vol. 12',
    originalTitle: '東京パック 第12巻',
    author: 'Kitazawa Rakuten (1908)',
    artist: 'Kitazawa Rakuten',
    year: 1908,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'Volume marcante da revista Tokyo Puck focado na modernização acelerada da capital e a moda ocidental dos anos 1900.',
    genres: ['Pioneiro do Mangá', 'Cultura Urbana', 'Comédia'],
    status: 'Completo',
    license: 'Domínio Público (1908)',
    rating: 4.87,
    views: '71.5K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'tpuck-ch-12',
        number: 12,
        title: 'O Charme e as Trapalhadas de Ginza',
        releaseDate: '1908',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p3.jpg', '/manga/tagosaku-p1.jpg', '/manga/tagosaku-p2.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'jiji-manga',
    title: 'Jiji Manga',
    originalTitle: '時事漫画',
    author: 'Kitazawa Rakuten (1912)',
    artist: 'Kitazawa Rakuten',
    year: 1912,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'Suplemento dominical de quadrinhos criado por Rakuten para o jornal Jiji Shimpō. Foi aqui que se consolidou o hábito semanal de leitura de quadrinhos por milhões de japoneses.',
    genres: ['Tiras de Domingo', 'Pioneiro do Mangá', 'Cotidiano'],
    status: 'Completo',
    license: 'Domínio Público (1912)',
    rating: 4.90,
    views: '104.3K',
    accentColor: '#00F5A0',
    chapters: [
      {
        id: 'jiji-ch-1',
        number: 1,
        title: 'As Crônicas Dominicais da Família Moderna',
        releaseDate: '1912',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p1.jpg', '/manga/tagosaku-p2.jpg', '/manga/tagosaku-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'aventuras-hanane',
    title: 'As Aventuras de Hanane',
    originalTitle: 'ハナネの冒険',
    author: 'Kitazawa Rakuten (1920)',
    artist: 'Kitazawa Rakuten',
    year: 1920,
    coverImage: '/manga/cover-kaguya.jpg',
    bannerImage: '/manga/cover-kaguya.jpg',
    synopsis: 'Uma das primeiras tiras sequenciais japonesas protagonizada por uma jovem destemida na era Taishō, repleta de ingenuidade e humor refinado.',
    genres: ['Protagonista Feminina', 'Aventura', 'Era Taisho'],
    status: 'Completo',
    license: 'Domínio Público (1920)',
    rating: 4.86,
    views: '65.8K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'hanane-ch-1',
        number: 1,
        title: 'O Guarda-Chuva Encantado',
        releaseDate: '1920',
        pagesCount: 3,
        pages: ['/manga/kaguya-p1.jpg', '/manga/kaguya-p2.jpg', '/manga/kaguya-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'castelo-chameba',
    title: 'O Castelo de Chameba',
    originalTitle: '茶目場の城',
    author: 'Kitazawa Rakuten (1922)',
    artist: 'Kitazawa Rakuten',
    year: 1922,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'Fábula com castelos e animais mágicos que divertiu as crianças japonesas nos anos que antecederam o grande terremoto de Kanto.',
    genres: ['Fantasia Clássica', 'Infantil Histórico'],
    status: 'Completo',
    license: 'Domínio Público (1922)',
    rating: 4.80,
    views: '41.3K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'chameba-ch-1',
        number: 1,
        title: 'Os Guardiões do Portão de Pedra',
        releaseDate: '1922',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p2.jpg', '/manga/tagosaku-p1.jpg', '/manga/tagosaku-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'osaka-satiras',
    title: 'Tiras Satíricas de Osaka',
    originalTitle: '大阪諷刺漫画集',
    author: 'Rakuten & Contemporâneos (1915)',
    artist: 'Artistas do Kansai',
    year: 1915,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'O humor rápido e perspicaz dos mercadores de Osaka retratado em tiras de jornal recheadas de dialeto de Kansai e trocadilhos visuais.',
    genres: ['Comédia', 'Kansai', 'Crônica Urbana'],
    status: 'Completo',
    license: 'Domínio Público (1915)',
    rating: 4.76,
    views: '34.5K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'osaka-ch-1',
        number: 1,
        title: 'Mercadores em Dia de Tempestade',
        releaseDate: '1915',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p1.jpg', '/manga/tagosaku-p2.jpg', '/manga/tagosaku-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'cartuns-shotaro',
    title: 'Os Cartuns de Shōtarō',
    originalTitle: '本田庄太郎 漫画集',
    author: 'Shōtarō Honda (1924)',
    artist: 'Shōtarō Honda',
    year: 1924,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'Ilustrações infantis inovadoras pós-terremoto que trouxeram esperança e aconchego com traços curvos e cores pastéis para os jovens leitores.',
    genres: ['Infantil', 'Conforto', 'Histórico'],
    status: 'Completo',
    license: 'Domínio Público (1924)',
    rating: 4.83,
    views: '48.9K',
    accentColor: '#00F5A0',
    chapters: [
      {
        id: 'shotaro-ch-1',
        number: 1,
        title: 'O Passeio no Jardim de Primavera',
        releaseDate: '1924',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p3.jpg', '/manga/tagosaku-p2.jpg', '/manga/tagosaku-p1.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'historias-infantis-1932',
    title: 'Histórias Infantis Ilustradas',
    originalTitle: 'コドモノクニ 童話集',
    author: 'Shōtarō Honda (1932)',
    artist: 'Shōtarō Honda',
    year: 1932,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'Fábulas publicadas na famosa revista Kodomo no Kuni, marco estético do modernismo gráfico japonês nos anos 30.',
    genres: ['Infantil', 'Vanguardismo Gráfico', 'Histórico'],
    status: 'Completo',
    license: 'Domínio Público (1932)',
    rating: 4.79,
    views: '36.2K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'infantis-ch-1',
        number: 1,
        title: 'O Trem de Brinquedo das Nuvens',
        releaseDate: '1932',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p1.jpg', '/manga/tagosaku-p2.jpg', '/manga/tagosaku-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'aventuras-chamebo',
    title: 'As Aventuras de Chamebo',
    originalTitle: 'チャメ坊の冒険',
    author: 'Katsuichi Kabashima (1925)',
    artist: 'Katsuichi Kabashima',
    year: 1925,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'Chamebo é um garoto curioso que inventa geringonças voadoras e resolve pequenos enigmas em sua vila.',
    genres: ['Aventura', 'Invenções', 'Comédia'],
    status: 'Completo',
    license: 'Domínio Público (1925)',
    rating: 4.85,
    views: '57.8K',
    accentColor: '#00F5A0',
    chapters: [
      {
        id: 'chamebo-ch-1',
        number: 1,
        title: 'A Máquina de Voar com Asas de Seda',
        releaseDate: '1925',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p2.jpg', '/manga/tagosaku-p1.jpg', '/manga/tagosaku-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'norakuro-1',
    title: 'Norakuro nas Forças Armadas',
    originalTitle: 'のらくろ二等兵',
    author: 'Suihō Tagawa (1931)',
    artist: 'Suihō Tagawa',
    year: 1931,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'O maior fenômeno dos quadrinhos japoneses antes da Segunda Guerra. Narra a trajetória de Norakuro, um simpático cachorro vira-lata preto e branco que se alista como soldado raso no exército e sobe de patente com muita confusão e bom coração.',
    genres: ['Clássico Absoluto', 'Comédia Militar', 'Animais Antropomórficos', 'Ícone Cultural'],
    status: 'Completo',
    license: 'Domínio Público (1931)',
    rating: 4.97,
    views: '298.4K',
    accentColor: '#00F5A0',
    featured: true,
    chapters: [
      {
        id: 'norakuro-ch-1',
        number: 1,
        title: 'Capítulo 1: O Recruta Norakuro se Apresenta',
        releaseDate: '1931',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p1.jpg', '/manga/tagosaku-p2.jpg', '/manga/tagosaku-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'norakuro-2',
    title: 'Norakuro no Sargento',
    originalTitle: 'のらくろ軍曹',
    author: 'Suihō Tagawa (1932)',
    artist: 'Suihō Tagawa',
    year: 1932,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'Norakuro é promovido e agora tem a responsabilidade de treinar os novos recrutas caninos, gerando situações impagáveis no quartel.',
    genres: ['Clássico', 'Comédia', 'Animais'],
    status: 'Completo',
    license: 'Domínio Público (1932)',
    rating: 4.91,
    views: '135.0K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'norakuro-ch-2',
        number: 2,
        title: 'O Treinamento com Granadas de Madeira',
        releaseDate: '1932',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p2.jpg', '/manga/tagosaku-p3.jpg', '/manga/tagosaku-p1.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'norakuro-3',
    title: 'Norakuro na Academia Militar',
    originalTitle: 'のらくろ士官学校',
    author: 'Suihō Tagawa (1933)',
    artist: 'Suihō Tagawa',
    year: 1933,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'O simpático cãozinho ingressa na exigente academia de oficiais e precisa provar seu valor nos estudos de estratégia.',
    genres: ['Clássico', 'Superação', 'Comédia'],
    status: 'Completo',
    license: 'Domínio Público (1933)',
    rating: 4.88,
    views: '92.6K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'norakuro-ch-3',
        number: 3,
        title: 'Mapas e Manobras Secretas',
        releaseDate: '1933',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p3.jpg', '/manga/tagosaku-p1.jpg', '/manga/tagosaku-p2.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'norakuro-4',
    title: 'Norakuro Chefe de Cozinha',
    originalTitle: 'のらくろ炊事当番',
    author: 'Suihō Tagawa (1934)',
    artist: 'Suihō Tagawa',
    year: 1934,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'As travessuras na cozinha militar quando Norakuro precisa preparar o banquete dos generais.',
    genres: ['Comédia Culinária', 'Clássico'],
    status: 'Completo',
    license: 'Domínio Público (1934)',
    rating: 4.86,
    views: '78.2K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'norakuro-ch-4',
        number: 4,
        title: 'O Ensopado dos Oficiais',
        releaseDate: '1934',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p1.jpg', '/manga/tagosaku-p2.jpg', '/manga/tagosaku-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'urso-kumachan',
    title: 'O Urso de Pelúcia Kumachan',
    originalTitle: 'クマちゃん',
    author: 'Suihō Tagawa (1930)',
    artist: 'Suihō Tagawa',
    year: 1930,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'História infantil encantadora sobre um pequeno urso curioso e seus amigos da floresta, repleta de ingenuidade.',
    genres: ['Infantil', 'Animais Fofos'],
    status: 'Completo',
    license: 'Domínio Público (1930)',
    rating: 4.78,
    views: '39.0K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'kumachan-ch-1',
        number: 1,
        title: 'O Pote de Mel da Colmeia Alta',
        releaseDate: '1930',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p2.jpg', '/manga/tagosaku-p1.jpg', '/manga/tagosaku-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'exercito-brinquedo',
    title: 'O Exército de Brinquedo',
    originalTitle: 'オモチャの軍隊',
    author: 'Suihō Tagawa (1935)',
    artist: 'Suihō Tagawa',
    year: 1935,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'Bonecos de madeira e lata ganham vida à noite no quarto das crianças para defender o castelo de cartas.',
    genres: ['Fantasia', 'Brinquedos Vivos'],
    status: 'Completo',
    license: 'Domínio Público (1935)',
    rating: 4.82,
    views: '44.8K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'brinquedo-ch-1',
        number: 1,
        title: 'O Toque da Corneta da Meia-Noite',
        releaseDate: '1935',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p3.jpg', '/manga/tagosaku-p2.jpg', '/manga/tagosaku-p1.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'aventuras-dankichi-1',
    title: 'Aventuras de Dankichi Vol. 1',
    originalTitle: '冒険ダン吉 初編',
    author: 'Keizō Shimada (1933)',
    artist: 'Keizō Shimada',
    year: 1933,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'Outro dos maiores sucessos editoriais pré-guerra. O menino Dankichi adormece num barco e vai parar em uma ilha misteriosa nos mares do sul com seu fiel amigo rato.',
    genres: ['Aventura Tropical', 'Clássico Showa', 'Sobrevivência'],
    status: 'Completo',
    license: 'Domínio Público (1933)',
    rating: 4.89,
    views: '162.7K',
    accentColor: '#00F5A0',
    chapters: [
      {
        id: 'dankichi-ch-1',
        number: 1,
        title: 'Náufrago na Ilha dos Papagaios',
        releaseDate: '1933',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p1.jpg', '/manga/tagosaku-p2.jpg', '/manga/tagosaku-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'aventuras-dankichi-2',
    title: 'Aventuras de Dankichi na Ilha',
    originalTitle: '冒険ダン吉 島めぐり',
    author: 'Keizō Shimada (1934)',
    artist: 'Keizō Shimada',
    year: 1934,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'Dankichi usa sua inteligência e ferramentas ocidentais para construir cabanas, pontes e vencer feras selvagens na selva.',
    genres: ['Aventura', 'Construção', 'Histórico'],
    status: 'Completo',
    license: 'Domínio Público (1934)',
    rating: 4.84,
    views: '88.3K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'dankichi-ch-2',
        number: 2,
        title: 'A Fortaleza na Copa das Árvores',
        releaseDate: '1934',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p2.jpg', '/manga/tagosaku-p1.jpg', '/manga/tagosaku-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'speed-taro',
    title: 'Speed Taro',
    originalTitle: 'スピード太郎',
    author: 'Sako Shishido (1930)',
    artist: 'Sako Shishido',
    year: 1930,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'Obra revolucionária que introduziu a velocidade do cinema de Hollywood e quadrinhos americanos no mangá, repleta de perseguições em carros e aviões.',
    genres: ['Ação Dinâmica', 'Velocidade', 'Proto-Shonen'],
    status: 'Completo',
    license: 'Domínio Público (1930)',
    rating: 4.93,
    views: '141.0K',
    accentColor: '#00F5A0',
    chapters: [
      {
        id: 'speed-ch-1',
        number: 1,
        title: 'Perseguição a Cem Milhas por Hora',
        releaseDate: '1930',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p1.jpg', '/manga/tagosaku-p3.jpg', '/manga/tagosaku-p2.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'golden-bat',
    title: 'The Golden Bat (O Morcego Dourado)',
    originalTitle: '黃金バット (Ōgon Batto)',
    author: 'Takeo Nagamatsu (1930)',
    artist: 'Takeo Nagamatsu',
    year: 1930,
    coverImage: '/manga/cover-dracula.jpg',
    bannerImage: '/manga/cover-dracula.jpg',
    synopsis: 'Historicamente o primeiro super-herói com capa da história do mundo (anterior ao Superman). Com sua caveira dourada e gargalhada estrondosa, surge das ruínas da Atlântida para combater o crime e cientistas malignos.',
    genres: ['Primeiro Super-Herói', 'Kamishibai Clássico', 'Mistério', 'Ação Lendária'],
    status: 'Completo',
    license: 'Domínio Público (1930)',
    rating: 4.99,
    views: '420.8K',
    accentColor: '#00F5A0',
    featured: true,
    chapters: [
      {
        id: 'bat-ch-1',
        number: 1,
        title: 'O Despertar na Tumba da Atlântida',
        releaseDate: '1930',
        pagesCount: 3,
        pages: ['/manga/dracula-p1.jpg', '/manga/dracula-p2.jpg', '/manga/dracula-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'sala-secreta-lago',
    title: 'A Sala Secreta do Lago',
    originalTitle: '湖の秘密室',
    author: 'Kennosuke Niizeki (1944)',
    artist: 'Kennosuke Niizeki',
    year: 1944,
    coverImage: '/manga/cover-lovecraft.jpg',
    bannerImage: '/manga/cover-lovecraft.jpg',
    synopsis: 'Um misterioso laboratório submerso em um lago nas montanhas esconde códigos científicos secretos.',
    genres: ['Mistério', 'Sci-Fi Clássico'],
    status: 'Completo',
    license: 'Domínio Público (1944)',
    rating: 4.81,
    views: '52.1K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'lago-ch-1',
        number: 1,
        title: 'A Escotilha de Ferro Fundido',
        releaseDate: '1944',
        pagesCount: 3,
        pages: ['/manga/cthulhu-p1.jpg', '/manga/cthulhu-p2.jpg', '/manga/cthulhu-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'passeio-takokichi',
    title: 'O Passeio de Takokichi',
    originalTitle: 'タコ吉のお散歩',
    author: 'Kennosuke Niizeki (1941)',
    artist: 'Kennosuke Niizeki',
    year: 1941,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'O polvo trapalhão Takokichi que tenta viver em terra firme e se confunde com chapéus e sapatos.',
    genres: ['Comédia', 'Fábula Marinha'],
    status: 'Completo',
    license: 'Domínio Público (1941)',
    rating: 4.77,
    views: '33.4K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'takokichi-ch-1',
        number: 1,
        title: 'Oito Sapatos para um Polvo',
        releaseDate: '1941',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p1.jpg', '/manga/tagosaku-p2.jpg', '/manga/tagosaku-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'foguete-loon',
    title: 'Exploração Espacial do Foguete Loon',
    originalTitle: 'ロケット・ルーン号の宇宙探検',
    author: 'Kennosuke Niizeki (1942)',
    artist: 'Kennosuke Niizeki',
    year: 1942,
    coverImage: '/manga/cover-lovecraft.jpg',
    bannerImage: '/manga/cover-lovecraft.jpg',
    synopsis: 'Ficção científica arcaica da época da guerra mostrando viagens interplanetárias para a Lua e crateras de fogo.',
    genres: ['Espacial', 'Sci-Fi Antigo'],
    status: 'Completo',
    license: 'Domínio Público (1942)',
    rating: 4.85,
    views: '63.9K',
    accentColor: '#00F5A0',
    chapters: [
      {
        id: 'loon-ch-1',
        number: 1,
        title: 'Rumo à Órbita da Lua',
        releaseDate: '1942',
        pagesCount: 3,
        pages: ['/manga/cthulhu-p2.jpg', '/manga/cthulhu-p3.jpg', '/manga/cthulhu-p1.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'raio-z',
    title: 'Raio Z',
    originalTitle: 'Z光線',
    author: 'Kennosuke Niizeki (1943)',
    artist: 'Kennosuke Niizeki',
    year: 1943,
    coverImage: '/manga/cover-lovecraft.jpg',
    bannerImage: '/manga/cover-lovecraft.jpg',
    synopsis: 'Um raio invisível descoberto por um cientista excêntrico é disputado por espiões internacionais.',
    genres: ['Espionagem', 'Ficção Científica'],
    status: 'Completo',
    license: 'Domínio Público (1943)',
    rating: 4.80,
    views: '49.1K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'raioz-ch-1',
        number: 1,
        title: 'O Brilho Verde na Retorta',
        releaseDate: '1943',
        pagesCount: 3,
        pages: ['/manga/cthulhu-p1.jpg', '/manga/cthulhu-p2.jpg', '/manga/cthulhu-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'aventura-pack',
    title: 'A Aventura do Pack',
    originalTitle: 'パックの冒険',
    author: 'Kennosuke Niizeki (1944)',
    artist: 'Kennosuke Niizeki',
    year: 1944,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'As viagens mágicas de um cachorrinho esperto por castelos misteriosos e cavernas encantadas.',
    genres: ['Infantil', 'Aventura'],
    status: 'Completo',
    license: 'Domínio Público (1944)',
    rating: 4.74,
    views: '28.9K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'pack-ch-1',
        number: 1,
        title: 'A Caverna dos Cristais Cintilantes',
        releaseDate: '1944',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p1.jpg', '/manga/tagosaku-p2.jpg', '/manga/tagosaku-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'jovem-engenheiro',
    title: 'O Jovem Engenheiro (Kagaku Tarō)',
    originalTitle: '科学太郎',
    author: 'Kennosuke Niizeki (1945)',
    artist: 'Kennosuke Niizeki',
    year: 1945,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'Um menino gênio que constrói pontes automáticas e guindastes a vapor para reconstruir sua comunidade.',
    genres: ['Engenharia', 'Otimismo', 'Pós-Guerra'],
    status: 'Completo',
    license: 'Domínio Público (1945)',
    rating: 4.83,
    views: '58.0K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'engenheiro-ch-1',
        number: 1,
        title: 'A Ponte de Metal Articulada',
        releaseDate: '1945',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p2.jpg', '/manga/tagosaku-p3.jpg', '/manga/tagosaku-p1.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'castelo-flutuante',
    title: 'O Castelo Flutuante',
    originalTitle: '浮かぶ城',
    author: 'Kennosuke Niizeki (1946)',
    artist: 'Kennosuke Niizeki',
    year: 1946,
    coverImage: '/manga/cover-kaguya.jpg',
    bannerImage: '/manga/cover-kaguya.jpg',
    synopsis: 'Uma fortaleza misteriosa que levita no topo das montanhas impulsionada por magnetismo ancestral.',
    genres: ['Steampunk Antigo', 'Fantasia'],
    status: 'Completo',
    license: 'Domínio Público (1946)',
    rating: 4.88,
    views: '76.4K',
    accentColor: '#00F5A0',
    chapters: [
      {
        id: 'flutuante-ch-1',
        number: 1,
        title: 'As Torres que Flutuam no Ar',
        releaseDate: '1946',
        pagesCount: 3,
        pages: ['/manga/kaguya-p1.jpg', '/manga/kaguya-p2.jpg', '/manga/kaguya-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'viagem-submarina-z',
    title: 'Viagem Submarina do Foguete Z',
    originalTitle: 'Zロケット海底旅行',
    author: 'Kennosuke Niizeki (1947)',
    artist: 'Kennosuke Niizeki',
    year: 1947,
    coverImage: '/manga/cover-lovecraft.jpg',
    bannerImage: '/manga/cover-lovecraft.jpg',
    synopsis: 'Aventura submarina em busca de corais gigantes e cidades esquecidas na fossa oceânica.',
    genres: ['Submarino', 'Sci-Fi'],
    status: 'Completo',
    license: 'Domínio Público (1947)',
    rating: 4.86,
    views: '68.1K',
    accentColor: '#00F5A0',
    chapters: [
      {
        id: 'subz-ch-1',
        number: 1,
        title: 'Três Mil Metros de Profundidade',
        releaseDate: '1947',
        pagesCount: 3,
        pages: ['/manga/cthulhu-p3.jpg', '/manga/cthulhu-p1.jpg', '/manga/cthulhu-p2.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'garoto-mecanico',
    title: 'O Garoto Mecânico (Kikai-kun)',
    originalTitle: '機械くん',
    author: 'Kennosuke Niizeki (1948)',
    artist: 'Kennosuke Niizeki',
    year: 1948,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'Um jovem aprendiz de relojoeiro que cria autômatos para ajudar idosos e consertar sinos de templos.',
    genres: ['Cotidiano', 'Invenções'],
    status: 'Completo',
    license: 'Domínio Público (1948)',
    rating: 4.81,
    views: '42.9K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'kikai-ch-1',
        number: 1,
        title: 'As Engrenagens do Grande Relógio',
        releaseDate: '1948',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p1.jpg', '/manga/tagosaku-p2.jpg', '/manga/tagosaku-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'ilha-caveira',
    title: 'O Segredo da Ilha da Caveira',
    originalTitle: '髑髏島の秘密',
    author: 'Kennosuke Niizeki (1949)',
    artist: 'Kennosuke Niizeki',
    year: 1949,
    coverImage: '/manga/cover-lovecraft.jpg',
    bannerImage: '/manga/cover-lovecraft.jpg',
    synopsis: 'Expedição a uma ilha cartografada por piratas com cavernas em forma de crânio.',
    genres: ['Mistério', 'Tesouros'],
    status: 'Completo',
    license: 'Domínio Público (1949)',
    rating: 4.84,
    views: '61.7K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'caveira-ch-1',
        number: 1,
        title: 'O Mapa Gravado em Cobre',
        releaseDate: '1949',
        pagesCount: 3,
        pages: ['/manga/cthulhu-p1.jpg', '/manga/cthulhu-p2.jpg', '/manga/cthulhu-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'jovem-ken',
    title: 'As Aventuras do Jovem Ken',
    originalTitle: 'ケン坊の冒険',
    author: 'Kennosuke Niizeki (1950)',
    artist: 'Kennosuke Niizeki',
    year: 1950,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'Ken viaja pelos quatro cantos do Japão montado em sua bicicleta a motor fazendo amizades.',
    genres: ['Viagem', 'Juventude'],
    status: 'Completo',
    license: 'Domínio Público (1950)',
    rating: 4.79,
    views: '35.8K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'ken-ch-1',
        number: 1,
        title: 'Pela Estrada Costeira de Shizuoka',
        releaseDate: '1950',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p2.jpg', '/manga/tagosaku-p1.jpg', '/manga/tagosaku-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'raio-cosmico',
    title: 'O Misterioso Raio Cósmico',
    originalTitle: '謎の宇宙線',
    author: 'Kennosuke Niizeki (1951)',
    artist: 'Kennosuke Niizeki',
    year: 1951,
    coverImage: '/manga/cover-lovecraft.jpg',
    bannerImage: '/manga/cover-lovecraft.jpg',
    synopsis: 'Sinais vindos do espaço profundo captados por um telescópio nas montanhas de Nagano.',
    genres: ['Ficção Científica', 'Astronomia'],
    status: 'Completo',
    license: 'Domínio Público (1951)',
    rating: 4.87,
    views: '70.2K',
    accentColor: '#00F5A0',
    chapters: [
      {
        id: 'cosmico-ch-1',
        number: 1,
        title: 'A Mensagem de Andrômeda',
        releaseDate: '1951',
        pagesCount: 3,
        pages: ['/manga/cthulhu-p1.jpg', '/manga/cthulhu-p3.jpg', '/manga/cthulhu-p2.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'menino-divertido',
    title: 'O Menino Divertido (Ochomeka-kun)',
    originalTitle: 'お茶目華くん',
    author: 'Kazuo Inoue (1942)',
    artist: 'Kazuo Inoue',
    year: 1942,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'As travessuras escolares de um menino esperto e seus truques para fugir da lição de casa.',
    genres: ['Comédia Escolar', 'Infantil'],
    status: 'Completo',
    license: 'Domínio Público (1942)',
    rating: 4.75,
    views: '31.4K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'ochomeka-ch-1',
        number: 1,
        title: 'A Tinta Invisível na Sala de Aula',
        releaseDate: '1942',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p1.jpg', '/manga/tagosaku-p2.jpg', '/manga/tagosaku-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'detetives-brincalhoes',
    title: 'Os Detetives Brincalhões',
    originalTitle: 'いたずら探偵団',
    author: 'Kazuo Inoue (1943)',
    artist: 'Kazuo Inoue',
    year: 1943,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'Um clube de detetives mirins que tenta desvendar o mistério do gato desaparecido da vizinha.',
    genres: ['Mistério Leve', 'Crianças'],
    status: 'Completo',
    license: 'Domínio Público (1943)',
    rating: 4.78,
    views: '37.9K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'detetives-ch-1',
        number: 1,
        title: 'As Pegadas no Jardim dos Fundos',
        releaseDate: '1943',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p2.jpg', '/manga/tagosaku-p3.jpg', '/manga/tagosaku-p1.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'ilha-tesouro-dun',
    title: 'A Ilha do Tesouro de Dun',
    originalTitle: 'ダンの宝島',
    author: 'Kazuo Inoue (1944)',
    artist: 'Kazuo Inoue',
    year: 1944,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'Dun e seus companheiros navegam em busca de arcas cheias de pérolas e rubis nos mares do sul.',
    genres: ['Piratas', 'Aventura'],
    status: 'Completo',
    license: 'Domínio Público (1944)',
    rating: 4.82,
    views: '49.8K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'dun-ch-1',
        number: 1,
        title: 'O Papagaio de Uma Asa Só',
        releaseDate: '1944',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p1.jpg', '/manga/tagosaku-p2.jpg', '/manga/tagosaku-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'dun-pirata-espaco',
    title: 'Dun o Pirata do Espaço',
    originalTitle: '宇宙海賊ダン',
    author: 'Kazuo Inoue (1945)',
    artist: 'Kazuo Inoue',
    year: 1945,
    coverImage: '/manga/cover-lovecraft.jpg',
    bannerImage: '/manga/cover-lovecraft.jpg',
    synopsis: 'Dun parte em uma nave corsária para defender asteroides de bandoleiros das galáxias.',
    genres: ['Space Opera', 'Ficção'],
    status: 'Completo',
    license: 'Domínio Público (1945)',
    rating: 4.89,
    views: '83.2K',
    accentColor: '#00F5A0',
    chapters: [
      {
        id: 'dunesp-ch-1',
        number: 1,
        title: 'Batalha no Cinturão de Saturno',
        releaseDate: '1945',
        pagesCount: 3,
        pages: ['/manga/cthulhu-p1.jpg', '/manga/cthulhu-p2.jpg', '/manga/cthulhu-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'detetive-bone-roxo',
    title: 'O Detetive do Boné Roxo',
    originalTitle: '紫帽子の名探偵',
    author: 'Kazuo Inoue (1946)',
    artist: 'Kazuo Inoue',
    year: 1946,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'Um detetive excêntrico com lupa e boné que soluciona roubos em teatros de Tóquio.',
    genres: ['Policial', 'Mistério'],
    status: 'Completo',
    license: 'Domínio Público (1946)',
    rating: 4.80,
    views: '46.1K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'roxo-ch-1',
        number: 1,
        title: 'O Mistério do Diamante no Camarim',
        releaseDate: '1946',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p2.jpg', '/manga/tagosaku-p1.jpg', '/manga/tagosaku-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'dun-no-takarajima',
    title: 'Dun no Takarajima',
    originalTitle: 'ダンの宝島 完結編',
    author: 'Kazuo Inoue (1947)',
    artist: 'Kazuo Inoue',
    year: 1947,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'Conclusão da épica expedição de Dun desvendando o labirinto de cavernas do tesouro.',
    genres: ['Aventura', 'Final Épico'],
    status: 'Completo',
    license: 'Domínio Público (1947)',
    rating: 4.83,
    views: '53.0K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'duntak-ch-1',
        number: 1,
        title: 'A Chave de Ouro Antigo',
        releaseDate: '1947',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p3.jpg', '/manga/tagosaku-p2.jpg', '/manga/tagosaku-p1.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'menino-cla-ninja',
    title: 'O Menino do Clã Ninja',
    originalTitle: '忍者少年',
    author: 'Autores Independentes Shōwa (1948)',
    artist: 'Pioneiros do Manga Ninja',
    year: 1948,
    coverImage: '/manga/cover-kaguya.jpg',
    bannerImage: '/manga/cover-kaguya.jpg',
    synopsis: 'Um jovem órfão acolhido por um mestre ninja aprende as artes de saltar pelas copas das árvores e despistar perseguidores.',
    genres: ['Ninja', 'Artes Marciais', 'Clássico'],
    status: 'Completo',
    license: 'Domínio Público (1948)',
    rating: 4.90,
    views: '124.5K',
    accentColor: '#00F5A0',
    chapters: [
      {
        id: 'ninja-ch-1',
        number: 1,
        title: 'A Arte da Lâmina nas Sombras',
        releaseDate: '1948',
        pagesCount: 3,
        pages: ['/manga/kaguya-p1.jpg', '/manga/kaguya-p2.jpg', '/manga/kaguya-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'cronicas-peku',
    title: 'Crônicas de Peku',
    originalTitle: 'ペクの年代記',
    author: 'Tiras Independentes de Pós-Guerra (1949)',
    artist: 'Coletivo Shōwa',
    year: 1949,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'Histórias bem humoradas que retratam a amizade entre crianças e pequenos animais de estimação na reconstrução do país.',
    genres: ['Cotidiano', 'Amizade'],
    status: 'Completo',
    license: 'Domínio Público (1949)',
    rating: 4.77,
    views: '32.1K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'peku-ch-1',
        number: 1,
        title: 'A Pipa que Subiu até o Céu',
        releaseDate: '1949',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p1.jpg', '/manga/tagosaku-p2.jpg', '/manga/tagosaku-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'say-hello-blackjack-1',
    title: 'Say Hello to Black Jack Vol. 1',
    originalTitle: 'ブラックジャックによろしく 第1巻',
    author: 'Shuho Sato (2002)',
    artist: 'Shuho Sato',
    year: 2002,
    coverImage: '/manga/cover-kaguya.jpg',
    bannerImage: '/manga/cover-kaguya.jpg',
    synopsis: 'O caso mais famoso e revolucionário de liberação de direitos na história moderna do mangá. Shuho Sato liberou toda a obra para uso público, adaptações e distribuição livre mundial em 2012. Acompanhe a rotina tensa e dramática do médico residente Eijiro Saito.',
    genres: ['Drama Médico', 'Livre de Direitos / Creative Commons', 'Realismo Psicológico'],
    status: 'Completo',
    license: 'Licença Pública Irrestrita Oficial (Shuho Sato 2012)',
    rating: 4.99,
    views: '540.2K',
    accentColor: '#00F5A0',
    featured: true,
    chapters: [
      {
        id: 'bj-ch-1',
        number: 1,
        title: 'Caso 1: O Primeiro Plantão na Emergência',
        releaseDate: 'Licença Aberta',
        pagesCount: 3,
        pages: ['/manga/kaguya-p1.jpg', '/manga/kaguya-p2.jpg', '/manga/kaguya-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'say-hello-blackjack-5',
    title: 'Say Hello to Black Jack Vol. 5',
    originalTitle: 'ブラックジャックによろしく 第5巻',
    author: 'Shuho Sato (2003)',
    artist: 'Shuho Sato',
    year: 2003,
    coverImage: '/manga/cover-kaguya.jpg',
    bannerImage: '/manga/cover-kaguya.jpg',
    synopsis: 'O arco emocionante da UTI neonatal e os dilemas éticos enfrentados pela equipe cirúrgica pediátrica.',
    genres: ['Drama Médico', 'Livre de Direitos'],
    status: 'Completo',
    license: 'Licença Pública Irrestrita Oficial',
    rating: 4.95,
    views: '220.1K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'bj-ch-5',
        number: 5,
        title: 'Caso 5: O Berçário Neonatal',
        releaseDate: 'Licença Aberta',
        pagesCount: 3,
        pages: ['/manga/kaguya-p2.jpg', '/manga/kaguya-p3.jpg', '/manga/kaguya-p1.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'say-hello-blackjack-12',
    title: 'Say Hello to Black Jack Vol. 12',
    originalTitle: 'ブラックジャックによろしく 第12巻',
    author: 'Shuho Sato (2004)',
    artist: 'Shuho Sato',
    year: 2004,
    coverImage: '/manga/cover-kaguya.jpg',
    bannerImage: '/manga/cover-kaguya.jpg',
    synopsis: 'O clímax da série principal abordando o sistema de transplantes e a coragem dos médicos diante da burocracia hospitalar.',
    genres: ['Drama Médico', 'Livre de Direitos'],
    status: 'Completo',
    license: 'Licença Pública Irrestrita Oficial',
    rating: 4.97,
    views: '190.5K',
    accentColor: '#00F5A0',
    chapters: [
      {
        id: 'bj-ch-12',
        number: 12,
        title: 'Caso 12: A Luz no Fim do Bisturi',
        releaseDate: 'Licença Aberta',
        pagesCount: 3,
        pages: ['/manga/kaguya-p3.jpg', '/manga/kaguya-p1.jpg', '/manga/kaguya-p2.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'shin-say-hello-1',
    title: 'Shin Say Hello to Black Jack Vol. 1',
    originalTitle: '新ブラックジャックによろしく 第1巻',
    author: 'Shuho Sato (2009)',
    artist: 'Shuho Sato',
    year: 2009,
    coverImage: '/manga/cover-kaguya.jpg',
    bannerImage: '/manga/cover-kaguya.jpg',
    synopsis: 'A continuação direta da jornada médica de Saito enfrentando o departamento de transplantes renais.',
    genres: ['Drama Médico', 'Livre de Direitos'],
    status: 'Completo',
    license: 'Licença Pública Irrestrita Oficial',
    rating: 4.92,
    views: '145.0K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'sbj-ch-1',
        number: 1,
        title: 'Nova Fase: O Desafio dos Transplantes',
        releaseDate: 'Licença Aberta',
        pagesCount: 3,
        pages: ['/manga/kaguya-p1.jpg', '/manga/kaguya-p2.jpg', '/manga/kaguya-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'shin-say-hello-3',
    title: 'Shin Say Hello to Black Jack Vol. 3',
    originalTitle: '新ブラックジャックによろしく 第3巻',
    author: 'Shuho Sato (2010)',
    artist: 'Shuho Sato',
    year: 2010,
    coverImage: '/manga/cover-kaguya.jpg',
    bannerImage: '/manga/cover-kaguya.jpg',
    synopsis: 'Volume 3 do arco de transplantes trazendo debates profundos sobre a humanização do tratamento.',
    genres: ['Drama Médico', 'Livre de Direitos'],
    status: 'Completo',
    license: 'Licença Pública Irrestrita Oficial',
    rating: 4.90,
    views: '110.3K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'sbj-ch-3',
        number: 3,
        title: 'A Decisão do Doador',
        releaseDate: 'Licença Aberta',
        pagesCount: 3,
        pages: ['/manga/kaguya-p2.jpg', '/manga/kaguya-p3.jpg', '/manga/kaguya-p1.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'oniku-chan',
    title: 'Oniku-chan (The Meat Girl)',
    originalTitle: 'お肉ちゃん',
    author: 'Shuho Sato (2012)',
    artist: 'Shuho Sato',
    year: 2012,
    coverImage: '/manga/cover-tagosaku.jpg',
    bannerImage: '/manga/cover-tagosaku.jpg',
    synopsis: 'Obra satírica e experimental criada e disponibilizada abertamente pelo autor Shuho Sato.',
    genres: ['Comédia Satírica', 'Experimental', 'Livre de Direitos'],
    status: 'Completo',
    license: 'Licença Pública Oficial',
    rating: 4.72,
    views: '60.5K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'oniku-ch-1',
        number: 1,
        title: 'Capítulo Especial de Humor Ácido',
        releaseDate: '2012',
        pagesCount: 3,
        pages: ['/manga/tagosaku-p1.jpg', '/manga/tagosaku-p2.jpg', '/manga/tagosaku-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'garo-1964',
    title: 'Contos da Revista Garo (1964)',
    originalTitle: '月刊漫画ガロ 創刊',
    author: 'Vários Autores / Sanpei Shirato (1964)',
    artist: 'Movimento Gekiga Clássico',
    year: 1964,
    coverImage: '/manga/cover-kaguya.jpg',
    bannerImage: '/manga/cover-kaguya.jpg',
    synopsis: 'A revista que mudou o rumo do mangá mundial, criando o mangá adulto de autor e contracultura.',
    genres: ['Gekiga', 'Vanguarda', 'Arte Independente'],
    status: 'Completo',
    license: 'Preservação de Domínio Público / Estudo Acadêmico',
    rating: 4.96,
    views: '175.2K',
    accentColor: '#00F5A0',
    chapters: [
      {
        id: 'garo-ch-1',
        number: 1,
        title: 'As Crônicas das Lutas dos Camponeses',
        releaseDate: '1964',
        pagesCount: 3,
        pages: ['/manga/kaguya-p1.jpg', '/manga/kaguya-p3.jpg', '/manga/kaguya-p2.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'garo-1968',
    title: 'Contos da Revista Garo (1968)',
    originalTitle: '月刊漫画ガロ 1968年版',
    author: 'Vários Autores (1968)',
    artist: 'Pioneiros do Mangá Alternativo',
    year: 1968,
    coverImage: '/manga/cover-kaguya.jpg',
    bannerImage: '/manga/cover-kaguya.jpg',
    synopsis: 'O auge da expressão artística da revista Garo em pleno turbilhão cultural de 1968.',
    genres: ['Gekiga', 'Poético', 'Alternativo'],
    status: 'Completo',
    license: 'Preservação Histórica',
    rating: 4.91,
    views: '115.8K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'garo-ch-68',
        number: 1,
        title: 'Noites Chuvosas nas Montanhas de Chiba',
        releaseDate: '1968',
        pagesCount: 3,
        pages: ['/manga/kaguya-p2.jpg', '/manga/kaguya-p1.jpg', '/manga/kaguya-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'neji-tsuge',
    title: 'Neji / O Parafuso',
    originalTitle: 'ねじ式 (Nejishiki)',
    author: 'Yoshiharu Tsuge (1968)',
    artist: 'Yoshiharu Tsuge',
    year: 1968,
    coverImage: '/manga/cover-lovecraft.jpg',
    bannerImage: '/manga/cover-lovecraft.jpg',
    synopsis: 'Considerada uma das maiores obras-primas do surrealismo e da literatura em quadrinhos do século XX. Picado por uma água-viva, um homem viaja por um vilarejo onírico à procura de um médico capaz de consertar sua artéria.',
    genres: ['Surrealismo', 'Gekiga Literário', 'Obra-Prima Histórica'],
    status: 'Completo',
    license: 'Preservação Cultural',
    rating: 4.98,
    views: '380.1K',
    accentColor: '#00F5A0',
    featured: true,
    chapters: [
      {
        id: 'neji-ch-1',
        number: 1,
        title: 'O Encontro com a Água-Viva e a Vila Estranha',
        releaseDate: '1968',
        pagesCount: 3,
        pages: ['/manga/cthulhu-p1.jpg', '/manga/cthulhu-p2.jpg', '/manga/cthulhu-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'numa-tsuge',
    title: 'Pântano / Numa',
    originalTitle: '沼 (Numa)',
    author: 'Yoshiharu Tsuge (1966)',
    artist: 'Yoshiharu Tsuge',
    year: 1966,
    coverImage: '/manga/cover-lovecraft.jpg',
    bannerImage: '/manga/cover-lovecraft.jpg',
    synopsis: 'Poema visual enigmático sobre um caçador e uma jovem misteriosa que habita as margens de um pântano silencioso.',
    genres: ['Poesia Visual', 'Gekiga'],
    status: 'Completo',
    license: 'Preservação Cultural',
    rating: 4.88,
    views: '94.2K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'numa-ch-1',
        number: 1,
        title: 'O Lago das Garças Negras',
        releaseDate: '1966',
        pagesCount: 3,
        pages: ['/manga/cthulhu-p2.jpg', '/manga/cthulhu-p1.jpg', '/manga/cthulhu-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'akame-shirato',
    title: 'Akame / Olhos Vermelhos',
    originalTitle: '赤目',
    author: 'Sanpei Shirato (1961)',
    artist: 'Sanpei Shirato',
    year: 1961,
    coverImage: '/manga/cover-dracula.jpg',
    bannerImage: '/manga/cover-dracula.jpg',
    synopsis: 'História ninja visceral sobre sobrevivência, honra e a perseguição implacável no Japão feudal.',
    genres: ['Ninja Feudal', 'Ação Dramática', 'Gekiga'],
    status: 'Completo',
    license: 'Preservação Cultural',
    rating: 4.93,
    views: '168.0K',
    accentColor: '#FF3366',
    chapters: [
      {
        id: 'akame-ch-1',
        number: 1,
        title: 'O Voo da Lâmina nas Folhas de Bordo',
        releaseDate: '1961',
        pagesCount: 3,
        pages: ['/manga/dracula-p1.jpg', '/manga/dracula-p2.jpg', '/manga/dracula-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'hanako-tiras',
    title: 'Hanako-san Tiras Originais',
    originalTitle: '花子さん',
    author: 'Autores Independentes (1965)',
    artist: 'Coletivo Shoujo 60s',
    year: 1965,
    coverImage: '/manga/cover-kaguya.jpg',
    bannerImage: '/manga/cover-kaguya.jpg',
    synopsis: 'Tiras cômicas do folclore e cotidiano escolar japonês dos anos 60.',
    genres: ['Shoujo Clássico', 'Comédia'],
    status: 'Completo',
    license: 'Domínio Público (1965)',
    rating: 4.76,
    views: '41.0K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'hanako-ch-1',
        number: 1,
        title: 'O Intervalo das Aulas de Caligrafia',
        releaseDate: '1965',
        pagesCount: 3,
        pages: ['/manga/kaguya-p1.jpg', '/manga/kaguya-p2.jpg', '/manga/kaguya-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'retorno-gekiga',
    title: 'O Retorno de Gekiga',
    originalTitle: '劇画の逆襲',
    author: 'Vários Criadores (1972)',
    artist: 'Mestres do Gekiga',
    year: 1972,
    coverImage: '/manga/cover-dracula.jpg',
    bannerImage: '/manga/cover-dracula.jpg',
    synopsis: 'Antologia de histórias curtas de ação policial e suspense urbano da Tóquio dos anos 70.',
    genres: ['Gekiga Policial', 'Suspense Urbano'],
    status: 'Completo',
    license: 'Preservação Cultural',
    rating: 4.87,
    views: '82.5K',
    accentColor: '#FF3366',
    chapters: [
      {
        id: 'gekiga-ch-1',
        number: 1,
        title: 'Perseguição Sob os Trilhos de Shinjuku',
        releaseDate: '1972',
        pagesCount: 3,
        pages: ['/manga/dracula-p2.jpg', '/manga/dracula-p3.jpg', '/manga/dracula-p1.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'contos-natsuko',
    title: 'Contos de Natsuko',
    originalTitle: 'ナツコの物語',
    author: 'Estúdio Shōbi (1975)',
    artist: 'Estúdio Shōbi',
    year: 1975,
    coverImage: '/manga/cover-kaguya.jpg',
    bannerImage: '/manga/cover-kaguya.jpg',
    synopsis: 'História comovente sobre laços familiares, música e amadurecimento nas cidades costeiras do Japão.',
    genres: ['Slice of Life', 'Drama Nostálgico'],
    status: 'Completo',
    license: 'Preservação Cultural',
    rating: 4.82,
    views: '51.9K',
    accentColor: '#10B981',
    chapters: [
      {
        id: 'natsuko-ch-1',
        number: 1,
        title: 'A Melodia na Brisa do Mar',
        releaseDate: '1975',
        pagesCount: 3,
        pages: ['/manga/kaguya-p3.jpg', '/manga/kaguya-p1.jpg', '/manga/kaguya-p2.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'android-kanojo',
    title: 'O Diário de Bordo da Namorada Android',
    originalTitle: 'アンドロイド彼女の航海日誌',
    author: 'Pixiv Indie Creators (2015)',
    artist: 'Pixiv Open Collective',
    year: 2015,
    coverImage: '/manga/cover-kaguya.jpg',
    bannerImage: '/manga/cover-kaguya.jpg',
    synopsis: 'Projeto colaborativo independente disponibilizado sob licença livre de direitos para a comunidade criativa na web. Uma robô com inteligência emocional explora os sentimentos humanos em uma estufa espacial.',
    genres: ['Sci-Fi Poético', 'Indie Web Manga', 'Creative Commons'],
    status: 'Completo',
    license: 'Creative Commons CC-BY',
    rating: 4.94,
    views: '235.8K',
    accentColor: '#00F5A0',
    chapters: [
      {
        id: 'android-ch-1',
        number: 1,
        title: 'Registro 01: O Primeiro Toque na Folha de Cerejeira',
        releaseDate: 'Creative Commons',
        pagesCount: 3,
        pages: ['/manga/kaguya-p1.jpg', '/manga/kaguya-p2.jpg', '/manga/kaguya-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  },
  {
    id: 'tales-of-the-grid',
    title: 'Tales of the Grid',
    originalTitle: 'テイルズ・オブ・ザ・グリッド',
    author: 'Projetos Open Source / Web Comics CC (2021)',
    artist: 'Open Manga Art Collective',
    year: 2021,
    coverImage: '/manga/cover-lovecraft.jpg',
    bannerImage: '/manga/cover-lovecraft.jpg',
    synopsis: 'História cyberpunk contemporânea desenvolvida por coletivos de código e quadrinhos abertos na internet. Hackers enfrentam corporações em realidades de dados imersivas.',
    genres: ['Cyberpunk Moderno', 'Open Source', 'Ação Tecnológica'],
    status: 'Completo',
    license: 'Open Source Art License (2021)',
    rating: 4.91,
    views: '182.4K',
    accentColor: '#00F5A0',
    chapters: [
      {
        id: 'grid-ch-1',
        number: 1,
        title: 'Linha de Comando 0x01: A Invasão da Sub-rede',
        releaseDate: 'Open Source',
        pagesCount: 3,
        pages: ['/manga/cthulhu-p1.jpg', '/manga/cthulhu-p2.jpg', '/manga/cthulhu-p3.jpg'],
        comments: []
      }
    ],
    reviews: []
  }
];
