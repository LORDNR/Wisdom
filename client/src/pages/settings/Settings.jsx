import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useContext } from "react";
import { Context } from "../../components/context/Context";
import axios from "axios";
import { useEffect } from "react";

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const getUserById = async () => {
      const userById = await axios(`http://localhost:3000/api/user/${user.id}`);
      setUsername(userById.data.username);
      setEmail(userById.data.email);
      setPassword(userById.data.password);
      setFirstname(userById.data.firstname);
      setLastname(userById.data.lastname);
      setPhone(userById.data.phone);
    };
    getUserById();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const data = new FormData();
    data.append("userId", user.id);
    data.append("username", username);
    data.append("email", email);
    data.append("password", password);
    data.append("firstname", firstname);
    data.append("lastname", lastname);
    data.append("phone", phone);
    data.append("profilePic", file);
    try {
      const res = await axios.put(
        `http://localhost:3000/api/user/update/${user.id}`,
        data
      );
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      alert("Update Success");
      console.log(res.data);
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
      alert("Update Failed, Username or Email already exists");
    }

    // console.log(res);
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <label>Username</label>
          <input
            type="text"
            // placeholder={user.username}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            // placeholder={user.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            // placeholder={user.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Firstname</label>
          <input
            type="text"
            // placeholder={user.firstname}
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <label>Lastname</label>
          <input
            type="text"
            // placeholder={user.lastname}
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <label>Phone</label>
          <input
            type="number"
            // placeholder={user.phone}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
