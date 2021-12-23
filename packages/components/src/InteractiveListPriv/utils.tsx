import * as React from "react";
import { Icon as IconType } from "@tiendanube/icons";
import { Text, Stack, Label, InterfaceLabel, IconItem } from "..";

const renderDescription = (
  description?: string,
  skeleton?: boolean,
): JSX.Element => (
  <>
    {description && (
      <div className="nimbus--interactive-list-item__description-wrapper">
        {skeleton ? (
          <Text.Skeleton width="large" />
        ) : (
          <Text block size="small" appearance="light">
            {description}
          </Text>
        )}
      </div>
    )}
  </>
);

const renderLabels = (
  labels?: Pick<InterfaceLabel, "id" | "label" | "colorTag" | "appearance">[],
  skeleton?: boolean,
): JSX.Element => (
  <>
    {labels && (
      <Stack wrap spacing="tight">
        {labels.map((label, index) => (
          <Stack.Item key={`${index}`}>
            {skeleton ? (
              <Label.Skeleton />
            ) : (
              <Label
                id={label.id}
                label={label.label}
                colorTag={label.colorTag}
                appearance={label.appearance}
              />
            )}
          </Stack.Item>
        ))}
      </Stack>
    )}
  </>
);

const renderBelow = (
  description?: string,
  labels?: Pick<InterfaceLabel, "id" | "label" | "colorTag" | "appearance">[],
  skeleton?: boolean,
): JSX.Element => {
  return (
    <>
      {(labels || description) && (
        <div className="nimbus--interactive-list-item__info">
          {description && renderDescription(description, skeleton)}
          {labels && renderLabels(labels, skeleton)}
        </div>
      )}
    </>
  );
};

const renderBlockLeft = (blockLeft?: React.ReactNode): JSX.Element => {
  return (
    <>
      {blockLeft && (
        <div className="nimbus--interactive-list-item__block">{blockLeft}</div>
      )}
    </>
  );
};

const renderIcon = (
  icon?: IconType,
  appearance?:
    | "default"
    | "primary"
    | "secondary"
    | "danger"
    | "warning"
    | "success",
): JSX.Element | undefined => {
  return icon && <IconItem icon={icon} appearance={appearance} />;
};

export { renderBelow, renderIcon, renderBlockLeft };
