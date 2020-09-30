import { useRef, useState } from "react";
import {
  InterfaceFormFields,
  InterfaceOnSubmit,
  InterfaceUseForm,
  InterfaceDataFormat,
  InterfaceDataFields,
} from "./interfaces";

const SUBMIT_OFF = false;
const SUBMIT_ON = true;

const existErrorInDataForm = (data: InterfaceFormFields): boolean => {
  const fieldWithError = Object.entries(data).find(
    ([, field]) => !!field.error,
  );
  return !fieldWithError;
};

const dataFormat: InterfaceDataFormat = (data) => {
  const dataFields: InterfaceDataFields = {};
  for (const [key, value] of Object.entries(data)) {
    dataFields[key] = value.value;
  }
  return dataFields;
};

const useForm: InterfaceUseForm = () => {
  const [isSubmit, setSubmit] = useState<boolean>(SUBMIT_OFF);

  const isValid = useRef<boolean>();
  const dataFormFields = useRef<InterfaceFormFields>({});

  return {
    isSubmit,
    isValid: () => isValid.current as boolean,
    setFields: (dataForm: InterfaceFormFields) => {
      isValid.current = existErrorInDataForm(dataForm);
      dataFormFields.current = dataForm;
    },
    handleSubmit: (onSubmit: InterfaceOnSubmit) => () => {
      setSubmit(SUBMIT_ON);
      onSubmit({
        data: dataFormat(dataFormFields.current),
        formIsValid: isValid.current as boolean,
      });
    },
  };
};

export default useForm;
