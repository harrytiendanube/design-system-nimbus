import { InterfaceValidator } from "./interfaces";
import messages from "./messages";
import validations, { ValidationType } from "./validations";

/**
 * Value default when validation no detected errors
 *
 * @member EMPTY_ERROR string
 */
const EMPTY_ERROR = "";

/**
 * Validator
 *
 * @param validation InterfaceValidation
 * @param value String
 * @returns String
 */

const validator: InterfaceValidator = (validation, value) => {
  const objectEntries = Object.entries(validation);
  for (let i=0;i<objectEntries.length; i++) {
    const  [validationKey, validationValue] = objectEntries[i];
    const typeValidation: ValidationType =
    validationKey === "type" ? validationValue : validationKey;
    if (
      // validations.
      typeValidation in validations &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      !(validations[typeValidation] as any)?.(value, validationValue)
    ) {
      return messages[typeValidation].replace("%1", validationValue);
    }
  }
  return EMPTY_ERROR;
};

export default validator;
