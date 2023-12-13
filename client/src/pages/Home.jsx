import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/navBar";
import PostContainer from "../components/postContainer";

export default function Home() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function fetchUserName() {
      const { data } = await axios.get("/user");
      setUserName(data.user);
    }

    fetchUserName();
  }, []);

  return (
    <div>
      <NavBar logInUserName={userName} />
      <PostContainer />
    </div>
  );
}
