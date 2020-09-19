import * as React from "react";

import "./LayoutBackground.css";

export interface InterfaceLayoutBackground {
  /** Component to render in aside left block. */
  children: React.ReactNode;
  /** Background image. You can send URL or an imported image. */
  image: React.ReactNode | string;
}

/**
 * Layout used for aside component and background image.
 *
 * @param children Component to render in aside left block.
 * @param image Background image. You can send URL or an imported image.
 */
function LayoutBackground({
  children,
  image,
}: InterfaceLayoutBackground): JSX.Element {
  const styles = React.useMemo(
    () => ({
      backgroundImage: `url(${image})`,
    }),
    [image],
  );

  return (
    <div className="nimbus--layout-background">
      <div className="nimbus--layout-background__content">{children}</div>
      <div className="nimbus--layout-background__image" style={styles} />
    </div>
  );
}

export default React.memo(LayoutBackground);
