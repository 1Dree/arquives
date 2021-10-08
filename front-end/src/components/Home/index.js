import DirHeader from "./DirHeader";
import DirItems from "./DirItems";
import NewFolder from "./NewFolder";
import "./home.css";

export default function Home() {
  return (
    <div id="home">
      <div className="container">
        <div id="dir">
          <NewFolder />
          <DirHeader />
          <DirItems />
        </div>
      </div>
    </div>
  );
}
