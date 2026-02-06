import { useState } from 'react';
import axios from 'axios';

interface UseAgentOptions {
    endpoint?: string;
    errorMessage?: string;
}

interface UseAgentReturn {
    query: string;
    setQuery: (query: string) => void;
    answer: string;
    loading: boolean;
    askAgent: () => Promise<void>;
}

export function useAgent(options: UseAgentOptions = {}): UseAgentReturn {
    const {
        endpoint = 'http://localhost:8004/chat',
        errorMessage = 'AI 에이전트 연결에 실패했습니다. 😅'
    } = options;

    const [query, setQuery] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);

    const askAgent = async () => {
        if (!query) return;

        setLoading(true);
        setAnswer('');

        try {
            const res = await axios.post(endpoint, { query });
            setAnswer(res.data.response);
        } catch (error) {
            console.error(error);
            setAnswer(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return {
        query,
        setQuery,
        answer,
        loading,
        askAgent
    };
}
