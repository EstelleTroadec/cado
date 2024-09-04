/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import './FAQ.scss';

interface QuestionAnswer {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const questionsAnswers: QuestionAnswer[] = [
    {
      question: "Qu'est-ce que Secret Santa ?",
      answer:
        "Secret Santa est un organisateur d'échange des cadeaux gratuit en ligne! Organisez une Secret Santa party avec des amis, de la famille ou même entre collègues. Chaque année, des personnes du monde entier s'échangent des cadeaux.",
    },
    {
      question:
        'Comment puis-je gérer mon évènement Secret Santa et les participants ?',
      answer:
        "L'e-mail de confirmation qui a été envoyé à l'administrateur contient un lien vers une page permettant de gérer l'événement et la liste associe à cet événement.",
    },
    {
      question: 'Comment les participants sont-ils attribués ?',
      answer:
        "Les participants sont attribués de manière aléatoire par l'application. L'algorithme garantit que personne ne se verra attribuer son propre nom.",
    },
    {
      question: 'Puis-je fournir une liste de souhaits ?',
      answer:
        "Les participants recevront un lien vers une page où ils peuvent découvrir la personne qui leur a été attribuée et a qu'ils doivent offrir un cadeau. Ils peuvent également ajouter leur propre liste de souhaits et voir celle de la personne qui leur a été attribuée.",
    },
    {
      question: 'Puis-je supprimer ma liste ?',
      answer:
        'Bien sûr! Rendez-vous sur la page de gestion de votre événement, en utilisant le bouton supprimer. Toutes les données liées à votre liste seront supprimées de notre système.',
    },
    {
      question: "L'application est-elle sécurisée ?",
      answer:
        'Oui, nous utilisons des protocoles de sécurité avancés pour protéger vos données personnelles et garantir la confidentialité de vos échanges.',
    },
    {
      question: "L'application est-elle gratuite ?",
      answer:
        "Oui, l'application est entièrement gratuite. Vous pouvez accéder à toutes les fonctionnalités sans frais.",
    },
  ];

  const handleClick = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <article className="faq-container">
      <div className="FAQ-category">
        <h2 className="FAQ-title">FOIRE AUX QUESTIONS :</h2>
        {questionsAnswers.map((item, index) => (
          <div key={index}>
            <h3
              onClick={() => handleClick(index)}
              className={`faq-question ${openQuestion !== null && openQuestion !== index ? 'grayed-out' : ''}`}
            >
              {openQuestion === index ? '-' : '+'} {item.question}
            </h3>
            {openQuestion === index && (
              <p className="FAQ-content">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </article>
  );
};

export default FAQ;
