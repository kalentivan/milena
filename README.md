# Milena Gallery — V0.1

Кодовая первая версия сайта художника: обычный каталог + интерактивный 3D-зал. Проект специально разделён так, чтобы визуал можно было менять пресетами, не переписывая бизнес-логику.

## Стек

- Frontend: Next.js 15, React 19, TypeScript
- 3D: Three.js через React Three Fiber + Drei
- Backend: FastAPI, SQLAlchemy 2, Pydantic v2
- DB: SQLite
- Media: файловая директория `backend/media` (легко заменить на S3/MinIO)
- Reverse proxy: nginx
- Deployment: Docker Compose

## Что уже реализовано

- светлая главная художника;
- каталог работ;
- фильтрация по сериям, техникам и годам;
- отдельная страница каждой картины;
- статусы работ (`available`, `sold`, `private_collection`, `not_for_sale`);
- форма запроса на приобретение/сотрудничество с сохранением в SQLite;
- базовая страница «О художнике»;
- полноценный 3D-зал в браузере;
- управление WASD/стрелками + мышью;
- интерактивные картины в 3D;
- карточка картины прямо из зала;
- переход из 3D в обычную SEO-страницу работы;
- реальные пропорции картин в зале;
- отдельные JSON-пресеты оформления и виртуальных залов;
- nginx-схема для одного домена `/`, `/api`, `/media`;
- seed-данные и SVG-заглушки для первого запуска.

## Главная идея пресетов

### Theme preset

Файл: `backend/presets/themes/*.json`

Он меняет:
- фон;
- поверхности;
- основной/вторичный текст;
- accent;
- границы;
- шрифтовую пару;
- радиусы;
- тени.

Чтобы сделать новый дизайн, можно скопировать `airy.json`, например в `ivory.json`, изменить параметры и указать:

```env
NEXT_PUBLIC_THEME_PRESET=ivory
```

### Gallery preset

Файл: `backend/presets/galleries/*.json`

Он задаёт:
- ширину/длину/высоту зала;
- цвет стен;
- цвет пола;
- интенсивность общего/акцентного света;
- начальное положение камеры;
- перечень работ;
- координаты каждой работы;
- поворот;
- стену.

Пример размещения:

```json
{
  "artworkSlug": "quiet-morning",
  "position": [-3.6, 2.05, -9.86],
  "rotation": [0, 0, 0],
  "wall": "north"
}
```

То есть React-компонент комнаты не знает заранее, какие картины в нём висят. Он получает конфигурацию с backend и строит выставку из неё.

## Быстрый запуск через Docker

Из корня проекта:

```bash
docker compose up --build
```

После сборки:

- сайт: `http://localhost`
- API через nginx: `http://localhost/api/...`
- media: `http://localhost/media/...`

SQLite сохраняется в Docker volume `gallery_data`. Каталог `backend/media` и JSON-пресеты проброшены как volume, поэтому медиа и конфигурации можно менять отдельно от image контейнера.

## Локальная разработка без Docker

Backend:

```bash
cd backend
python -m venv .venv
# Windows: .venv\\Scripts\\activate
# Linux/macOS: source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Для frontend локально используются значения из `.env.local`, соответствующие `.env.example`.

## Данные картины

Сейчас модель содержит:

- id;
- slug;
- title;
- year;
- width/height/depth;
- technique;
- material;
- series;
- description;
- short description;
- status;
- main image;
- detail images;
- featured.

Данные нужны одновременно каталогу, карточке работы и 3D-экспозиции.

## Куда развивать V0.2

Следующий логичный слой:

1. защищённая админка;
2. CRUD работ, серий и выставок;
3. drag-and-drop редактор развески картин по стенам;
4. загрузка изображений из админки;
5. несколько независимых виртуальных выставок;
6. RU/EN контент;
7. CV / exhibitions / publications;
8. Telegram-уведомления о заявках;
9. S3/MinIO вместо локальной media-директории;
10. аудиогид;
11. аналитика посещения обычных страниц и 3D-зала;
12. мобильный click-to-move режим вместо обязательного WASD.

## Структура

```text
milena-gallery/
├─ backend/
│  ├─ app/
│  │  ├─ core/            # config + DB
│  │  ├─ models/          # SQLAlchemy
│  │  ├─ schemas/         # Pydantic
│  │  ├─ services/        # seed etc.
│  │  └─ main.py          # FastAPI
│  ├─ media/              # изображения работ
│  ├─ presets/
│  │  ├─ themes/          # оформление обычного сайта
│  │  └─ galleries/       # оформление и развеска 3D-залов
│  └─ Dockerfile
├─ frontend/
│  ├─ app/                # Next.js routes
│  ├─ components/         # UI + 3D components
│  ├─ lib/                # API/config/types
│  ├─ styles/
│  └─ Dockerfile
├─ nginx/default.conf
└─ docker-compose.yml
```

## Важное ограничение этой сборки

Это первая функциональная реализация архитектуры и интерфейса, а не финальный художественный дизайн. SVG внутри `backend/media` — намеренные демонстрационные заглушки. Перед публикацией их надо заменить реальными фотографиями работ и заполнить реальные тексты художника.
