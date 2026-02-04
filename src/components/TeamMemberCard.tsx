// src/components/TeamMemberCard.tsx
import type { TeamMember } from '../types/team';

interface TeamMemberCardProps {
    member: TeamMember;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
    console.log('Rendering Card:', member.name);
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
            {/* Header / Cover Area - could be a color gradient or partial image */}
            <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
                {/* Online Status Badge (Absolute) */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5 border border-white/30">
                    <span className={`block w-2.5 h-2.5 rounded-full ${member.isOnline ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></span>
                    <span className="text-xs font-medium text-white shadow-sm">
                        {member.isOnline ? 'Online' : 'Offline'}
                    </span>
                </div>
            </div>

            <div className="px-6 pb-6 flex-grow flex flex-col relative">
                {/* Profile Image (Overlapping Header) */}
                <div className="-mt-12 mb-4">
                    <img
                        src={member.photo}
                        alt={member.name}
                        className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-md bg-gray-200 object-cover"
                    />
                </div>

                {/* Name & Role */}
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
                    <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{member.role}</p>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-grow leading-relaxed">
                    {member.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                        {member.tech_stack.map(tech => (
                            <span
                                key={tech}
                                className="px-2.5 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 rounded-full border border-gray-200 dark:border-gray-600"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Footer / Email */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
                    <a
                        href={`mailto:${member.email}`}
                        className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 group"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {member.email}
                    </a>
                </div>
            </div>
        </div>
    );
}
