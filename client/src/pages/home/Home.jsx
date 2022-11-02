import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/Sidebar";
import Wisdoms from "../../components/wisdoms/Wisdoms";
import "./home.css";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [wisdoms, setWisdoms] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchWisdoms = async () => {
      const res = await axios.get(`http://localhost:3000/api/wisdom/${search}`);
      setWisdoms(res.data);
    };
    fetchWisdoms();
  }, [search]);

  return (
    <>
      <Header />
      <div className="home">
        <Wisdoms wisdoms={wisdoms} />
        <Sidebar />
      </div>
    </>
  );
}
