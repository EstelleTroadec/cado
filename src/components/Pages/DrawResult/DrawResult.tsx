/* eslint-disable react/function-component-definition */
/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import baseApi from '../../../Services/baseApi';
import './DrawResult.scss';

// fictive list of participants to test the feature
const participants = ['Shakira', 'Beyoncé', 'Babar', 'Neymar', 'Pikachu'];

interface Event {
  name: string;
  date: string;
}

interface DrawPair {
  giverName: string;
  receiverName: string;
  event_id: string;
}

interface Params {
  token: string;
  [key: string]: string | undefined;
}

const DrawResult: React.FC = () => {
  // states specific to the drawing
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  // states for draw pair and loading/error handling
  const [drawPair, setDrawPair] = useState<DrawPair | null>(null);
  const [eventDetails, setEventDetails] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useParams<Params>();

  useEffect(() => {
    const fetchDrawPair = async () => {
      try {
        const response = await fetch(`${baseApi}/view/${token}`);
        const data: DrawPair = await response.json();
        setDrawPair(data);

        // Fetch event details using event_id from drawPair
        const eventResponse = await fetch(`${baseApi}/event/${data.event_id}`);
        const eventData: Event = await eventResponse.json();
        setEventDetails(eventData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDrawPair();
  }, [token]);

  const handleDraw = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // once the button is clicked, we disable it so that the user can not click again
    setIsButtonClicked(true);
    setIsButtonDisabled(true);

    let index = 0;

    const intervalId = setInterval(() => {
      setCurrentIndex(index);
      index = (index + 1) % participants.length;
    }, 50);

    setTimeout(() => {
      clearInterval(intervalId);

      const randomIndex = Math.floor(Math.random() * participants.length);
      setCurrentIndex(randomIndex);
    }, 2000);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="draw-result-page">
      {drawPair && (
        <h1 className="draw-result__title">Bienvenue {drawPair.giverName} !</h1>
      )}

      {eventDetails && (
        <p className="draw-text">
          Tu es invité(e) à participer à l'évènement {eventDetails.name}, le{' '}
          {new Date(eventDetails.date).toLocaleDateString()}.
        </p>
      )}

      <p className="draw-text">
        {' '}
        La personne à qui tu devras offrir un cadeau est...
      </p>
      <button
        type="button"
        className="draw-button"
        onClick={handleDraw}
        disabled={isButtonDisabled}
      >
        Clique ici !
      </button>
      <div className="draw-roulette">
        {!isButtonClicked ? (
          <p className="placeholder">?</p>
        ) : participants[currentIndex] ? (
          <p className="result"> {participants[currentIndex]} </p>
        ) : null}
      </div>
      {isButtonClicked && drawPair && (
        <div className="draw-result">
          <p>Giver: {drawPair.giverName}</p>
          <p>Receiver: {drawPair.receiverName}</p>
        </div>
      )}
    </div>
  );
};

export default DrawResult;
