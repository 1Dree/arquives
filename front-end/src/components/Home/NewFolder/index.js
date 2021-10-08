import { useRef } from "react";

import { useDir } from "../../../contexts/DirContext";
import { useLoading } from "../../../contexts/LoadingContext";
import { exValue } from "../../../lib";
import "./newFolder.css";

export default function NewFolder() {
  const {
    newFolderScreenDisplay,
    nFolderScrDispSwitch,
    currentDirName,
    addFolder,
  } = useDir();
  const { loadingStateSwitch } = useLoading();
  const folderNameRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    const folderName = exValue(folderNameRef);
    const folderPath = `${currentDirName}/${folderName}`;

    loadingStateSwitch();

    try {
      await addFolder(folderName, folderPath);
      nFolderScrDispSwitch();
    } catch (err) {
      console.log(err);
    } finally {
      loadingStateSwitch();
    }
  }

  function cancelOp() {
    const input = document.querySelector("#new-folder input");

    input.value = "";
    nFolderScrDispSwitch();
  }

  return (
    <div id="new-folder" className={newFolderScreenDisplay ? "show" : ""}>
      <div id="new-folder-content">
        <h2>New folder</h2>

        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            placeholder="folder name"
            ref={folderNameRef}
          />

          <div>
            <button type="submit">Create</button>
            <button type="button" id="cancel" onClick={cancelOp}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
