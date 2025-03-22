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

    const handleSearch = async (location) => {
        try {
            setIsLoading(true);
            const { data } = await api.get(`/weather/${location}`);
            setWeather(data);
            // Save to history (only if logged in)
            if (user) await api.post('/history', { location });
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
            {user && (
                <div className="mt-5">
                    <h3 className="mb-3">Your Search History</h3>
                    <HistoryList onSearch={handleSearch} />
                </div>
            )}
        </div>
    );
};

export default HomePage;