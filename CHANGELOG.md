# [1.13.0](https://github.com/Nosto/search-templates-starter/compare/v1.12.4...v1.13.0) (2026-02-24)


### Features

* remove variant-selector and use platform-agnostic SimpleSelector ([e2c9180](https://github.com/Nosto/search-templates-starter/commit/e2c9180baf7eb6efd2f279a99b9f22c6f055935a))

## [1.12.4](https://github.com/Nosto/search-templates-starter/compare/v1.12.3...v1.12.4) (2026-02-23)


### Bug Fixes

* resolve npm audit vulnerabilities by overriding minimatch ([2d5130a](https://github.com/Nosto/search-templates-starter/commit/2d5130a44fd87bdd0a0afc176ed93232def82aca))

## [1.12.3](https://github.com/Nosto/search-templates-starter/compare/v1.12.2...v1.12.3) (2026-01-19)


### Bug Fixes

* remove semantic-release dependencies causing npm audit failures ([7a8d413](https://github.com/Nosto/search-templates-starter/commit/7a8d413d26f492fc6457aec40c89eb6a9522c80f))

## [1.12.2](https://github.com/Nosto/search-templates-starter/compare/v1.12.1...v1.12.2) (2026-01-15)


### Bug Fixes

* add tagging providers ([83a7d9a](https://github.com/Nosto/search-templates-starter/commit/83a7d9a4cfa252ee077de1292cfa4514c086950b))

## [1.12.1](https://github.com/Nosto/search-templates-starter/compare/v1.12.0...v1.12.1) (2026-01-09)


### Bug Fixes

* adjust page type on navigation ([a88f608](https://github.com/Nosto/search-templates-starter/commit/a88f608167c5fb279120e526e2ead9ad9c83c34f))

# [1.12.0](https://github.com/Nosto/search-templates-starter/compare/v1.11.1...v1.12.0) (2026-01-09)


### Features

* extract popstate listeners into usePopState custom hook ([99c8d85](https://github.com/Nosto/search-templates-starter/commit/99c8d856100d6603df48db25f2841765a9f04a08))

## [1.11.1](https://github.com/Nosto/search-templates-starter/compare/v1.11.0...v1.11.1) (2026-01-09)


### Bug Fixes

* improve history entries ([8d525f4](https://github.com/Nosto/search-templates-starter/commit/8d525f482b9470be4673f695af163d97370338b0))

# [1.11.0](https://github.com/Nosto/search-templates-starter/compare/v1.10.0...v1.11.0) (2026-01-08)


### Bug Fixes

* add setInput to dependency array to satisfy exhaustive-deps ([dcb8c93](https://github.com/Nosto/search-templates-starter/commit/dcb8c9302622e86fd7c93063cc9d2ed8c6ccfe52))


### Features

* add popstate event listener to sync URL query with search input ([ab03a9a](https://github.com/Nosto/search-templates-starter/commit/ab03a9ae425287009a54fbb97ce81dc5ee17657c))

# [1.10.0](https://github.com/Nosto/search-templates-starter/compare/v1.9.0...v1.10.0) (2026-01-08)


### Features

* add simple SPA mode for top level rendering ([a46d464](https://github.com/Nosto/search-templates-starter/commit/a46d464a190043b06a7df1d4836d2b4f70614c98))

# [1.9.0](https://github.com/Nosto/search-templates-starter/compare/v1.8.0...v1.9.0) (2026-01-08)


### Bug Fixes

* update e2e tests to handle pushState history entries ([fa293ea](https://github.com/Nosto/search-templates-starter/commit/fa293eaf15b946d5969291c3826a510e54e2e5dd))
* update e2e tests to handle pushState history entries ([f1bd1c9](https://github.com/Nosto/search-templates-starter/commit/f1bd1c9df657638da42a720560456bbff8752324))


### Features

* handle browser navigation (back/forward) in SearchQueryHandler ([58a88d7](https://github.com/Nosto/search-templates-starter/commit/58a88d717c18fd85ffd516fb0f77049c1f1b027e))


### Reverts

* undo e2e test changes from f1bd1c9 ([c5a0bf9](https://github.com/Nosto/search-templates-starter/commit/c5a0bf931784d4d632c3070960027f23c1feb8b4))

# [1.8.0](https://github.com/Nosto/search-templates-starter/compare/v1.7.1...v1.8.0) (2026-01-08)


### Features

* extend autocomplete sections ([e2336e2](https://github.com/Nosto/search-templates-starter/commit/e2336e2914d72af949192b859481741531e90e20))

## [1.7.1](https://github.com/Nosto/search-templates-starter/compare/v1.7.0...v1.7.1) (2026-01-07)


### Bug Fixes

* add repository entry in package.json ([80bb5cd](https://github.com/Nosto/search-templates-starter/commit/80bb5cd7219ac69f0006d16fb8c44e60b3ba2b59))
* use correct repo URL ([8deb635](https://github.com/Nosto/search-templates-starter/commit/8deb6355ad049b6df75b0da948f4877441dabcdf))

# [1.7.0](https://github.com/Nosto/search-templates-starter/compare/v1.6.0...v1.7.0) (2026-01-07)


### Bug Fixes

* add demo base plugin ([e5f34d8](https://github.com/Nosto/search-templates-starter/commit/e5f34d8d357804179d5d3ef7f1e3e684ba0676e2))
* **ci:** disable persist credentials ([5f73b47](https://github.com/Nosto/search-templates-starter/commit/5f73b476cd3ebeb720ddb3279c5cd0e21aef7656))
* **ci:** migrate to using app token ([9548a15](https://github.com/Nosto/search-templates-starter/commit/9548a15f866bed46465b1c0b5e6d4e89c2024ec2))
* correct test types for RangeSelector ([ec6523f](https://github.com/Nosto/search-templates-starter/commit/ec6523f0458622e9820417a20a18269cbc7fc984))
* drop padding transition ([5296ed9](https://github.com/Nosto/search-templates-starter/commit/5296ed93b9c9bceefbdbeb34d2fb1845a0a9ff86))
* **eslint:** move function style rules after eslintConfigPrettier ([8591377](https://github.com/Nosto/search-templates-starter/commit/8591377267b819b9e50f0fe39a3fc8ee1dd3b423))
* fix min/max range ([70ef2b0](https://github.com/Nosto/search-templates-starter/commit/70ef2b05d27aa297c476e0eec96a0b09f2d23983))
* improve skeleton content ([cf53c96](https://github.com/Nosto/search-templates-starter/commit/cf53c9614dd32a6d752123ab4aa9ecf5b7338c73))
* move base tag to top of head element ([9ef8df0](https://github.com/Nosto/search-templates-starter/commit/9ef8df054399a3f8b03ea8cd81f487af249291f4))
* remove unused dropdown variable in redirect test ([3be347d](https://github.com/Nosto/search-templates-starter/commit/3be347d7071043ab470fc5d0cc06f8a4e714b00d))
* update package-lock.json to fix security vulnerabilities ([bb950ea](https://github.com/Nosto/search-templates-starter/commit/bb950eafd57e4b32a6693ca320bf646ac6d2c04f))
* wait for tagging to be available ([427eca8](https://github.com/Nosto/search-templates-starter/commit/427eca80c74abb36caecd258031915b8c45f0985))


### Features

* add defaultActive prop to RangeSelector and RangeFacet ([bb79c07](https://github.com/Nosto/search-templates-starter/commit/bb79c07519b627408db826b318cf919c90d1dcfd))
* add demo build mode ([ddc744b](https://github.com/Nosto/search-templates-starter/commit/ddc744b300740d5e71a4a5121668e1e35836a0bd))
* add RangeSelector component with checkbox-based range selection ([3d9c403](https://github.com/Nosto/search-templates-starter/commit/3d9c403c23201250887563a3eddbb601c4b1133c))
* **Campaign:** add id field to CampaignProps interface ([3c6a28e](https://github.com/Nosto/search-templates-starter/commit/3c6a28e2643f305bb8fd2df83089d51e355ab89c))
* **eslint:** add function declaration style rules ([59735aa](https://github.com/Nosto/search-templates-starter/commit/59735aafc79f427354e82c2700f2362d72884277))
* improve redirect handling in autocomplete form submission ([6204f8a](https://github.com/Nosto/search-templates-starter/commit/6204f8ac449c9ae76c828be1c82dbaf3b203d173))
