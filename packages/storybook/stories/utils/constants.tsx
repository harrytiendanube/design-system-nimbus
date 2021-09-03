/* eslint-disable spellcheck/spell-checker */
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

export const images = {
  none: null,
  image1: IMAGE_PRODUCT,
  image2: IMAGE_PRODUCT_2,
  image3: IMAGE_PRODUCT_3,
};

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

export const DATA_ROWS = [...new Array(8)].map((_, index) => {
  return {
    id: index + 1,
    order: `${index + 1}0`,
    date: "20 jun",
    buyer: "Name Last name",
    total: "$3.500",
    products: `products`,
    payment: "Awaiting payment",
    shipping: "Unpacked",
  };
});

export const DATA_ROWS_PLAYGROUND = [
  {
    id: "1",
    order: "1564",
    tooltip: "This is a tooltip with notes and a small text to provide context",
    date: "25 Aug",
    customer: "Obi Wan Kenobi",
    total: "R$ 5.999,99",
    products: "15 products",
    payment: {
      appearance: "warning",
      label: "Awaiting payment",
    },
    shipping: {
      appearance: "secondary",
      label: "Unfulfilled",
    },
  },
  {
    id: "2",
    order: "1563",
    tooltip: "This is a tooltip with notes and a small text to provide context",
    date: "24 Aug",
    customer: "Luke Skywalker",
    total: "R$ 21.599,99",
    products: "121 products",
    payment: {
      appearance: "success",
      label: "Payment accepted",
    },
    shipping: {
      appearance: "primary",
      label: "Fulfilled",
    },
  },
  {
    id: "3",
    order: "1562",
    tooltip: "This is a tooltip with notes and a small text to provide context",
    date: "24 Aug",
    customer: "Han Solo",
    total: "R$ 599,99",
    products: "1 product",
    payment: {
      appearance: "danger",
      label: "Payment declined",
    },
    shipping: {
      appearance: "secondary",
      label: "Unfulfilled",
    },
  },
  {
    id: "4",
    order: "1561",
    tooltip: "This is a tooltip with notes and a small text to provide context",
    date: "22 Aug",
    customer: "Darth Vader",
    total: "R$ 95",
    products: "6 products",
    payment: {
      appearance: "warning",
      label: "Awaiting payment",
    },
    shipping: {
      appearance: "primary",
      label: "Fulfilled",
    },
  },
];

export const OPTIONS = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
  { label: "Option 4", value: "4" },
];

export const getPagesValues = (
  pageSize: number,
  totalPages: number,
  currentPage: number,
): {
  firstRecordPage: number;
  lastRecordPage: number;
  totalRecords: number;
  hasMorePages: boolean;
  totalPages: number;
} => {
  const firstRecordPage = currentPage * pageSize - pageSize + 1;
  const lastRecordPage = currentPage * pageSize;
  const totalRecords = pageSize * totalPages;
  const hasMorePages = currentPage < totalPages;
  return {
    firstRecordPage,
    lastRecordPage,
    totalRecords,
    hasMorePages,
    totalPages,
  };
};
