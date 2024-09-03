import './PersonalData.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import sweetalert for the delete confirmation
import Swal from 'sweetalert2';
import baseApi from '../../../Services/baseApi';

interface UserData {
  name: string;
  email: string;
  password: string;
}

function PersonalData() {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    password: '',
  });

  const [initialUserData, setInitialUserData] = useState<UserData>({
    name: '',
    email: '',
    password: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${baseApi}/me`, {
          method: 'GET',
          credentials: 'include',
        });
        const data: UserData = await response.json();
        setUserData(data);
        setInitialUserData(data);
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des données utilisateur:',
          error
        );
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${baseApi}/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(
          'Erreur lors de la mise à jour des données utilisateur'
        );
      }

      setIsEditing(false);
    } catch (error) {
      console.error(
        'Erreur lors de la mise à jour des données utilisateur:',
        error
      );
    }
  };

  const handleCancel = () => {
    setUserData(initialUserData); // Reset to initial data
    setIsEditing(false);
  };

  const handleDeleteAccount = async () => {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer votre compte ?',
      text: 'Cliquez sur "Oui, je souhaite supprimer" pour le supprimer. Cette action est irréversible. Sinon, cliquez sur "Non, c\'est une erreur".',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, je souhaite supprimer',
      cancelButtonText: "Non, c'est une erreur",
    });

    if (!result.isConfirmed) {
      return;
    }
    try {
      const response = await fetch(`${baseApi}/me`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du compte');
      }

      Swal.fire('Supprimé!', 'Votre compte a été supprimé.', 'success');
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la suppression du compte:', error);
    }
  };

  const hidePassword = () => {
    return '*'.repeat(10);
  };

  return (
    <div className="PersonalData">
      <header>
        <h1 className="PersonalData__Title">Données personnelles</h1>
      </header>
      <div className="PersonalData__details">
        {isEditing ? (
          <div>
            <div className="PersonalData__item">
              <strong>Nom :</strong>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
              />
            </div>
            <div className="PersonalData__item">
              <strong>Email :</strong>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </div>
            <div className="PersonalData__item">
              <strong>Mot de passe :</strong>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" onClick={handleSave}>
              Enregistrer
            </button>
            <button onClick={handleCancel} style={{ marginLeft: '10px' }}>
              Annuler
            </button>
          </div>
        ) : (
          <div>
            <h2 className="PersonalData__item">
              <strong>Nom :</strong> {userData.name}
            </h2>
            <h2 className="PersonalData__item">
              <strong>Email :</strong> {userData.email}
            </h2>
            <h2 className="PersonalData__item">
              <strong>Mot de passe :</strong> {hidePassword()}
            </h2>
            <button type="button" onClick={() => setIsEditing(true)}>
              Modifier mes informations
            </button>
            <button type="button" onClick={handleDeleteAccount}>
              Supprimer mon compte
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PersonalData;
