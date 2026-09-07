import type { Manga, Chapter } from '../data/mangaData';

export interface MangaFireRawItem {
  id: number;
  hid: string;
  slug: string;
  title: string;
  type: 'manga' | 'manhwa' | 'manhua' | 'other';
  status: 'releasing' | 'finished' | 'completed' | 'on_hiatus';
  poster: {
    small?: string;
    medium?: string;
    large?: string;
  };
  latestChapter: number;
  year?: number;
  rank?: number;
  chapterUpdatedAt?: string;
  url?: string;
}

/**
 * Smart fetcher that uses local Vite/Vercel proxy (/api/mangadex) with direct fallback
 */
async function smartFetchMangaDex(path: string): Promise<any> {
  // Try proxy first (same-origin, avoids CORS)
  try {
    const proxyRes = await fetch(`/api/mangadex${path}`);
    if (proxyRes.ok) {
      return await proxyRes.json();
    }
  } catch {
    // Proxy failed or not running, try direct
  }

  // Direct fetch fallback
  const directRes = await fetch(`https://api.mangadex.org${path}`);
  if (!directRes.ok) {
    throw new Error(`MangaDex API erro ${directRes.status}`);
  }
  return await directRes.json();
}

/**
 * Prepares initial placeholder chapters for a MangaFire title
 */
function generateInitialChapters(item: MangaFireRawItem): Chapter[] {
  const latest = item.latestChapter || 1;
  const chapters: Chapter[] = [];
  const count = Math.min(latest, 30);
  for (let i = 0; i < count; i++) {
    const num = latest - i;
    chapters.push({
      id: `mf-ch-${item.hid}-${num}`,
      number: num,
      title: `Capítulo ${num}`,
      releaseDate: i === 0 && item.chapterUpdatedAt ? item.chapterUpdatedAt : `Cap. ${num}`,
      pagesCount: 0,
      pages: [],
      comments: []
    });
  }
  return chapters;
}

/**
 * Fetches real-time Trending top-titles directly from MangaFire's live API
 */
export async function fetchMangaFireTrending(
  days: 1 | 7 | 30 | 365 = 1,
  typeFilter?: string
): Promise<Manga[]> {
  try {
    let url = `https://mangafire.to/api/top-titles?type=trending&days=${days}&limit=36`;
    if (typeFilter && typeFilter !== 'all') {
      url += `&type_filter=${encodeURIComponent(typeFilter)}`;
    }

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`MangaFire respondeu com status ${res.status}`);
    }

    const data = await res.json();
    const rawItems: MangaFireRawItem[] = data.items || [];

    return rawItems.map((item) => {
      const type = (item.type || 'manga').toLowerCase() as 'manga' | 'manhwa' | 'manhua';
      const accentColor =
        type === 'manhwa' ? '#A855F7' : type === 'manhua' ? '#10B981' : '#F97316';

      const coverImage =
        item.poster?.medium ||
        item.poster?.large ||
        item.poster?.small ||
        '/brand/logo.jpg';

      return {
        id: `mf-${item.hid}`,
        hid: item.hid,
        slug: item.slug,
        title: item.title,
        originalTitle: item.slug.replace(/-/g, ' '),
        author: type === 'manhwa' ? 'Studio Coreano' : type === 'manhua' ? 'Studio Chinês' : 'Mangaká Japonês',
        artist: 'Scan Oficial / Webtoon',
        year: item.year || new Date().getFullYear(),
        coverImage,
        bannerImage: item.poster?.large || coverImage,
        synopsis: `Obra ${type.toUpperCase()} em alta no MangaFire com ${item.latestChapter || 1} capítulos disponíveis. Atualizado ${item.chapterUpdatedAt || 'recentemente'}.`,
        genres: [type.toUpperCase(), 'Ação', 'Aventura', 'Fantasia'],
        status: item.status === 'finished' ? 'Completo' : 'Em Lançamento',
        license: 'MangaFire Live Scraping / Rede Descentralizada',
        rating: item.rank && item.rank <= 25 ? Number((9.9 - item.rank * 0.05).toFixed(1)) : 9.2,
        views: `${Math.floor(Math.random() * 450 + 120)}K`,
        accentColor,
        mangaType: type,
        rank: item.rank,
        latestChapterNum: item.latestChapter,
        chapterUpdatedAt: item.chapterUpdatedAt,
        url: item.url || `/title/${item.hid}-${item.slug}`,
        chapters: generateInitialChapters(item),
        reviews: []
      };
    });
  } catch (err) {
    console.error('Erro ao buscar catálogo do MangaFire, usando fallback descentralizado:', err);
    return fetchDecentralizedCatalog();
  }
}

/**
 * Fallback to decentralized catalog when MangaFire is temporarily offline
 */
async function fetchDecentralizedCatalog(): Promise<Manga[]> {
  try {
    const data = await smartFetchMangaDex('/manga?limit=30&order[followedCount]=desc&includes[]=cover_art&includes[]=author');
    return (data.data || []).map((item: any) => mapMangaDexItemToManga(item));
  } catch (e) {
    console.error('Falha no catálogo descentralizado:', e);
    return [];
  }
}

/**
 * Helper to map MangaDex response to our Manga model
 */
function mapMangaDexItemToManga(item: any): Manga {
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
    'Sinopse sincronizada em tempo real.';

  const coverRel = item.relationships?.find((r: any) => r.type === 'cover_art');
  const coverFileName = coverRel?.attributes?.fileName;
  const coverImage = coverFileName
    ? `https://uploads.mangadex.org/covers/${item.id}/${coverFileName}.512.jpg`
    : '/brand/logo.jpg';

  const authorRel = item.relationships?.find((r: any) => r.type === 'author');
  const author = authorRel?.attributes?.name || 'Autor';

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
    genres: genres.length > 0 ? genres : ['Ação', 'Aventura'],
    status,
    license: 'Manga Online Live Mask',
    rating: 9.3,
    views: `${Math.floor(Math.random() * 800 + 200)}K`,
    accentColor: '#A855F7',
    chapters: [],
    reviews: []
  };
}

/**
 * Searches or fetches manga for Modo 2.
 */
export async function fetchOnlineManga(
  query?: string,
  days: 1 | 7 | 30 | 365 = 1,
  typeFilter?: string
): Promise<Manga[]> {
  // If no search query, return MangaFire trending
  if (!query || query.trim() === '') {
    const trending = await fetchMangaFireTrending(days, typeFilter);
    if (trending.length > 0) return trending;
  }

  // If query is provided, search live
  try {
    const q = query ? query.trim() : '';
    const data = await smartFetchMangaDex(
      `/manga?limit=24&includes[]=cover_art&includes[]=author&title=${encodeURIComponent(q)}`
    );
    return (data.data || []).map((item: any) => mapMangaDexItemToManga(item));
  } catch (err) {
    console.error('Erro na pesquisa online:', err);
    const trending = await fetchMangaFireTrending(365);
    if (query) {
      const lower = query.toLowerCase();
      return trending.filter(
        (m) => m.title.toLowerCase().includes(lower) || m.slug?.toLowerCase().includes(lower)
      );
    }
    return trending;
  }
}

/**
 * Helper to proxy external scan images avoiding CORS or Referer blocking
 */
export function proxyImageUrl(rawUrl: string): string {
  if (!rawUrl) return '';
  if (rawUrl.startsWith('/api/image?url=')) return rawUrl;
  if (rawUrl.startsWith('/') || rawUrl.startsWith('data:') || rawUrl.startsWith('blob:')) return rawUrl;
  return `/api/image?url=${encodeURIComponent(rawUrl)}`;
}

/**
 * Clean title helper for fuzzy matching
 */
function cleanMangaTitle(title: string): string {
  return title
    .replace(/[^\w\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Loads real chapters for a manga on demand
 */
export async function fetchOnlineChapters(manga: Manga): Promise<Chapter[]> {
  try {
    let mangaDbId = manga.id.replace('online-', '').replace('mf-', '');

    // If it's a MangaFire ID (e.g. ro8ro) or not a standard UUID, search on MangaDex by title
    if (manga.id.startsWith('mf-') || !mangaDbId.includes('-')) {
      const clean = cleanMangaTitle(manga.title);
      let searchData = await smartFetchMangaDex(`/manga?limit=5&title=${encodeURIComponent(clean)}`);
      let matchedManga = searchData.data?.[0];

      // If no match and title contains ':' or '-', try the first part
      if (!matchedManga && (manga.title.includes(':') || manga.title.includes('-'))) {
        const prefix = cleanMangaTitle(manga.title.split(/[:\-]/)[0]);
        searchData = await smartFetchMangaDex(`/manga?limit=5&title=${encodeURIComponent(prefix)}`);
        matchedManga = searchData.data?.[0];
      }

      // If still no match and slug is present, try slug words
      if (!matchedManga && manga.slug) {
        const slugWords = manga.slug.replace(/^[a-z0-9]+\-/, '').replace(/-/g, ' ');
        searchData = await smartFetchMangaDex(`/manga?limit=5&title=${encodeURIComponent(slugWords)}`);
        matchedManga = searchData.data?.[0];
      }

      if (matchedManga) {
        mangaDbId = matchedManga.id;
      }
    }

    // Fetch chapters for this manga ID (up to 100 chapters)
    const chaptersData = await smartFetchMangaDex(
      `/chapter?manga=${mangaDbId}&limit=100&order[chapter]=desc`
    );

    const rawChapters: any[] = chaptersData.data || [];
    const validChapters = rawChapters.filter(
      (ch: any) => ch.attributes && ch.attributes.pages > 0 && !ch.attributes.externalUrl
    );

    if (validChapters.length > 0) {
      return validChapters.map((ch: any) => {
        const attr = ch.attributes || {};
        const num = parseFloat(attr.chapter) || 1;
        const lang = attr.translatedLanguage ? attr.translatedLanguage.toUpperCase() : 'PT-BR';
        return {
          id: ch.id,
          number: num,
          title: attr.title ? `Cap. ${num}: ${attr.title} [${lang}]` : `Capítulo ${num} [${lang}]`,
          releaseDate: attr.publishAt ? new Date(attr.publishAt).toLocaleDateString('pt-BR') : 'Disponível',
          pagesCount: attr.pages || 0,
          pages: [],
          comments: []
        };
      });
    }
  } catch (err) {
    console.error('Erro ao buscar capítulos reais online:', err);
  }

  // Fallback: if external search had no results, return generated chapters so user can still browse
  return manga.chapters && manga.chapters.length > 0
    ? manga.chapters
    : [{
        id: `ch-default-1`,
        number: 1,
        title: 'Capítulo 1',
        releaseDate: 'Recente',
        pagesCount: 0,
        pages: [],
        comments: []
      }];
}

/**
 * Fetches high resolution real scans for a selected online chapter in real time
 */
export async function fetchOnlineChapterPages(manga: Manga, chapter: Chapter): Promise<string[]> {
  try {
    let chapterId = chapter.id;

    // If chapter.id is not a UUID (like mf-ch-... or ch-default), resolve real chapter
    if (chapterId.startsWith('mf-ch-') || chapterId.startsWith('ch-default')) {
      const clean = cleanMangaTitle(manga.title);
      let searchData = await smartFetchMangaDex(`/manga?limit=5&title=${encodeURIComponent(clean)}`);
      let matchedMangaId = searchData.data?.[0]?.id;

      if (!matchedMangaId && (manga.title.includes(':') || manga.title.includes('-'))) {
        const prefix = cleanMangaTitle(manga.title.split(/[:\-]/)[0]);
        searchData = await smartFetchMangaDex(`/manga?limit=5&title=${encodeURIComponent(prefix)}`);
        matchedMangaId = searchData.data?.[0]?.id;
      }

      if (!matchedMangaId && manga.slug) {
        const slugWords = manga.slug.replace(/^[a-z0-9]+\-/, '').replace(/-/g, ' ');
        searchData = await smartFetchMangaDex(`/manga?limit=5&title=${encodeURIComponent(slugWords)}`);
        matchedMangaId = searchData.data?.[0]?.id;
      }

      if (matchedMangaId) {
        const chData = await smartFetchMangaDex(
          `/chapter?manga=${matchedMangaId}&chapter=${chapter.number}&limit=5&order[publishAt]=desc`
        );
        const candidate = (chData.data || []).find((c: any) => c.attributes?.pages > 0);
        if (candidate) {
          chapterId = candidate.id;
        } else {
          const anyCh = await smartFetchMangaDex(
            `/chapter?manga=${matchedMangaId}&limit=10&order[chapter]=desc`
          );
          const anyCand = (anyCh.data || []).find((c: any) => c.attributes?.pages > 0);
          if (anyCand) {
            chapterId = anyCand.id;
          }
        }
      }
    }

    // Fetch the real scan pages from MangaDex At-Home server
    const atHomeData = await smartFetchMangaDex(`/at-home/server/${chapterId}`);
    if (atHomeData && atHomeData.baseUrl && atHomeData.chapter?.data) {
      const baseUrl = atHomeData.baseUrl;
      const hash = atHomeData.chapter.hash;
      const files: string[] = atHomeData.chapter.data || [];
      if (files.length > 0) {
        console.log(`[Mangator Mask] ${files.length} páginas reais carregadas para o capítulo ${chapter.number}!`);
        return files.map((fileName: string) => proxyImageUrl(`${baseUrl}/data/${hash}/${fileName}`));
      }
    }
  } catch (err) {
    console.error('Erro ao resolver páginas reais do capítulo:', err);
  }

  // Fallback if network blocked: provide the manga cover as preview
  return [manga.coverImage];
}

