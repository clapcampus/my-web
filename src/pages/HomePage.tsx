// src/pages/HomePage.tsx
import Typewriter from '../components/Typewriter';
import WindowSizeTracker from '../components/WindowSizeTracker';
import WeatherWidget from '../components/WeatherWidget';

export default function HomePage() {
    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="max-w-3xl">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        <span className="mr-2">👋</span>
                        <Typewriter
                            text="Welcome to Clap Campus Team!"
                            speed={70}
                            delay={500}
                        />
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        이 프로젝트는 React의 다양한 기능을 실습하기 위해 만들어졌습니다.
                        <br />
                        상단 메뉴를 통해 팀원 소개 페이지를 둘러보거나, 아래의 데모 기능을 확인해보세요.
                    </p>
                </div>
            </div>

            {/* Demo Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Weather Widget */}
                <WeatherWidget />

                {/* Effect Demo 1: Window Tracker */}
                <WindowSizeTracker />
            </div>
        </div>
    );
}