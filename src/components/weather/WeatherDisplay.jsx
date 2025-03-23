import { Card } from 'react-bootstrap';
import Loader from '../common/Loader';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm } from 'react-icons/wi';

const getWeatherIcon = (condition) => {
    const id = condition.id;
    if (id >= 200 && id < 300) return <WiThunderstorm className="weather-icon text-warning" />;
    if (id >= 300 && id < 600) return <WiRain className="weather-icon text-primary" />;
    if (id >= 600 && id < 700) return <WiSnow className="weather-icon text-info" />;
    if (id >= 700 && id < 800) return <WiCloudy className="weather-icon text-secondary" />;
    return <WiDaySunny className="weather-icon text-warning" />;
};

const WeatherDisplay = ({ weather, isLoading }) => {
    if (isLoading) return <Loader />;
    if (!weather) return null;

    return (
        <Card className="weather-card mb-4">
            <Card.Body className="text-center">
                {getWeatherIcon(weather.weather[0])}
                <Card.Title className="fs-3 mb-3">
                    {weather.name}, {weather.sys.country}
                </Card.Title>
                <div className="d-flex justify-content-around flex-wrap gap-3">
                    <div className="bg-pastel-blue p-3 rounded">
                        <h5>🌡️ Temperature</h5>
                        <p className="mb-0">{Math.round(weather.main.temp)}°C</p>
                    </div>
                    <div className="bg-pastel-green p-3 rounded">
                        <h5>💧 Humidity</h5>
                        <p className="mb-0">{weather.main.humidity}%</p>
                    </div>
                    <div className="bg-pastel-purple p-3 rounded">
                        <h5>🌬️ Wind</h5>
                        <p className="mb-0">{weather.wind.speed} m/s</p>
                    </div>
                </div>
                <div className="mt-4 text-muted">
                    {weather.weather[0].description.charAt(0).toUpperCase() +
                        weather.weather[0].description.slice(1)}
                </div>
            </Card.Body>
        </Card>
    );
};

export default WeatherDisplay;