import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import SearchBar from '../components/weather/SearchBar';
import WeatherDisplay from '../components/weather/WeatherDisplay';
import HistoryList from '../components/weather/HistoryList';
import api from '../api/axios';

const HomePage = () => {
    const { user } = useAuth();
    const [weather, setWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [historyTrigger, setHistoryTrigger] = useState(0);

    const handleSearch = async (location) => {
        try {
            setIsLoading(true);
            const { data } = await api.get(`/weather/${location}`);
            setWeather(data);
            if (user) {
                await api.post('/history', { location });
                setHistoryTrigger(prev => prev + 1); // Trigger history refresh
            }
        } catch (err) {
            console.error('Search failed:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Weather App</h1>
            <SearchBar onSearch={handleSearch} />
            <WeatherDisplay weather={weather} isLoading={isLoading} />

            {/* Add a section header for history */}
            {user && <HistoryList onSearch={handleSearch} refreshTrigger={historyTrigger} />}
        </div>
    );
};

export default HomePage;