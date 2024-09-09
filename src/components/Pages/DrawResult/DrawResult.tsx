import { useState, useEffect } from 'react';
import './DrawResult.scss';

// fictive list of participants to test the feature
const participants = ['Shakira', 'Beyoncé', 'Babar', 'Neymar', 'Pikachu'];

// preparing the code for when the draw API is ready
// interface Giver {
//   giverName: string;
// }
//
// interface Participants [{
//   participantName: string;
// }]
//
// interface Receiver {
//   receiverName: string;
// }

interface Event {
  name: string;
  date: string;
}

function DrawResult() {
  // states specific to the drawing
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // preparing the code for when the draw API is ready
  // //states specific to the event
  // const [event, setEvent] = useState<Event | null>(null);
  // const [error, setError] = useState<string | null>(null);

  const handleDraw = (e) => {
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

  // preparing the code for when the draw API is ready
  // const fetchEvent = async () => {
  //   try {
  //     const response = await fetch('https://cado.zapto.org/me', {
  //       // à vérifier pour fetch les bonnes données des événements
  //       method: 'GET',
  //       credentials: 'include',
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //     setEvent(data.events);
  //     console.log(data);
  //   } catch (error) {
  //     console.error('Erreur lors du chargement des événements:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchEvent();
  // }, [user]);

  return (
    <div className="draw-result-page">
      <h1 className="draw-result__title">Bienvenue (prénom) !</h1>
      {/* for when the API is ready */}
      {/* <h1 className="draw-result__title">Bienvenue {giver.name} !</h1> */}

      <p className="draw-text">
        Tu es invité(e) à participer à l'évènement (Nom de l'évènement), le
        (JJ/MM/AAAA).
      </p>
      {/* for when the API is ready */}
      {/* <p className="event-details">
        Tu es invité(e) à participer à l'évènement (Nom de l'évènement), le (JJ/MM/AAAA).
      </p> */}

      <p className="draw-text">
        {' '}
        La personne à qui tu devras offrir un cadeau est...
      </p>
      <button
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
    </div>
  );
}

export default DrawResult;
