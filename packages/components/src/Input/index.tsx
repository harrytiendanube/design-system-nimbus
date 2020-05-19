import * as React from "react";
import "@tiendanube/styles/css/Input.css";

export interface Props
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "className" | "style" | "onChange" | "id" | "name" | "value"
  > {
  /**
   * Nombre
   */
  name: string;
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

const Input: React.FunctionComponent<Props> = ({ label, ...shared }) => {
  return (
    <div className="nimbus--input">
      <label htmlFor={`input_${name}`}>{label}</label>
      <input {...shared} id={`input_${name}`} />
    </div>
  );
};

Input.defaultProps = {
  placeholder: "placeholder",
  value: "",
};

export default Input;
