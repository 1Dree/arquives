import CircularProgress from "@material-ui/core/CircularProgress";

import "./loading.css";

export default function WrappedLoading() {
  return (
    <div id="wrapped-loading">
      <CircularProgress />
    </div>
  );
}
