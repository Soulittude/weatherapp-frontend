import { Card } from 'react-bootstrap';
import Loader from '../common/Loader';

const WeatherDisplay = ({ weather, isLoading }) => {
    if (isLoading) return <Loader />;

    if (!weather) return null;

    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title className="text-center">
                    {weather.name}, {weather.sys.country}
                </Card.Title>
                <Card.Text className="text-center fs-4">
                    {Math.round(weather.main.temp)}°C
                </Card.Text>
                <div className="d-flex justify-content-around">
                    <div>Humidity: {weather.main.humidity}%</div>
                    <div>Wind: {weather.wind.speed} m/s</div>
                    <div>{weather.weather[0].description}</div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default WeatherDisplay;