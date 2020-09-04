export interface InterfacePage {
  type: "NUMBER" | "BREAK";
  number: number;
  selected?: boolean;
}

export const getPages = (
  pageTotal: number,
  pageSelected: number,
  margin: number,
  padding: number,
): InterfacePage[] => {
  const pages: InterfacePage[] = [];
  const pagesNumbers: number[] = [];

  const insertPage = (n: number) => {
    if (n >= 1 && n <= pageTotal) {
      pagesNumbers.push(n);
    }
  };

  // Generating at the specified width according to the padding parameter.
  // If the width is less than the selected page, it adjusts until it fits.
  let paddingLeft = pageSelected - padding;
  let paddingRight = pageSelected + padding;
  if (paddingLeft < 1 && paddingRight > pageTotal) {
    // If our slot is larger than the entire range,
    // so simply display every page.
    paddingLeft = 1;
    paddingRight = pageTotal;
  } else if (paddingLeft < 1) {
    while (paddingLeft < 1) {
      paddingLeft++;
      paddingRight++;
    }
  } else if (paddingRight > pageTotal) {
    while (paddingRight > pageTotal) {
      paddingLeft--;
      paddingRight--;
    }
  }

  // Next, include the pages in the margins.
  // If a margin page is already covered in the slot,
  // extend the slot to the other direction.
  for (let i = 1; i <= margin; i++) {
    const left = i;
    const right = pageTotal - (i - 1);
    if (left >= paddingLeft) {
      paddingRight++;
    } else {
      insertPage(left);
    }
    if (right <= paddingRight) {
      paddingLeft--;
    } else {
      insertPage(right);
    }
  }

  // Adding padding pages
  for (let i = paddingLeft; i <= paddingRight; i++) {
    insertPage(i);
  }

  // Generate an sorted pages from pagesNumbers
  const sortedPages = pagesNumbers
    .slice()
    .sort((a, b) => a - b)
    .filter((page, index, array) => !index || page !== array[index - 1]);

  // Generate an pages from sorted pages
  for (let index = 0; index < sortedPages.length; index++) {
    const current = sortedPages[index];
    const selected = current === pageSelected;
    if (index === 0) {
      if (current !== 1) {
        // If the first page isn't page one then we add a break
        pages.push({
          type: "BREAK",
          number: 1,
        });
      }
      pages.push({
        type: "NUMBER",
        number: current,
        selected,
      });
    } else {
      const last = sortedPages[index - 1];
      const delta = current - last;
      if (delta === 1) {
        pages.push({
          type: "NUMBER",
          number: current,
          selected,
        });
      } else {
        // We skipped some, so add a break
        pages.push({
          type: "BREAK",
          number: current - 1,
        });
        pages.push({
          type: "NUMBER",
          number: current,
          selected,
        });
      }
    }
  }
  const lastPage = pages[pages.length - 1];
  if (lastPage.type === "NUMBER" && lastPage.number !== pageTotal) {
    // The last page we rendered wasn't the actual last page,
    // so we need an additional break
    pages.push({
      type: "BREAK",
      number: pageTotal,
    });
  }

  return pages;
};
