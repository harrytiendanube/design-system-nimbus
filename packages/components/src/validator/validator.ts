import { InterfaceValidator } from "./interfaces";
import messages from "./messages";
import validations, { ValidationType } from "./validations";

/**
 * Value default when validation no detected erros
 * @var EMPTY_ERROR string
 */
const EMPTY_ERROR: string = "";

/**
 * Validator
 * @param validation InterfaceValidation
 * @param value string
 * @returns string
 */

const validator: InterfaceValidator = (validation, value) => {
  for (const [validationKey, validationValue] of Object.entries(validation)) {
    const typeValidation: ValidationType =
      validationKey == "type" ? validationValue : validationKey;

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
