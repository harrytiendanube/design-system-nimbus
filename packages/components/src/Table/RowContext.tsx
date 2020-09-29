import * as React from "react";

export interface InterfaceRowProps {
  grayed: boolean;
}

export interface InterfaceRowContext {
  rowProps: InterfaceRowProps;
  setRowProps: React.Dispatch<React.SetStateAction<InterfaceRowProps>>;
}

export const RowContext = React.createContext<InterfaceRowContext>(
  {} as InterfaceRowContext,
);

const RowContextProvider = (props: {
  children: React.ReactNode;
}): JSX.Element => {
  const [rowProps, setRowProps] = React.useState<InterfaceRowProps>({
    grayed: false,
  } as InterfaceRowProps);
  return (
    <RowContext.Provider value={{ rowProps, setRowProps }}>
      {props.children}
    </RowContext.Provider>
  );
};

export default RowContextProvider;
