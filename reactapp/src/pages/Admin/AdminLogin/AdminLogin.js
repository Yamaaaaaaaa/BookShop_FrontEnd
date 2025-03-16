import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./adminlogin.scss";
import { loginAdminService } from "../../../service/authService";
import { toast } from "react-toastify";


const LoginPage = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false);


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
        
        // Simple validation
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        
        if (Object.keys(newErrors).length > 0) {
            setLoginError(newErrors);
            return;
        }

        setIsLoading(true);

        try {
            const response = await loginAdminService(formData)
            console.log("Response Admin Login: ", response);
            
            if(response && +response.status === 1 && response.access_token) {
                sessionStorage.setItem('access_token', response.access_token);
                sessionStorage.setItem('admin', JSON.stringify(response.data));
                navigate("/admin/dashboard")
                toast.success(response.message)
                return
            }else {
                setLoginError(response.message);
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