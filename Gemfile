source "https://rubygems.org"

gem "jekyll", "~> 3.4"
gem "jekyll-paginate", "~> 1.1"
gem "jekyll-feed", "~> 0.9"
gem "jekyll-sitemap", "~> 1.0"
gem "jekyll-redirect-from", "~> 0.12"
gem "classifier-reborn"

# Windows 전용 파일 감시 라이브러리 — Linux CI(GitHub Actions)에서는 설치 제외
gem 'wdm', '>= 0.1.0', platforms: [:mingw, :x64_mingw, :mswin]

# 로컬 콘텐츠 편집 UI — 빌드/배포에는 불필요하므로 development 그룹으로 분리
group :development, :jekyll_plugins do
  gem 'jekyll-admin'
end
