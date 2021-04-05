/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import TooltipTrigger from "react-popper-tooltip";
import "./Tooltip.css";
import { Icon as IconType } from "@tiendanube/icons";

export interface InterfaceTooltip {
  /** Icon label for the tooltip */
  labelIcon?: IconType;
  /** Text Label for the Tooltip */
  labelText?: string;
  /** Text AriaLabel for the Tooltip */
  ariaLabel?: string;
  /** Position of the tooltip */
  position?: "auto" | "top" | "bottom" | "left" | "right";
  /** React node of type children */
  children: React.ReactNode;
}

function Tooltip({
  labelIcon: Icon,
  labelText,
  ariaLabel,
  position = "top",
  children,
}: InterfaceTooltip): JSX.Element {
  const renderIconOrLabel = Icon ? <Icon /> : `${labelText}`;

  interface InterfaceInternalTooltip {
    arrowRef: any;
    tooltipRef: any;
    getArrowProps: any;
    getTooltipProps: any;
    placement: any;
  }

  function InternalTooltip({
    arrowRef,
    tooltipRef,
    getArrowProps,
    getTooltipProps,
    placement,
  }: InterfaceInternalTooltip): JSX.Element {
    const tooltipProps = getTooltipProps({
      ref: tooltipRef,
      className: "nimbus--tooltip",
    });
    const arrowProps = getArrowProps({
      ref: arrowRef,
      className: "nimbus--tooltip__caret",
      "data-placement": placement,
    });
    return (
      <div {...tooltipProps} role="dialog">
        <div {...arrowProps} />
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
      className: "nimbus--tooltip-trigger",
    });
    return (
      <span
        {...triggerProps}
        role="tooltip"
        aria-label={ariaLabel || labelText}
      >
        {renderIconOrLabel}
      </span>
    );
  }

  return (
    <TooltipTrigger
      placement={position}
      trigger={["hover", "click"]}
      tooltip={InternalTooltip}
    >
      {Trigger}
    </TooltipTrigger>
  );
}

export default Tooltip;
