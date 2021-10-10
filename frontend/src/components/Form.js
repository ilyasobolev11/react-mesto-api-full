function Form({name, title, onSubmit, children}) {

  return (
    <div className="form root__form">
      <h1 className="form__title">{title}</h1>
      <form
        className="form__form"
        name={name}
        onSubmit={onSubmit}
        noValidate
      >
        {children}
      </form>
    </div>
  );
}

export default Form;
