import * as React from "react";
import "@tiendanube/styles/css/Input.css";

export interface InterfaceInput
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "className" | "style" | "onChange" | "id" | "name" | "value" | "type"
  > {
  /**
   * Nombre
   */
  name: string;
  /**
   * Tipo
   */
  type?: "text" | "password" | "email";
  /**
   *  Valor
   */
  value: string;
  /**
   *  Etiqueta
   */
  label: string;
  /**
   *  Callback de actualizacion
   */
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

const Input: React.FunctionComponent<InterfaceInput> = ({
  label,
  type,
  name,
  ...shared
}: InterfaceInput) => {
  return (
    <div className="nimbus--input">
      <label htmlFor={`input_${name}`}>{label}</label>
      <input {...shared} id={`input_${name}`} type={type} />
    </div>
  );
};

Input.defaultProps = {
  type: "text",
  placeholder: "placeholder",
  value: "",
};

export default Input;
