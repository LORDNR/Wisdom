import { useState, useContext } from "react";
import { Form } from "semantic-ui-react";
import { Context } from "../../components/context/Context";
import axios from "axios";
import "./newWisdom.css";

export default function NewWisdom() {
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("username", user.username);
    data.append("name", name);
    data.append("detail", detail);
    data.append("category", category);
    data.append("image", file);

    const res = await axios.post("http://localhost:3000/api/wisdom", data);
    window.location.replace(`/wisdom/${res.data.id}`);
  };
  return (
    <div className="newWisdom">
      {file && (
        <img className="newWisdomImg" src={URL.createObjectURL(file)} alt="" />
      )}

      <form className="newWisdomForm" onSubmit={handleSubmit}>
        <div className="newWisdomFormGroup">
          <label htmlFor="fileInput">
            <i className="newWisdomIcon fas fa-plus"></i>
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />

          <input
            className="newWisdomInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <Form.Group inline className="formGroup">
          <Form.Radio
            className="formRadio"
            label="Food"
            checked={category == "Food"}
            value="Food"
            onClick={() => setCategory("Food")}
          />
          <Form.Radio
            className="formRadio"
            label="Dessert"
            checked={category == "Dessert"}
            value="Dessert"
            onClick={() => setCategory("Dessert")}
          />
          <Form.Radio
            className="formRadio"
            label="Culture"
            checked={category == "Culture"}
            value="Culture"
            onClick={() => setCategory("Culture")}
          />
          <Form.Radio
            className="formRadio"
            label="Herb"
            checked={category == "Herb"}
            value="Herb"
            onClick={() => setCategory("Herb")}
          />
          <Form.Radio
            className="formRadio"
            label="Other"
            checked={category == "Other"}
            value="Other"
            onClick={() => setCategory("Other")}
          />
        </Form.Group>

        <div className="newWisdomFormGroup">
          <textarea
            className="newWisdomInput newWisdomText"
            placeholder="Tell your Detail..."
            type="text"
            autoFocus={true}
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>
        <button className="newWisdomSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
