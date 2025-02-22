import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import "./stylelogin.css"

// Test credentials
const TEST_CREDENTIALS = {
    email: 'test@example.com',
    password: 'password123'
}

export default function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [loginError, setLoginError] = useState('')

    const validateForm = () => {
        const newErrors = {}
        if (!formData.email) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid'
        }
        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e) => {
        const { name, value } = e.target
            setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear errors when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
        setLoginError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return

        setIsLoading(true)
        setLoginError('')

        try {
        await new Promise(resolve => setTimeout(resolve, 1000))

        if (
            formData.email === TEST_CREDENTIALS.email &&
            formData.password === TEST_CREDENTIALS.password
        ) {
            sessionStorage.setItem('token', 'fake-jwt-token')
            sessionStorage.setItem('user', JSON.stringify({
                email: formData.email,
                name: 'Test User'
            }))
            
            navigate("/")
        } else {
            setLoginError('Invalid email or password')
        }
        } catch (error) {
            setLoginError('An error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                <h2 className="login-title">Sign in to your account</h2>
                <p className="login-subtitle">
                    Or{' '}
                    <Link to="/auth/register">
                        create a new account
                    </Link>
                </p>
                </div>

                <div className="test-credentials">
                <p><strong>Test Credentials:</strong></p>
                <p>Email: {TEST_CREDENTIALS.email}</p>
                <p>Password: {TEST_CREDENTIALS.password}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {loginError && (
                        <div className="error-message">
                        {loginError}
                        </div>
                    )}

                    <div className="form-group">
                        <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`form-input ${errors.email ? 'error' : ''}`}
                        placeholder="Email address"
                        />
                        {errors.email && (
                        <p className="error-text">{errors.email}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`form-input ${errors.password ? 'error' : ''}`}
                        placeholder="Password"
                        />
                        {errors.password && (
                        <p className="error-text">{errors.password}</p>
                        )}
                    </div>

                    <div className="form-footer">
                        <div className="remember-me">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                        />
                        <label htmlFor="remember-me">
                            Remember me
                        </label>
                        </div>

                        <a href="#" className="forgot-password">
                            Forgot your password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="submit-button"
                    >
                        {isLoading ? (
                        <>
                            <svg className="spinner" width="20" height="20" viewBox="0 0 24 24">
                            <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                                opacity="0.25"
                            />
                            <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                                strokeDasharray="60"
                                strokeDashoffset="60"
                                strokeLinecap="round"
                            />
                            </svg>
                            Signing in...
                        </>
                        ) : (
                        'Sign in'
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

