import * as React from "react";

import Item from "./Timeline.Item";
import "./Timeline.css";

export { InterfaceTimelineItem } from "./Timeline.Item";

export interface InterfaceTimeline {
  /** React node of type children */
  children: React.ReactNode;
}

/** @param children React node of type children */
const Timeline = React.memo(function Timeline({ children }: InterfaceTimeline) {
  return <div className="nimbus--timeline-wrapper">{children}</div>;
}) as React.NamedExoticComponent<InterfaceTimeline> & {
  Item: typeof Item;
};

Timeline.Item = Item;

export default Timeline;
