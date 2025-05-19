import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./styleregister.scss"
import { registerClientService } from '../../../../service/authService';


export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: '',
        status: 'enable',
        groupId: "2"
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [registerError, setRegisterError] = useState('');
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
        setRegisterError('');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Simple validation
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Full name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (!formData.phone) newErrors.phone = 'Phone is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setIsLoading(true);
        try {
            const response = await registerClientService(formData)
            console.log("Response Login: ", response);
            
            if(response && response.data && +response.data.status === 1 && response.data.access_token) {
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('user', JSON.stringify(
                    {
                        email: formData.email,
                        name: 'Test User'
                    }
                ));
                navigate("/")
            }else {
                setRegisterError(response.data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            setRegisterError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    return (
    <div className="register-client">
        <div className="register-client__container">
            <div className="register-client__container__left">
                <p className="register-client__container__left__title">Join Our Community of</p>
                <p className="register-client__container__left__title">Book Lovers</p>
                <p className="register-client__container__left__content">
                    Create an account to track your favorite books, write reviews, and connect with other readers.
                </p>
            </div>
        
            <div className="register-client__container__right">
                {registerError && <div className="error-message">{registerError}</div>}
            
                <form onSubmit={handleSubmit}>
                    <div className="register-client__container__right__title">
                        <span className="register-client__container__right__title__t1">Book</span>
                        <span className="register-client__container__right__title__t2">land</span>
                    </div>
                    <h2>Create Account</h2>
                    <p>Join Bookland and discover amazing books</p>
                
                    <div className="register-client__container__right__wrap-input">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            className={errors.name ? 'error' : ''}
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>
                
                    <div className="register-client__container__right__wrap-input">
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

                    <div className="register-client__container__right__wrap-input">
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            className={errors.phone ? 'error' : ''}
                        />
                        {errors.phone && <span className="error-text">{errors.phone}</span>}
                    </div>

                    <div className="register-client__container__right__wrap-input">
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                            className={errors.address ? 'error' : ''}
                        />
                        {errors.address && <span className="error-text">{errors.address}</span>}
                    </div>

                    <div className="register-client__container__right__wrap-input">
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
                
                    <div className="register-client__container__right__wrap-input">
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={errors.confirmPassword ? 'error' : ''}
                        />
                        {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                    </div>
                
                    <div className="register-client__container__right__wrap-input">
                        <button 
                            type="submit" 
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </div>
                
                    <div className="register-client__container__right__signin">
                        Already have an account? <Link to="/login">Sign In</Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
}