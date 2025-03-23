import { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
    const [location, setLocation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!location.trim()) {
            setError('Please enter a location');
            return;
        }
        try {
            setIsLoading(true);
            await onSearch(location.trim());
            setError('');
        } catch (err) {
            setError('Failed to fetch weather data');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="mb-4">
            <InputGroup className="glass-container">
                <Form.Control
                    type="text"
                    placeholder="🌍 Search for a location..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    isInvalid={!!error}
                    className="border-0 bg-transparent"
                />
                <Button
                    variant="light"
                    type="submit"
                    disabled={isLoading}
                    className="ms-2 rounded-pill px-4 shadow-sm"
                >
                    {isLoading ? '🔍 Searching...' : 'Search'}
                </Button>
            </InputGroup>
        </Form>
    );
};

export default SearchBar;