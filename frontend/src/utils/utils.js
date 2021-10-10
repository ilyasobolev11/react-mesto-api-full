const submitButtonTextConfig = {
  popupEditAvatar: {
    default: 'Сохранить',
    submitProcess: 'Сохранение...',
    ready: 'Готово'
  },
  popupEditProfile: {
    default: 'Сохранить',
    submitProcess: 'Сохранение...',
    ready: 'Готово'
  },
  popupCreateCard: {
    default: 'Создать',
    submitProcess: 'Создание...',
    ready: 'Готово'
  },
  popupConfirmDeleteCard: {
    default: 'Да',
    submitProcess: 'Удаление...',
    ready: 'Готово'
  }
}

const apiConfig = {
  url: 'https://api.mesto-app.nomoredomains.club',
  headers: { credentials: 'include' }
}

const tooltipMessages = {
  successRegister: {
    text: 'Вы успешно зарегистрировались!',
    imgClass: 'popup__message-img_type_success'
  },
  error: {
    text: 'Что-то пошло не так! Попробуйте ещё раз.',
    imgClass: 'popup__message-img_type_error'
  }
}

export {
    submitButtonTextConfig,
    apiConfig,
    tooltipMessages
};
