import { useWeather } from '../hooks/useWeather';
import { useGemini } from '../hooks/useGemini';

export default function WeatherWidget() {
    const { weather, loading, error } = useWeather();
    const { recommendation: aiRecommendation, loading: aiLoading, error: aiError, getRecommendation } = useGemini();

    // Helper to get weather icon/description based on code
    const getWeatherInfo = (code: number) => {
        // Simple simplified mapping for Open-Meteo codes
        // 0: Clear sky, 1-3: Mainly clear, partly cloudy, and overcast
        // 45, 48: Fog
        // 51-55: Drizzle
        // 61-67: Rain
        // 71-77: Snow
        // 80-82: Rain showers
        // 95-99: Thunderstorm
        if (code === 0) return { icon: '☀️', label: '맑음' };
        if (code <= 3) return { icon: '⛅', label: '구름 조금' };
        if (code <= 48) return { icon: '🌫️', label: '안개' };
        if (code <= 55) return { icon: '🌦️', label: '이슬비' };
        if (code <= 67) return { icon: '🌧️', label: '비' };
        if (code <= 77) return { icon: '🌨️', label: '눈' };
        if (code <= 82) return { icon: '🌦️', label: '소나기' };
        if (code <= 99) return { icon: '⛈️', label: '뇌우' };
        return { icon: '❓', label: '알 수 없음' };
    };

    if (loading) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse h-48 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                    <span className="text-sm text-gray-400">날씨 불러오는 중...</span>
                </div>
            </div>
        );
    }

    if (error || !weather) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-red-100 dark:border-red-900/30 h-48 flex items-center justify-center">
                <div className="text-center">
                    <span className="text-2xl mb-2 block">⚠️</span>
                    <p className="text-red-500 text-sm">{error || '데이터 없음'}</p>
                </div>
            </div>
        );
    }

    const { icon, label } = getWeatherInfo(weather.weathercode);

    return (
        <div className="bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl p-6 text-white shadow-lg overflow-hidden relative">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold text-sky-50">서울 날씨</h3>
                        <p className="text-sky-100 text-xs mt-1">
                            {new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' })}
                        </p>
                    </div>
                    <div className="text-4xl filter drop-shadow-md animate-bounce-slow">
                        {icon}
                    </div>
                </div>

                <div className="mt-4">
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold">{weather.temperature}°</span>
                        <span className="text-lg font-medium text-sky-100">{label}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-sky-100">
                        <div className="flex items-center gap-1">
                            <span>💨</span>
                            <span>{weather.windspeed} km/h</span>
                        </div>
                    </div>
                </div>

                {/* AI Fashion Advisor Section */}
                <div className="mt-6 pt-4 border-t border-white/20">
                    {!aiLoading && (
                        <button
                            onClick={() => getRecommendation(label, weather.temperature)}
                            className="w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 mb-3"
                        >
                            <span>🤖</span>
                            {aiRecommendation ? '다른 옷차림 추천받기' : 'AI 옷차림 추천받기'}
                        </button>
                    )}

                    {aiLoading && (
                        <div className="text-sm text-sky-100 animate-pulse text-center py-2">
                            AI가 오늘의 룩을 고민중예요... ✨
                        </div>
                    )}

                    {aiRecommendation && (
                        <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                            <p className="text-sm leading-relaxed">
                                <span className="mr-1">👗</span>
                                {aiRecommendation}
                            </p>
                        </div>
                    )}

                    {aiError && (
                        <p className="text-xs text-red-200 text-center mt-2">{aiError}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
