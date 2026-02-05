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

export function useWeather(): UseWeatherResult {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // Seoul Coordinates: 37.5665, 126.9780
                const response = await axios.get(
                    'https://api.open-meteo.com/v1/forecast?latitude=37.5665&longitude=126.9780&current_weather=true'
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
    }, []);

    return { weather, loading, error };
}
