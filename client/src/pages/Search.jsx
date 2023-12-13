import React, {useState} from "react";
import "../style/Search.css"
import axios from "axios";
import {Link} from "react-router-dom";

export default function Search() {

  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);

  async function handleSearch() {
    const searchRes = await axios.get("/user/search/" + input);
    setUsers(searchRes.data);
  }

  return (
      <section className="container">
        <div>
          <input type="text"
                 className="input"
                 value={input}
                 placeholder="Type username here..."
                 onChange={e => setInput(e.target.value)}
          />
          <button className="btn" onClick={handleSearch}>Search</button>
          <ul>
            {users.map((user, index) => (
                <li key={index}><Link to={"/profile/" + user} className="link" >{user}</ Link></li>))}
          </ul>
        </div>
      </section>
  )
}
