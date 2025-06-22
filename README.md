# WeWrite

국내 500만 이상의 이용자가 즐기는 웹소설!  
재밌게 글을 읽다 보면 _"아! 이때 이렇게 진행되면 재밌을 것 같은데!"_ 이런 생각 한 번쯤 해본적 없으신가요?

“창작은 어렵고 부담스럽다”는 편견을 깨고,  
누구나 쉽게 좋아하는 이야기를 만들어갈 수 있는 창구를 만들자는 아이디어에서 이 프로젝트는 시작되었습니다.

***WeWrite***는 누구나 작가가 되어, 다른 사람들과 함께 이야기를 이어 쓰며 만들어가는 **참여형 스토리텔링 플랫폼**입니다.

## 📢 배포 주소

[@we-write.netlify.app](we-write.netlify.app)

## 📥 시작하기

```
# 리포지토리 클론
git clone https://github.com/we-write/frontend.git
cd frontend

# 의존성 설치
npm install

# 로컬에서 시작
npm run dev
```

## ⚙ 기술 스택

|              |                                                          |
| :----------: | -------------------------------------------------------- |
|     언어     | **TypeScript**                                           |
|  프레임워크  | **Next.js15.3.2**                                        |
|  라이브러리  | **React19**, **TailWindCSS**, **TipTap**, etc.           |
|   상태관리   | **Context API**, **Tanstack Query**, **React Hook Form** |
| 데이터베이스 | **Codeit Dallaem API**, **Supabase**                     |
|  협업 도구   | **Notion**, **StoryBook**, **Husky**                     |

## 🚩 팀원

<table>
  <tr>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/70846061?v=4" width="120" style="border-radius: 9999px;" />
      <p>홍명헌(myeongheonhong)</p>
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/92986844?v=4" width="120" style="border-radius: 9999px;" />
      <p>강수영(swimmingRiver)</p>
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/163122800?v=4" width="120" style="border-radius: 9999px;" />
      <p>김지혁(juyesu)</p>
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/159544052?v=4" width="120" style="border-radius: 9999px;" />
      <p>장한옥(hoxey2Front)</p>
    </td>
  </tr>
</table>

## 💬 활발한 소통과 토론 문화

프로젝트를 시작하면서 각자의 목표가 있었지만, 공통적으로 공감을 형성한 목표는  
"적극적으로 소통하고 ***팀 프로젝트***에서만 경험할 수 있는 것들을 많이 얻어가자" 였습니다.

이를 지키기 위해 다음과 같은 규칙들을 시행했습니다.

1. **매일 최소 1회의 데일리 스크럼을 반드시 진행하면서 개인의 진행 사항과 계획, 이슈를 공유하기**
2. **근거 있는 컨벤션을 만들기. 그리고 새로운 팀의 룰이 필요하다면 자유롭게 제안하기**
3. **다른 사람이 작성한 코드도 내가 쓴 코드처럼. 꼼꼼한 PR리뷰 작성하기**

프로젝트를 진행하면서 겪는 어찌보면 사소한? 고민도 가볍게 넘어가지 않고  
나름 치열하게 토론하고, 멘토님과 강사님께 여쭤보면서 의미있는 결정을 내리는 문화를 조성하였습니다.

프로젝트 진행 중 활발하게 토론이 이루어진 의제로는 다음과 같은 예시들이 있었습니다.

- 미래의 확장성을 고려한 개발 vs 현재의 요구사항에 부합하는 개발
- 전역 상태를 통한 인증 정보 관리 vs useQuery의 캐싱을 통한 인증 정보 관리
- 함수의 단일 책임 원칙(SRP) 준수 vs 재사용보다는 코드를 분리하기 위한 함수 선언의 최소화
- TypeScript의 타입 자동 추론이 이루어질 때의 타입 명시는 명확성의 증가 vs 불필요한 중복

이처럼 정답이 정해져 있지 않은 주제라도, 단순히 넘어가지 않고  
각 선택에 근거를 가지고 판단하려 노력했습니다.

## 🚀 Front End에 더해서 백엔드와 디자인까지

프로젝트 초기 설계 과정에서 다양하고 재밌는 아이디어들이 제시되었지만  
이를 구현하기 위해서는 UI 디자인과 데이터 베이스가 필요했습니다.

팀에 디자이너도 없고, 백엔드 개발자도 없으니 기본으로 제공되는 명세만 따라갈 수도 있었지만  
우리가 하고 싶은걸 해야 더 즐겁고, 모두가 적극적으로 개발을 할 수 있다고 생각했습니다.

이에 한정된 시간이지만 일과 후와 주말을 틈틈히 활용하여 Figma와 Supabase를 공부하고  
이번 프로젝트에 도입하게 되었습니다.

### 데이터 베이스

스토리를 팀원들과 이어쓰기 위해, 글의 대기 상태, 승인 마감 시간, 승인자 정보를  
유기적으로 관리할 수 있는 스키마 설계에 공을 들였습니다.  
잘못된 스키마는 전체 요청 구조 수정으로 이어져 개발 자원을 낭비할 수 있기 때문에,  
팀원들과 충분히 논의하고 현업 멘토님의 조언도 받으며 신중히 설계했습니다.

또한 DB로 부터 데이터를 요청 및 수정하는 과정을 효율적으로 진행하기 위해서  
에러 핸들링을 위한 공통 유틸리티 함수를 만들었고, CLI로 테이블 기반 타입 자동 생성 기능을 활용하였습니다.

<div style="display: flex; gap: 10px; text-align: center;">
  <div>
    <img src="https://raw.githubusercontent.com/we-write/frontend/590a176fb99cb217f75b4184e26e8ddbe5cf7412/public/assets/images/ReadMe-SupabaseSchema.png" width="100%" />
    <h4>스키마</h4>
  </div>
  <div>
    <img src="https://raw.githubusercontent.com/we-write/frontend/590a176fb99cb217f75b4184e26e8ddbe5cf7412/public/assets/images/ReadMe-SupabaseTroubleShootiong.png" width="100%" />
    <h4>팀원들에게 지식 공유</h4>
  </div>
</div>

### Figma UI

새로운 페이지와 프로젝트 명세에 맞는 컴포넌트 UI를 설계하기 위해 Figma를 적극 활용했습니다.  
감각있는 디자인이나 정교한 레이아웃까지는 구현하기 어려웠지만,  
러프한 시안을 바탕으로도 팀원들과 방향성을 논의하고 의도를 효과적으로 공유하는 데 큰 도움이 되었습니다.

팀원 각자가 Figma를 공부하기 보다는 기존에 사용해본 경험이 있거나,  
이번 기회에 공부를 진행한 팀원이 필요한 단축키나 기능을 공유해주는 방식을 채택하였습니다.

<div style="display: flex; gap: 10px; text-align: center;">
  <div>
    <img src="https://raw.githubusercontent.com/we-write/frontend/590a176fb99cb217f75b4184e26e8ddbe5cf7412/public/assets/images/ReadMe-FigmaUI.png" width="100%" />
    <h4>UI 시안</h4>
  </div>
  <div>
    <img src="https://raw.githubusercontent.com/we-write/frontend/590a176fb99cb217f75b4184e26e8ddbe5cf7412/public/assets/images/ReadMe-FigmaUIKnowledgeSharing.png" width="100%" />
    <h4>팀원들에게 지식 공유</h4>
  </div>
</div>

## 💄 라이브러리를 최소화하고 UI 컴포넌트를 설계

개발 초기, 공통 컴포넌트 구현을 위해 headlessUI나 shadcn과 같은 라이브러리 도입을 고민했습니다.  
라이브러리를 사용하면 개발 시간이 단축되고 완성도를 높일 수 있다고 생각했지만,  
주니어 개발자로서 직접 구현하며 발생하는 문제들을 경험하는 것도 가치 있는 학습 기회가 될 것이라  
판단해 직접 개발하기로 결정했습니다.

> 라이브러리 없이 구현한 컴포넌트 예시
> ![직접 구현한 컴포넌트](https://raw.githubusercontent.com/we-write/frontend/590a176fb99cb217f75b4184e26e8ddbe5cf7412/public/assets/images/ReadMe-CustomComponents.PNG)

컴포넌트들을 설계 하면서 확장성과 재사용성을 고려하며 새로운 기획이 추가되더라도 쉽게 대응될 수 있도록 하였습니다.  
또한 공통 컴포넌트를 구현 후에는 다른 팀원들이 쉽게 UI를 확인하고 동작을 테스트해볼 수 있도록 **StoryBook** 파일을 함께  
생성하여 공유하였습니다.

### TipTap을 사용한 텍스트 에디터 구현

대부분의 컴포넌트를 라이브러리없이 구현했지만, 한 가지 리치 텍스트 에디터(WYSIWYG)의 경우  
사이트의 특징상 사용자가 글을 작성하는 부분이 높은 중요도를 가지기도 하고,
라이브러리 없이 구현하는  
데에 지나치게 높은 개발 자원이 소모될 것이라고 판단하여 TipTap 라이브러리를 도입하고 해당 라이브러리의  
커스텀 Extension 을 활용하여 에디터에 필요한 기능을 직접 구현하는 방식을 채택하였습니다.

> ![직접 구현한 컴포넌트](https://raw.githubusercontent.com/we-write/frontend/590a176fb99cb217f75b4184e26e8ddbe5cf7412/public/assets/images/ReadMe-TipTap.PNG)
> 개발을 진행하는 사람이 팀원들에게 특정 라이브러리를 도입하는 배경과 근거를 설명하는 프로세스를 거쳐서  
> 모두가 프로젝트 내에 어떤 라이브러리가, 왜 사용되었는지를 이해하고 넘어갈 수 있도록 하였습니다.

## 🙋‍♀️ 사용자 피드백 반영

### ⏳ 로딩 성능 개선 진행

가장 많은 피드백을 받은 부분이자, 개발하는 과정에서도 팀원 모두가 체감하던 문제는 바로 느린 로딩 속도였습니다.  
저희는 이 문제의 원인을 다음 2가지로 추측하였습니다.

1. **첫 페이지 렌더링 시에 너무 많은 API 호출이 발생한다.**
2. **스토리그룹, 공개된 스토리 페이지에서 많은 이미지를 서버에서 불러오는 과정에서 지연이 발생한다.**

먼저 첫 번째 원인은 서로 다른 2개의 API를 혼용해서 사용하는 구조에서 비롯되었습니다.  
유저 정보는 Dallaem API에서, 스토리 설정 정보는 Supabase DB에서 각각 가져와야 하고  
한 호출 결과를 다른 호출의 파라미터로 사용하다보니 여러개의 호출이 끝날 때까지
화면이 표시되지 않는 것입니다.

이를 보완하기 위해 제안된 방안은 다음과 같습니다.

1. **Dallaem API 의존도를 줄이고, 자체 Supabase 테이블로 데이터를 이전&관리하여 호출 횟수를 감소** (진행 중)
2. **Server Side Rendering 시에 초기 화면에 그려질 데이터를 prefetch하여 첫 렌더링 속도를 향상** (진행 중)
3. **스켈레톤 UI, Spinner, loading.tsx 등을 조합하여 로딩 시에 사용자 경험을 개선** (진행 중)
4. **필요한 여러개의 요청을 하나의 네트워크 요청을 묶는 다중 쿼리, RPC 등을 도입** (시작 전)

두 번째로 많은 이미지를 불러오는 과정에서 발생하는 지연 문제를 보완하기 위해 제안된 방안은 다음과 같습니다.

1. **next/image의 priority 속성을 활용하여 첫 화면에 보이는 이미지를 우선으로 가져오고, 스크롤 아래의 이미지는 lazy-loading등을 적용** (완료)
2. **next/image의 sizes, quality, placeholder 속성 등을 활용하여 이미지를 최적화하거나 UX개선** (진행 중)
3. **sharp 라이브러리 등을 도입하여 서버에서 들어오는 이미지 크기를 압축한 후에 클라이언트 렌더링** (시작 전)

next/image로 sizes, priority속성을 적용한 브랜치를 기준으로  
lightHouse 테스트 결과 FCP, LCP 등이 소폭 개선된 것으로 확인하였습니다.
| | 기존 | next/image 개선 후 |
|:-------:|:-------:|:-------:|
| Performace(DeskTop) 점수 평균 | 79.5 | 84 |
| Performace(Mobile) 점수 평균 | 63 | 71 |
| First Contentful Paint (FCP) 평균 | 0.35s | 0.2s |
| Largest Contentful Paint (LCP) 점수 평균 | 3.95s | 2.95s |
| Speed Index 평균 | 0.45s | 0.4s |

단, Lighthouse 기반의 성능 측정은 외부 환경에 영향을 받으며, 여전히 렌더링 속도가 느리기 때문에 이를 보완하기 위해서  
다양한 성능 측정 방법을 도입할 예정입니다. 또한 이미지 최적화 방안에 대해서도 추가 논의 중입니다.

### 🔨 '모임'과 '스토리'의 개념 재정립

페이지 로딩을 제외하고 가장 많은 피드백을 받은 부분은 '모임'과 '스토리'의 개념을 구분하기 어렵다는 것이었습니다.  
이러한 피드백을 받은 데에는 여러가지 이유가 있을 것이라 분석하고 있지만,  
그 중 하나는 '모임 찾기'와 '스토리 찾기' 라는 페이지명이 직관적이지 않다고 판단하여 개선을 진행했습니다.

네이밍은 장기적으로 고민하여 더 개선할 계획이지만, 일단 '모임 찾기'는 **'스토리그룹'** 으로,  
'스토리 찾기'는 **'공개된 스토리'** 로 변경하고 아이콘을 추가하여 사용자가 의미를 파악하기에 보다 용이하도록 개선하였습니다.

<div style="text-align: center;">
  <div>
  <h4>개선 전</h4>
    <img src="https://raw.githubusercontent.com/we-write/frontend/590a176fb99cb217f75b4184e26e8ddbe5cf7412/public/assets/images/ReadMe-GnbBefore.PNG" width="100%" />
  </div>
  <div>
    <h4>개선 후</h4>
    <img src="https://raw.githubusercontent.com/we-write/frontend/590a176fb99cb217f75b4184e26e8ddbe5cf7412/public/assets/images/ReadMe-GnbAfter.PNG" width="100%" />
  </div>
</div>

### 🌊 회원가입, 로그인 후에 자연스러운 페이지 전환

초기에는 회원가입이나 로그인 성공 시 모두 홈 화면으로 이동하도록 구현했으나,  
사용자 피드백을 통해 이러한 전환이 다소 부자연스럽게 느껴진다는 점을 인지하고  
개선을 진행하였습니다.

먼저, 회원가입 후 아무런 피드백 없이 홈 화면으로 이동되던 흐름을 개선하여,  
가입 성공 메시지를 토스트로 보여준 뒤 로그인 화면으로 전환되도록 변경했습니다.

또한, 로그인 성공 시에는 사용자가 로그인 전 머물렀던 페이지로 되돌아갈 수 있도록  
리디렉션 로직을 개선했습니다. 이를 위해 **useReferer** 커스텀 훅을 만들어, 이전 페이지의 URL을 인코딩해  
referer로 저장하고, 로그인 성공 시 이를 디코딩하여 해당 페이지로 이동시키도록 구현하였습니다.

```
/auths/signin?referer=...
```

## 👨‍💻 향후 업데이트 계획

### 채팅 기능

- 팀원들간 자유롭게 소통하고, 글 피드백을 주고받을 수 있는 채팅 시스템을 추가할 예정입니다.

### AI 이미지 생성, 맞춤법 검사 기능

- 책 표지를 만들 때 어떠한 이야기를 만들 예정인지 분위기나 키워드를 넣으면  
  AI를 통해 표지 이미지를 만들어주는 기능을 추가할 예정입니다.
- 맞춤법이 틀린 글이 이야기에 포함되지 않도록 AI를 통해 맞춤법을 검사해주는 기능을  
  추가할 예정입니다.

### 팀원의 프로필보기 기능

- 팀원들의 상세 프로필을 확인할 수 있는 기능을 만들어서 서로의 관심사나 성향을 파악할 수 있도록  
  팀원 프로필 보기 기능을 추가할 예정입니다.

### 글 이어쓰기 개선

- 만약에 모임장이 모임에서 탈퇴한다면? 누군가 악의적으로 글을 계속 올린다면?  
  이러한 다양한 상황에서 발생할 수 있는 불편을 해결할 수 있도록 지금의 이어쓰기 시스템을  
  더욱 개선할 예정입니다.
