// import React, { useState } from  'react';

function PopupWithForm(props) {
  // const [isValid, setIsValid] = useState(false);

  function handlePopupOverlayClick(evt) {
    if (evt.target.classList.contains('popup')) props.onClose();
  }

  // function validateForm(evt) {
  //   setIsValid(evt.currentTarget.checkValidity());
  //   console.log(isValid);
  // }

  return (
    <div
      className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}
      onMouseDown={handlePopupOverlayClick}
    >
      <div className="popup__form-container">
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="popup__form"
          name={props.name}
          // onChange={validateForm}
          onSubmit={props.onSubmit}
          noValidate
        >
          {props.children}
        </form>
        <button
          className="popup__close-btn"
          type="button"
          aria-label={`Закрыть окно "${props.name}"`}
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}

export default PopupWithForm;
