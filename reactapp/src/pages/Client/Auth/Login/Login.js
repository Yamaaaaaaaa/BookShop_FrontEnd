import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./stylelogin.scss"
import { loginClientService } from '../../../../service/authService';


export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear errors when user types
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

        // Simple validation
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);

        try {
            const response = await loginClientService(formData)
            console.log("Response Login: ", response);
            
            if(response && response.data && +response.data.status === 1 && response.data.access_token) {
                sessionStorage.setItem('access_token', response.data.access_token);
                sessionStorage.setItem('user', JSON.stringify(
                    {
                        email: formData.email,
                        name: 'Test User'
                    }
                ));
                navigate("/")
            }else {
                setLoginError(response.data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            setLoginError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
    <div className="login-client">
        <div className="login-client__container">
            <div className="login-client__container__left">
                {loginError && <div className="error-message">{loginError}</div>}
            
                <form onSubmit={handleSubmit}>
                    <div className="login-client__container__left__title">
                        <span className="login-client__container__left__title__t1">Book</span>
                        <span className="login-client__container__left__title__t2">land</span>
                    </div>
                    <h2>Welcome Back</h2>
                    <p>Sign in to access your account</p>
                
                    <div className="login-client__container__left__wrap-input">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>
                
                    <div className="login-client__container__left__wrap-input">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'error' : ''}
                        />
                        {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>
                
                    <Link to="/forgot-password">Forgot password?</Link>
                
                    <div className="login-client__container__left__wrap-input">
                        <button 
                            type="submit" 
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </div>
                
                    <div className="login-client__container__left__signup">
                        Don't have an account? <Link to="/register">Sign Up</Link>
                    </div>
                </form>
            </div>
            
            <div className="login-client__container__right">
                <p className="login-client__container__right__title">Discover Your Next</p>
                <p className="login-client__container__right__title">Favorite Book</p>
                <p className="login-client__container__right__content">
                    Sign in to explore our vast collection of books and enjoy personalized recommendations.
                </p>
            </div>
        </div>
    </div>
    );
}