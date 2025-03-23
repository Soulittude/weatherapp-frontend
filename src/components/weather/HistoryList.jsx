import { ListGroup } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import { useEffect, useState } from 'react';

const HistoryList = ({ onSearch, refreshTrigger }) => {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const { data } = await api.get('/history');
                setHistory(data);
            } catch (err) {
                console.error('History fetch failed:', err);
            } finally {
                setIsLoading(false);
            }
        };

        if (user) fetchHistory();
    }, [user, refreshTrigger]);

    if (isLoading) return <div>Loading history...</div>;

    return (
        <div className="glass-container mt-4">
            <h4 className="mb-3">⏳ Recent Searches</h4>
            <ListGroup>
                {history.map((item) => (
                    <ListGroup.Item
                        key={item._id}
                        action
                        onClick={() => onSearch(item.location)}
                        className="d-flex justify-content-between align-items-center mb-2 border-0 bg-pastel-pink"
                    >
                        <span className="text-capitalize">{item.location}</span>
                        <small className="text-muted">
                            {new Date(item.timestamp).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                            })}
                        </small>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default HistoryList;