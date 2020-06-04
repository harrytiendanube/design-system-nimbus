import * as React from "react";

import "@tiendanube/styles/css/Input.css";

export interface InterfaceInput {
  /**
   * Input name
   */
  name: string;
  /**
   * Input type
   */
  type?: "text" | "password" | "email";
  /**
   * Input value
   */
  value: string;
  /**
   * Input placeholder
   */
  placeholder: string;
  /**
   *  Label
   */
  label: string;
  /**
   *  onChange callback function
   */
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

/**
 *  @param name input name
 *  @param type input type
 *  @param value input value
 *  @param placeholder input placeholder
 *  @param label input label
 *  @param onChange callback function
 */
function Input({
  label,
  type = "text",
  name,
  value = "",
  placeholder = "placeholder",
  onChange,
}: InterfaceInput): JSX.Element {
  return (
    <div className="nimbus--input">
      <label htmlFor={`input_${name}`}>{label}</label>
      <input
        id={`input_${name}`}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

export default React.memo(Input);
