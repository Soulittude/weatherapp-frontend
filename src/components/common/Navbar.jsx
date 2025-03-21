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
                        <Button onClick={logout}>Logout</Button>
                    ) : (
                        <div>
                            <Button as={Link} to="/login" className="me-2">Login</Button>
                            <Button as={Link} to="/register">Register</Button>
                        </div>
                    )}
                </BSNavbar.Collapse>
            </Container>
        </BSNavbar>
    );
};

export default Navbar;