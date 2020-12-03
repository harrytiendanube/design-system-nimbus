import * as React from "react";

import classNames from "classnames";

import { PlusCircleIcon } from "@tiendanube/icons";

import RadioItem from "./InteractiveListPriv.RadioItem";
import ActionItem from "./InteractiveListPriv.ActionItem";
import CheckItem from "./InteractiveListPriv.CheckItem";

import "./InteractiveListPriv.css";

import { Link } from "..";

export { InterfaceInteractiveListActionItem } from "./InteractiveListPriv.ActionItem";
export { InterfaceInteractiveListCheckItem } from "./InteractiveListPriv.CheckItem";
export { InterfaceInteractiveListRadioItem } from "./InteractiveListPriv.RadioItem";

export interface InterfaceInteractiveListPriv {
  /** React node of type children */
  children: React.ReactNode;
  /** Label for add Item */
  addItemLabel?: string;
  /** Renders as skeleton */
  skeleton?: boolean;
  /** Add item onClick callback */
  onClickAddItem: () => void;
}

function InteractiveListPriv({
  children,
  addItemLabel,
  skeleton,
  onClickAddItem,
}: InterfaceInteractiveListPriv): JSX.Element {
  const mainClass = classNames("nimbus--interactive-list-wrapper");
  return (
    <div className={mainClass}>
      {addItemLabel && (
        <div className="nimbus--interactive-list__add-item">
          <div className="nimbus--interactive-list-item">
            {skeleton ? (
              <Link.Skeleton />
            ) : (
              <Link
                onClick={onClickAddItem}
                appearance="primary"
                icon={PlusCircleIcon}
              >
                {addItemLabel}
              </Link>
            )}
          </div>
        </div>
      )}
      <div className="nimbus--interactive-list" role="list">
        {children}
      </div>
    </div>
  );
}

InteractiveListPriv.ActionItem = ActionItem;
InteractiveListPriv.CheckItem = CheckItem;
InteractiveListPriv.RadioItem = RadioItem;

export default InteractiveListPriv;
