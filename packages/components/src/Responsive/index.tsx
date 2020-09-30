import * as React from "react";

export interface InterfaceResponsive {
  display: "desktop" | "mobile";
  children: React.ReactNode;
}

function Responsive({ display, children }: InterfaceResponsive): JSX.Element {
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const limitsWith = {
    mobile: { min: 0, max: 671 },
    desktop: { min: 672, max: 99999 },
  };

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

  return (
    <>
      {limitsWith[display].min <= dimensions.width &&
        dimensions.width <= limitsWith[display].max &&
        children}
    </>
  );
}

export default React.memo(Responsive);
