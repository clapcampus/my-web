// src/hooks/useTeamFilter.ts
import { useState, useMemo, useEffect } from 'react';
import type { TeamMember } from '../types/team';


export function useTeamFilter() {
    const [isOnlineFilter, setIsOnlineFilter] = useState(false);
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8001/members');
                if (!response.ok) {
                    throw new Error('Failed to fetch team members');
                }
                const data = await response.json();
                setMembers(data);
            } catch (err) {
                console.error('Error fetching members:', err);
                setError('팀원 정보를 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    const toggleOnlineFilter = () => {
        setIsOnlineFilter(prev => !prev);
    };

    const filteredMembers = useMemo(() => {
        if (isOnlineFilter) {
            return members.filter(member => member.isOnline);
        }
        return members;
    }, [isOnlineFilter, members]);

    return {
        members: filteredMembers,
        isOnlineFilter,
        toggleOnlineFilter,
        loading,
        error
    };
}
