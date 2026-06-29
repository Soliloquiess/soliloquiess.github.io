// 사이트 전역 설정 — 한 곳에서 관리
export const SITE = {
  title: "Don't Panic",
  tagline: '갤럭시를 여행하는 히치하이커를 위한 안내서',
  description: '개발 학습 기록을 정리하고 공유하는 기술 블로그',
  url: 'https://soliloquiess.github.io',
  author: '조양훈',
  email: 'cyh1219@naver.com',
  postsPerPage: 8,

  // 분석/검증 (기존 값 이식)
  googleAnalytics: 'G-4MPZ2SP20B',
  googleSiteVerification: 'KgNPGCtPAWwKe8OcTD3EgZf3bsRYD0hfKd5FXD8OlNU',
  naverSiteVerification: '99cfd5cbc988c45dceb7a82ae1f3571439894726',

  // AdSense 게시자 ID. 비우면 광고 비활성.
  adsenseClient: 'ca-pub-8069458034875048',

  // giscus 댓글 — GitHub Discussions(Soliloquiess/soliloquiess.github.io) 연동
  giscus: {
    repo: 'Soliloquiess/soliloquiess.github.io',
    repoId: 'MDEwOlJlcG9zaXRvcnkzNDMzMjIxNTU=',
    category: 'Announcements',
    categoryId: 'DIC_kwDOFHauK84DAE2H',
  },

  social: {
    github: 'https://github.com/Soliloquiess',
    email: 'cyh1219@naver.com',
  },
};

export const NAV = [
  { label: 'Blog', href: '/' },
  { label: 'Categories', href: '/categories.html' },
  { label: 'Tags', href: '/tags.html' },
  { label: 'Archive', href: '/archive.html' },
  { label: 'About', href: '/about.html' },
];

// 내부 링크 헬퍼: build.format='file' 이므로 .html 확장자를 붙인다
export function postUrl(permalink: string): string {
  return '/' + permalink.replace(/^\/+/, '') + '.html';
}
