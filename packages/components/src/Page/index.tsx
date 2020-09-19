import * as React from "react";

import "./Page.css";

import PageTitle from "../PageTitle";

export interface InterfacePage {
  /** Component to render in page content. */
  children: React.ReactNode;
  /** Title */
  title: string;
  /** Title */
  subtitle?: string;
  /** Link */
  link?: string;
  /** Link href */
  linkTo?: string;
}

/**
 * Page component used to render pages for the application
 *
 * @param children Component to render in page content.
 * @param pageTitle Name of the page and content of the page title.
 * @param pageSubtitle Page subtitle.
 * @param pageLink Page link inside the subtitle.
 * @param pageLinkTo Href of the page link.
 */
function Page({
  children,
  title,
  subtitle,
  link,
  linkTo,
}: InterfacePage): JSX.Element {
  return (
    <div className="nimbus--page">
      <div className="nimbus--page__header">
        <PageTitle
          title={title}
          subtitle={subtitle}
          link={link}
          linkTo={linkTo}
        />
      </div>
      <div className="nimbus--page__content">{children}</div>
    </div>
  );
}

export default React.memo(Page);
