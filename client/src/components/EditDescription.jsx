import React, { useState } from 'react';
import '../style/NewPost.css';
import axios from 'axios';

export default function EditDescription({ setOpen, username }) {
  const [description, setDescription] = useState("");

  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const updateDescription = async () => {
    if (!username) return;

    try {
      await axios.put(`/user/updateProfileDescription/${username}`, 
        JSON.stringify({ description }), 
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      setOpen(false);
      window.location.reload();
    } catch (error) {
    }
  };

  return (
    <div>
      <textarea
        placeholder="Say something..."
        cols="32"
        rows="5"
        onChange={handleDescriptionChange}
        className="textarea"
      />
      <button className="post-button" onClick={updateDescription}>
        Update
      </button>
    </div>
  );
}
