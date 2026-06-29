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
