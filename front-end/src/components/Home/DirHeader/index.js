import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";

import { useDir } from "../../../contexts/DirContext";
import { useLoading } from "../../../contexts/LoadingContext";
import "./dirHeader.css";

const DirHeader = () => {
  const {
    items,
    nFolderScrDispSwitch,
    currentDirName,
    toParentDirName,
    setSearchContent,
    addFile,
    deleteAll,
  } = useDir();
  const { loadingStateSwitch } = useLoading();

  const hasParentDir = /\//.test(currentDirName);
  const enablement = hasParentDir ? "" : "disabled";

  const search = e => setSearchContent(e.target.value);

  async function onAddFile(e) {
    e.stopPropagation();

    const formData = new FormData();
    const file = e.target.files[0];

    formData.append("file", file);

    loadingStateSwitch();

    try {
      await addFile(formData);
    } catch (err) {
      alert(err);
    } finally {
      loadingStateSwitch();
    }
  }

  async function onDeleteAll(e) {
    e.stopPropagation();

    if (!items.files.length && !items.folders.length) {
      alert("there is no item to be deleted.");
      return;
    }

    const result = window.confirm(
      "This operation will absolutely delete all items. Do you really want to do this?"
    );

    if (!result) return;

    loadingStateSwitch();

    try {
      await deleteAll();
    } catch (err) {
      alert(err);
    } finally {
      loadingStateSwitch();
    }
  }

  return (
    <header id="dir-header">
      <div id="search-actions">
        <input type="search" placeholder="search" onChange={search} />

        <nav>
          <ul>
            <li onClick={toParentDirName} className={enablement}>
              <ArrowBackIcon color={enablement} />
            </li>

            <li id="new-file">
              <label htmlFor="file">
                <InsertDriveFileIcon style={{ color: "lightblue" }} />

                <input type="file" name="file" id="file" onChange={onAddFile} />
              </label>
            </li>

            <li onClick={nFolderScrDispSwitch}>
              <CreateNewFolderIcon style={{ color: "orange" }} />
            </li>

            <li id="delete-item" onClick={onDeleteAll}>
              <DeleteForeverIcon style={{ color: "red" }} />
            </li>
          </ul>
        </nav>
      </div>

      <div id="path">
        <h2>{currentDirName}</h2>
      </div>
    </header>
  );
};

export default DirHeader;
