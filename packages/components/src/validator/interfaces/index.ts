export interface InterfaceGenericObject {
  [key: string]: string;
}

export interface InterfaceValidationsContext {
  submitted: boolean;
  setSubmitted: (state: boolean) => void;
  formFields: InterfaceFormFields;
  validateField: (name: string, fieldValidate: InterfaceFieldValidate) => void;
  textValidation: InterfaceTextValidation;
  setTextValidation: React.Dispatch<
    React.SetStateAction<InterfaceTextValidation>
  >;
}
export interface InterfaceFieldsContainer {
  children: React.ReactNode;
  setFields: (dataForm: InterfaceFormFields) => void;
  isSubmit: boolean;
  textValidation: InterfaceTextValidation;
}

export type InputTypes =
  | "text"
  | "tel"
  | "number"
  | "password"
  | "email"
  | "search";

  export type InputModes =
  | "text"
  | "decimal"
;

export interface InterfaceValidation {
  type?: InputTypes;
  minLength?: number;
  required?: boolean;
  pattern?: string;
}

export interface InterfaceFieldValidate {
  value: string;
  validation: InterfaceValidation;
  error?: string;
}

export interface InterfaceFormFields {
  [name: string]: InterfaceFieldValidate;
}

export interface InterfaceDataFields extends InterfaceGenericObject {}
export interface InterfaceTextValidation extends InterfaceGenericObject {}

export interface InterfaceSubmitForm {
  data: InterfaceDataFields;
  formIsValid: boolean;
}

export interface InterfaceOnSubmit {
  (resultForm: InterfaceSubmitForm): void;
}

export interface InterfaceUseForm {
  (): {
    isSubmit: boolean;
    isValid(): boolean;
    setFields(dataForm: InterfaceFormFields): void;
    handleSubmit(onSubmit: InterfaceOnSubmit): () => void;
  };
}

export interface InterfaceDataFormat {
  (data: InterfaceFormFields): InterfaceDataFields;
}

export interface InterfaceValidateField {
  (name: string, fieldValidate: InterfaceFieldValidate): void;
}

export interface InterfaceValidator {
  (validation: InterfaceValidation, value: string): string;
}
