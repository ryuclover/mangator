import type { Manga, Chapter } from '../data/mangaData';

export interface MangaFireItem {
  id: string;
  title: string;
  originalTitle?: string;
  coverImage: string;
  synopsis: string;
  genres: string[];
  rating: number;
  status: 'Completo' | 'Em Lançamento';
  year: number;
  author: string;
}

/**
 * Searches or fetches popular manga in real time using the public decentralized Manga database
 */
export async function fetchOnlineManga(query?: string): Promise<Manga[]> {
  try {
    let url = 'https://api.mangadex.org/manga?limit=15&includes[]=cover_art&includes[]=author';
    if (query && query.trim() !== '') {
      url += `&title=${encodeURIComponent(query.trim())}`;
    } else {
      url += '&order[followedCount]=desc';
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error('Falha ao conectar com o banco de mangás');
    const data = await res.json();

    const results: Manga[] = (data.data || []).map((item: any) => {
      const attributes = item.attributes || {};
      const titleObj = attributes.title || {};
      const title =
        titleObj.en ||
        titleObj['ja-ro'] ||
        titleObj.ja ||
        Object.values(titleObj)[0] ||
        'Obra Sem Título';

      const descObj = attributes.description || {};
      const synopsis =
        descObj['pt-br'] ||
        descObj.en ||
        descObj.ja ||
        Object.values(descObj)[0] ||
        'Sem sinopse disponível no momento.';

      const coverRel = item.relationships?.find((r: any) => r.type === 'cover_art');
      const coverFileName = coverRel?.attributes?.fileName;
      const coverImage = coverFileName
        ? `https://uploads.mangadex.org/covers/${item.id}/${coverFileName}.512.jpg`
        : '/brand/logo-polygon.jpg';

      const authorRel = item.relationships?.find((r: any) => r.type === 'author');
      const author = authorRel?.attributes?.name || 'Autor Desconhecido';

      const genres = (attributes.tags || [])
        .map((t: any) => t.attributes?.name?.en)
        .filter(Boolean)
        .slice(0, 4);

      const status = attributes.status === 'completed' ? 'Completo' : 'Em Lançamento';
      const year = attributes.year || new Date().getFullYear();

      return {
        id: `online-${item.id}`,
        title,
        originalTitle: titleObj.ja || titleObj['ja-ro'] || '',
        author,
        artist: author,
        year,
        coverImage,
        bannerImage: coverImage,
        synopsis: typeof synopsis === 'string' ? synopsis : JSON.stringify(synopsis),
        genres: genres.length > 0 ? genres : ['Ação', 'Fantasia'],
        status,
        license: 'Online Real-Time Scraping / Manga Database',
        rating: 4.9,
        views: `${Math.floor(Math.random() * 800 + 200)}K`,
        accentColor: '#9333EA',
        chapters: [] // dynamically fetched when clicked
      };
    });

    return results;
  } catch (err) {
    console.error('Erro ao fazer request no banco online:', err);
    return [];
  }
}

/**
 * Loads real chapters for an online manga
 */
export async function fetchOnlineChapters(onlineMangaId: string): Promise<Chapter[]> {
  const realId = onlineMangaId.replace('online-', '');
  try {
    const res = await fetch(
      `https://api.mangadex.org/chapter?manga=${realId}&limit=50&order[chapter]=asc&translatedLanguage[]=en&translatedLanguage[]=pt-br`
    );
    if (!res.ok) throw new Error('Falha ao buscar capítulos');
    const data = await res.json();

    const chapters: Chapter[] = (data.data || []).map((ch: any) => {
      const attr = ch.attributes || {};
      const num = parseFloat(attr.chapter) || 1;
      return {
        id: ch.id,
        number: num,
        title: attr.title ? `Cap. ${num}: ${attr.title}` : `Capítulo ${num} [${attr.translatedLanguage?.toUpperCase() || 'EN'}]`,
        releaseDate: attr.publishAt ? new Date(attr.publishAt).toLocaleDateString('pt-BR') : 'Recente',
        pagesCount: attr.pages || 0,
        pages: [], // fetched when reader opens
        comments: []
      };
    });

    return chapters;
  } catch (err) {
    console.error('Erro ao buscar capítulos online:', err);
    return [];
  }
}

/**
 * Fetches high resolution scans for a selected online chapter
 */
export async function fetchOnlineChapterPages(chapterId: string): Promise<string[]> {
  try {
    const res = await fetch(`https://api.mangadex.org/at-home/server/${chapterId}`);
    if (!res.ok) throw new Error('Falha ao buscar páginas do capítulo');
    const data = await res.json();
    const baseUrl = data.baseUrl;
    const hash = data.chapter.hash;
    const files = data.chapter.data || [];

    return files.map((fileName: string) => `${baseUrl}/data/${hash}/${fileName}`);
  } catch (err) {
    console.error('Erro ao buscar imagens do capítulo online:', err);
    return [];
  }
}
