import { useEffect, useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({onUpdateAvatar, ...props}) {
  const inputRef = useRef();

  const [validObj, setValidObj] = useState({valid: false, validationMessage: ''});

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value
    });
  }

  function handleChange() {
    setValidObj({
      valid: inputRef.current.validity.valid,
      validationMessage: inputRef.current.validationMessage
    });
  }

  useEffect(() => {
    if (props.isOpen) {
      inputRef.current.value='';
      setValidObj({valid: false, validationMessage: ''});
    }
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      onSubmit={handleSubmit}
      {...props}
    >
      <label className="popup__field">
        <input
          ref={inputRef}
          className="popup__input popup__input_type_avatar-link"
          id="avatarLink-input"
          name="avatar"
          type="url"
          placeholder="Ссылка на картинку"
          onChange={handleChange}
          required
        />
        <span className="popup__input-error" id="avatarLink-input-error">
          {validObj.validationMessage}
        </span>
      </label>
      <button
        className={`popup__submit-btn ${!validObj.valid && 'popup__submit-btn_disabled'}`}
        type="submit"
        disabled={!validObj.valid}
      >
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
