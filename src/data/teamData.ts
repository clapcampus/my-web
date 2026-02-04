// src/data/teamData.ts
import type { TeamMember } from '../types/team';

export const teamMembers: TeamMember[] = [
    {
        id: 1,
        name: "김철수",
        role: "Full-Stack Developer",
        photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
        isOnline: true,
        email: "chulsoo@example.com",
        description: "복잡한 문제를 단순한 코드로 해결하는 것을 즐깁니다.",
        tech_stack: ["React", "Node.js", "PostgreSQL"]
    },
    {
        id: 2,
        name: "이영희",
        role: "UI/UX Designer",
        photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
        isOnline: false,
        email: "younghee@example.com",
        description: "사용자 중심의 직관적인 인터페이스를 설계합니다.",
        tech_stack: ["Figma", "Adobe XD", "Tailwind CSS"]
    },
    {
        id: 3,
        name: "박지성",
        role: "Data Scientist",
        photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        isOnline: true,
        email: "jisung@example.com",
        description: "데이터 속에서 비즈니스 인사이트를 발굴하는 분석 전문가입니다.",
        tech_stack: ["Python", "PyTorch", "Scikit-learn"]
    },
    {
        id: 4,
        name: "최유진",
        role: "Backend Engineer",
        photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bella",
        isOnline: false,
        email: "yujin@example.com",
        description: "대규모 트래픽 처리를 위한 안정적인 아키텍처를 구축합니다.",
        tech_stack: ["Java", "Spring Boot", "AWS"]
    },
    {
        id: 5,
        name: "정민호",
        role: "Project Manager",
        photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Christopher",
        isOnline: true,
        email: "minho@example.com",
        description: "팀의 원활한 소통과 효율적인 일정 관리를 조율합니다.",
        tech_stack: ["Jira", "Slack", "Notion"]
    }
];
