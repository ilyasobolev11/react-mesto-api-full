import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm.js';

function EditProfilePopup({onUpdateUser, ...props}) {
  const [name, setName] = useState({value: '', valid: false, validationMessage: ''});
  const [description, setDescription] = useState({value: '', valid: false, validationMessage: ''});
  const currentUser = useContext(CurrentUserContext);
  const isValid = name.valid && description.valid;

  function handleNameChange(evt) {
    setName({
      value: evt.target.value,
      valid: evt.target.validity.valid,
      validationMessage: evt.target.validationMessage
    });
  }

  function handleDescriptionChange(evt) {
    setDescription({
      value: evt.target.value,
      valid: evt.target.validity.valid,
      validationMessage: evt.target.validationMessage
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: name.value,
      about: description.value
    });
  }

  useEffect(() => {
    if (currentUser?.name && currentUser?.about) {
      setName({value: currentUser.name, valid: true, validationMessage: ''});
      setDescription({value: currentUser.about, valid: true, validationMessage: ''});
    }
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      onSubmit={handleSubmit}
      {...props}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_user-name"
          id="username-input"
          name="userName"
          type="text"
          placeholder="Имя"
          minLength={2}
          maxLength={40}
          value={name.value}
          onChange={handleNameChange}
          required
        />
        <span className="popup__input-error" id="username-input-error">
          {name.validationMessage}
        </span>
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_status"
          id="status-input"
          name="status"
          type="text"
          placeholder="О себе"
          minLength={2}
          maxLength={200}
          value={description.value}
          onChange={handleDescriptionChange}
          required
        />
        <span className="popup__input-error" id="status-input-error">
          {description.validationMessage}
        </span>
      </label>
      <button className={`popup__submit-btn ${!isValid && 'popup__submit-btn_disabled'}`} type="submit" disabled={!isValid}>Сохранить</button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
