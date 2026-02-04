# 팀원 소개 페이지 요구사항 명세서 (PRD)

## 1. 가상 팀원 데이터 (Virtual Team Data)

데이터의 일관성을 위해 사용될 가상의 팀원 프로필 데이터입니다.

```json
[
  {
    "id": 1,
    "name": "김철수",
    "role": "Full-Stack Developer",
    "tech_stack": ["React", "Node.js", "PostgreSQL"],
    "description": "복잡한 문제를 단순한 코드로 해결하는 것을 즐깁니다.",
    "email": "chulsoo@example.com"
  },
  {
    "id": 2,
    "name": "이영희",
    "role": "UI/UX Designer",
    "tech_stack": ["Figma", "Adobe XD", "Tailwind CSS"],
    "description": "사용자 중심의 직관적인 인터페이스를 설계합니다.",
    "email": "younghee@example.com"
  },
  {
    "id": 3,
    "name": "박지성",
    "role": "Data Scientist",
    "tech_stack": ["Python", "PyTorch", "Scikit-learn"],
    "description": "데이터 속에서 비즈니스 인사이트를 발굴하는 분석 전문가입니다.",
    "email": "jisung@example.com"
  },
  {
    "id": 4,
    "name": "최유진",
    "role": "Backend Engineer",
    "tech_stack": ["Java", "Spring Boot", "AWS"],
    "description": "대규모 트래픽 처리를 위한 안정적인 아키텍처를 구축합니다.",
    "email": "yujin@example.com"
  },
  {
    "id": 5,
    "name": "정민호",
    "role": "Project Manager",
    "tech_stack": ["Jira", "Slack", "Notion"],
    "description": "팀의 원활한 소통과 효율적인 일정 관리를 조율합니다.",
    "email": "minho@example.com"
  }
]
```

## 2. 요구사항 명세서 (Requirements Specification)

### 2.1 프로젝트 개요

* **프로젝트명:** 팀원 소개 웹 페이지 (Team Directory)
* **목적:** 팀원들의 역할, 기술 스택 및 연락처를 시각적으로 전달하여 협업 효율성 증대

### 2.2 기능 요구사항 (Functional Requirements)

#### 2.2.1 메인 홈 (Home Page)
1. **인사말 표시:** 사용자에게 프로젝트와 팀을 소개하는 따뜻한 환영 메시지를 표시한다.
2. **네비게이션 유도:** 상단 네비게이션 바를 통해 팀 소개 페이지로 이동할 수 않도록 유도한다.

#### 2.2.2 팀원 소개 페이지 (Team Page)
1. **팀원 목록 조회:** 제공된 5명의 데이터를 기반으로 팀원 카드를 화면에 렌더링한다.
2. **기술 스택 필터링:** 특정 기술(예: Python, React)을 선택하면 해당 기술을 보유한 팀원만 필터링하여 보여준다.
3. **상세 보기 (선택):** 팀원 카드를 클릭하면 상세 설명과 연락처가 포함된 모달(Modal)이나 별도 페이지를 출력한다.
4. **반응형 레이아웃:** 데스크탑, 태블릿, 모바일 기기 환경에 맞춰 그리드 레이아웃이 유동적으로 변해야 한다.

### 2.3 비기능 요구사항 (Non-functional Requirements)

1. **성능:** 초기 로딩 속도를 최적화하기 위해 이미지 파일은 WebP 형식을 권장한다.
2. **사용성:** 카드 형태의 UI를 사용하여 가독성을 높이고, 기술 스택은 배지(Badge) 형태로 시각화한다.
3. **접근성:** 모든 이미지에는 `alt` 태그를 부여하고, 웹 표준을 준수한다.

## 3. 추천 기술 스택

* **Frontend:** React 혹은 Next.js (컴포넌트 기반 재사용성 확보)
* **Styling:** Tailwind CSS (빠른 스타일링 및 반응형 대응)
* **Data Handling:** `map()` 함수를 이용한 동적 렌더링
