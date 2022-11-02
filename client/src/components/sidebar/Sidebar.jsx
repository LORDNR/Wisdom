import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const [cats, setCat] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("http://localhost:3000/api/category");
      setCat(res.data);
    };
    getCats();
  }, []);

  return (
    <>
      <div className="sidebar">
        <div className="sidebarItem">
          <span className="sidebarTitle">ABOUT ME</span>
          <img
            src="https://www.trangcity.go.th/trangcity/images/logo_-_Copy.png"
            alt=""
          />
          <p style={{ textAlign: "inherit" }}>
            ตรัง เป็นเทศบาลนครแห่งหนึ่งในอำเภอเมืองตรัง จังหวัดตรัง
            เป็นองค์กรปกครองส่วนท้องถิ่นที่ตั้งศาลากลางจังหวัดตรัง
          </p>
        </div>

        <div className="sidebarItem">
          <span className="sidebarTitle">CATEGORIES</span>
          <ul className="sidebarList">
            {cats.map((c) => (
              <Link to={`/?cat=${c.name}`} className="link">
                <li className="sidebarListItem">{c.name}</li>
              </Link>
            ))}
          </ul>
        </div>

        <div className="sidebarItem">
          <span className="sidebarTitle">FOLLOW US</span>
          <div className="sidebarSocial">
            <a
              href="https://www.facebook.com/TrangMunicipality/"
              // style={{ textDecoration: "none", color: "black" }}
              target="_blank"
            >
              <i className="sidebarIcon fa-brands fa-square-facebook"></i>
            </a>
            <a
              href="https://www.trangcity.go.th/trangcity/"
              // style={{ textDecoration: "none", color: "black" }}
              target="_blank"
            >
              <i className="sidebarIcon fa-brands fa-internet-explorer"></i>
            </a>
            <a href="">
              <i className="sidebarIcon fa-brands fa-square-twitter"></i>
            </a>
            <a href="">
              <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
            </a>
            <a href="">
              <i className="sidebarIcon fa-brands fa-square-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
