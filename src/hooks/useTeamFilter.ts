// src/hooks/useTeamFilter.ts
import { useState, useMemo } from 'react';
import type { TeamMember } from '../types/team';
import { teamMembers } from '../data/teamData';

export function useTeamFilter() {
    const [isOnlineFilter, setIsOnlineFilter] = useState(false);

    const toggleOnlineFilter = () => {
        setIsOnlineFilter(prev => !prev);
    };

    const members = useMemo(() => {
        if (isOnlineFilter) {
            return teamMembers.filter(member => member.isOnline);
        }
        return teamMembers;
    }, [isOnlineFilter]);

    return {
        members,
        isOnlineFilter,
        toggleOnlineFilter
    };
}
