import { useState, useEffect, useContext } from "react";
import { Context } from "../context/Context";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./wisdomView_com.css";

export default function WisdomView_com() {
  const { user } = useContext(Context);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [wisdoms, setWisdom] = useState([]);
  const [names, setName] = useState("");
  const [details, setDetail] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getWisdom = async () => {
      const res = await axios.get(`http://localhost:3000/api/wisdom/${path}`);
      setWisdom(res.data);
      setName(res.data.name);
      setDetail(res.data.detail);
    };
    getWisdom();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/wisdom/${wisdoms.id}`, {
        data: { username: user.username },
      });
      window.location.replace(`/`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/api/wisdom/${wisdoms.id}`, {
        username: user.username,
        name: names,
        detail: details,
      });
      setUpdateMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="wisdomViewCom">
      <div className="wisdomViewComWrapper">
        {wisdoms.image && (
          <img src={wisdoms.image} alt="" className="wisdomViewComImg" />
        )}{" "}
        {updateMode ? (
          <input
            className="wisdomViewComTitleInput"
            type="text"
            value={names}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <h1 className="wisdomViewComTitle">
            {names}
            {wisdoms.username === user?.username && (
              <div className="wisdomViewComEdit">
                <i
                  className="wisdomViewComIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                />
                <i
                  className="wisdomViewComIcon far fa-trash-alt"
                  onClick={handleDelete}
                />
              </div>
            )}
          </h1>
        )}
        <div className="wisdomViewComInfo">
          <span className="wisdomViewComAuthor">
            Author :
            <Link to={`/?user=${wisdoms.username}`} className="link">
              <b>{wisdoms.username}</b>
            </Link>
          </span>
          <span className="wisdomViewComDate">
            {new Date(wisdoms.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="wisdomViewComDetailInput"
            value={details}
            onChange={(e) => setDetail(e.target.value)}
          />
        ) : (
          <p className="wisdomViewComDetail">{details}</p>
        )}
        {updateMode && (
          <button className="wisdomViewComButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
