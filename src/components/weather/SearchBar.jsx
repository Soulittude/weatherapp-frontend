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
            <InputGroup>
                <Form.Control
                    type="text"
                    placeholder="Search for a location (e.g., London)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    isInvalid={!!error}
                />
                <Button variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? 'Searching...' : 'Search'}
                </Button>
                <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
            </InputGroup>
        </Form>
    );
};

export default SearchBar;