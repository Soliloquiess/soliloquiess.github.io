import { OGImageRoute } from 'astro-og-canvas';
import { getPublishedPosts } from '../../lib/posts';
import { SITE } from '../../lib/site';

const posts = await getPublishedPosts();

// permalink → 페이지 메타. 키가 곧 /og/<permalink>.png 경로가 된다.
const pages = Object.fromEntries(posts.map((p) => [p.data.permalink, p.data]));

export const { getStaticPaths, GET } = await OGImageRoute({
  param: 'route',
  pages,
  getImageOptions: (_path, page: any) => ({
    title: page.title,
    description:
      '#' + page.category +
      (page.tags?.length ? '   ' + page.tags.map((t: string) => '#' + t).join('  ') : '') +
      '   ·   ' + SITE.title,
    bgGradient: [[20, 24, 29], [31, 38, 46]],
    border: { color: [79, 134, 170], width: 12, side: 'inline-start' },
    padding: 70,
    font: {
      title: {
        color: [237, 240, 246],
        size: 62,
        weight: 'Bold',
        lineHeight: 1.3,
        families: ['Pretendard'],
      },
      description: {
        color: [150, 162, 176],
        size: 28,
        weight: 'Normal',
        lineHeight: 1.4,
        families: ['Pretendard'],
      },
    },
    fonts: [
      './src/assets/fonts/Pretendard-Bold.ttf',
      './src/assets/fonts/Pretendard-Regular.ttf',
    ],
  }),
});
