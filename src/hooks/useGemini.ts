import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

interface UseGeminiResult {
    recommendation: string | null;
    loading: boolean;
    error: string | null;
    getRecommendation: (weatherDescription: string, temperature: number) => Promise<void>;
}

export function useGemini(): UseGeminiResult {
    const [recommendation, setRecommendation] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [history, setHistory] = useState<string[]>([]);

    const getRecommendation = async (weatherDescription: string, temperature: number) => {
        setLoading(true);
        setError(null);
        setRecommendation(null);

        try {
            const apiKey = import.meta.env.VITE_GEMINI_KEY;
            
            if (!apiKey) {
                throw new Error("Gemini API Key가 설정되지 않았습니다.");
            }

            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            const historyText = history.length > 0 
                ? `\n이전에 추천한 스타일들입니다 (이 스타일들은 제외하고 추천해주세요): ${history.join(", ")}` 
                : "";

            const prompt = `
                현재 날씨는 ${weatherDescription}이고, 기온은 ${temperature}도 입니다.
                이 날씨에 어울리는 옷차림을 한국어로 추천해주세요.

                요구사항:
                1. 1-2문장으로 간결하고 친근하게 작성해주세요.
                2. 이모지를 적절히 사용하여 재미있게 표현해주세요.
                3. 구체적인 패션 용어를 사용해주세요 (예: 단순히 '모자' 대신 '베이지색 비니', '파란색 볼캡' 등).
                4. 색상, 소재, 스타일(예: 캐주얼, 미니멀, 스트릿)을 구체적으로 언급해주세요.${historyText}
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            
            setRecommendation(text);
            setHistory(prev => [...prev, text]);
        } catch (err) {
            console.error("Gemini API Error:", err);
            setError("AI 추천을 가져오는데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return { recommendation, loading, error, getRecommendation };
}
