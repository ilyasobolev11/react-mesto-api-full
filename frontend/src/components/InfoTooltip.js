import { useEffect, useState } from 'react';
import { tooltipMessages } from '../utils/utils.js';

function InfoTooltip(props) {
  const [message, setMessage] = useState(null);

  function handlePopupOverlayClick(evt) {
    if (evt.target.classList.contains('popup')) props.onClose();
  }

  useEffect(() => {
    if (props.state) setMessage(tooltipMessages[props.state?.status])
  }, [props.state]);

  return (
    <div
      className={`popup popup_type_info-tooltip ${props.state?.isOpen && 'popup_opened'}`}
      onMouseDown={handlePopupOverlayClick}
    >
      <div className="popup__message-container">
        <div className={`popup__message-img ${message?.imgClass}`}></div>
        <p className="popup__title popup__title_dialogue-message">{message?.text}</p>
        <button
          className="popup__close-btn"
          type="button"
          aria-label={"Закрыть окно оповещения"}
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}

export default InfoTooltip;
