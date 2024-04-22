import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc =
    data?.focus.sort((evtA, evtB) =>
      /*changement de la logique de comparaison des dates pour les classer de la plus récentes à la plus ancienne  */
      new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
    ) || [];
  /* Ajout de '|| []' pour garantir que 'byDataDesc' soit initialisé dans un tableau vide ('[]') si 'data?.focus'
est nul ou indéfini. Cela evite les erreurs */
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        /*ajout de la bonne key */
        <div key={event.title}>
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" className="SlideCard__cover" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((value, radioIdx) => (
                <input
                  key={`${event.title}.${value.title}`}
                  type="radio"
                  name="radio-button"
                  /* Ajout de 'onChange={() => true}' pour assurer que 'onChange' est géré mais sans effectuer d'action particulière en réponse au changement */
                  onChange={() => true}
                  checked={index === radioIdx}
                /> /* Utilisation de 'value' dans la fonction map pour permettre d'accéder à l'élément actuel dans le tableau
               'byDateDesc' & Changement dans la key pour éviter les doublons et garantir une unicité de la key dans le tableau
              & Ajout de 'onChange' et rectification de la nomenclatoin dans 'checked' idx to index */
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
