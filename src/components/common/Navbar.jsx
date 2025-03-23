import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, Navbar as BSNavbar, Container } from 'react-bootstrap';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <BSNavbar bg="light" expand="lg">
            <Container>
                <BSNavbar.Brand as={Link} to="/">Weather App</BSNavbar.Brand>
                <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BSNavbar.Collapse className="justify-content-end">
                    {user ? (
                        <div className="d-flex align-items-center">
                            <span className="me-3">Welcome, {user.username}</span>
                            <Button onClick={logout} variant="outline-danger">Logout</Button>
                        </div>
                    ) : (
                        <div>
                            <Button as={Link} to="/login" variant="outline-primary" className="me-2">Login</Button>
                            <Button as={Link} to="/register" variant="primary">Register</Button>
                        </div>
                    )}
                </BSNavbar.Collapse>
            </Container>
        </BSNavbar>
    );
};

export default Navbar;