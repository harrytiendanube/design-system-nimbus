import * as React from "react";

import "./Page.css";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
} from "@tiendanube/icons";
import Responsive from "../Responsive";
import PageTitle from "../PageTitle";
import {
  Button,
  InterfaceButton,
  Stack,
  Popover,
  InterfaceLabel,
  Label,
} from "..";

export interface InterfacePage {
  /** Component to render in page content. */
  children: React.ReactNode;
  /** Title */
  title: string;
  /** Navigation to previous screen */
  backNavigation?: Pick<InterfaceButton, "children" | "onClick">;
  /** Defines whether the page has pagination to previous */
  paginationPrevious?: () => void;
  /** Defines whether the page has pagination to next */
  paginationNext?: () => void;
  /** Primary action for the title section */
  primaryAction?:
    | Pick<InterfaceButton, "children" | "onClick" | "icon" | "iconPosition">
    | "skeleton";
  /** Secondary actions for the title section */
  secondaryActions?: (
    | Pick<InterfaceButton, "children" | "onClick" | "icon" | "iconPosition">
    | "skeleton"
  )[];
  /** Labels for the title section */
  headerLabels?: (InterfaceLabel | "skeleton")[];
}

/**
 * Page component used to render pages for the application
 *
 * @param children Component to render in page content.
 * @param title Name of the page and content of the page title.
 * @param backNavigation Navigation to previous screen
 * @param paginationPrevious Defines whether the page has pagination to previous
 * @param paginationNext Defines whether the page has pagination to next
 * @param primaryAction Primary action for the title section
 * @param secondaryActions Secondary actions for the title section
 * @param headerLabels Labels for the title section
 */
function Page({
  children,
  title,
  backNavigation,
  paginationPrevious,
  paginationNext,
  primaryAction,
  secondaryActions,
  headerLabels,
}: InterfacePage): JSX.Element {
  const memorizedNavigation = React.useMemo(
    () =>
      backNavigation && (
        <div className="nimbus--page-navbar">
          <Stack>
            <Stack.Item fill>
              <Button
                onClick={backNavigation.onClick}
                icon={ChevronLeftIcon}
                link
              >
                {backNavigation.children}
              </Button>
            </Stack.Item>
            {paginationPrevious && paginationNext && (
              <>
                <Stack.Item>
                  <Button
                    link
                    onClick={paginationPrevious}
                    icon={ArrowLeftIcon}
                  />
                </Stack.Item>
                <Stack.Item>
                  <Button link onClick={paginationNext} icon={ArrowRightIcon} />
                </Stack.Item>
              </>
            )}
          </Stack>
        </div>
      ),
    [backNavigation, paginationPrevious, paginationNext],
  );

  const memorizedPrimaryAction = React.useMemo(
    () =>
      primaryAction && (
        <Stack.Item>
          {primaryAction === "skeleton" ? (
            <Button.Skeleton />
          ) : (
            <Button
              onClick={primaryAction.onClick}
              appearance="primary"
              icon={primaryAction.icon}
              iconPosition={primaryAction.iconPosition}
            >
              {primaryAction.children}
            </Button>
          )}
        </Stack.Item>
      ),
    [primaryAction],
  );

  const memorizedSecondaryActions = React.useMemo(
    () =>
      secondaryActions?.map((action, index) => (
        <Stack.Item key={index}>
          {action === "skeleton" ? (
            <Button.Skeleton />
          ) : (
            <Button
              onClick={action.onClick}
              link
              appearance="secondary"
              icon={action.icon}
              iconPosition={action.iconPosition}
            >
              {action.children}
            </Button>
          )}
        </Stack.Item>
      )),
    [secondaryActions],
  );

  const memorizedHeaderLabels = React.useMemo(
    () => (
      <div className="nimbus--page-header__labels">
        <Stack spacing="tight">
          {headerLabels?.map((label, index) => (
            <Stack.Item key={index}>
              {label === "skeleton" ? (
                <Label.Skeleton />
              ) : (
                <Label
                  id={label.id}
                  appearance={label.appearance}
                  icon={label.icon}
                  label={label.label}
                />
              )}
            </Stack.Item>
          ))}
        </Stack>
      </div>
    ),
    [headerLabels],
  );

  return (
    <div className="nimbus--page">
      <div className="nimbus--page-header">
        {(primaryAction || secondaryActions) && (
          <Responsive display="mobile">
            <div className="nimbus--page-menubar">
              <Stack justify="space-between">
                <Stack.Item>{/* TODO: add menu */}</Stack.Item>
                <Stack.Item>
                  <Popover isMenu name="dropdownMenu" position="right">
                    <Stack column align="flex-start">
                      {memorizedSecondaryActions}
                      {memorizedPrimaryAction}
                    </Stack>
                  </Popover>
                </Stack.Item>
              </Stack>
            </div>
          </Responsive>
        )}
        {memorizedNavigation}
        <div className="nimbus--page-heading">
          <Stack>
            <Stack.Item fill>
              {title === "skeleton" ? (
                <PageTitle.Skeleton />
              ) : (
                <PageTitle title={title} />
              )}
            </Stack.Item>
            <Responsive display="desktop">
              {memorizedSecondaryActions}
              {memorizedPrimaryAction}
            </Responsive>
          </Stack>
          {memorizedHeaderLabels}
        </div>
      </div>
      <div className="nimbus--page-content">{children}</div>
    </div>
  );
}

export default React.memo(Page);
