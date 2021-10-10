import { useEffect, useState } from 'react';

function ImagePopup({card, onClose}) {
  const [targetCard, setTargetCard] = useState(null);

  function handlePopupOverlayClick(evt) {
    if (evt.target.classList.contains('popup')) onClose();
  }

  useEffect(() => {
    if (card) setTargetCard(card);
  }, [card]);

  return (
    <div
      className={`popup popup_type_zoom-img ${card?.action === 'open' && 'popup_opened'}`}
      onClick={handlePopupOverlayClick}
    >
      <div className="popup__img-container">
        <img className="popup__img" src={targetCard?.link} alt={targetCard?.name} />
        <p className="popup__img-caption">{targetCard?.name}</p>
        <button
          className="popup__close-btn"
          type="button"
          aria-label="Закрыть окно просмотра фотографии"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default ImagePopup;
