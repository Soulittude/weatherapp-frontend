import { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import Button from '../common/Button';

const RegisterForm = ({ onSubmit, error }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(username, email, password);
    };

    return (
        <Form onSubmit={handleSubmit} className="w-50 mx-auto mt-5">
            <h2 className="text-center mb-4">Create Account</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength="6"
                    required
                />
            </Form.Group>

            <Button type="submit" className="w-100">Register</Button>
        </Form>
    );
};

export default RegisterForm;