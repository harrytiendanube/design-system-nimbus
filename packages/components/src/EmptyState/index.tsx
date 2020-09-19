import * as React from "react";

import "./EmptyState.css";

import Title from "../Title";
import Button from "../Button";

export interface InterfaceEmptyState {
  /** Image URL for the empty state. */
  image: string;
  /** Title of the EmptyState */
  title?: string;
  /** Label of primary action */
  primaryActionLabel?: string;
  /** Label of secondary action */
  secondaryActionLabel?: string;
  /** OnClickPrimary callback function */
  onClickPrimary?: () => void;
  /** OnClickSecondary callback function */
  onClickSecondary?: () => void;
  /** Defines whether the component should be full width or not. */
  fullWidth?: boolean;
  /** Component to render in empty state body. */
  children: React.ReactNode;
}

/**
 * Layout used for aside component and background image.
 *
 * @param image Image URL for the empty state.
 * @param title Title of the EmptyState
 * @param primaryActionLabel Label of primary action
 * @param secondaryActionLabel Label of secondary action
 * @param onClickPrimary OnClickPrimary callback function
 * @param onClickSecondary OnClickSecondary callback function
 * @param fullWidth Defines whether the component should be full width or not.
 * @param children Component to render in empty state body.
 */
function EmptyState({
  image,
  title,
  primaryActionLabel,
  secondaryActionLabel,
  onClickPrimary,
  onClickSecondary,
  fullWidth,
  children,
}: InterfaceEmptyState): JSX.Element {
  const classname = React.useMemo(
    () =>
      fullWidth ? `nimbus--empty-state is-full-width` : `nimbus--empty-state`,
    [fullWidth],
  );
  const memorizedTitle = React.useMemo(
    () =>
      title && (
        <div className="nimbus--empty-state__heading">
          <Title type="h2">{title}</Title>
        </div>
      ),
    [title],
  );
  const handleClickPrimary = React.useCallback((): void => {
    onClickPrimary?.();
  }, [onClickPrimary]);
  const handleClickSecondary = React.useCallback((): void => {
    onClickSecondary?.();
  }, [onClickSecondary]);
  const memorizedPrimary = React.useMemo(
    () =>
      primaryActionLabel &&
      handleClickPrimary && (
        <div className="nimbus--action-wrapper__item">
          <Button onClick={handleClickPrimary} appearance="primary">
            {primaryActionLabel}
          </Button>
        </div>
      ),
    [primaryActionLabel, handleClickPrimary],
  );
  const memorizedSecondary = React.useMemo(
    () =>
      secondaryActionLabel &&
      handleClickSecondary && (
        <div className="nimbus--action-wrapper__item">
          <Button onClick={handleClickSecondary} link appearance="primary">
            {secondaryActionLabel}
          </Button>
        </div>
      ),
    [secondaryActionLabel, handleClickSecondary],
  );
  return (
    <div className={classname}>
      <div className="nimbus--empty-state__image">
        <img src={image} alt={title} />
      </div>
      <div className="nimbus--empty-state__content">
        {memorizedTitle}
        <div className="nimbus--empty-state__body">{children}</div>
        <div className="nimbus--action-wrapper">
          {memorizedPrimary}
          {memorizedSecondary}
        </div>
      </div>
    </div>
  );
}

EmptyState.defaultProps = {
  fullWidth: false,
};

export default React.memo(EmptyState);
