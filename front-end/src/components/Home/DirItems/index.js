import { useDir } from "../../../contexts/DirContext";
import { useLoading } from "../../../contexts/LoadingContext";
import DirItem from "./DirItem";
import "./dirItems.css";

import WrappedLoading from "../../../components/Loading/WrappedLoading";

export default function DirItems() {
  const { items, searchContent } = useDir();
  const { loadingState } = useLoading();

  if (!items.files.length && !items.folders.length) {
    return loadingState ? (
      <WrappedLoading />
    ) : (
      <div className="no-items">no items to show</div>
    );
  }

  const dirItemMatrix = type => item => <DirItem item={{ ...item, type }} />;

  const searchFilter = nameKey => item =>
    item[nameKey].toLowerCase().includes(searchContent.toLowerCase());

  const files = items.files
    .filter(searchFilter("originalname"))
    .map(dirItemMatrix("file"));
  const folders = items.folders
    .filter(searchFilter("name"))
    .map(dirItemMatrix("folder"));

  const dirItems = [...files, ...folders];

  if (!dirItems.length) {
    return <div className="no-items">no items matched the search</div>;
  }

  return loadingState ? (
    <WrappedLoading />
  ) : (
    <main id="dir-items">{dirItems}</main>
  );
}
