# Tutorial-Sejong

<div align="center">
  <img width="50%" src="https://github.com/user-attachments/assets/b724bb30-bb52-4a03-8f5c-31d546cabfb8">
  <br>
  Tutorial-Sejong은 실제와 유사한 환경에서 수강 신청 연습할 수 있다면 많은 도움이 될 것 같아 만들게 된 서비스 입니다.
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

<b>개발 기간:</b> 2024.07~204.09
<br>
<b>배포 주소:</b> https://tutorial-sejong.com/
<br>
<b>프론트 깃허브 주소:</b> https://github.com/tutorial-sejong/cr-frontend
<br>
<b>백엔드 깃허브 주소:</b> https://github.com/tutorial-sejong/cr-backend

## 팀 소개

<table>
<thead>
  <tr>
    <th colspan="3">Tutorial-Sejong</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>안정현</br> <a href="https://github.com/Anhye0n">깃허브</a><br/> </td>
    <td>오지현</br> <a href="https://github.com/zhy2on">깃허브</a><br/> </td>
    <td>문지원</br> <a href="https://github.com/jeewonMoon">깃허브</a><br/> </td>
  </tr>
</tbody>
</table>

## 주요 기능

### 💡2024년 2학기 시간표 검색

- 해당 학기에 맞는 시간표로 업데이트 됩니다.

### 💡관심 과목 담기

### 💡수강신청

- 신청 시 10% 확률로 수강 여석이 없을 수 있습니다.
- 시작 후 35초가 지나면 모든 과목의 수강 여석이 마감됩니다.

## 기술스택

### 프론트엔드

<img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
<img src="https://img.shields.io/badge/reduxtoolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white"> <img src="https://img.shields.io/badge/githubactions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white">

### 백엔드

<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white"> 
<img src="https://img.shields.io/badge/spring boot-6DB33F?style=for-the-badge&logo=spring boot&logoColor=white"> 
<img src="https://img.shields.io/badge/spring security-6DB33F?style=for-the-badge&logo=Spring Security&logoColor=white"> <img src="https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white" />

### 협업 툴

<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=Notion&logoColor=white"> <img src="https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=jira&logoColor=white">

## 화면

<details>
<summary>화면 접기/펼치기</summary>
<div markdown="1">

### 로그인

<img src="https://github.com/user-attachments/assets/baba38ff-0306-441f-83bd-0bf1e4810b0d">
- 회원가입 없이 임의 학번으로 로그인
<br>
- 동일한 학번과 비밀번호로 접속 시 관심과목 등 데이터 유지

### 시간표 검색

<img src="https://github.com/user-attachments/assets/20b5eee1-a3a1-436b-8e21-6ef737530e5a">

### 관심과목 담기

<img src="https://github.com/user-attachments/assets/9725af7c-c3a2-4489-9ad5-b50efc428e23">

### 수강신청

<img src="https://github.com/user-attachments/assets/da3a3709-5bd7-48a4-ab59-4bdcb406d048">
- 헤더의 시간에 맞춰 시작
<br>
- 시작 버튼을 눌러야 검색 가능
<img src="https://github.com/user-attachments/assets/ff47df6e-ec37-4923-b854-c7f5bacbd341">
- 랜덤으로 매크로 방지 이미지 생성
<img src="https://github.com/user-attachments/assets/285808f2-102b-491a-8aea-75cfe88171c7">
- 시작 버튼을 누르고 35초가 지났거나 10%의 확률로 실패
<img src="https://github.com/user-attachments/assets/a36c196a-acc1-47b5-8d8a-7e75d38e60c5">
- 확인 버튼 누를 시 수강 신청 실패로 간주, 새로고침
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
│  │  ├─ Menubar : 사이드바
│  │  ├─ ProtectedRoute.tsx : 사용자 인증 여부에 따른 접근 제한
│  │  ├─ TabMenu
│  │  └─ Wishlist : 관심과목 탭
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
│  │  ├─ modules
│  │  │  ├─ ...
│  │  │  └─ errorSlice.ts : 에러 모달에 띄울 정보 저장
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
