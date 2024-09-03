/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import './HomePage.scss';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <Helmet>
        <title>Cad'O - Organisez facilement vos secret santas</title>
        <meta
          name="description"
          content="Cad'O - Organisez facilement vos secret santas avec notre plateforme intuitive."
        />
        <meta
          name="keywords"
          content="évènement, jeux, secret santas, organisation, cadeaux, Cad'O"
        />
        <meta
          property="og:title"
          content="Cad'O - Organisez facilement vos secret santas"
        />
        <meta
          property="og:description"
          content="Cad'O - Organisez facilement vos secret santas avec notre plateforme intuitive."
        />
        <meta property="og:image" content="/LogoMobile.png" />
        {/* <meta property="og:url" content="https://notre-futur-site.com" /> */}
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Cad'O - Organisez facilement vos secret santas"
        />
        <meta
          name="twitter:description"
          content="Cad'O - Organisez facilement vos secret santas avec notre plateforme intuitive."
        />
        <meta name="twitter:image" content="/logo192.png" />
      </Helmet>
      <h1 className="home__title">Bienvenue sur Cad'O</h1>
      <div className="home__container">
        <div className="home__concept-explaination">
          <h2 className="home__concept-explaination__title">
            Mais qu'est-ce que Cad'O ?
          </h2>
          <p className="home__paragraph">
            Le concept du Secret Santa est un moyen de s’offrir des cadeaux de
            façon anonyme : à l’aide d’un tirage au sort, chaque participant se
            voit attribuer par tirage au sort une personne à qui il offrira un
            cadeau. La personne qui reçoit le cadeau ne connaît pas l’identité
            de celui qui lui offre.
            <br />
            <br />
            Chez Cad'O, nous avons créé et mis à dispositin un outil qui vous
            permettra de faciliter l'organisation de vos Secret Santas !
          </p>
          <h3 className="home__concept-explaination__title2">
            Créez votre évènement dès maintenant !
          </h3>

          <button
            type="button"
            className="account-creation-button"
            onClick={() => navigate('/creer-un-evenement')}
          >
            Créer évènement
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
