/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

interface UseEventListenerInterface {
  eventName: string;
  handler: (a: any) => void;
  element?: HTMLElement | Window;
}

function useEventListener({
  eventName,
  handler,
  element = window,
}: UseEventListenerInterface): void {
  // Create a ref that stores handler
  const savedHandler = React.useRef<(a: any) => void>(handler);

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  React.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  React.useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      // Create event listener that calls handler function stored in ref
      const eventListener = (event: any) => {
        savedHandler.current(event);
      };

      // Add event listener
      element.addEventListener(eventName, eventListener);

      // Remove event listener on cleanup
      // eslint-disable-next-line consistent-return
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element], // Re-run if eventName or element changes
  );
}

export default useEventListener;