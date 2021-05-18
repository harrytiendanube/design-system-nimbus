import * as React from "react";

import "./Page.css";

import {
  ChevronLeftIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@tiendanube/icons";
import classNames from "classnames";
import Responsive from "../Responsive";
import PageTitle from "../PageTitle";
import {
  Button,
  InterfaceButton,
  Link,
  InterfaceLink,
  Stack,
  Popover,
  InterfaceLabel,
  Label,
  Text,
} from "..";

export interface InterfacePage {
  /** Component to render in page content. */
  children: React.ReactNode;
  /** Title */
  title: string;
  /** Header left action */
  headerNavigation?: Pick<InterfaceButton, "children" | "onClick">;
  /** Defines whether the page has pagination to previous */
  paginationPrevious?: () => void;
  /** Defines whether the page has pagination to next */
  paginationNext?: () => void;
  /** Header action for the title section */
  headerAction?: Pick<
    InterfaceLink,
    "children" | "onClick" | "icon" | "spinner" | "disabled"
  >;
  /** Primary action for the title section */
  primaryAction?:
    | Pick<InterfaceButton, "children" | "onClick" | "icon" | "iconPosition">
    | "skeleton";
  /** Secondary actions for the title section */
  secondaryActions?: (
    | Pick<InterfaceLink, "children" | "onClick" | "icon" | "iconPosition">
    | "skeleton"
  )[];
  /** Labels for the title section */
  headerLabels?: (InterfaceLabel | "skeleton")[];
}

function Page({
  children,
  title,
  headerNavigation,
  paginationPrevious,
  paginationNext,
  headerAction,
  primaryAction,
  secondaryActions,
  headerLabels,
}: InterfacePage): JSX.Element {
  const [showTitle, setShowTitle] = React.useState(false);

  const renderPrimaryAction = primaryAction && (
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
  );

  const renderSecondaryActions = secondaryActions?.map((action, index) => (
    <Stack.Item key={index}>
      {action === "skeleton" ? (
        <Link.Skeleton />
      ) : (
        <Link
          onClick={action.onClick}
          appearance="secondary"
          icon={action.icon}
          iconPosition={action.iconPosition}
        >
          {action.children}
        </Link>
      )}
    </Stack.Item>
  ));

  const menuSecondaryActions = (secondaryActions || []) as (
    | Pick<InterfaceLink, "children" | "appearance" | "onClick" | "icon">
    | "skeleton"
  )[];

  const menuPrimaryAction = primaryAction as
    | Pick<InterfaceLink, "children" | "appearance" | "onClick" | "icon">
    | "skeleton";

  let menuPrimaryActionIcon: React.ReactElement | null = null;

  if (menuPrimaryAction) {
    menuPrimaryActionIcon =
      menuPrimaryAction === "skeleton" ? (
        <Link.Skeleton />
      ) : (
        <Link
          onClick={menuPrimaryAction.onClick}
          icon={menuPrimaryAction.icon}
        />
      );
  }

  const menuPopover = [...menuSecondaryActions];

  if (menuPrimaryAction) {
    menuPopover.push(menuPrimaryAction);
    if (menuPrimaryAction !== "skeleton")
      menuPrimaryAction.appearance = "primary";
  }

  const renderNavigation = (
    <div
      className={classNames("nimbus--page-navbar", {
        "is-scrolled": showTitle,
      })}
    >
      <div className="nimbus--page-navbar__back">
        {headerNavigation && (
          <Button
            onClick={headerNavigation.onClick}
            icon={ChevronLeftIcon}
            appearance="secondary"
          >
            {headerNavigation.children}
          </Button>
        )}
      </div>
      <Responsive display="mobile">
        <div
          className={`nimbus--page-navbar__title ${
            showTitle ? "is-visible" : ""
          }`}
        >
          {title === "skeleton" ? (
            <Text.Skeleton />
          ) : (
            <Text appearance="secondary" textAlign="center" bold>
              {title}
            </Text>
          )}
        </div>
      </Responsive>
      <div className="nimbus--page-navbar__toolbar">
        <Responsive display="mobile">
          {headerAction && (
            <Link
              icon={headerAction.icon}
              onClick={headerAction.onClick}
              spinner={headerAction.spinner}
              disabled={headerAction.disabled}
            >
              {headerAction.children}
            </Link>
          )}
          {menuSecondaryActions.length > 0 && (
            <Popover menu={menuPopover} name="dropdownMenu" position="right" />
          )}
          {menuSecondaryActions.length === 0 &&
            menuPrimaryActionIcon &&
            menuPrimaryActionIcon}
        </Responsive>
        {paginationPrevious && paginationNext && (
          <Responsive display="desktop">
            <Link onClick={paginationPrevious} icon={ArrowLeftIcon} />
            <Link onClick={paginationNext} icon={ArrowRightIcon} />
          </Responsive>
        )}
      </div>
    </div>
  );

  const renderHeaderLabels = (
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
  );

  const targetID = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const options = {
      threshold: 0.75,
    };
    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        setShowTitle(false);
      } else setShowTitle(true);
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(targetID.current as HTMLDivElement);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="nimbus--page">
      <div className="nimbus--page-header">
        {renderNavigation}
        <div className="nimbus--page-heading" ref={targetID}>
          <Responsive display="desktop">
            <Stack>
              <Stack.Item fill>
                {title === "skeleton" ? (
                  <PageTitle.Skeleton />
                ) : (
                  <PageTitle title={title} />
                )}
              </Stack.Item>
              {renderSecondaryActions}
              {renderPrimaryAction}
            </Stack>
          </Responsive>
          <Responsive display="mobile">
            <div className="nimbus--page-heading__main">
              {title === "skeleton" ? (
                <PageTitle.Skeleton />
              ) : (
                <PageTitle title={title} />
              )}
              {paginationPrevious && paginationNext && (
                <div className="nimbus--page-heading__pagination">
                  <Link onClick={paginationPrevious} icon={ArrowLeftIcon} />
                  <Link onClick={paginationNext} icon={ArrowRightIcon} />
                </div>
              )}
            </div>
          </Responsive>
          {renderHeaderLabels}
        </div>
      </div>
      <div className="nimbus--page-content">{children}</div>
    </div>
  );
}

export default Page;