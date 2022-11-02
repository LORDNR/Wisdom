import Sidebar from "../../components/sidebar/Sidebar";
import WisdomView_com from "../../components/wisdomView/WisdomView_com";
import "./wisdomView.css";

export default function WisdomView() {
  return (
    <div className="wisdomView">
      <WisdomView_com />
      <Sidebar />
    </div>
  );
}
