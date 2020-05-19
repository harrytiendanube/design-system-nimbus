import * as React from "react";
import "@tiendanube/styles/css/Form.css";
import { Button } from "..";

export interface InterfaceForm
  extends Omit<
    React.HTMLAttributes<HTMLElement>,
    "className" | "style" | "children"
  > {
  /** Element inside tag component */
  children: React.ReactNode;
  /** Dinamic content slot */
  mySlot: React.ReactNode;
  /** Submit text */
  submitText: string;
  /** Submit callback */
  submitCallback: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  /** Optional Button */
  optionalButtonText?: string;
  /** Optional button callback  */
  optionalCallback?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}

const Form: React.FC<InterfaceForm> = ({
  children,
  mySlot,
  submitText,
  submitCallback,
  optionalButtonText,
  optionalCallback,
  ...share
}: InterfaceForm) => {
  console.log(globalThis);
  return (
    <div {...share}>
      <div>Mancheta</div>
      <form action="">{mySlot}</form>
      <div className="buttons">
        {optionalCallback && (
          <Button color="light" onClick={optionalCallback}>
            {optionalButtonText}
          </Button>
        )}
        <Button color="primary" onClick={submitCallback}>
          {submitText}
        </Button>
      </div>
      {children}
    </div>
  );
};

Form.defaultProps = {};

export default Form;
