// src/components/Layout.tsx
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
            {/* Sticky Header with Backdrop Blur */}
            <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            🚀 Clap Campus
                        </span>
                    </div>
                    <NavBar />
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="animate-fade-in-up">
                    <Outlet />
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                        © 2026 리액트 아키텍트 실습. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}