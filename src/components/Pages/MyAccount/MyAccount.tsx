import './MyAccount.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import baseApi from '../../../Services/baseApi';

const MyAccount = () => {
  const [user, setUser] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${baseApi}/me`, {
          method: 'GET',
          credentials: 'include', // Assurez-vous que les cookies sont inclus dans la requête
        });
        const data = await response.json();
        console.log('data', data);
        if (response.ok) {
          setUser(data); // Stockez les informations utilisateur
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="MyAccount">
      <header className="MyAccount-title">
        <h1 className="MyAccount__h1">Mon compte</h1>
      </header>
      <p className="MyAccount-WelcomeMessage">
        Bienvenue {''}
        {user?.name?.charAt(0).toUpperCase() +
          user?.name?.slice(1).toLowerCase()}
        {''} !
      </p>
      <div className="MyAccount__Buttons">
        <button
          className="MyAccount__personalData"
          onClick={() => navigate('/mes-donnees-personnelles')}
        >
          Données personnelles
        </button>

        <button
          className="MyAccount__MyEvents"
          onClick={() => navigate('/mes-evenements')}
        >
          Mes évènements
        </button>

        <button
          className="MyAccount__CreateEvent"
          onClick={() => navigate('/creer-un-evenement')}
        >
          Créer un évènement
        </button>
      </div>
    </div>
  );
};
export default MyAccount;
