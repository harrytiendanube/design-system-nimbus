import * as React from "react";

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
  labels?: Pick<InterfaceLabel, "id" | "label" | "colorTag">[];
  /** Active indicator */
  active?: boolean;
}

export interface InterfaceInteractiveList {
  /** Label for add Item */
  addItemLabel?: string;
  /** Options */
  options: InterfaceInteractiveListOptions[];
  /** Mode */
  mode: "single" | "multi" | "action";
  /** Renders as skeleton */
  skeleton?: boolean;
  /** Add item onClick callback */
  onClickAddItem: () => void;
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
  const activesInitial: { [key: string]: boolean } = {};
  let radioInitial = "";
  options.forEach((option) => {
    activesInitial[option.name] = !!option.active;
    if (!radioInitial && option.active) radioInitial = option.name;
  });

  const [actives, setActives] = React.useState(activesInitial); // State for CheckBoxes
  const [active, setActive] = React.useState(radioInitial); // State for Radios

  const handleChangeAction = (event: InterfaceNameChecked) => {
    const result = { name: event.name, checked: event.checked };
    const newValues = [result.name];
    onChange(newValues);
  };

  const handleChangeCheck = (event: InterfaceNameChecked) => {
    const newActives = { ...actives, [event.name]: event.checked };
    setActives(newActives);
    const objectEntries = Object.entries(newActives);
    onChange(
      objectEntries.filter((entry) => entry[1]).map((entry) => entry[0]),
    );
  };

  const handleChangeRadio = (event: InterfaceNameChecked) => {
    setActive(event.name);
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
        checked={actives[option.name]}
        skeleton={skeleton}
        onChange={handleChangeCheck}
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
        checked={active === option.name}
        skeleton={skeleton}
        onChange={handleChangeRadio}
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
