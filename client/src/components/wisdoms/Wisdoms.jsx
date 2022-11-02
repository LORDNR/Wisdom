import Wisdom from "../wisdom/Wisdom";
import "./wisdoms.css";

export default function Wisdoms({ wisdoms }) {
  return (
    <div className="wisdoms">
      {wisdoms.map((w) => (
        <Wisdom wisdom={w} />
      ))}
    </div>
  );
}
