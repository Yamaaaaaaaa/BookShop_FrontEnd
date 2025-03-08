import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./adminlogin.scss";

// Test credentials
const TEST_CREDENTIALS = {
    email: 'admin@example.com',
    password: 'admin123'
};


const LoginPage = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear errors when typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
        setLoginError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // if (!validateForm()) return;

        setIsLoading(true);
        setLoginError('');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (
                formData.email === TEST_CREDENTIALS.email && 
                formData.password === TEST_CREDENTIALS.password
            ) {
                // Store auth data
                sessionStorage.setItem('token', 'fake-jwt-token');
                sessionStorage.setItem('admin', JSON.stringify({
                email: formData.email,
                    role: 'admin'
                }));

                // Redirect to dashboard
                navigate('/admin/dashboard');
            } else {
                setLoginError('Invalid email or password');
            }
        } catch (error) {
            setLoginError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="admin-login-page">
            <div className="admin-login-page__left">
                <div className="admin-login-page__signin">
                    <h1 className="admin-login-page__title">Management Page</h1>
                    <p className="admin-login-page__subtitle">Please enter your credentials to log in</p>
                    
                    <form className="admin-login-form" onSubmit={handleSubmit}>
                        <div className="admin-login-form__group">
                            <input 
                                type="email"
                                name="email"
                                className={`admin-login-form__input ${errors.email ? 'admin-login-form__input--error' : ''}`}
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && (
                                <span className="admin-login-form__error">{errors.email}</span>
                            )}
                        </div>
                        
                        <div className="admin-login-form__group">
                            <input 
                                type="password"
                                name="password"
                                className={`admin-login-form__input ${errors.password ? 'admin-login-form__input--error' : ''}`}
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && (
                                <span className="admin-login-form__error">{errors.password}</span>
                            )}
                        </div>

                        {loginError && (
                            <div className="admin-login-form__error-message">
                                {loginError}
                            </div>
                        )}
                        
                        <a href="#" className="admin-login-form__forgot">Forgot password?</a>
                        
                        <button 
                            type="submit" 
                            className="admin-login-form__button"
                            disabled={isLoading}
                        >
                        {isLoading ? 'Signing in...' : 'SIGN IN'}
                        </button>
                    </form>
                </div>
            </div>

            <div className="admin-login-page__right">
                <div className="admin-login-page__signup">
                    
                    <h2 className="admin-login-page__brand">
                        Book<span className="admin-login-page__brand--highlight">land</span>
                    </h2>
                    <p className="admin-login-page__manage">Manage Page</p>
                    
                    <p className="admin-login-page__cta">
                        New to our platform? Sign Up now.
                    </p>
                    
                    <button className="admin-login-page__button">
                        SIGN UP
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;