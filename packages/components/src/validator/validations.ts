/**
 * Validate if value is not empty and is required
 *
 * @param value String
 * @param required Boolean
 */
const isRequired = (value: string, required: boolean): boolean =>
  !required || value !== "";

/**
 * Validate is value es numeric with decimals or negatives
 *
 * @param value
 */
const isNumeric = (value: string): boolean =>
  /^[+-]?[0-9]*(?:\.[0-9]*)?$/.test(value);

/**
 * Validate if value has email format
 *
 * @param value
 */
const isEmail = (value: string): boolean =>
  /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+).([a-zA-Z]{2,5})$/.test(value);

/**
 * Validate the minimum string size
 *
 * @param value String
 * @param length Number
 */
const isMinLength = (value: string, length: number): boolean => {
  if (!length) return true;
  return value.length >= length;
};

/**
 * Validate the maximum string size
 *
 * @param value String
 * @param length Number
 */
const isMaxLength = (value: string, length: number): boolean => {
  if (!length) return true;
  return value.length <= length;
};

/**
 * Validate if value has pattern
 *
 * @param value
 */
const isPattern = (value: string, pattern: string): boolean => {
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
