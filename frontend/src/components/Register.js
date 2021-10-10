import { Link } from "react-router-dom";
import useValidation from "../hooks/useValidation";
import Form from "./Form";

function Register({onRegisterUserSubmit}) {
  const {email, password, formValid, onChange} = useValidation({email: '', password: ''});

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegisterUserSubmit({
      password: password.value,
      email: email.value
    });
  }

  return (
    <Form
      name="signUn"
      title="Регистрация"
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
       <span className="form__input-error" id="username-input-error">
         {email.validMessage}
       </span>
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
        <span className="form__input-error" id="username-input-error">
          {password.validMessage}
        </span>
      </label>
      <button className={`form__submit-btn ${!formValid && 'form__submit-btn_disabled'}`} type="submit" disabled={!formValid}>Зарегистрироваться</button>
      <Link to="/sign-in" className="form__navigation-link">Уже зарегистрированы? Войти</Link>
    </Form>
  );
}

export default Register;
