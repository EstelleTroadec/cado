/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
import './MyEvents.scss';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import baseApi from '../../../Services/baseApi';

interface Event {
  id: number;
  name: string;
  date: string;
  participants: Participant[];
}

interface Participant {
  name: string;
  email: string;
}

const MyEvent: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${baseApi}/me`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data);
      setEvents(data.events);
    } catch (error) {
      console.error('Erreur lors du chargement des événements:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="MyEvents">
      <header className="MyEvents__Title">
        <h1 className="MyEvents__h1">Mes évènements</h1>
      </header>
      <div className="MyEvents__container">
        <div className="MyEvents__List">
          {events.map((event, index) => (
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
              {selectedEvent.name.toUpperCase()}
            </h2>
            <h3 className="MyEvent__h3">Date : </h3>
            <p className="MyEvent__Date">{selectedEvent.date}</p>
            <h3 className="MyEvent__h3">Participants :</h3>
            <ul className="MyEvent__Participants-List">
              {selectedEvent.participants.map((participant, index) => (
                <li className="MyEvent__Participant" key={index}>
                  {participant.name} - {participant.email}
                </li>
              ))}
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
};

export default MyEvent;
