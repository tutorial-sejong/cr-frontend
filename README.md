# Tutorial-Sejong

<div align="center">
  <img width="50%" src="https://github.com/user-attachments/assets/b724bb30-bb52-4a03-8f5c-31d546cabfb8">
  <br>
  Tutorial-Sejong은 실제와 유사한 환경에서 수강 신청을 연습할 수 있는 서비스를 제공해 학우들의 수강신청 준비에 도움을 드리고자 만들게 된 서비스 입니다.
  <br>
  수강신청이 처음이거나 오랜만 또는 연습이 필요한 세종대 학우들을 위해 최대한 세종대학교 학사시스템 UI와 비슷하게 제작했습니다.
</div>

## 목차

<b> 1. [개요](#개요)</b>
<br>
<b> 2. [주요 기능](#주요-기능)</b>
<br>
<b> 3. [팀 소개](#팀-소개)</b>
<br>
<b> 4. [기술스택](#기술스택)</b>
<br>
<b> 5. [화면](#화면)</b>
<br>
<b> 6. [디렉토리 구조](#디렉토리-구조)</b>

## 개요

<b>배포 주소:</b> https://tutorial-sejong.com/
<br>
<b>프론트 깃허브 주소:</b> https://github.com/tutorial-sejong/cr-frontend
<br>
<b>백엔드 깃허브 주소:</b> https://github.com/tutorial-sejong/cr-backend

## 팀 소개

<table>
<thead>
  <tr>
    <th colspan="4">Tutorial-Sejong</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>안정현</br> <a href="https://github.com/Anhye0n">깃허브</a><br/> </td>
    <td>오지현</br> <a href="https://github.com/zhy2on">깃허브</a><br/> </td>
    <td>문지원</br> <a href="https://github.com/jeewonMoon">깃허브</a><br/> </td>
    <td>황수빈</br> <a href="https://github.com/surra7">깃허브</a><br/> </td>
  </tr>
</tbody>
</table>

## 주요 기능

### 💡2025년 1학기 시간표 검색

- 해당 학기에 맞는 시간표로 업데이트 됩니다.

### 💡관심 과목 담기

- 관심 과목을 기반으로 생성된 시간표를 확인할 수 있습니다.
- 어떤 강의를 많이 담았는지 인기 관심 과목 순위로 알 수 있습니다.

### 💡수강신청

- 학과와 수강신청 날짜(본인학년/전학년)를 선택해 신청할 수 있는 학과를 제한할 수 있습니다.
- 신청 시 10% 확률로 수강 여석이 없을 수 있습니다.
- 시작 후 35초가 지나면 모든 과목의 수강 여석이 마감됩니다. (제한 시간은 변경할 수 있습니다.)

## 기술스택

### 프론트엔드

<img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
<img src="https://img.shields.io/badge/reduxtoolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white"> <img src="https://img.shields.io/badge/githubactions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white">

### 백엔드

<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=Java&logoColor=white">
<img src="https://img.shields.io/badge/spring boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> 
<img src="https://img.shields.io/badge/spring security-6DB33F?style=for-the-badge&logo=SpringSecurity&logoColor=white"> <img src="https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white" />
<img src="https://img.shields.io/badge/githubactions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white">
<img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">

### 협업 툴

<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=Notion&logoColor=white"> <img src="https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=jira&logoColor=white">

## 화면

<details>
<summary>화면 접기/펼치기</summary>
<div markdown="1">

### 로그인

<img src="https://github.com/user-attachments/assets/c9d8f9dd-97e0-4c3f-8725-21d236ecdc4e">

- 회원가입 없이 임의 학번으로 로그인
- 동일한 학번과 비밀번호로 접속 시 관심과목 등 데이터 유지

### 시간표 검색

<img src="https://github.com/user-attachments/assets/88fd868c-e9c3-4ac9-9fd5-a43b5158f02a">

- 메뉴바 하단에서 인기 관심 과목 순위 확인 가능

<img src="https://github.com/user-attachments/assets/74872fe2-d426-4c1b-9301-6f2d33c48ad2">

- 과목 클릭시 상세 정보 모달

### 관심과목 담기

<img src="https://github.com/user-attachments/assets/55df1f8a-a565-4773-a718-543deec1d82a">

<img src="https://github.com/user-attachments/assets/c713f288-5a07-4544-b2be-b4492cacf162">

- 시간표 버튼 클릭했을 때 관심 과목이 없는 경우

![Untitledvideo-MadewithClipchamp2-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/867c1772-832b-4efc-9257-74c3c74f336b)

- 관심 과목 기반 시간표 생성
- 시간이 겹치는 경우:
  - 시작 시간이 같은 경우 -> 끝나는 시간이 빠른 것이 앞으로
  - 시작 시간이 다른 경우 -> 시작 시간이 늦은 것이 앞으로

### 수강신청

<img src="https://github.com/user-attachments/assets/4d11e297-34b7-4a6a-b864-70f384908f39">

- 학과, 수강신청 날짜 선택 가능
- 선택 안 할 시 전학년으로 지정

<img src="https://github.com/user-attachments/assets/c42ddbd9-bc44-440d-aba8-09821646811b">

- 헤더의 시간에 맞춰 시작
- 시작 버튼을 눌러야 검색 가능
- 시간 제한:
  - 기본값 35초
  - 최소/최대값: 10초, 1분(3600초)
  - 최소/최대값을 벗어난 값 입력시 최소/최대값으로 자동 조정

<img src="https://github.com/user-attachments/assets/d35be6b4-528b-43d1-a83e-6d815528f816">

- 랜덤으로 매크로 방지 이미지 생성

<img src="https://github.com/user-attachments/assets/efd7acd4-53b0-4cc8-acff-24bb152d5e96">

- 시작 버튼을 누르고 지정한 제한 시간이 지났거나 10%의 확률로 실패

<img src="https://github.com/user-attachments/assets/513b94b2-b67f-488d-84f1-3bfe8b5f4a20">

- 확인 버튼 누를 시 수강 신청 실패로 간주, 새로고침

### 404

<img src="https://github.com/user-attachments/assets/ad8426b7-5683-4bca-9b8a-151b0c438ea4">

- 잘못된 경로 또는 서버 오류시 보여지는 화면

</div>
</details>
<br>

## 디렉토리 구조

```
cs-frontend
├─ .eslintrc.cjs : lint 규칙
├─ .prettierrc : prettier 설정
├─ index.html
├─ package-lock.json
├─ package.json
├─ README.md
├─ src
│  ├─ apis
│  │  ├─ api : api 요청/응답 코드 폴더
│  │  │  ├─ auth.ts : 로그인 및 인증 관련 코드
│  │  │  └─ course.ts : 강의 및 수강신청 관련 코드
│  │  └─ utils : 인스턴스 / 공통 함수 폴더
│  ├─ App.tsx
│  ├─ assets
│  │  ├─ data
│  │  │  ├─ constant.ts : 상수 데이터
│  │  │  └─ filter.ts : 필터 옵션 데이터
│  │  ├─ img : 아이콘이나 로고 등 필요한 이미지 폴더
│  │  └─ types : 자주 쓰이는 타입 분리 폴더
│  ├─ components
│  │  ├─ common : 여러 곳에서 쓰이는 컴포넌트 폴더
│  │  │  ├─ FilterButton.tsx : 검색, 조회 등 필터 적용 버튼
│  │  │  ├─ FilterInput.tsx
│  │  │  ├─ Modal
│  │  │  │  ├─ handlers
│  │  │  │  │  └─ handler.tsx
│  │  │  │  ├─ AntiMacroCodeModal.tsx : 매크로 모달
│  │  │  │  ├─ EnrollmentInfoModal.tsx : 수강인원 등 강의 정보 모달
│  │  │  │  ├─ ErrorModal.tsx
│  │  │  │  ├─ InfoModal.tsx : 수강신청 모달
│  │  │  │  ├─ LoadingModal.tsx
│  │  │  │  ├─ RankInfoModal.tsx : 인기 관심 과목 상세 정보 모달
│  │  │  │  ├─ TimetableModal : 시간표 모달
│  │  │  │  └─ WaitingModal.tsx : 접속 대기 모달
│  │  │  ├─ SelectBox.tsx : 필터 드롭다운
│  │  │  └─ Table : 강의 목록 테이블
│  │  ├─ CourseRegister : 수강신청 탭
│  │  ├─ DeleteAccount
│  │  ├─ Header
│  │  │  ├─ ...
│  │  │  └─ TopNav.tsx : 타이틀
│  │  ├─ LectureList : 시간표 검색 탭
│  │  ├─ LoginForm
│  │  ├─ Menubar : 사이드 메뉴
│  │  ├─ ProtectedRoute.tsx : 사용자 인증 여부에 따른 접근 제한
│  │  ├─ TabMenu
│  │  ├─ Wishlist : 관심과목 탭
│  │  └─ WishRank : 인기 관심 과목
│  ├─ custom.d.ts : svg 관련 설정 파일
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ DeleteAccount.tsx
│  │  ├─ index
│  │  │  ├─ Home.tsx
│  │  │  ├─ Login.tsx
│  │  │  └─ NotFound.tsx : 에러 페이지
│  │  └─ Maintenance.tsx : 리뉴얼 중 페이지
│  ├─ store : 리덕스 툴킷 관련 폴더
│  │  ├─ hooks
│  │  │  └─ index.ts
│  │  ├─ modules : 슬라이스
│  │  └─ store.ts
│  ├─ styles : 공통 스타일
│  ├─ utils
│  │  ├─ randomUtils.ts : 랜덤 학번 및 숫자 생성
│  │  └─ scrollToTop.ts : 페이지 이동 시 스크롤 초기화
│  └─ vite-env.d.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```
