import { ListGroup } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import { useEffect, useState } from 'react';

const HistoryList = ({ onSearch }) => {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const { data } = await api.get('/history');
                setHistory(data);
            } catch (err) {
                console.error('Failed to fetch history:', err);
            } finally {
                setIsLoading(false);
            }
        };

        if (user) fetchHistory();
    }, [user]);

    if (isLoading) return <div>Loading history...</div>;

    return (
        <ListGroup>
            <ListGroup.Item className="text-center fw-bold bg-light">
                Recent Searches
            </ListGroup.Item>
            {history.map((item) => (
                <ListGroup.Item
                    key={item._id}
                    action
                    onClick={() => onSearch(item.location)}
                    className="d-flex justify-content-between align-items-center"
                >
                    <span>{item.location}</span>
                    <small>{new Date(item.timestamp).toLocaleDateString()}</small>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default HistoryList;