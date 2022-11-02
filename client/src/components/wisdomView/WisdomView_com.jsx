import { useState, useEffect, useContext } from "react";
import { Context } from "../context/Context";
import { Link, useLocation } from "react-router-dom";
import { Form } from "semantic-ui-react";
import axios from "axios";
import "./wisdomView_com.css";

export default function WisdomView_com() {
  const { user } = useContext(Context);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [wisdoms, setWisdom] = useState([]);
  const [names, setName] = useState("");
  const [details, setDetail] = useState("");
  const [category, setCategory] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getWisdom = async () => {
      const res = await axios.get(`http://localhost:3000/api/wisdom/${path}`);
      setWisdom(res.data);
      setName(res.data.name);
      setDetail(res.data.detail);
      setCategory(res.data.category);
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
        category: category,
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
          <div>
            <input
              className="wisdomViewComTitleInput"
              type="text"
              value={names}
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Group inline className="formGroup">
              <Form.Radio
                className="formRadio"
                label="Food"
                checked={category == "Food"}
                value={category}
                onClick={() => setCategory("Food")}
              />
              <Form.Radio
                className="formRadio"
                label="Dessert"
                checked={category == "Dessert"}
                // value="Dessert"
                value={category}
                onClick={() => setCategory("Dessert")}
              />
              <Form.Radio
                className="formRadio"
                label="Culture"
                checked={category == "Culture"}
                // value="Culture"
                value={category}
                onClick={() => setCategory("Culture")}
              />
              <Form.Radio
                className="formRadio"
                label="Herb"
                checked={category == "Herb"}
                // value="Herb"
                value={category}
                onClick={() => setCategory("Herb")}
              />
              <Form.Radio
                className="formRadio"
                label="Other"
                checked={category == "Other"}
                // value="Other"
                value={category}
                onClick={() => setCategory("Other")}
              />
            </Form.Group>
          </div>
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
