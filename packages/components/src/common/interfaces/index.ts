export interface InterfaceNameValue {
  name: string;
  value: string;
}
export interface InterfaceNameChecked {
  name: string;
  checked: boolean;
}
export interface InterfaceIdLabel {
  id: string;
  label: string;
}
export interface InterfaceRadioButtonOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface InterfaceSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface InterfaceSelectGroup {
  group: string;
  options: InterfaceSelectOption[];
}

export type InterfaceSelectOptionGroup =
  | InterfaceSelectOption
  | InterfaceSelectGroup;
