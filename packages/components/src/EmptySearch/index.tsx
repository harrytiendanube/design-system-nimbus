import * as React from "react";

import "./EmptySearch.css";

import { SearchIcon } from "@tiendanube/icons";
import Text from "../Text";

export interface InterfaceEmptySearch {
  /** Title of the EmptySearch */
  title: string;
  /** Helper text of the EmptySearch */
  text?: string;
}

/**
 * Layout used for aside component and background image.
 *
 * @param title Title of the EmptySearch
 * @param text Helper text of the EmptySearch
 */
function EmptySearch({ title, text }: InterfaceEmptySearch): JSX.Element {
  return (
    <div className="nimbus--empty-search">
      <div className="nimbus--empty-search__icon">
        <SearchIcon size="large" />
      </div>
      <div className="nimbus--empty-search__content">
        <Text block appearance="secondary" textAlign="center" bold>
          {title}
        </Text>
        {text && (
          <div className="nimbus--empty-state__heading">
            <Text block appearance="light" textAlign="center" size="small">
              {text}
            </Text>
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(EmptySearch);
