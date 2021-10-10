import PopupWithForm from "./PopupWithForm";

function DeleteCardConfirmPopup({onDeleteCardSubmit, card, ...props}) {

  function handleSubmit(evt) {
    evt.preventDefault();
    onDeleteCardSubmit(card);
  }

  return (
    <PopupWithForm
      name="confirm-delete-card"
      title="Вы уверены?"
      onSubmit={handleSubmit}
      {...props}
    >
      <button className="popup__submit-btn" type="submit">Да</button>
    </PopupWithForm>
  );
}

export default DeleteCardConfirmPopup;
