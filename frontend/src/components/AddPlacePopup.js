import React from "react";
import PopupWithForm from "./PopupWithForm";
import useValidation from '../hooks/useValidation.js';

function AddPlacePopup({onAddPlaceSubmit,...props}) {
  // const [name, nameValid] = useValidation('', props.isOpen);
  // const [link, linkValid] = useValidation('', props.isOpen);
  // const isValid = nameValid.valid && linkValid;
  const {name, link, formValid, onChange} = useValidation({name: '', link: ''}, props.isOpen);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlaceSubmit({
      name: name.value,
      link: link.value
    })
  }

  return (
    <PopupWithForm
      name="create-card"
      title="Новое место"
      onSubmit={handleSubmit}
      {...props}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_place-name"
          id="placeName-input"
          name="name"
          type="text"
          placeholder="Название"
          minLength={2}
          maxLength={30}
          value={name.value}
          onChange={onChange}
          required
          // {...name}
        />
        <span className="popup__input-error" id="placeName-input-error">
          {name.validMessage}{/* {nameValid.validMessage} */}
        </span>
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_img-link"
          id="imgLink-input"
          name="link"
          type="url"
          placeholder="Ссылка на картинку"
          value={link.value}
          onChange={onChange}
          required
          // {...link}
        />
        <span className="popup__input-error" id="imgLink-input-error">
          {link.validMessage}{/* {linkValid.validMessage}{ */}
        </span>
      </label>
      {/* <button className={`popup__submit-btn ${!isValid && 'popup__submit-btn_disabled'}`} type="submit" disabled={!isValid}>Создать</button> */}
      <button className={`popup__submit-btn ${!formValid && 'popup__submit-btn_disabled'}`} type="submit" disabled={!formValid}>Создать</button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
