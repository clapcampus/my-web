import { useState, useEffect } from 'react';
import { useTeamFilter } from '../hooks/useTeamFilter';
import { useWeather } from '../hooks/useWeather';
import { useGemini } from '../hooks/useGemini';
import type { TeamMember } from '../types/team';

export default function FashionPage() {
    const { members, loading: membersLoading, error: membersError } = useTeamFilter();
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    // Fetch weather for the selected member's location (or default if none selected)
    const { weather, loading: weatherLoading, error: weatherError } = useWeather(selectedMember?.location || 'Seoul');

    const { recommendation, loading: aiLoading, error: aiError, getRecommendation } = useGemini();

    // Select the first member by default when members are loaded
    useEffect(() => {
        if (members.length > 0 && !selectedMember) {
            setSelectedMember(members[0]);
        }
    }, [members, selectedMember]);

    const handleGetRecommendation = () => {
        if (weather && selectedMember) {
            // Include gender and style in the recommendation request
            getRecommendation(
                // Use the label from weather if available, otherwise just use the code/temp
                `날씨 코드 ${weather.weathercode}`,
                weather.temperature,
                selectedMember.gender,
                selectedMember.style
            );
        }
    };

    // Helper to render AI text with bold styling (reused logic)
    const renderAiText = (text: string) => {
        return text.split(/(\*\*.*?\*\*)/).map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <span key={index} className="font-bold text-yellow-600 dark:text-yellow-300">{part.slice(2, -2)}</span>;
            }
            return <span key={index}>{part}</span>;
        });
    };

    // Weather Icon Helper (Simplified version of WeatherWidget's logic)
    const getWeatherIcon = (code: number) => {
        if (code === 0) return '☀️'; // Clear
        if (code <= 3) return '⛅'; // Cloudy
        if (code <= 48) return '🌫️'; // Fog
        if (code <= 67) return '🌧️'; // Rain
        if (code <= 77) return '🌨️'; // Snow
        return '❓';
    };

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-4">
                        Daily Look <span className="text-neutral-400 italic">Magazine</span>
                    </h1>
                    <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
                        팀원들의 스타일과 현지 날씨를 분석하여 완벽한 오늘의 룩을 제안합니다.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar: Member Selection */}
                    <aside className="lg:col-span-3 space-y-6">
                        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700">
                            <h2 className="text-lg font-semibold mb-4 border-b border-neutral-200 dark:border-neutral-700 pb-2">
                                SELECT MODEL
                            </h2>

                            {membersLoading && <div className="text-center py-4">Loading models...</div>}
                            {membersError && <div className="text-red-500 text-sm">{membersError}</div>}

                            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                                {members.map(member => (
                                    <button
                                        key={member.id}
                                        onClick={() => setSelectedMember(member)}
                                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left group ${selectedMember?.id === member.id
                                            ? 'bg-neutral-900 text-white dark:bg-white dark:text-black shadow-md'
                                            : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'
                                            }`}
                                    >
                                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent group-hover:border-neutral-300 dark:group-hover:border-neutral-500 transition-colors">
                                            <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{member.name}</p>
                                            <p className={`text-xs ${selectedMember?.id === member.id ? 'text-neutral-300 dark:text-neutral-500' : 'text-neutral-500'}`}>
                                                {member.location}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-9 space-y-8">
                        {selectedMember ? (
                            <>
                                {/* Profile & Weather Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Member Profile Card */}
                                    <div className="relative group overflow-hidden rounded-2xl shadow-lg aspect-[4/5] md:aspect-auto">
                                        <img
                                            src={selectedMember.photo}
                                            alt={selectedMember.name}
                                            className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                <p className="text-yellow-400 font-medium tracking-wider text-sm mb-2 uppercase">
                                                    {selectedMember.style || 'Casual Style'}
                                                </p>
                                                <h2 className="text-4xl font-serif font-bold mb-2">{selectedMember.name}</h2>
                                                <p className="text-neutral-300 text-sm line-clamp-2">{selectedMember.description}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Weather & Action Card */}
                                    <div className="flex flex-col gap-6">
                                        <div className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-6">Current Conditions</h3>
                                                {weatherLoading ? (
                                                    <div className="animate-pulse flex space-x-4">
                                                        <div className="rounded-full bg-neutral-200 h-10 w-10"></div>
                                                        <div className="flex-1 space-y-2 py-1">
                                                            <div className="h-2 bg-neutral-200 rounded"></div>
                                                            <div className="h-2 bg-neutral-200 rounded w-3/4"></div>
                                                        </div>
                                                    </div>
                                                ) : weather ? (
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <div className="text-6xl mb-4">{getWeatherIcon(weather.weathercode)}</div>
                                                            <div className="text-5xl font-light mb-1">{weather.temperature}°</div>
                                                            <div className="text-lg text-neutral-500 font-medium">{selectedMember.location}</div>
                                                        </div>
                                                        <div className="text-right space-y-2">
                                                            <div className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 rounded-full text-xs font-medium">
                                                                Wind: {weather.windspeed} km/h
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="text-red-500">{weatherError}</div>
                                                )}
                                            </div>

                                            <button
                                                onClick={handleGetRecommendation}
                                                disabled={aiLoading || !weather}
                                                className="w-full mt-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                            >
                                                {aiLoading ? (
                                                    <>
                                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                                        <span>Styling...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>✨ GET OUTFIT ADVICE</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* AI Recommendation Result */}
                                {(recommendation || aiLoading) && (
                                    <div className="bg-neutral-900 text-neutral-100 p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden transition-all duration-500 animate-fade-in-up">
                                        <div className="absolute top-0 right-0 p-12 opacity-10 font-serif text-9xl leading-none select-none pointer-events-none">
                                            "
                                        </div>

                                        <h3 className="text-xl font-serif text-yellow-500 mb-6 flex items-center gap-3">
                                            <span className="w-8 h-[1px] bg-yellow-500"></span>
                                            AI STYLIST COMMENT
                                        </h3>

                                        {aiLoading ? (
                                            <div className="space-y-4 animate-pulse opacity-50">
                                                <div className="h-4 bg-neutral-700 rounded w-3/4"></div>
                                                <div className="h-4 bg-neutral-700 rounded w-1/2"></div>
                                                <div className="h-4 bg-neutral-700 rounded w-5/6"></div>
                                            </div>
                                        ) : (
                                            <div className="text-lg md:text-xl leading-relaxed font-light">
                                                {renderAiText(recommendation || "")}
                                            </div>
                                        )}

                                        {aiError && <p className="text-red-400 mt-4 text-sm">{aiError}</p>}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="h-[60vh] flex flex-col items-center justify-center text-neutral-400 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl">
                                <span className="text-4xl mb-4">👋</span>
                                <p>왼쪽 목록에서 팀원을 선택해주세요.</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
