import { createContext, useState, useContext } from "react";

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export default function LoadingContextProvider({ children }) {
  const [loadingState, setLoadingState] = useState(false);

  const loadingStateSwitch = () => setLoadingState(prevState => !prevState);

  const resetLoadingState = () => setLoadingState(false);

  const value = { loadingState, loadingStateSwitch, resetLoadingState };

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}
