/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import TooltipTrigger from "react-popper-tooltip";
import classNames from "classnames";

import { Icon as IconType } from "@tiendanube/icons";
import { Text } from "..";

export interface InterfaceKeyboardToolbarPopover {
  /** React node of type children */
  children: React.ReactNode;
  /**
   * Icon for the trigger button. If no icon is given, the text label will be
   * visible
   */
  icon?: IconType;
  /** Label used for a11y. It remains invisible unless no icon is provided */
  label: string;
  /** Whether the trigger button is disabled */
  disabled?: boolean;
  /** Arranges the buttons inside the popover vertically instead of horizontally */
  column?: boolean;
}

function Popover({
  children,
  icon: Icon,
  label,
  disabled = false,
  column = false,
}: InterfaceKeyboardToolbarPopover): JSX.Element {
  const [visibility, setVisibility] = React.useState(false);

  const className = classNames("nimbus--keyboard-toolbar-button", {
    "is--active": visibility,
  });

  interface InterfaceInternalTooltip {
    tooltipRef: any;
    getTooltipProps: any;
    placement: any;
  }

  function InternalTooltip({
    tooltipRef,
    getTooltipProps,
  }: InterfaceInternalTooltip): JSX.Element {
    const popoverClassName = classNames("nimbus--keyboard-toolbar-popover", {
      "is--column": column,
    });
    const tooltipProps = getTooltipProps({
      ref: tooltipRef,
      className: popoverClassName,
    });
    return (
      <div {...tooltipProps} role="dialog">
        {children}
      </div>
    );
  }

  interface InterfaceTrigger {
    triggerRef: any;
    getTriggerProps: any;
  }

  function Trigger({ getTriggerProps, triggerRef }: InterfaceTrigger) {
    const triggerProps = getTriggerProps({
      ref: triggerRef,
      className: "nimbus--keyboard-toolbar-button__wrapper",
    });
    return (
      <span
        {...triggerProps}
        role="tooltip"
        aria-label={label}
        type="button"
        disabled={disabled}
      >
        <div className={className}>
          {Icon ? (
            <Icon />
          ) : (
            <Text size="small" block>
              {label}
            </Text>
          )}
        </div>
      </span>
    );
  }

  const handleVisibilityChange = (value: boolean) => setVisibility(value);

  return (
    <TooltipTrigger
      placement="top-start"
      trigger="click"
      tooltip={InternalTooltip}
      onVisibilityChange={handleVisibilityChange}
    >
      {Trigger}
    </TooltipTrigger>
  );
}

export default Popover;
