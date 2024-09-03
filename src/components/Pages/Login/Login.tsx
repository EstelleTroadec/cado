// Importing styles specific to this component
import './Login.scss';
import { useNavigate } from 'react-router-dom';
// Importing necessary hooks from react-router-dom and React
import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import {
  login as loginService,
  AuthResponse,
} from '../../../Services/authService';

// Defining the Login component
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Initializing states for email, password, and errors
  const [emailError, setEmailError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // Initializing the useNavigate hook for page navigation
  const navigate = useNavigate();

  // Using the useEffect hook to validate email and password on each change
  useEffect(() => {
    // Checking the validity of the email
    if (email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Veuillez entrer un email valide.');
    } else {
      setEmailError('');
    }
  }, [email]);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // If there are errors, stop execution
    if (emailError) {
      return;
    }

    // Sanitize user inputs
    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedPassword = DOMPurify.sanitize(password);

    try {
      const data: AuthResponse = await loginService(
        sanitizedEmail,
        sanitizedPassword
      );
      localStorage.setItem('authData', JSON.stringify(data));
      navigate('/mon-compte');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        console.error(error);
      }
    }
  };

  // Component rendering
  return (
    <div className="Login__Page">
      <div className="Login">
        <h1 className="Login__Title">Connectez-vous à votre compte</h1>
        {errorMessage && (
          <div className="Login__errorMessage">{errorMessage}</div>
        )}
        {emailError && <div className="Login__emailError">{emailError}</div>}
        <form className="Login__Form" onSubmit={handleSubmit}>
          <div className="Login__email">
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="Login__password">
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="Login__confirmation" type="submit">
            Continuer
          </button>
        </form>
        <p className="Login__newAccount">
          ------ Pas de compte ? Créez-en un ------
        </p>
        <button
          className="Login__createAccount"
          onClick={() => navigate('/s-inscrire')}
        >
          Créer un compte
        </button>
      </div>
    </div>
  );
}

export default Login;
