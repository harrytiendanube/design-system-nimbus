type paddingTypes = "none" | "tight" | "base" | "loose";

export interface InterfaceContent {
  /** Children Node */
  children: React.ReactNode;
  /** Padding Attribute */
  padding?: paddingTypes;
}
