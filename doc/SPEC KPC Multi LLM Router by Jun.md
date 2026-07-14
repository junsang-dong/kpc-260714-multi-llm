# Multi LLM Router (React/Vite) 기술명세서

### Vibe Coding 입문자를 위한 AI 네이티브 프로젝트

> **목표**
>
> 하나의 화면에서 GPT, Gemini, Claude, Perplexity를 자유롭게 선택하거나 자동으로 라우팅하여 사용할 수 있는 Multi LLM Router를 구현한다.
>
> 단순한 API 호출 예제가 아니라 **AI Native Application**의 가장 기본적인 구조를 학습하는 것이 목적이다.

---

# 1. 프로젝트 개요

프로젝트명

**Multi LLM Router**

프로젝트 목표

* 여러 LLM을 하나의 UI에서 사용
* 모델별 장단점 비교
* 비용 비교
* 속도 비교
* 품질 비교
* AI Gateway 구조 이해
* Serverless 기반 Backend 이해

---

# 2. 학습 목표

실습을 완료하면 다음을 이해할 수 있다.

✅ React/Vite 기반 AI 앱 개발

✅ Serverless API 구현

✅ 환경변수 관리

✅ LLM API 호출

✅ 여러 모델 동시 연동

✅ Router Pattern

✅ AI Gateway 구조

---

# 3. 시스템 아키텍처

```text
                User

                  │

                  ▼

          React + Vite UI

                  │

                  ▼

      Vercel Serverless API

                  │

      ┌───────────┼────────────┐
      │           │            │
      ▼           ▼            ▼

   GPT API    Gemini API   Claude API

                  │
                  ▼

           Perplexity API

                  │

                  ▼

         Unified JSON Response
```

---

# 4. 기술 스택

| 영역              | 기술                          |
| --------------- | --------------------------- |
| Frontend        | React                       |
| Build           | Vite                        |
| Language        | TypeScript                  |
| Backend         | Vercel Serverless Functions |
| Deployment      | Vercel                      |
| Version Control | GitHub                      |
| Styling         | Tailwind CSS                |
| Icons           | Lucide                      |
| HTTP            | fetch API                   |
| Environment     | .env                        |

---

# 5. 프로젝트 구조

```text
multi-llm-router/

src/

    components/

        ChatWindow

        PromptInput

        ModelSelector

        CostCard

        SpeedCard

        ResponseCard

    services/

        api.ts

    hooks/

    types/

    utils/

api/

    chat.ts

    router.ts

    compare.ts

public/

package.json

vite.config.ts

vercel.json
```

---

# 6. 주요 기능

## ① 모델 선택

지원 모델

* GPT
* Gemini
* Claude
* Perplexity

예시

```
○ GPT

○ Gemini

○ Claude

○ Perplexity
```

---

## ② Prompt 입력

예시

```
Explain RAG simply.
```

---

## ③ 모델 호출

선택된 모델 호출

```
POST

/api/chat
```

---

## ④ 응답 출력

출력 예시

```
GPT

Response

...

Elapsed

2.8 sec

Input Tokens

152

Output Tokens

421

Cost

$0.0043
```

---

## ⑤ 모델 비교

동일 Prompt를

모든 모델에 전송

예시

```
Prompt

↓

GPT

↓

Gemini

↓

Claude

↓

Perplexity

↓

비교 결과
```

---

# 7. Router 기능

Router Mode

## Manual

사용자가 선택

```
GPT
```

---

## Auto

Prompt를 분석하여 자동 선택

예시

```
코드 작성

↓

GPT
```

```
긴 문서

↓

Claude
```

```
최신 뉴스

↓

Perplexity
```

```
Google Workspace

↓

Gemini
```

---

# 8. API 설계

## POST

```
/api/chat
```

Request

```json
{
  "provider":"gpt",
  "model":"gpt-5.5",
  "prompt":"Explain MCP"
}
```

---

Response

```json
{
  "provider":"gpt",
  "model":"gpt-5.5",
  "response":"...",
  "elapsed":2.4,
  "inputTokens":220,
  "outputTokens":510,
  "estimatedCost":0.0042
}
```

---

## POST

```
/api/compare
```

Request

```json
{
    "prompt":"Explain AI Agent."
}
```

---

Response

```json
[
    {
        "provider":"GPT",
        "elapsed":2.2
    },
    {
        "provider":"Claude",
        "elapsed":3.0
    }
]
```

---

# 9. 응답 품질 비교

비교 항목

| 항목    | 설명      |
| ----- | ------- |
| 정확성   | 사실 기반   |
| 논리성   | 설명 품질   |
| 코드 품질 | 가독성     |
| 최신성   | 웹 검색 여부 |
| 길이    | 응답 길이   |

점수

```
★★★★☆
```

---

# 10. 응답 속도 비교

측정

```
Request Start

↓

Response End

↓

Elapsed
```

예시

| Model      | Speed   |
| ---------- | ------- |
| GPT        | 2.3 sec |
| Claude     | 3.1 sec |
| Gemini     | 1.8 sec |
| Perplexity | 4.2 sec |

---

# 11. 비용 비교

화면 예시

| Model      | Input | Output | Cost    |
| ---------- | ----- | ------ | ------- |
| GPT        | 150   | 420    | $0.0042 |
| Claude     | 150   | 380    | $0.0038 |
| Gemini     | 150   | 390    | $0.0012 |
| Perplexity | 150   | 410    | $0.0028 |

추가 표시

```
≈ 5.7원
```

달러

*

원화 병기

---

# 12. Prompt 히스토리

Local Storage 저장

```
최근 질문

최근 모델

최근 응답
```

---

# 13. 비교 화면

```
──────────────────────────────

Prompt

Explain MCP

──────────────────────────────

GPT

★★★★★

2.3 sec

$0.004

──────────────────────────────

Claude

★★★★★

3.0 sec

$0.003

──────────────────────────────

Gemini

★★★★☆

1.7 sec

$0.001

──────────────────────────────

Perplexity

★★★★★

4.1 sec

$0.002

──────────────────────────────
```

---

# 14. 환경 변수

```text
OPENAI_API_KEY=

GOOGLE_API_KEY=

ANTHROPIC_API_KEY=

PERPLEXITY_API_KEY=
```

Serverless에서만 사용

브라우저에는 절대 노출하지 않는다.

---

# 15. GitHub 브랜치 전략

```
main

develop

feature/router

feature/chat

feature/compare

feature/history
```

---

# 16. 배포 구조

## Local

```
npm run dev
```

↓

React 실행

---

## GitHub

```
Push

↓

GitHub Repository
```

↓

자동 빌드

---

## Vercel

```
GitHub

↓

Deploy

↓

Serverless API 생성
```

---

# 17. 향후 확장 기능

### Phase 2

* Streaming Response
* Markdown Rendering
* Code Highlight
* Dark Mode
* Prompt Template

---

### Phase 3

* AI Router Agent
* Prompt Optimizer
* Response Evaluation
* Automatic Model Selection
* Token Dashboard

---

### Phase 4

* RAG
* MCP Tools
* Memory
* Conversation Context
* Multi-Agent Workflow

---

# 18. AI Native 설계 포인트

이 프로젝트는 단순히 여러 LLM API를 연결하는 예제가 아니라, **AI Gateway**와 **Model Router** 패턴을 실습하는 AI Native 애플리케이션의 출발점이다.

설계 시 다음 원칙을 적용한다.

* **Frontend(UI)**: React/Vite는 프롬프트 입력, 모델 선택, 결과 비교 등 사용자 경험에 집중한다.
* **Backend(Serverless)**: Vercel Serverless Functions는 API Key를 안전하게 관리하고 각 LLM 공급자와의 통신을 담당하는 AI Gateway 역할을 수행한다.
* **Router Layer**: 프롬프트의 성격(코드 생성, 문서 요약, 최신 정보 탐색 등)에 따라 적합한 모델을 선택하거나, 동일 프롬프트를 여러 모델에 병렬 요청하여 결과를 비교할 수 있도록 설계한다.
* **Provider Adapter**: GPT, Gemini, Claude, Perplexity를 공통 인터페이스로 추상화하여 향후 새로운 모델(Open Source LLM, Vertex AI, Bedrock 등)을 쉽게 추가할 수 있도록 한다.
* **Observability**: 응답 시간(ms), 토큰 사용량, 추정 비용(USD 및 KRW), 오류율을 함께 기록하여 모델 선택의 근거를 제공한다.

## 프로젝트 발전 로드맵

| 단계          | 목표                  | 핵심 구현                                             |
| ----------- | ------------------- | ------------------------------------------------- |
| **MVP**     | 단일 프롬프트를 선택한 모델로 호출 | React/Vite + Vercel Serverless + Provider Adapter |
| **Phase 2** | 모델 비교               | 병렬 호출, 응답 속도·비용·품질 비교                             |
| **Phase 3** | Auto Router         | 프롬프트 분류 기반 모델 자동 선택                               |
| **Phase 4** | AI Gateway SDK      | 공통 SDK, Provider Adapter, Retry, Logging          |
| **Phase 5** | AI Native Platform  | RAG, MCP, Memory, Multi-Agent Workflow 통합         |

### 참조 프로젝트 활용

질문에 제시한 GitHub 저장소(**goorm-260630-multi-llm-sdk**)는 이 실습의 **Provider Adapter 및 SDK 계층**으로 활용하기에 매우 적합합니다.

권장 구성은 다음과 같습니다.

```text
React/Vite UI
        │
        ▼
Vercel Serverless Functions
        │
        ▼
Multi LLM SDK (공통 인터페이스)
        │
 ┌──────┼────────┬─────────┐
 ▼      ▼        ▼         ▼
GPT   Gemini   Claude   Perplexity
```

이 구조를 사용하면 프론트엔드는 공급자별 API 차이를 몰라도 되고, 새로운 모델을 추가할 때도 SDK의 Adapter만 확장하면 되어 교육용 프로젝트이면서도 실무에서 사용하는 AI Gateway 아키텍처를 자연스럽게 경험할 수 있습니다.
