import * as React from "react";

import { ChevronDownIcon } from "@tiendanube/icons";
import useEventListener from "./useEventListener";

import { Spinner } from "..";

import "./PullToRefresh.css";

const distance = 60;

export interface InterfacePullToRefresh {
  /** React node of type children */
  children: React.ReactNode;
  /** Event to be fired when user pulls */
  onRefresh: () => void;
  /** Shows a loading spinner */
  loading?: boolean;
}

function PullToRefresh({
  children,
  onRefresh,
  loading,
}: InterfacePullToRefresh): JSX.Element {
  const data = React.useRef({
    start: {
      x: 0,
      y: 0,
    },
    current: {
      x: 0,
      y: 0,
    },
  });

  const container = React.useRef<HTMLDivElement | null>(null);

  const swipeStart = React.useCallback(
    (e) => {
      if (loading) return;
      if (typeof e.targetTouches !== "undefined") {
        const touch = e.targetTouches[0];
        data.current.start.x = touch.screenX;
        data.current.start.y = touch.screenY;
      } else {
        data.current.start.x = e.screenX;
        data.current.start.y = e.screenY;
      }
    },
    [loading],
  );

  const swipe = React.useCallback(
    (e) => {
      if (loading) return;
      if (typeof e.changedTouches !== "undefined") {
        const touch = e.changedTouches[0];
        data.current.current.x = touch.screenX;
        data.current.current.y = touch.screenY;
      } else {
        data.current.current.x = e.screenX;
        data.current.current.y = e.screenY;
      }
      const changeY =
        data.current.start.y < data.current.current.y
          ? Math.abs(data.current.start.y - data.current.current.y)
          : 0;

      let height = changeY - window.scrollY < 0 ? 0 : changeY - window.scrollY;
      height = height > distance ? distance : height;

      if (container.current) {
        if (height === distance) {
          container.current.classList.add("rotate");
        } else {
          container.current.classList.remove("rotate");
        }

        container.current.setAttribute("style", `height: ${height}px;`);
      }
    },
    [loading],
  );

  const swipeEnd = React.useCallback(() => {
    if (loading) return;
    const changeY =
      data.current.start.y < data.current.current.y
        ? Math.abs(data.current.start.y - data.current.current.y)
        : 0;

    const move = changeY - window.scrollY;
    if (container.current) {
      container.current.classList.remove("rotate");

      container.current.setAttribute("style", `height: ${0}px`);
    }

    if (move > distance && onRefresh) {
      onRefresh();
    }
    data.current = {
      start: {
        x: 0,
        y: 0,
      },
      current: {
        x: 0,
        y: 0,
      },
    };
  }, [onRefresh, loading]);

  React.useEffect(() => {
    if (container.current) {
      container.current.classList.remove("rotate");
      container.current.setAttribute("style", `height: ${0}px`);
    }
  }, [onRefresh]);

  useEventListener({ eventName: "touchstart", handler: swipeStart });
  useEventListener({ eventName: "touchmove", handler: swipe });
  useEventListener({ eventName: "touchend", handler: swipeEnd });

  return (
    <div>
      {loading && (
        <div className="nimbus--refresh-spinner-wrapper">
          <Spinner size="medium" appearance="primary" />
        </div>
      )}
      <div ref={container} className="nimbus--refresh-container">
        <div className="nimbus--icon-container">
          <ChevronDownIcon />
        </div>
      </div>
      {children}
    </div>
  );
}

export default PullToRefresh;
