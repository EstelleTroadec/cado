import './MyEvents.scss';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import baseApi from '../../../Services/baseApi';
// interface Event {
//   id: number;
//   name: string;
//   date: string;
//   // Autres données ?
// }
function MyEvent({ user }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
  };
  const fetchEvents = async () => {
    try {
      const response = await fetch(`${baseApi}/me`, {
        // à vérifier pour fetch les bonnes données des événements
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data);
      setEvents(data.events);
      console.log(data);
    } catch (error) {
      console.error('Erreur lors du chargement des événements:', error);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, [user]);
  return (
    <div className="MyEvents">
      <header className="MyEvents__Title">
        <h1 className="MyEvents__h1">Mes évènements</h1>
      </header>
      <div className="MyEvents__container">
        <div className="MyEvents__List">
          {events.map((event: { name: string }, index) => (
            <button
              className="MyEvents__Button"
              key={index}
              type="button"
              onClick={() => handleEventClick(event)}
            >
              {event.name}
            </button>
          ))}
        </div>
        {selectedEvent && (
          <div className="MyEvent__Details">
            <h2 className="MyEvent__Title">
              {(selectedEvent as any).name.toUpperCase()}
            </h2>
            <h3 className="MyEvent__h3">Date : </h3>
            <p className="MyEvent__Date">{(selectedEvent as any).date}</p>
            <h3 className="MyEvent__h3">Participants :</h3>
            <ul className="MyEvent__Participants-List">
              {selectedEvent.participants.map(
                (participant: any, index: any) => (
                  <li className="MyEvent__Participant" key={index}>
                    {participant.name} - {participant.email}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
      <button
        type="button"
        className="MyEvent__Event-creation-button"
        onClick={() => navigate('/creer-un-evenement')}
      >
        Créer un événement
      </button>
    </div>
  );
}
// là où on récupère les events, il faut des propriétés name et details
export default MyEvent;
