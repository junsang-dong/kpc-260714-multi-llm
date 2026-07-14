# Multi LLM Router

하나의 UI에서 GPT, Gemini, Claude, Perplexity를 선택하거나 비교할 수 있는 AI Gateway 학습용 앱입니다.

## 기술 스택

- Frontend: React + Vite + TypeScript + Tailwind CSS + Lucide
- Backend: Vercel Serverless Functions (`/api/chat`, `/api/compare`)
- Provider Adapter: 공통 인터페이스로 4개 LLM 추상화

## 시작하기

```bash
npm install
cp .env.example .env
# .env에 API 키 입력
```

### UI만 실행

```bash
npm run dev
```

### API 포함 로컬 실행 (권장)

터미널 1 — Serverless API:

```bash
npx vercel dev --listen 3000
```

터미널 2 — Vite (HMR, `/api`는 3000으로 프록시):

```bash
npm run dev
```

또는 한 번에:

```bash
npm run dev:full
```

## 환경 변수

서버 전용 (브라우저에 노출되지 않음):

```
OPENAI_API_KEY=
GOOGLE_API_KEY=
ANTHROPIC_API_KEY=
PERPLEXITY_API_KEY=
```

키가 없는 provider는 해당 요청만 에러를 반환하고, Compare 모드에서는 나머지 모델은 계속 호출됩니다.

## API

### `POST /api/chat`

```json
{ "provider": "gpt", "prompt": "Explain MCP" }
```

### `POST /api/compare`

```json
{ "prompt": "Explain AI Agent." }
```

4개 provider를 병렬 호출하고 속도·토큰·추정 비용을 함께 반환합니다.

## 기본 모델

| Provider   | Model                     |
| ---------- | ------------------------- |
| GPT        | `gpt-4o-mini`             |
| Gemini     | `gemini-2.5-flash`        |
| Claude     | `claude-haiku-4-5`        |
| Perplexity | `sonar`                   |

## 배포

GitHub에 push한 뒤 Vercel에 연결하고, 프로젝트 Environment Variables에 위 API 키를 등록합니다.
