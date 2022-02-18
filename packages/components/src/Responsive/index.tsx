import * as React from "react";

export type TypeDisplays = ("desktop" | "mobile" | "tablet")[];

export interface InterfaceResponsive {
  displays: TypeDisplays;
  children: React.ReactNode;
}

export const limitsWith = {
  mobile: { min: 0, max: 671 },
  tablet: { min: 672, max: 1023 },
  desktop: { min: 1024, max: 99999 },
};

function Responsive({ displays, children }: InterfaceResponsive): JSX.Element {
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  React.useEffect(() => {
    function handleReSize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleReSize);

    return () => {
      window.removeEventListener("resize", handleReSize);
    };
  });

  let renderChildren = false;
  displays.forEach((display) => {
    if (
      !renderChildren &&
      limitsWith[display].min <= dimensions.width &&
      dimensions.width <= limitsWith[display].max
    ) {
      renderChildren = true;
    }
  });

  return <>{renderChildren && children}</>;
}

export default React.memo(Responsive);
