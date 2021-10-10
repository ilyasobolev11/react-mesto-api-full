import useValidation from "../hooks/useValidation";
import Form from "./Form";

function Login({onAuthorizeUserSubmit}) {
  const {email, password, formValid, onChange} = useValidation({email: '', password: ''})

  function handleSubmit(evt) {
    evt.preventDefault();
    onAuthorizeUserSubmit({
      password: password.value,
      email: email.value
    });
  }

  return (
    <Form
      name="signIn"
      title="Вход"
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          className="form__input form__input_type_email"
          id="username-input"
          name="email"
          type="email"
          placeholder="Email"
          minLength={3}
          maxLength={30}
          value={email.value}
          onChange={onChange}
          required
        />
        <span className="form__input-error" id="username-input-error" />
      </label>
      <label className="form__field">
        <input
          className="form__input form__input_type_email"
          id="password-input"
          name="password"
          type="password"
          placeholder="Пароль"
          minLength={3}
          maxLength={30}
          value={password.value}
          onChange={onChange}
          required
        />
        <span className="form__input-error" id="username-input-error" />
      </label>
      <button className={`form__submit-btn ${!formValid && 'form__submit-btn_disabled'}`} type="submit" disabled={!formValid}>Войти</button>
    </Form>
  );
}

export default Login;
