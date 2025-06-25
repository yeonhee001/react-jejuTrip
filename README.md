<img src="https://github.com/user-attachments/assets/aa3e7c70-4dac-4b1a-a4e5-bb1fd5055bbb" width="1000px"/>

## ✨ 소개
제주 여행을 계획하고 다양한 장소를 탐색할 수 있는 SPA 웹사이트, <b>"떠나봅서"</b> 입니다.

React와 비짓제주, 기상청 오픈 API를 활용하여 <br>
제주 여행자들이 쉽게 정보를 수집하고 즐겁게 여행 계획을 세울 수 있는 웹 서비스입니다. <br>
또한, 480px(모바일)과 768px(태블릿) 해상도에 최적화된 디자인을 적용하여, <br>
다양한 환경에서도 편리하게 이용할 수 있도록 개발했습니다.

## 🔗 배포 URL
https://jeju-trip-02project.vercel.app

## 📑 프로젝트 요약

### 1. 주제

* 제주 여행에 필요한 정보 제공
* 여행 일정 및 준비물 관리
* 여행자 커뮤니티 기능 제공

### 2. 목표

* 비짓제주, 기상청 오픈 API를 활용해 실시간 정보 제공 및 개인화된 여행 서비스 제공
* 다양한 정보 및 관리 기능을 통해 여행자들의 편의성 향상

### 3. 핵심 기능

* SPA (Single Page Application) 기반으로 페이지 이동 없이 빠른 이용 경험 제공
* 관광지, 맛집, 행사 등 다양한 장소 정보 제공
* 커뮤니티를 통한 소통 및 정보 공유
* 일정 작성/관리 및 여행 기간별 추천 일정
* 여행 준비물 체크리스트
* SNS 로그인 및 마이페이지
* 모바일 480px, 태블릿768px

### 4. 주요 기술 스택

* Front-End : React, Zustand, React Router
* Back-End : Node.js, Express
* API 활용 : 비짓제주 Open API, 기상청 Open API

## 📆 기간 및 인원

  * 총 작업 기간 : 25일
    * 기초 데이터 수집 및 화면 설계 기간 : 7일
    * 개발 및 테스트 기간 : 18일
   
  * 팀원 : 5명

## 👩🏻‍🤝‍🧑🏻 팀원 소개

| 이름 | 담당 | 주요 페이지 컴포넌트 | 해당 |
| :---:| :---: | :---: | :---: |
| 소연희 | 팀장/디자인 | Home.jsx, 검색 (search 폴더), 장소 정보 (trip 폴더) | ✔ |
| 안지현 | 기획/개발 | 내 여행 일정 (planner 폴더) | |
| 천지호 | 개발/배포 | 마이페이지 (mypage 폴더), 로그인 (sns) |  |
| 황수빈 | 기획 | 커뮤니티 (community 폴더) | |
| 이용욱 | 리소스 수집 | mypage 폴더 내 Like.jsx, QnA.jsx | |

## 💡 주요 기능

### 1. 제주비짓 API 활용
* 제주비짓 오픈 API를 활용하여, 메인컨텐츠, 검색 기능, 방문자통계 컨텐츠를 제공
* trip 페이지 컴포넌트 내 관광지, 맛집, 축제, 소품샵 등 제주 장소정보 제공

### 2. 기상청 API 활용
* 기상청 API를 활용하여 오늘의 제주날씨 (Home.jsx), <br>
* 오늘~10일까지의 제주날씨 (PlannerDetail.jsx) 컨텐츠를 제공

### 3. 트립
* 장소 좋아요 기능
* 클릭한 장소를 기준으로 주변 관광지 추천 기능

### 4. 떠나톡 (커뮤니티)
* 게시글 작성 조회, 댓글 및 좋아요 기능
  * 여행자들이 서로 정보를 공유하고 소통할 수 있는 커뮤니티 기능 구현  
* 떠나팁 : 관리자들이 제공하는 제주 여행 관련 유용한 정보를 제공

### 5. 내 여행
* 여행 일정 생성 및 수정
  * 사용자가 직접 쉽고 편리하게 여행 계획을 세울 수 있도록 직관적인 UI/UX 제공
* 일정별 장소 추가 및 관리
* 여행 기간별 추천 일정 제공
  * 1박 2일, 2박 3일 등 여행 기간에 맞춘 추천 일정을 제공

### 6. 마이페이지
* 여행 체크리스트 확인 및 관리
  * 사용자가 여행 준비에 필요한 물품을 직접 추가하고, 수정/삭제하며 체계적으로 관리할 수 있도록 지원 
* 내가 작성한 게시글, 댓글 목록 조회
* 내가 좋아요한 게시글, 장소 목록 조회
* 내 활동 한눈에 확인
* 로그인 (sns) : 로그인 후 개인화된 여행 서비스 제공

## 🗂️ 폴더 구조

```
📂Jeju
┣ 📂Jeju-trip                 # 떠나봅서 ( Front-End 프로젝트 )
┃ ┣ 📂public
┃ ┃ ┣ 📂imgs
┃ ┃ ┃ ┗ 📂_icons
┃ ┣ 📂src
┃ ┃ ┣ 📂component             # 컴포넌트 폴더
┃ ┃ ┃ ┣ 📂_common             # 공통 컴포넌트 폴더
┃ ┃ ┃ ┣ 📂00-login            # 로그인 컴포넌트 폴더
┃ ┃ ┃ ┣ 📂00-search           # 검색 컴포넌트 폴더
┃ ┃ ┃ ┣ 📂01-home             # 홈 컴포넌트 폴더
┃ ┃ ┃ ┣ 📂02-trip                 
┃ ┃ ┃ ┃ ┣ 📂tripDetail        # 장소 디테일 컴포넌트 폴더
┃ ┃ ┃ ┃ ┗ 📂tripList          # 장소 리스트 컴포넌트 폴더
┃ ┃ ┃ ┣ 📂03-community
┃ ┃ ┃ ┃ ┣ 📂comment           # 댓글 컴포넌트 폴더
┃ ┃ ┃ ┃ ┣ 📂img               # 갤러리 컴포넌트 폴더
┃ ┃ ┃ ┃ ┗ 📂post              # 게시물 컴포넌트 폴더
┃ ┃ ┃ ┣ 📂04-planner
┃ ┃ ┃ ┃ ┣ 📂calendar          # 달력 컴포넌트 폴더
┃ ┃ ┃ ┃ ┣ 📂plannerDateil     # 내 일정 디테일 컴포넌트 폴더
┃ ┃ ┃ ┃ ┣ 📂search            # 장소추가 컴포넌트 폴더
┃ ┃ ┃ ┃ ┣ 📂ticket            # 내 여행 일정의 하루 단위 티켓 컴포넌트 폴더
┃ ┃ ┃ ┃ ┗ 📂weather           # 내 여행 내 오늘~10일까지 날씨 컴포넌트 폴더
┃ ┃ ┃ ┣ 📂05-mypage
┃ ┃ ┃ ┣ 📂icons
┃ ┃ ┃ ┗ 📂popups              # 팝업 컴포넌트 폴더
┃ ┃ ┣ 📂pages                 # 각 페이지 컴포넌트 폴더
┃ ┃ ┃ ┣ 📂00-search
┃ ┃ ┃ ┣ 📂01-home
┃ ┃ ┃ ┣ 📂02-trip
┃ ┃ ┃ ┣ 📂03-community 
┃ ┃ ┃ ┣ 📂04-planner
┃ ┃ ┃ ┣ 📂05-mypage
┃ ┃ ┃ ┃ ┗ 📂check             # 체크리스트 페이지
┃ ┃ ┃ ┗ 📜Splash.jsx          # 인트로 페이지
┃ ┃ ┣ 📂styles                # scss
┃ ┃ ┣ 📂utils                 # 로그아웃.js
┃ ┣ 📜api.js                  # zustand 전역 상태 관리
┃ ┗ 📜App.js                  # 프로젝트의 전체 라우팅 및 최상위 컴포넌트
┣ ⚙️.env
┗ README.md
┣ 📂Jeju-server               # 떠나봅서 ( Back-End 프로젝트 )
┃ ┣ 📂api                     # API 호출 및 가공하는 라우터 폴더
┃ ┣ 📜index.js                # 서버의 메인 파일, 라우터를 연결하고 서버를 실행
┗ ┗ ⚙️.env
```

## 💻 개발 환경

### 1. Frond-End

| 사용기술 | 설명 |Badge |
| :---:| :---: | :---: |
| **React** | **프론트엔드 프레임워크 (SPA 구축)** |![react](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white)|
|**React Router Dom** | **페이지 라우팅 관리** |![reactrouter](https://img.shields.io/badge/ReactRouter-CA4245?style=flat-square&logo=reactrouter&logoColor=white)|
| **React Hook Form** | **폼 데이터 관리** |![reacthookform](https://img.shields.io/badge/ReactHookForm-F24E1E?style=flat-square&logo=reacthookform&logoColor=white)|
| **Axios** | **HTTP 클라이언트 라이브러리** |![axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)|
|**Zustand** | **상태 관리**|![Zustand](https://img.shields.io/badge/Zustand-181717?style=flat-square&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAv0lEQVQ4jeVUMQ7DIAx0KmZGlJGJB+RBjLyC1/ADVr7AC8gzCBJs7lCpUhqw0qpDqp7kxSefDWd5QkQYwVqLQogh/4oYIwAiDiOlhO/AOYe30+1P4g8FGUUqpSaC7q4Hs9ai1rorFkJAKeUuX0qBZVmGjZgQApRSXVJKeeByzsTQv2DK911urXX/hXMOpZQDt20bcM67NbVWmKjj8AnIJ6/rivDYt2fknMkJrm/K9QXJ4+C9h3med7laKxhjhjV3vjqJYwKihcAAAAAASUVORK5CYII=&logoColor=white)|

### 2. UI/UX & 날짜/시간 라이브러리

| 사용기술 | 설명 | Badge |
| :---:| :---: | :---: |
| **MUI** | **UI 프레임워크** |![mui](https://img.shields.io/badge/MUI-007FFF?style=flat-square&logo=mui&logoColor=white) |
| **Swiper** | **슬라이더** |![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=flat-square&logo=axios&logoColor=white)|
| **react-swipeable** | **스와이프 제스처** |![npm](https://img.shields.io/badge/react--swipeable-00e6a4?style=flat-square&logo=npm&logoColor=white)|
| **motion** | **애니메이션** |![motion](https://img.shields.io/badge/motion-fff312?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMjQgOSI+CiAgPHBhdGggZD0iTSA5LjA2MiAwIEwgNC4zMiA4Ljk5MiBMIDAgOC45OTIgTCAzLjcwMyAxLjk3MSBDIDQuMjc3IDAuODgyIDUuNzA5IDAgNi45MDIgMCBaIE0gMTkuNjU2IDIuMjQ4IEMgMTkuNjU2IDEuMDA2IDIwLjYyMyAwIDIxLjgxNiAwIEMgMjMuMDA5IDAgMjMuOTc2IDEuMDA2IDIzLjk3NiAyLjI0OCBDIDIzLjk3NiAzLjQ5IDIzLjAwOSA0LjQ5NiAyMS44MTYgNC40OTYgQyAyMC42MjMgNC40OTYgMTkuNjU2IDMuNDkgMTkuNjU2IDIuMjQ4IFogTSA5Ljg3MiAwIEwgMTQuMTkyIDAgTCA5LjQ1IDguOTkyIEwgNS4xMyA4Ljk5MiBaIE0gMTQuOTc0IDAgTCAxOS4yOTQgMCBMIDE1LjU5MiA3LjAyMSBDIDE1LjAxOCA4LjExIDEzLjU4NSA4Ljk5MiAxMi4zOTIgOC45OTIgTCAxMC4yMzIgOC45OTIgWiIgZmlsbD0icmdiKDAsIDAsIDApIj48L3BhdGg+Cjwvc3ZnPgo=&logoColor=white)|
| **Sass** | **스타일링**|![Sass](https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white)|
| **@hello-pangea/dnd** | **드래그 앤 드롭** |![npm](https://img.shields.io/badge/@hello--pangea/dnd-CB3837?style=flat-square&logo=npm&logoColor=white)|
| **react-date-range** | **날짜 범위 선택 라이브러리** |![npm](https://img.shields.io/badge/react--date--range-3d91ff?style=flat-square&logo=npm&logoColor=white)|
| **date-fns** | **날짜 및 시간 포맷, 계산** |![datefns](https://img.shields.io/badge/date--fns-770C56?style=flat-square&logo=datefns&logoColor=white)|

### 3. Back-End

| 사용기술 | 설명 | Badge |
| :---:| :---: | :---: |
| **Node.js** | **JavaScript 런타임 환경** |![nodedotjs](https://img.shields.io/badge/Node.js-5FA04E?style=flat-square&logo=nodedotjs&logoColor=white)|
| **Express** | **Node.js 기반 서버 프레임워크** |![express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)|
| **MongoDB** | **NoSQL 데이터베이스** |![mongodb](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)|
| **multer** | **파일 업로드 처리** |![npm](https://img.shields.io/badge/multer-CB3837?style=flat-square&logo=npm&logoColor=white)|
| **JSON** | **데이터 형식 / API 응답 처리, <br> MongoDB 데이터 저장 형식**  |![JSON](https://img.shields.io/badge/JSON-000000?style=flat-square&logo=JSON&logoColor=white)|
| **Nodemon** | **개발 중 서버 자동 재시작 도구** |![nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=flat-square&logo=nodemon&logoColor=white)|
| **Axios** | **서버에서 API 요청을 처리** |![axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)|

### 4. 개발 도구

|사용기술 | 설명 | Badge | 
| :---:| :---: | :---: |
| **Visual Studio Code (VS Code)** | **코드 편집기( 에디터 )** |![VSCode](https://img.shields.io/badge/VSCode-007ACC?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI0LjAwMyAyTDEyIDEzLjMwM0w0Ljg0IDhMMiAxMEw4Ljc3MiAxNkwyIDIyTDQuODQgMjRMMTIgMTguNzAyTDI0LjAwMyAzMEwzMCAyNy4wODdWNC45MTNMMjQuMDAzIDJaTTI0IDkuNDM0VjIyLjU2NkwxNS4yODkgMTZMMjQgOS40MzRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K&logoColor=white) |
|**GitHub** | **버전 관리** |![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white)| 
| **Postman** | **API 테스트** |![postman](https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=postman&logoColor=white)|
| **Vercel** | **서버리스 플랫폼** |![vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)|
| **Figma** | **디자인 & UI/UX**|![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=Figma&logoColor=white) |


## 📚 프로젝트 문서 자료

| 문서종류 | 파일명 | 설명 |
| :---:| :---: | :---: |
| 화면설계 | [화면설계.pdf](https://github.com/yeonhee001/jeju-trip-02project/blob/main/work/2%EC%B0%A8%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8_B%ED%8C%80_01%EA%B8%B0%ED%9A%8D%2C%ED%99%94%EB%A9%B4%EC%84%A4%EA%B3%84.pdf) | 주요 페이지의 화면 구성, 사용자 흐름 등 와이어프레임 기반 설계 자료 |
| 디자인 | [디자인.pdf](https://github.com/yeonhee001/jeju-trip-02project/blob/main/work/2%EC%B0%A8%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8_B%ED%8C%80_02%EB%94%94%EC%9E%90%EC%9D%B8.pdf) | Figma로 작업한 디자인 시안. 색상, 폰트, UI 요소 등 자료 |
| 발표자료 | [발표자료.pdf](https://github.com/yeonhee001/jeju-trip-02project/blob/main/work/2%EC%B0%A8%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8_B%ED%8C%80_%EB%96%A0%EB%82%98%EB%B4%85%EC%84%9C_%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C.pdf) | 팀 프로젝트 발표용 슬라이드 자료 |
| 인터페이스 기능 보고서 | [기능보고서.pdf](https://github.com/yeonhee001/jeju-trip-02project/blob/main/work/2%EC%B0%A8%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8_B%ED%8C%80_%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4%29%EA%B5%AC%ED%98%84%EB%B3%B4%EA%B3%A0%EC%84%9C_%EC%86%8C%EC%97%B0%ED%9D%AC.pdf) | 구현된 기능별 상세 설명 |
| 완료 보고서 | [완료보고서.pdf](https://github.com/yeonhee001/jeju-trip-02project/blob/main/work/2%EC%B0%A8%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8_B%ED%8C%80_%EC%99%84%EB%A3%8C%EB%B3%B4%EA%B3%A0%EC%84%9C.pdf) | 프로젝트 진행 결과 요약 등 최종 보고 |


# 소연희의 개발 상세

## 📑 요약
* 담당
  * 홈 메인 페이지 구현
  * 검색 기능 및 검색 결과 페이지 구현
  * 인기 검색어, 인기 태그 오픈 API 활용
  * 여행지 리스트, 상세페이지 및 장소 좋아요 기능 구현
  * 오픈 API 트립 컴포넌트 내 관광지, 맛집, 축제, 소품샵 등 제주 장소정보 제공
* 담당 컴포넌트 상세
  * Home.jsx - 배너 슬라이드, 탭 메뉴, 날씨 정보, 추천 콘텐츠(랜덤 여행지,맛집) 표시, 관리자 장소 추천, 관광객 통계 시각화 구현
  * Search.jsx - 인기 검색어 및 인기 태그를 표시하고, 사용자 검색어 입력을 처리하는 검색 페이지
  * SearchDetail.jsx - 입력된 검색어 또는 태그 기반으로 관련 콘텐츠를 필터링해 목록 출력
  * Trip.jsx, TripList.jsx - 카테고리별 여행지 콘텐츠 슬라이드 및 리스트 구현
  * TripDetail.jsx - 선택한 콘텐츠의 상세 정보 및 같은 지역의 다른 여행지 콘텐츠 표시

## 🧩 공통 컴포넌트 제작
* 📜Menu.jsx - 모든 페이지 하단에 고정된 메뉴바 컴포넌트
* 📜Header.jsx - 모든 페이지 상단에 고정된 헤더 컴포넌트
* 📜Burger.jsx - 헤더의 메뉴 버튼 클릭 시 나타나는 버거 메뉴 컴포넌트
* 📜PlaceItem.jsx - 여행 콘텐츠를 사용하는 여러 페이지에서 공통으로 사용하는 장소 카드 컴포넌트
* 📜LikeRed.jsx - 여행지 콘텐츠 및 커뮤니티에서 좋아요(하트) 상태를 표시하는 컴포넌트
* 📜MoreBtn.jsx - 여행지 리스트 페이지로 이동하는 '전체보기' 버튼 컴포넌트
* 📜TopBtn.jsx - 리스트 페이지에서 상단으로 스크롤하는 버튼 컴포넌트

  
## 💥 트러블 슈팅

### 📌 Home.jsx

 1. 헤더와 바텀 메뉴를 숨겨야 할 페이지 설정 문제
  
    *특정 페이지에서는 헤더와 바텀 메뉴를 숨겨야 하는 상황
       
    ⇒ **해결방법**: hiddenPaths 변수를 만들어 해당 경로를 지정하고, 해당 페이지일 경우 메뉴가 보이지 않도록 조건 처리<br>

 2. 콘텐츠의 랜덤 데이터가 매번 새로고침되는 이슈
  
    *메인 배너 슬라이드, 관광지, 맛집 콘텐츠는 하루 동안 동일한 데이터를 유지해야 했으나, 초기에는 쿠키 저장 방식에 오류가 있어 새로고침 시마다 데이터가 초기화되는 상황
       
    ⇒ **해결방법**: 쿠키 대신 localStorage를 사용해 현재 시간을 저장하고, 24시간이 지나면 데이터를 삭제하고 새로 생성되도록 처리<br>

 3. 관광객 통계 팝업에서 월 선택 없이 완료 버튼이 눌리는 이슈
  
    *월 선택 팝업에서 선택 없이도 완료 버튼이 눌려 팝업이 닫히는 문제
       
    ⇒ **해결방법**: Month 컴포넌트의 완료 버튼에 선택된 값이 없을 경우 return하도록 조건문을 추가하고, 월 선택 시에만 버튼이 활성화되도록 수정<br>


### 📌 Search.jsx, SearchDetail.jsx

 1. 띄어쓰기가 포함된 인기 검색어가 검색되지 않는 문제
  
    *API에서 받아온 인기 검색어 중 띄어쓰기가 있는 경우 검색 결과가 정상적으로 출력되지 않는 상황
       
    ⇒ **해결방법**: 검색어 데이터를 map으로 순회하며 replace(/\s/g, '')를 사용해 띄어쓰기를 제거하고, 검색이 가능하도록 처리<br>

 2. 검색어 입력 시 h3 태그에 실시간으로 반영되는 이슈
  
    *검색창 아래에 있는 텍스트(h3)에 사용자가 입력하는 값이 실시간으로 반영되어 혼동되는 상황
       
    ⇒ **해결방법**: useState를 활용하여 실시간 반영을 막고, 검색 버튼을 눌렀을 때만 입력값이 저장되도록 로직을 수정<br>


### 📌 TripDetail.jsx

 1. 필터링된 리스트에서 디테일 페이지 이동 시 값이 초기화되는 문제
  
    *리스트 페이지에서 필터를 적용한 후 디테일 페이지로 이동하면, 필터링된 리스트가 유지되지 않고 기본값으로 돌아가는 상황
       
    ⇒ **해결방법**: navigate 함수로 이동할 때 state에 filterList를 함께 전달하고, 디테일 페이지에서는 useLocation 훅을 사용해 전달받은 데이터를 기반으로 필터링된 값을 유지하도록 처리<br>
