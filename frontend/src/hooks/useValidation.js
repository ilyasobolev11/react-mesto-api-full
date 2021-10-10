import { useCallback, useEffect, useState, useRef } from "react";

function useValidation(initialValues, reset) {

  const initialFormObj = useRef(Object.entries(initialValues).reduce((acc, item) => {
    acc[item[0]] = {
      value: item[1],
      validMessage: '',
      valid: false
    };
    return acc;
  }, {}));
  const [formObj, setFormObj] = useState({...initialFormObj.current});
  const formValid = Object.values(formObj).every(obj => obj.valid);

  const onChange = useCallback(evt => {
    setFormObj(state => {
      state[evt.target.name] = {
        value: evt.target.value,
        validMessage: evt.target.validationMessage,
        valid: evt.target.validity.valid
      }
      return {...state};
    });
  }, []);

  useEffect(() => {
    if (reset) setFormObj({...initialFormObj.current});
  }, [reset]);

  return {...formObj, formValid, onChange};
}

// function useValidation(initialValue, reset) {
//   const [value, setValue] = useState(initialValue);
//   const [valid, setValid] = useState(false);
//   const [validMessage, setValidMessage] = useState('');
//   const onChange = useCallback(evt => {
//     setValue(evt.target.value);
//     setValid(evt.target.validity.valid);
//     setValidMessage(evt.target.validationMessage);
//   }, []);

//   useEffect(() => {
//     if (reset) {
//       setValue(initialValue);
//       setValid(false);
//       setValidMessage('');
//     }
//   }, [reset, initialValue]);

//   return [{value, onChange}, {valid, validMessage}];
// }

export default useValidation;
