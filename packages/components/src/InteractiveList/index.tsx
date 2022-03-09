import * as React from "react";

import { Icon as IconType } from "@tiendanube/icons";
import { InteractiveListPriv, InterfaceLabel } from "..";
import { InterfaceNameChecked } from "../common/interfaces";

export interface InterfaceInteractiveListOptions {
  /** Title */
  title: string;
  /** Name */
  name: string;
  /** Description */
  description?: string;
  /** Labels */
  labels?: Pick<InterfaceLabel, "id" | "label" | "colorTag" | "appearance">[];
  /** Active indicator */
  active?: boolean;
  /** Hide border bottom on options */
  hideBorder?: boolean;
  /** Renders a content block to the left of the component */
  blockLeft?: React.ReactNode;
  /** Icon Component imported from @tiendanube/icons */
  icon?: IconType;
  /** Appearance of the IconItem determines the background color */
  iconAppearance?:
    | "default"
    | "primary"
    | "secondary"
    | "danger"
    | "warning"
    | "success";
  /** Disabled some option */
  disabled?: boolean;
}

export interface InterfaceInteractiveList {
  /** Label for add Item */
  addItemLabel?: string;
  /** Options */
  options: InterfaceInteractiveListOptions[];
  /** Mode */
  mode?: "single" | "multi" | "action";
  /** Renders as skeleton */
  skeleton?: boolean;
  /** Add item onClick callback */
  onClickAddItem?: () => void;
  /** OnChange callback */
  onChange: (selected: string[]) => void;
}

function InteractiveList({
  addItemLabel,
  options,
  mode = "action",
  skeleton,
  onClickAddItem,
  onChange,
}: InterfaceInteractiveList): JSX.Element {
  const handleChangeAction = (event: InterfaceNameChecked) => {
    onChange([event.name]);
  };

  const handleChangeCheck = (event: InterfaceNameChecked) => {
    const newOptions = [...options];
    const optionIndex = newOptions.findIndex(
      (option) => option.name === event.name,
    );
    newOptions[optionIndex] = {
      ...newOptions[optionIndex],
      active: event.checked,
    };
    const activeOptions = newOptions
      .filter((option) => option.active)
      .map((option) => option.name);
    onChange(activeOptions);
  };

  const handleChangeRadio = (event: InterfaceNameChecked) => {
    onChange([event.name]);
  };

  const renderActions =
    mode === "action" &&
    options.map((option, index) => (
      <InteractiveListPriv.ActionItem
        key={index}
        title={option.title}
        name={option.name}
        description={option.description}
        labels={option.labels}
        skeleton={skeleton}
        onChange={handleChangeAction}
        hideBorder={option.hideBorder}
        blockLeft={option.blockLeft}
        icon={option.icon}
        iconAppearance={option.iconAppearance}
        disabled={option.disabled}
      />
    ));

  const renderCheckBoxes =
    mode === "multi" &&
    options.map((option, index) => (
      <InteractiveListPriv.CheckItem
        key={index}
        title={option.title}
        name={option.name}
        description={option.description}
        labels={option.labels}
        checked={option.active}
        skeleton={skeleton}
        onChange={handleChangeCheck}
        hideBorder={option.hideBorder}
        blockLeft={option.blockLeft}
        icon={option.icon}
        iconAppearance={option.iconAppearance}
        disabled={option.disabled}
      />
    ));

  const renderCheckRadios =
    mode === "single" &&
    options.map((option, index) => (
      <InteractiveListPriv.RadioItem
        key={index}
        title={option.title}
        value={option.name}
        description={option.description}
        labels={option.labels}
        checked={option.active}
        skeleton={skeleton}
        onChange={handleChangeRadio}
        hideBorder={option.hideBorder}
        blockLeft={option.blockLeft}
        icon={option.icon}
        iconAppearance={option.iconAppearance}
        disabled={option.disabled}
      />
    ));

  return (
    <InteractiveListPriv
      addItemLabel={addItemLabel}
      skeleton={skeleton}
      onClickAddItem={onClickAddItem}
    >
      {renderActions}
      {renderCheckBoxes}
      {renderCheckRadios}
    </InteractiveListPriv>
  );
}

export default InteractiveList;
