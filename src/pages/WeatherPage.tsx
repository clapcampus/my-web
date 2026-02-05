import WeatherWidget from '../components/WeatherWidget';

export default function WeatherPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                    🏙️ Seoul Weather Forecast
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    실시간 서울 날씨 정보를 확인하세요.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Weather Widget Section */}
                <div className="transform hover:scale-105 transition-transform duration-300">
                    <WeatherWidget />
                </div>

                {/* Additional Info / Placeholder Context */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                        About Weather API
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                        이 폼은 <strong>Open-Meteo API</strong>를 사용하여 구현되었습니다.
                        별도의 API Key 없이 무료로 사용할 수 있으며, 전 세계의 날씨 정보를 제공합니다.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <p className="text-sm text-blue-800 dark:text-blue-300">
                            <strong>Data Source:</strong><br />
                            Latitude: 37.5665 (Seoul)<br />
                            Longitude: 126.9780 (Seoul)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
