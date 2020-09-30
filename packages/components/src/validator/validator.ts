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
  for (const [validationKey, validationValue] of Object.entries(validation)) {
    const typeValidation: ValidationType =
      validationKey === "type" ? validationValue : validationKey;

    if (
      typeValidation in validations &&
      !(validations[typeValidation] as any)(value, validationValue)
    ) {
      return messages[typeValidation].replace("%1", validationValue);
    }
  }

  return EMPTY_ERROR;
};

export default validator;
