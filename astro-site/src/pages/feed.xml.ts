import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts, type Post } from '../lib/posts';
import { SITE, postUrl } from '../lib/site';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: posts.slice(0, 30).map((post: Post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      categories: [post.data.category, ...post.data.tags],
      link: postUrl(post.data.permalink),
    })),
    customData: `<language>ko</language>`,
  });
}
