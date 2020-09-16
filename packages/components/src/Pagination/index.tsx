import * as React from "react";

import "./Pagination.css";

import { ChevronLeftIcon, ChevronRightIcon } from "@tiendanube/icons";

import { Button } from "..";
import { getPages, InterfacePage } from "./model";

export interface InterfacePagination {
  /**
   *  Total of pages
   */
  pageTotal?: number;
  /**
   *  Page selected
   */
  pageSelected: number;
  /**
   * Indicates whether or not there are more pages. Only makes sense when pageTotal is not supplied.
   */
  hasMorePages?: boolean;
  /**
   *  Number of pages to always show at the left and right of the component.
   */
  margin?: number;
  /**
   *  Number pages to display on each side of the currently selected page.
   */
  padding?: number;
  /*
   * Callback to be called when a page is selected
   */
  onPageSelect: (page: number) => void;
}
/**
 *  @param pageTotal Total of pages
 *  @param pageSelected  Page selected
 *  @param hasMorePages Indicates whether or not there are more pages. Only makes sense when pageTotal is not supplied.
 *  @param margin Number of pages to always show at the left and right of the component.
 *  @param padding Number pages to display on each side of the currently selected page.
 *  @param onPageSelect Callback to be called when a page is selected
 */
function Pagination({
  pageTotal,
  pageSelected,
  hasMorePages,
  margin = 1,
  padding = 2,
  onPageSelect,
}: InterfacePagination): JSX.Element | null {
  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, page: number) => {
      event.stopPropagation();
      onPageSelect(page);
    },
    [onPageSelect],
  );

  const pages: InterfacePage[] = React.useMemo(
    () => (pageTotal ? getPages(pageTotal, pageSelected, margin, padding) : []),
    [margin, padding, pageSelected, pageTotal],
  );

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className="nimbus--button-group"
    >
      <Button
        onClick={(e) => handleClick(e, pageSelected - 1)}
        disabled={pageSelected === 1}
        icon={ChevronLeftIcon}
        iconPosition="start"
      />
      {pages.map((page, index) => {
        let label;
        let disabled;
        if (page.type === "NUMBER") {
          label = page.number;
          disabled = false;
        } else {
          label = "...";
          disabled = true;
        }
        return (
          <Button
            key={index}
            onClick={(e) => {
              handleClick(e, page.number);
            }}
            appearance={page.selected ? "secondary" : "default"}
            disabled={disabled}
          >
            {label}
          </Button>
        );
      })}
      <Button
        onClick={(e) => {
          handleClick(e, pageSelected + 1);
        }}
        disabled={pageSelected === pageTotal || !hasMorePages}
        icon={ChevronRightIcon}
        iconPosition="end"
      />
    </nav>
  );
}

Pagination.defaultProps = {
  margin: 1,
  padding: 2,
  hasMorePages: true,
};

export default React.memo(Pagination);
