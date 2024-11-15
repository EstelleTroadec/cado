/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-console */
import './SignUp.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import baseApi from '../../../Services/baseApi';

function SignUp() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [signUpStatus, setSignUpStatus] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Sanitize user inputs
    const sanitizedData = {
      name: DOMPurify.sanitize(name),
      email: DOMPurify.sanitize(email),
      password: DOMPurify.sanitize(password),
    };

    console.log('Sanitized Data:', sanitizedData); // Log the sanitized data

    fetch(`${baseApi}/register`, {
      method: 'POST',
      body: JSON.stringify(sanitizedData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          return response.json().then((data) => {
            console.error('Error data:', data);
            throw new Error('Network response was not ok');
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.name && data.email && data.password) {
          setSignUpStatus('Inscription réussie !');
          setName('');
          setEmail('');
          setPassword('');
          navigate('/se-connecter'); // Redirect to the login page
        } else {
          setSignUpStatus("Échec de l'inscription : Données manquantes");
        }
      })
      .catch((error) => {
        console.log('Error:', error);
        setSignUpStatus("Échec de l'inscription : une erreur est survenue");
        setName('');
        setEmail('');
        setPassword('');
      });
  };

  return (
    <div className="SignUp__Page">
      <header className="SignUp__title">
        <h1 className="SignUp__h1"> Organisez rapidement vos évènements</h1>
      </header>
      <div className="SignUp">
        <h2 className="SignUp__h2">Inscription</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="Input">
            Nom :
          </label>
          <input
            className="SignUp__name"
            type="text"
            id="name"
            placeholder="Entrez votre nom"
            value={name}
            onChange={(e) => setName(DOMPurify.sanitize(e.target.value))}
          />
          <label htmlFor="email" className="Input">
            Email :
          </label>
          <input
            className="SignUp__email"
            type="email"
            id="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(DOMPurify.sanitize(e.target.value))}
          />

          <label htmlFor="password" className="Input">
            Mot de passe :
          </label>

          <input
            className="SignUp__password"
            type="password"
            id="password"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(DOMPurify.sanitize(e.target.value))}
          />
          {signUpStatus && <p>{signUpStatus}</p>}
          <button className="SignUp__confirmation" type="submit">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
