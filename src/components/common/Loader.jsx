import { Spinner } from 'react-bootstrap';

const Loader = () => {
    return (
        <div className="text-center my-4">
            <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
};

export default Loader;