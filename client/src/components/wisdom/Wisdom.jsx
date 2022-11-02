import "./wisdom.css";
import { Link } from "react-router-dom";

export default function Wisdom({ wisdom }) {
  return (
    <div className="wisdom">
      {wisdom.image && <img className="WisdomImg" src={wisdom.image} alt="" />}
      <div className="wisdomInfo">
        <div className="wisdomCat">
          <span className="wisdomCat">{wisdom.category}</span>;
        </div>
        <Link to={`/wisdom/${wisdom.id}`} className="link">
          <span className="wisdomTitle">{wisdom.name}</span>
        </Link>

        <hr />
        <span className="wisdomDate">
          {new Date(wisdom.createdAt).toDateString()}
        </span>
      </div>
      <p className="wisdomDetail">{wisdom.detail}</p>
    </div>
  );
}
