import { useState, useEffect } from 'react';
import axios from 'axios';

interface WeatherData {
    temperature: number;
    windspeed: number;
    weathercode: number;
    time: string;
}

interface UseWeatherResult {
    weather: WeatherData | null;
    loading: boolean;
    error: string | null;
}

export function useWeather(locationName: string = 'Seoul'): UseWeatherResult {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Simple coordinate mapping
    const locationCoords: Record<string, { lat: number; lon: number }> = {
        'Seoul': { lat: 37.5665, lon: 126.9780 },
        'Busan': { lat: 35.1796, lon: 129.0756 },
        'Incheon': { lat: 37.4563, lon: 126.7052 },
        'Daegu': { lat: 35.8714, lon: 128.6014 },
        'Daejeon': { lat: 36.3504, lon: 127.3845 },
        // Default to Seoul if unknown
        'default': { lat: 37.5665, lon: 126.9780 }
    };

    useEffect(() => {
        const fetchWeather = async () => {
            setLoading(true); // Reset loading state on location change
            try {
                const coords = locationCoords[locationName] || locationCoords['default'];
                
                const response = await axios.get(
                    `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`
                );
                
                // Open-Meteo returns current_weather object
                const data = response.data.current_weather;
                setWeather({
                    temperature: data.temperature,
                    windspeed: data.windspeed,
                    weathercode: data.weathercode,
                    time: data.time
                });
                setError(null);
            } catch (err) {
                console.error("Failed to fetch weather:", err);
                setError('날씨 정보를 가져오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [locationName]); // Re-fetch when locationName changes

    return { weather, loading, error };
}
