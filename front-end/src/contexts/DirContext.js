import { createContext, useContext, useState, useEffect } from "react";

import { useAuth } from "./AuthContext";
import { useLoading } from "./LoadingContext";
import API from "../API";

const DirContext = createContext();

export const useDir = () => useContext(DirContext);

export default function DirContextProvider({ children }) {
  const { userState, userStateSetter } = useAuth();
  const { loadingStateSwitch } = useLoading();
  const [items, setItems] = useState({ files: [], folders: [] });
  const [currentDirName, setCurrentDirName] = useState("root");
  const [searchContent, setSearchContent] = useState("");
  const [newFolderScreenDisplay, setNewFolderScreenDisplay] = useState(false);

  const itemsStateSetters = {
    newState: newState =>
      setItems(prevState =>
        prevState ? { ...prevState, ...newState } : newState
      ),
    pushItem: (key, item) =>
      setItems(prevState => ({
        ...prevState,
        [key]: [...prevState[key], item],
      })),
    removeItem: (key, itemId) => {
      setItems(prevState => {
        const stateAnalogy = { ...prevState };
        const index = stateAnalogy[key].findIndex(item => item._id === itemId);

        stateAnalogy[key].splice(index, 1);

        const newState = { ...stateAnalogy };

        return newState;
      });
    },
    resetItems: () => setItems({ files: [], folders: [] }),
  };

  const toParentDirName = () =>
    setCurrentDirName(prevState => `${prevState.replace(/\/[\w\s]{0,}$/, "")}`);

  const nFolderScrDispSwitch = () =>
    setNewFolderScreenDisplay(prevState => !prevState);

  const userId = userState && userState.userData._id;

  const value = {
    items,
    currentDirName,
    toParentDirName,
    setCurrentDirName,
    searchContent,
    setSearchContent,
    newFolderScreenDisplay,
    nFolderScrDispSwitch,
    openFile: API.dir.openFile,
    addFile: API.dir.addFile(
      itemsStateSetters.pushItem,
      userStateSetter,
      currentDirName,
      userId
    ),
    addFolder: API.dir.addFolder(
      itemsStateSetters.pushItem,
      userStateSetter,
      currentDirName,
      userId
    ),
    deleteFolder: API.dir.deleteFolder(
      itemsStateSetters.removeItem,
      userStateSetter
    ),
    deleteFile: API.dir.deleteFile(
      itemsStateSetters.removeItem,
      userStateSetter
    ),
    deleteAll: API.dir.deleteAll(
      itemsStateSetters.resetItems,
      userStateSetter,
      userId
    ),
  };

  useEffect(() => {
    if (!userState) return;

    const getItems = async () => {
      loadingStateSwitch();

      try {
        await API.dir.retrieveItems(
          itemsStateSetters.newState,
          userStateSetter,
          userId,
          currentDirName
        );
      } catch (err) {
        console.log(err);
      } finally {
        loadingStateSwitch();
      }
    };

    getItems();
  }, [currentDirName]);

  return <DirContext.Provider value={value}>{children}</DirContext.Provider>;
}
