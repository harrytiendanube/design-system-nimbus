import * as React from "react";
import { Text, Stack, Label, InterfaceLabel } from "..";

const renderDescription = (
  description?: string,
  skeleton?: boolean,
): JSX.Element => (
  <>
    {description &&
      (skeleton ? (
        <Text.Skeleton width="large" />
      ) : (
        <Text block size="small" appearance="light">
          {description}
        </Text>
      ))}
  </>
);

const renderLabels = (
  labels?: Pick<InterfaceLabel, "id" | "label" | "colorTag">[],
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
  labels?: Pick<InterfaceLabel, "id" | "label" | "colorTag">[],
  skeleton?: boolean,
): JSX.Element => {
  if (description && labels) {
    throw new Error(
      "You can not use parameters 'description' and 'labels' simultaneously",
    );
  }
  return (
    <>
      {(labels || description) && (
        <div className="nimbus--interactive-list-item__info">
          {renderDescription(description, skeleton)}
          {renderLabels(labels, skeleton)}
        </div>
      )}
    </>
  );
};
export { renderBelow };
