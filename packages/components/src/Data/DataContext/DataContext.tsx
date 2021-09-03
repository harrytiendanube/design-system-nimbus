import * as React from "react";
import { InterfaceBulkAction } from "../..";

export interface InterfaceDataContext {
  /** Renders checkbox's for each row */
  editMode?: boolean;
  /** It renders checkbox's as skeletons */
  skeleton?: boolean;
  /** Event that will be triggered when a row is long pressed */
  onEditMode?: () => void;
  /** Bulk action data */
  bulkAction?: InterfaceBulkAction;
  /** Ids selected */
  selectedRowsId?: string[];
  /** Callback to be called when a row is checked */
  onSelectRow?: (id: string) => void;
}

export interface InterfaceDataContextProvider extends InterfaceDataContext {
  /** React node of type children */
  children: React.ReactNode;
}

const DataContext = React.createContext<InterfaceDataContext>({});

export function useDataContext(): InterfaceDataContext {
  return React.useContext(DataContext);
}

function DataContextProvider({
  children,
  editMode,
  skeleton = false,
  onEditMode,
  bulkAction,
  selectedRowsId,
  onSelectRow,
}: InterfaceDataContextProvider): JSX.Element {
  return (
    <DataContext.Provider
      value={{
        editMode,
        skeleton,
        onEditMode,
        bulkAction,
        selectedRowsId,
        onSelectRow,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContextProvider;
