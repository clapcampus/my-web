import { useState, useEffect } from 'react';

export default function WindowSizeTracker() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                📐 Window Size Tracker
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                This component uses <code>useEffect</code> to add a resize event listener.
                Try resizing your browser window!
            </p>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                    <p className="text-xs text-blue-600 dark:text-blue-400 uppercase font-bold tracking-wider">Width</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{windowSize.width}px</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                    <p className="text-xs text-purple-600 dark:text-purple-400 uppercase font-bold tracking-wider">Height</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{windowSize.height}px</p>
                </div>
            </div>
        </div>
    );
}
