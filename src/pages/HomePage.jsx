import { useAuth } from '../context/AuthContext';
import SearchBar from '../components/weather/SearchBar';
import WeatherDisplay from '../components/weather/WeatherDisplay';
import HistoryList from '../components/weather/HistoryList';

const HomePage = () => {
    const { user } = useAuth();

    return (
        <div className="home-page">
            <h1 className="text-center mb-4">Weather Dashboard</h1>
            <SearchBar />
            <WeatherDisplay />
            {user && <HistoryList />}
        </div>
    );
};

export default HomePage;