# Freedsoft 사전 과제\_기웅민

## Getting Started

### 파일 압축 해제 후 다음 명령어 실행

```
$ npm install
```

### 환경 변수 설정

```
NEXT_PUBLIC_API_URL = "https://jsonplaceholder.typicode.com/albums"
NEXT_PUBLIC_IMAGE_API_URL = "https://place-hold.it"
```

### 실행

```
$ npm run build
$ npm run start
```

### 테스트

```
$ npm run cypress
```

## 페이지 구성

```
http://localhost:3000/ => Home Page
http://localhost:3000/album => Album Page(과제구현페이지)
```

---

## 사용 기술

### Next JS

- <details>
    <summary>
      느낀점
    </summary>
    CSR과 SSR의 개념은 알고 있었으며, Node를 사용해 ejs파일을 넘기는 식으로 간단하게 SSR을 구성해본 적이 있었습니다. 하지만 최근 많이 사용되는 CSR + SSR 개념을 적용해 본 적이 없어 이번 기회를 통해 Next.js(이하 Next)를 사용해볼 수 있어서 좋고 재밌었습니다.
    Next의 가장 큰 장점인 Router를 따로 설정할 필요가 없다는 점을 느낄 수 있었습니다.

  Next의 Link API를 사용해 path를 적어주고, pages 폴더에 같은 이름의 js파일을 생성하면 끝이었습니다. 과제를 한 페이지로 구성할 수도 있었지만, 하나의 페이지만으로는 Next를 사용하는 의미가 없어질 것 같아 Home과 Album 페이지로 나누어 제작했습니다.

  각각 URL로 접속 후 서버로 요청이 들어오게 되면 \_app.js 컴포넌트가 가장 먼저 실행된 후 공통 레이아웃을 만들게 됩니다. 공통 레이아웃에 Navbar를 제작해 모든 페이지에서 Navbar가 보일 수 있도록 제작했습니다. 이 후 컴포넌트들이 실행되어 Server에서 렌더링한 후 DOM을 생성해 Client에 html 파일을 넘기게 됩니다.

- <details>
    <summary>
      SSR vs SSG
    </summary>
    SSR 개념에서 가장 중요한 pre-render를 하는데, Next에서 제공하는 두 가지 형식이 있습니다.

  - Static-Generation (추천) : HTML을 빌드 타임에 각 페이지별로 생성하고 해당 페이지로 요청이 올 경우 이미 생성된 HTML 문서를 반환한다.
  - Server-Side-Rendering : 요청이 올 때마다 해당하는 HTML 문서를 그때그때 생성하여 반환한다.

  기본적으로 Next는 빌드타임(npm run build)에 pages폴더에서 작성한 각 페이지에 대한 HTML 문서를 생성하여 static 문서로 가지고 있게 됩니다. 엄밀히 말하면 Next는 SSR 형식이 아닌 SSG를 사용하고 있다고 말할 수 있습니다.

  이 개념은 Next가 페이지를 구현할 때뿐 아니라 data를 fetch 할 때도 적용이 됩니다.

  - getStaticProps: fetch하고 받은 response가 빌드 시 고정되어 빌드 이후에 수정 불가능 (revalidate 옵션 설정 시 재생성 가능)
  - getServerSideProps: 빌드와 상관없이, 페이지 요청마다 데이터를 서버로부터 가져옴.

  이번 과제의 경우 데이터가 계속 바뀌어야 하지 않는다고 판단하여 getStaticProps를 사용하였습니다. 단, 외부 데이터가 업데이트될 수 있으므로, revalidate 옵션을 넣어주어 일정 시간이 지나면 재생성할 수 있도록 구성하였습니다.
  </details>

## 아쉬운 점

### 전역상태관리(Zustand)

- <details>
    <summary>
      사용 동기
    </summary>
    이번 과제는 API에서 데이터를 받아와 목록을 만드는 작업이 끝이므로 전역 상태 관리는 overengineering일 수 있습니다. 하지만 과제로 끝나는 것이 아닌, 서비스를 운영한다면 전역 상태 관리가 필요하지 않을까 생각이 들어 적용을 하기로 하였습니다.

  적용 간 항상 사용해왔던 Redux가 아닌, boiler plate가 훨씬 적어 인기를 얻고 있다는 Zustand를 적용해보았습니다. Zustand는 create함수를 사용하여 useStore Hook을 생성하고, state를 변경하는 콜백을 인자로 받는 set을 활용하여 redux의 reducer를 구현할 수 있습니다.
  </details>

- <details>
    <summary>
      zustand로 다양한 상태 관리
    </summary>
    전역 상태를 관리할 때 Redux의 경우 최상단에 store를 저장해 사용합니다. Next도 이처럼 구성 하려면, 최상단에서 관리를 해야한다고 생각해 최상단에 생성했습니다. 과제에서는 album api 데이터를 제외한 다른 상태 값들은(ex. 이미지 변경 여부, 버튼 클릭 여부 등) 전역으로 관리할 필요가 없다고 생각해 album api 데이터만 전역으로 관리했지만 다양한 상태 값들을 관리할 때의 처리 방법을 경험하지 못한 것이 아쉬웠습니다.

### E2E Test, Cypress

- <details>
    <summary>
      느낀점
    </summary>
      Next를 사용함에 따라 비동기 통신(fetch)이 Server Side에 있어 Unit Test를 하기엔 적합하지 못하다고 생각했습니다.
      따로 페이지를 하나 더 추가했기 때문에 Cypress를 사용한 E2E테스트가 적합하다고 생각하였고, 이를 적용해 보려 했습니다. 유닛 테스트로는 불가능한 사용자 관점의 테스트도 가능한 E2E 테스트를 시도해보면서 다양한 테스트 방식을 학습하고 상황에 따라 적합한 테스트 방식을 채택 해야한다는 것을 배울 수 있는 경험이었습니다.
  </details>
