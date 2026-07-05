# План разработки web-приложения

## 1. Технологический стек

### Заявленный стек
- **Next.js** — фреймворк (рекомендую App Router, последнюю стабильную версию)
- **React** — UI-библиотека (пойдёт вместе с Next.js)
- **Redux Toolkit (RTK)** — стейт-менеджер
- **Redux-Saga** — обработка асинхронных side-effects
- **Feature-Sliced Design (FSD)** — методология структурирования проекта
- **Gravity UI** — UI-кит от Яндекса (`@gravity-ui/uikit`)

### Что стоит добавить (важное)
- **TypeScript** — без него FSD и RTK сильно теряют в эргономике; Gravity UI типизирован.
- **ESLint** + `@feature-sliced/eslint-config` — автоматический контроль слоёв FSD.
- **Stylelint** — для контроля CSS/SCSS-модулей (Gravity UI использует SCSS).
- **Prettier** — единое форматирование.
- **Husky + lint-staged + commitlint** (Conventional Commits) — pre-commit проверки и единые сообщения.
- **Jest + React Testing Library** — unit/integration тесты компонентов и редьюсеров.
- **@redux-saga/testing-utils / redux-saga-test-plan** — тестирование саг.
- **Playwright** (или Cypress) — E2E тесты.
- **Storybook** — изолированная разработка UI-компонентов слоя `shared/ui`.
- **React Hook Form + Zod** — формы и валидация (zod также удобно использовать для валидации env и API-ответов).
- **Axios** (или fetch-обёртка) — HTTP-клиент с интерсепторами для авторизации/ошибок.
- **next/font** — оптимизированная загрузка шрифтов (Gravity UI рекомендует системные / `Inter`).
- **@t3-oss/env-nextjs** или собственный zod-валидатор для `.env`.
- **pino** или `winston` — серверное логирование.
- **next-intl** — i18n (если планируется мультиязычность).
- **Sentry** — мониторинг ошибок на проде.
- **GitHub Actions** — CI (lint, type-check, tests, build).
- **Docker / Dockerfile** — для деплоя.
- **README.md** + ADR-записи (architecture decision records) в `/docs`.

---

## 2. Структура проекта (FSD + Next.js)

### Ключевая проблема и её решение
В FSD есть слой `app`, и в Next.js App Router тоже папка `app/` — они конфликтуют. Стандартное решение в сообществе:

- Папка `app/` Next.js используется **только для роутинга** (страницы, layouts, route handlers) — это тонкий слой, который импортирует виджеты/страницы из FSD.
- Слои FSD живут в `src/`, при этом FSD-слой `app` переименовываем в `src/app-providers` (или оставляем `src/app`, если папка Next.js находится в корне, а не внутри `src/`).

Рекомендуемый вариант: **`app/` Next.js в корне** (роутинг), **`src/` для FSD-слоёв**.

### Структура

```
.
├── app/                          # Next.js App Router (только роутинг!)
│   ├── layout.tsx                # Корневой layout, подключает провайдеры из src/app
│   ├── page.tsx                  # → импортирует HomePage из src/pages
│   ├── (auth)/login/page.tsx
│   ├── repositories/[id]/page.tsx
│   └── api/                      # Route Handlers (BFF при необходимости)
├── src/
│   ├── app/                      # FSD layer: провайдеры, store, глобальные стили
│   │   ├── providers/            # ReduxProvider, ThemeProvider (Gravity), QueryProvider
│   │   ├── store/                # configureStore + saga middleware
│   │   ├── styles/               # globals.scss, reset, gravity-ui themes
│   │   └── index.tsx             # AppProviders — корневой композитор
│   ├── pages/                    # FSD layer: страницы-композиции (НЕ роутинг Next.js)
│   │   └── home/
│   │       ├── ui/HomePage.tsx
│   │       └── index.ts
│   ├── widgets/                  # Композитные блоки UI (Header, Sidebar, RepoList)
│   ├── features/                 # Пользовательские сценарии (auth, search, filter)
│   │   └── auth-by-email/
│   │       ├── ui/
│   │       ├── model/            # slice, saga, selectors
│   │       ├── api/
│   │       └── index.ts
│   ├── entities/                 # Бизнес-сущности (user, repository)
│   │   └── repository/
│   │       ├── ui/RepositoryCard.tsx
│   │       ├── model/
│   │       ├── api/
│   │       └── index.ts
│   └── shared/                   # Переиспользуемое без бизнес-логики
│       ├── ui/                   # Обёртки над Gravity UI, кастомные атомы
│       ├── api/                  # axios instance, baseQuery, тип Response
│       ├── config/               # env, constants, routes
│       ├── lib/                  # утилиты, хуки
│       └── types/
├── public/
├── tests/                        # E2E (Playwright)
├── .storybook/
├── .env.example
├── next.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

### Правила импортов FSD
Слой может импортировать только из слоёв ниже:
`app → pages → widgets → features → entities → shared`

Проверяется ESLint-плагином `@feature-sliced/eslint-config` + `eslint-plugin-boundaries`.

---

## 3. Нюансы интеграции

### Redux Toolkit + Saga + Next.js
- **Per-request store**: на сервере при SSR нельзя использовать глобальный синглтон-стор. Создаём `makeStore()` и оборачиваем через клиентский `<ReduxProvider>` (`'use client'`).
- Подключение saga middleware:
  ```ts
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    middleware: (gDM) => gDM({ thunk: false, serializableCheck: false }).concat(sagaMiddleware),
  });
  sagaMiddleware.run(rootSaga);
  ```
- Альтернатива саге для простых кейсов — RTK Query, но раз выбрана сага — используем её для бизнес-флоу, а fetch-логику кладём в `entities/*/api`.

### Gravity UI + Next.js
- Установка: `@gravity-ui/uikit`, `@gravity-ui/icons`.
- SSR: оборачиваем приложение в `<ThemeProvider theme="light">` внутри корневого client-провайдера.
- Стили: импорт `@gravity-ui/uikit/styles/styles.scss` в `src/app/styles/globals.scss`.
- Настроить SCSS-модули в `next.config.mjs` (Next.js поддерживает из коробки).
- Создать обёртки над Gravity-компонентами в `shared/ui` (Button, Modal и т.п.) — это даст возможность централизованно менять API при апгрейде Gravity.

### FSD + App Router
- В `app/<route>/page.tsx` — только тонкий импорт страницы из `src/pages`.
- Серверные компоненты по умолчанию; компоненты с Redux/Gravity помечаем `'use client'`.
- Серверные данные грузим в `app/<route>/page.tsx` (RSC) и пробрасываем пропсами в client-pages — это уменьшит JS-бандл.

---

## 4. Поэтапный план разработки

### Этап 1. Bootstrap (1–2 дня)
1. Инициализация Next.js + TypeScript: `npx create-next-app@latest --typescript --app --src-dir=false --eslint`.
2. Настройка структуры папок согласно FSD.
3. Установка и настройка ESLint (`@feature-sliced/eslint-config`, `eslint-config-next`), Prettier, Stylelint, EditorConfig.
4. Husky + lint-staged + commitlint (Conventional Commits).
5. Базовый README с инструкциями по запуску.

### Этап 2. Инфраструктура (2–3 дня)
1. Установка Gravity UI + подключение темы и SCSS.
2. Установка `@reduxjs/toolkit`, `react-redux`, `redux-saga`.
3. `src/app/store` — конфигурация стора с saga middleware, `rootReducer`, `rootSaga`.
4. `src/app/providers/AppProviders.tsx` — композиция ReduxProvider + ThemeProvider.
5. Подключение AppProviders в `app/layout.tsx`.
6. Базовый HTTP-клиент (axios) в `shared/api` с интерсепторами.
7. Валидация env через zod в `shared/config/env.ts`.
8. Настройка путей в `tsconfig.json` (`@/app`, `@/shared` и т.д.).

### Этап 3. Тестирование и DX (1–2 дня)
1. Jest + React Testing Library, jest-environment-jsdom.
2. Тестовый setup: `renderWithProviders` (стор + тема Gravity).
3. Playwright для E2E (`tests/e2e`).
4. Storybook + addon для Gravity-темы.
5. GitHub Actions: lint, type-check, test, build.

### Этап 4. MVP-функциональность (итеративно)
1. Дизайн доменной модели: какие entities (user, repository, …).
2. Реализация по вертикалям: одна фича = slice → saga → ui → wire в widget → подключение на странице.
3. Авторизация (`features/auth-by-email`) — типовой пример с RTK + saga.
4. Главная страница со списком сущностей.
5. CRUD одной сущности — для отработки всех слоёв.

### Этап 5. Качество (параллельно)
1. Покрытие тестами критичных редьюсеров и саг.
2. Подключение Sentry на client + server.
3. Lighthouse / Web Vitals аудит.
4. Документирование архитектурных решений в `/docs/adr`.

### Этап 6. Деплой
1. Dockerfile (multi-stage).
2. CI → CD на выбранную платформу (Vercel / собственный сервер).
3. `.env.production`, секреты в CI.

---

## 5. Чек-лист «не забыть»
- [ ] Запретить мутации стора через ESLint-правила RTK.
- [ ] Настроить алиасы импортов (`@/shared/*`).
- [ ] Описать публичный API каждого слайса через `index.ts` (правило FSD: импорты только через barrel).
- [ ] Запретить cross-imports между фичами (linter).
- [ ] Настроить тёмную/светлую тему Gravity UI + сохранение выбора в localStorage.
- [ ] Error Boundary на уровне `app/error.tsx` + `not-found.tsx`.
- [ ] Loading-состояния через `app/loading.tsx` и Suspense.
- [ ] CSP-заголовки в `next.config.mjs`.
- [ ] Метаданные / Open Graph через `generateMetadata`.
- [ ] Sitemap + robots.txt.

---

## 6. Полезные ссылки
- FSD: https://feature-sliced.design/
- ESLint-конфиг FSD: https://github.com/feature-sliced/eslint-config
- Gravity UI: https://gravity-ui.com/
- Redux Toolkit: https://redux-toolkit.js.org/
- Redux-Saga: https://redux-saga.js.org/
- Next.js App Router: https://nextjs.org/docs/app
