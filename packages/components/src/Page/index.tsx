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
  /** Navigation to previous screen */
  backNavigation?: Pick<InterfaceButton, "children" | "onClick">;
  /** Defines whether the page has pagination to previous */
  paginationPrevious?: () => void;
  /** Defines whether the page has pagination to next */
  paginationNext?: () => void;
  /** Edit action for the title section */
  editAction?: Pick<InterfaceLink, "children" | "onClick">;
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
  backNavigation,
  paginationPrevious,
  paginationNext,
  editAction,
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

  const renderNavigation = (
    <div
      className={classNames("nimbus--page-navbar", {
        "is-scrolled": showTitle,
      })}
    >
      <div className="nimbus--page-navbar__back">
        {backNavigation && (
          <Button
            onClick={backNavigation.onClick}
            icon={ChevronLeftIcon}
            appearance="secondary"
          >
            {backNavigation.children}
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
          <Stack justify="flex-end" spacing="tight">
            {editAction && (
              <Stack.Item>
                <Link onClick={editAction.onClick}>{editAction.children}</Link>
              </Stack.Item>
            )}
            {(primaryAction || secondaryActions) && (
              <Stack.Item>
                <Popover isMenu name="dropdownMenu" position="right">
                  <Stack column align="flex-start">
                    {renderSecondaryActions}
                    {renderPrimaryAction}
                  </Stack>
                </Popover>
              </Stack.Item>
            )}
          </Stack>
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
    const target = document.querySelector("#header");
    observer.observe(target as Element);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="nimbus--page">
      <div className="nimbus--page-header">
        {renderNavigation}
        <div className="nimbus--page-heading" id="header">
          <Stack>
            <Stack.Item fill>
              {title === "skeleton" ? (
                <PageTitle.Skeleton />
              ) : (
                <PageTitle title={title} />
              )}
            </Stack.Item>
            {paginationPrevious && paginationNext && (
              <Responsive display="mobile">
                <Stack.Item>
                  <Link onClick={paginationPrevious} icon={ArrowLeftIcon} />
                </Stack.Item>
                <Stack.Item>
                  <Link onClick={paginationNext} icon={ArrowRightIcon} />
                </Stack.Item>
              </Responsive>
            )}
            <Responsive display="desktop">
              {renderSecondaryActions}
              {renderPrimaryAction}
            </Responsive>
          </Stack>
          {renderHeaderLabels}
        </div>
      </div>
      <div className="nimbus--page-content">{children}</div>
    </div>
  );
}

export default Page;
