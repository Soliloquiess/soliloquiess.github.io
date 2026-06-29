import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => data.draft !== true);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

/** 본문 분량 기반 읽기 시간(분). 코드/마크업 제거 후 글자 수 ÷ 분당 약 600자. */
export function getReadingTime(body: string | undefined): number {
  const text = (body ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*`_~|-]/g, ' ');
  const chars = text.replace(/\s+/g, '').length;
  return Math.max(1, Math.round(chars / 600));
}

/** 제목에서 시리즈 키와 회차(part N / N일차 / WeekN)를 추출. */
function seriesInfo(title: string): { key: string; part: number } {
  let m = title.match(/^(.*?)\s*part\s*(\d+)\s*$/i);
  if (m) return { key: m[1].trim(), part: Number(m[2]) };
  m = title.match(/^(.*?)\s*(\d+)\s*일차\s*$/);
  if (m) return { key: m[1].trim(), part: Number(m[2]) };
  m = title.match(/^(.*?)\s*Week\s*0*(\d+)\s*$/i);
  if (m) return { key: m[1].trim() + ' Week', part: Number(m[2]) };
  return { key: title.trim(), part: 1 };
}

export interface SeriesItem { title: string; permalink: string; part: number; current: boolean }

/** 같은 시리즈(part N·N일차·WeekN) 글 목록. 회차가 2종류 이상일 때만 시리즈로 인정. */
export function getSeries(post: Post, all: Post[]): SeriesItem[] {
  const me = seriesInfo(post.data.title);
  const members = all.filter(
    (p) => p.data.category === post.data.category && seriesInfo(p.data.title).key === me.key,
  );
  const parts = new Set(members.map((p) => seriesInfo(p.data.title).part));
  if (members.length < 2 || parts.size < 2) return [];
  return members
    .map((p) => ({
      title: p.data.title,
      permalink: p.data.permalink,
      part: seriesInfo(p.data.title).part,
      current: p.id === post.id,
    }))
    .sort((a, b) => a.part - b.part);
}

/** 발행 글을 연도별로 묶어 내림차순 반환. */
export function getPostsByYear(posts: Post[]): { year: number; posts: Post[] }[] {
  const map = new Map<number, Post[]>();
  for (const p of posts) {
    const y = p.data.date.getFullYear();
    if (!map.has(y)) map.set(y, []);
    map.get(y)!.push(p);
  }
  return [...map.entries()]
    .map(([year, posts]) => ({ year, posts }))
    .sort((a, b) => b.year - a.year);
}

/** 같은 카테고리(+2)·공유 태그(+1) 점수로 관련 글 추천. */
export function getRelatedPosts(post: Post, all: Post[], n = 4): Post[] {
  const tags = new Set(post.data.tags);
  const cat = post.data.category;
  return all
    .filter((p) => p.id !== post.id)
    .map((p) => {
      let score = p.data.category === cat ? 2 : 0;
      for (const t of p.data.tags) if (tags.has(t)) score += 1;
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.p.data.date.getTime() - a.p.data.date.getTime())
    .slice(0, n)
    .map((x) => x.p);
}

export async function getCategories(): Promise<{ name: string; count: number }[]> {
  const posts = await getPublishedPosts();
  const map = new Map<string, number>();
  for (const p of posts) map.set(p.data.category, (map.get(p.data.category) ?? 0) + 1);
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getTags(): Promise<{ name: string; count: number }[]> {
  const posts = await getPublishedPosts();
  const map = new Map<string, number>();
  for (const p of posts) for (const t of p.data.tags) map.set(t, (map.get(t) ?? 0) + 1);
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}
