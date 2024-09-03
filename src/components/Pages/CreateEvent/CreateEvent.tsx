import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateEvent.scss';

import baseApi from '../../../Services/baseApi';

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface Participant {
  name: string;
  email: string;
}

function CreateEvent() {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([
    { name: '', email: '' },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${baseApi}/me`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        console.log('data', data);
        if (response.ok) {
          setUser(data);
        } else {
          setErrorMessage(data.message);
        }
      } catch (err) {
        setErrorMessage('An error occurred. Please try again.');
      }
    };
    fetchUserData();
  }, []);

  const handleAddParticipant = () => {
    const lastParticipant = participants[participants.length - 1];
    if (!lastParticipant.name || !lastParticipant.email) {
      setErrorMessage(
        "Attention : il est nécessaire de remplir tous les champs d'un participant avant d'en ajouter un nouveau ;)"
      );
      return;
    }
    setParticipants([...participants, { name: '', email: '' }]);
  };

  const handleRemoveParticipant = () => {
    const newParticipant = [...participants];
    newParticipant.pop();
    setParticipants(newParticipant);
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !date || !participants) {
      setErrorMessage('Veuillez remplir tous les champs obligatoires');
      return;
    }
    if (!user) {
      setErrorMessage('Utilisateur non trouvé');
      return;
    }
    const organizerId = user.id;
    const participantWithOrganizer = [
      {
        name: user.name,
        email: user.email,
      },
      ...participants,
    ];
    try {
      const response = await fetch(`${baseApi}/create-event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          name,
          date,
          organizer_id: organizerId,
          participants: participantWithOrganizer,
        }),
      });
      const eventResponse = await response.json();
      console.log(eventResponse);
      if (response.ok) {
        navigate('/mes-evenements');
      } else {
        setErrorMessage(
          "Nous sommes désolés... Une erreur est survenue lors de la création de l'évènement"
        );
      }
    } catch (error) {
      setErrorMessage(
        "Nous sommes désolés... Une erreur est survenue lors de la création de l'évènement"
      );
    }
  };

  return (
    <div className="create-event-page">
      <h1 className="create-event-h1">Créer mon évènement</h1>
      <form className="create-event" onSubmit={handleSubmit}>
        <div className="create-event__element">
          <label htmlFor="eventName" className="create-event__element-title">
            * Nom de l'évènement :
          </label>
          <input
            type="text"
            id="eventName"
            value={name}
            placeholder="Nom de l'évènement"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="create-event__element">
          <label htmlFor="eventDate" className="create-event__element-title">
            * Date de l'évènement :
          </label>
          <input
            type="date"
            id="eventDate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{
              color: date ? 'black' : 'gray',
            }}
          />
        </div>
        <div className="create-event__element">
          <label htmlFor="participants" className="create-event__element-title">
            * Participants :
          </label>
          <div className="create-event__participants">
            {participants.map((participant, i) => (
              <div key={i} className="create-event__participant">
                <input
                  className="create-event__input-name"
                  type="text"
                  placeholder="Nom du participant"
                  value={participant.name}
                  onChange={(e) => {
                    const newParticipants = [...participants];
                    newParticipants[i].name = e.target.value;
                    setParticipants(newParticipants);
                    if (e.target.value && newParticipants[i].email) {
                      setErrorMessage('');
                    }
                  }}
                />
                <input
                  className="create-event__input-email"
                  type="email"
                  placeholder="E-mail du participant"
                  value={participant.email}
                  onChange={(e) => {
                    const newParticipants = [...participants];
                    newParticipants[i].email = e.target.value;
                    setParticipants(newParticipants);
                    if (e.target.value && newParticipants[i].name) {
                      setErrorMessage('');
                    }
                  }}
                />
              </div>
            ))}
            <div className="create-event__addNremove-buttons">
              <input
                type="button"
                value="+"
                className="create-event__participants__add-button"
                onClick={handleAddParticipant}
              />
              {participants.length > 1 && (
                <input
                  type="button"
                  value="-"
                  className="create-event__participants__add-button"
                  onClick={handleRemoveParticipant}
                />
              )}
            </div>
          </div>
        </div>
        <p className="create-event__mandatory-fields">
          * Les champs avec une astérisque sont obligatoires
        </p>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <input
          type="submit"
          className="create-event__validation-button"
          value="Valider"
          disabled={
            !name || !date || participants.some((p) => !p.name || !p.email)
          }
        />
      </form>
    </div>
  );
}

export default CreateEvent;
