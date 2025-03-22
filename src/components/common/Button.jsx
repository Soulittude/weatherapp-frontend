const Button = ({ children, variant = 'primary', ...props }) => {
    return (
        <button
            {...props}
            className={`btn btn-${variant} ${props.className || ''}`}
        >
            {children}
        </button>
    );
};

export default Button;