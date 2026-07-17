# Multi LLM Router

하나의 UI에서 GPT, Gemini, Claude, Perplexity를 선택하거나 비교할 수 있는 AI Gateway 학습용 앱입니다.

## 기술 스택

- Frontend: React + Vite + TypeScript + Tailwind CSS + Lucide
- Backend: Vercel Serverless Functions (`/api/chat`, `/api/compare`)
- Provider Adapter: 공통 인터페이스로 4개 LLM 추상화
- Local Dev: Vite 미들웨어로 `/api`를 동일 포트에서 처리

## 시작하기

```bash
npm install
cp .env.example .env
# .env에 API 키·바우처 코드 입력
```

### 로컬 실행 (권장)

```bash
npm run dev
```

기본 주소: **http://localhost:5181/**

Vite가 UI와 `/api/chat`, `/api/compare`를 함께 제공합니다.

### Vercel CLI로 API 실행 (선택)

```bash
npm run dev:full
# 또는
npx vercel dev --listen 3000
```

## 환경 변수

서버 전용 (브라우저에 노출되지 않음):

```
OPENAI_API_KEY=
GOOGLE_API_KEY=
ANTHROPIC_API_KEY=
PERPLEXITY_API_KEY=
VOUCHER_CODE=kpc0714
```

클라이언트 인증 UI용 (Vite `VITE_` prefix):

```
VITE_VOUCHER_CODE=kpc0714
```

키가 없는 provider는 해당 요청만 에러를 반환하고, Compare 모드에서는 나머지 모델은 계속 호출됩니다.

## 바우처 인증

프롬프트 실행 전 바우처 코드 인증이 필요합니다.

- UI: 상단 Voucher 입력란에서 코드 인증 → 잠금 해제 후 Chat/Compare 실행 가능
- API: `voucher` 필드가 없거나 `VOUCHER_CODE`와 불일치하면 `401` 반환
- 세션: 인증 상태는 `sessionStorage`에 유지되며, 「잠금」으로 해제 가능

기본 코드: `kpc0714` (`.env`에서 변경 가능)

## API

### `POST /api/chat`

```json
{ "provider": "gpt", "prompt": "Explain MCP", "voucher": "kpc0714" }
```

### `POST /api/compare`

```json
{ "prompt": "Explain AI Agent.", "voucher": "kpc0714" }
```

4개 provider를 병렬 호출하고 속도·토큰·추정 비용을 함께 반환합니다.

## 기본 모델

| Provider   | Model              |
| ---------- | ------------------ |
| GPT        | `gpt-4o-mini`      |
| Gemini     | `gemini-2.5-flash` |
| Claude     | `claude-haiku-4-5` |
| Perplexity | `sonar`            |

## 변경 이력 (최근)

### 주요 내용

- **바우처 게이트**: `kpc0714` 인증 후에만 프롬프트 실행 가능
- **서버 검증**: `/api/chat`, `/api/compare`(Vercel + Vite 로컬)에서 바우처 필수 검증
- **로컬 포트**: 개발 서버 기본 포트를 `5181`로 변경 (`strictPort`)
- **환경 변수**: `VOUCHER_CODE`, `VITE_VOUCHER_CODE` 추가 (`.env.example` 반영)

### 오류·보안 보완

- UI만 막는 방식으로는 API 직접 호출을 우회할 수 있어, 서버에서도 바우처를 검증하도록 수정
- 바우처 미입력·불일치 시 `401`과 안내 메시지로 명확히 거부
- 미인증 상태에서는 프롬프트/모델 선택 UI를 비활성화해 잘못된 요청을 줄임

## 배포

GitHub에 push한 뒤 Vercel에 연결하고, 프로젝트 Environment Variables에 API 키와 `VOUCHER_CODE`를 등록합니다.
