import DeleteIcon from "@mui/icons-material/Delete";

import { useDir } from "../../../../contexts/DirContext";
import { useAuth } from "../../../../contexts/AuthContext";
import { useLoading } from "../../../../contexts/LoadingContext";
import "./dirItem.css";

export default function DirItem({ item }) {
  const { openFile, setCurrentDirName, deleteFolder, deleteFile } = useDir();
  const { renewAccess } = useAuth();
  const { loadingStateSwitch } = useLoading();

  async function onItemDeletion(e) {
    e.stopPropagation();
    loadingStateSwitch();

    try {
      item.type === "file"
        ? await deleteFile(item.id)
        : await deleteFolder(item._id, item.path);
    } catch (err) {
      alert(err);
    } finally {
      loadingStateSwitch();
    }
  }

  async function onFileOpening(e) {
    e.stopPropagation();

    try {
      const { accessToken } = await renewAccess();
      await openFile(item.filename, accessToken);
    } catch (err) {
      alert(err);
    }
  }

  return item.type === "file" ? (
    <div className="item" key={item.id}>
      <div className="item-icon" onClick={onFileOpening}>
        <img src={`${item.icon}.png`} alt="file icon" />
      </div>

      <div className="item-props">
        <p className={item.originalname.length >= 15 ? "abridge" : ""}>
          {item.originalname}
        </p>

        <div className="delete-item" onClick={onItemDeletion}>
          <DeleteIcon />
        </div>
      </div>
    </div>
  ) : (
    <div className="item" key={item._id}>
      <div className="item-icon" onClick={() => setCurrentDirName(item.path)}>
        <img src={`/folderI.png`} alt="folder icon" />
      </div>

      <div className="item-props">
        <p className={item.name.length >= 15 ? "abridge" : ""}>{item.name}</p>

        <div className="delete-item" onClick={onItemDeletion}>
          <DeleteIcon />
        </div>
      </div>
    </div>
  );
}
