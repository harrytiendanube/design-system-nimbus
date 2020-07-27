/**
 * Validate if value is not empty and is required
 * @param value string
 * @param required boolean
 */
const isRequired = (value: string, required: boolean) =>
  !required || value !== "";

/**
 * Validate is value es numeric with decimals or negatives
 * @param value
 */
const isNumeric = (value: string) => /^[+-]?[0-9]*(?:\.[0-9]*)?$/.test(value);

/**
 * Validate if value has email format
 * @param value
 */
const isEmail = (value: string) =>
  /^([a-zA-Z0-9_\-.\+]+)@([a-zA-Z0-9_\-.]+).([a-zA-Z]{2,5})$/.test(value);

/**
 * Validate the minimum string size
 * @param value string
 * @param length number
 */
const isMinLength = (value: string, length: number) => {
  if (!length) return true;
  return value.length >= length;
};

/**
 * Validate the maximum string size
 * @param value string
 * @param length number
 */
const isMaxLength = (value: string, length: number) => {
  if (!length) return true;
  return value.length <= length;
};

/**
 * Validate if value has pattern
 * @param value
 */
const isPattern = (value: string, pattern: string) => {
  return new RegExp(pattern).test(value);
};

export type ValidationType =
  | "required"
  | "numeric"
  | "email"
  | "minLength"
  | "maxLength"
  | "pattern";

const validations = {
  required: isRequired,
  numeric: isNumeric,
  email: isEmail,
  minLength: isMinLength,
  maxLength: isMaxLength,
  pattern: isPattern,
};

export default validations;
