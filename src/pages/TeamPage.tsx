// src/pages/TeamPage.tsx
import TeamMemberCard from '../components/TeamMemberCard';
import { useTeamFilter } from '../hooks/useTeamFilter';

export default function TeamPage() {
    const { members, isOnlineFilter, toggleOnlineFilter, loading, error } = useTeamFilter();
    console.log('TeamPage rendered. Members:', members.length, 'Filter:', isOnlineFilter);


    return (
        <div className="py-8">
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Team</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        함께 꿈을 실현해 나가는 열정적인 동료들을 소개합니다.
                    </p>
                </div>

                <button
                    onClick={toggleOnlineFilter}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 ${isOnlineFilter
                        ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700'
                        }`}
                >
                    <span className={`w-2.5 h-2.5 rounded-full ${isOnlineFilter ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-500'}`}></span>
                    <span className="font-medium text-sm">
                        {isOnlineFilter ? '온라인 팀원만 보기' : '모든 팀원 보기'}
                    </span>
                </button>
            </div>

            {loading && (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            )}

            {error && (
                <div className="text-center py-20">
                    <p className="text-red-500 dark:text-red-400">{error}</p>
                </div>
            )}

            {!loading && !error && members.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {members.map(member => (
                        <TeamMemberCard key={member.id} member={member} />
                    ))}
                </div>
            )}

            {!loading && !error && members.length === 0 && (
                <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400">조건에 맞는 팀원이 없습니다.</p>
                </div>
            )}
        </div>
    );
}