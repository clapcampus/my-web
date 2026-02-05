// src/types/team.ts

export interface TeamMember {
    id: number;
    name: string;
    role: string;
    photo: string; // URL to the image
    isOnline: boolean;
    email: string;
    description: string;
    tech_stack: string[];
    gender?: string;
    style?: string;
    location?: string;
}
