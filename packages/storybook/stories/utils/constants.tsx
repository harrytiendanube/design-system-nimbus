import {
  CreditCardIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  ArchiveIcon,
  BoxUnpackedIcon,
  BoxPackedIcon,
} from "@tiendanube/icons";

export const LOREM_STRESS =
  // eslint-disable-next-line spellcheck/spell-checker
  "Lorem ipsum dolor sit amet, mei eu lobortis mnesarchum mediocritatem. Sea dictas legimus ad, quidam alterum conceptam eos et. Utroque pertinacia incorrupte vim in. Ius aeterno persius sapientem at, sit eu singulis signiferumque. Ut vis platonem assentior conclusionemque, melius deleniti interpretaris sea in. Case salutandi eu eam, diam imperdiet laboramus ad eos.";
export const LOREM =
  // eslint-disable-next-line spellcheck/spell-checker
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id odio non est venenatis porttitor.";

export const IMAGE_PRODUCT =
  "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=943&q=80";

export const IMAGE_PRODUCT_2 =
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80";

export const IMAGE_PRODUCT_3 =
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80";

export const IMAGE_PRODUCT_4 =
  "https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80";

export const IMAGE_APPEARANCES = [
  "default",
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
  "light",
];

export const LABEL_APPEARANCES_ICONS = [
  { appearance: "default", icon: ArchiveIcon },
  { appearance: "primary", icon: BoxUnpackedIcon },
  { appearance: "secondary", icon: BoxPackedIcon },
  { appearance: "success", icon: ExclamationTriangleIcon },
  { appearance: "warning", icon: CreditCardIcon },
  { appearance: "danger", icon: CheckIcon },
  { appearance: "transparent", icon: CheckIcon },
];

export const STATUS_ORDER = [
  { label: "Active", value: "Value 1" },
  { label: "All", value: "Value 2" },
  { label: "Archived", value: "Value 3" },
  { label: "Canceled", value: "Value 4" },
  { label: "Waiting for payment confirmation", value: "Value 5" },
  { label: "Waiting for shipping confirmation", value: "Value 6" },
];

export const SHIPPING_METHOD = [
  { label: "All", value: "Value 1" },
  { label: "OCA", value: "Value 2" },
];
