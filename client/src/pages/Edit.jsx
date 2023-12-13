import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/NewPost.css";
import axios from "axios";

export default function Edit() {
  const [postContent, setPostContent] = useState("");
  const [image, setImage] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { id } = location.state;
  const handleImageChange = (e) => setImage(e.target.files[0]);

  const updatePost = async () => {
    if (!id) return;

    let formData = new FormData();
    formData.append('postContent', postContent);
    if (image) {
      formData.append('image', image, image.name);
    }
    try {
      await axios.put(`/post/${id}`, {postContent}, {
        headers: { 'Content-Type': 'application/json' },
      });
      navigate('/');
    } catch (error) {
    }
  };

  return (
    <div className="container">
      <div className="title">Edit post</div>
      <textarea
        placeholder="Say something..."
        cols="32"
        rows="5"
        onChange={(e) => setPostContent(e.target.value)}
        className="textarea"
      />
      <input
        type="file"
        onChange={handleImageChange}
        accept="image/*"
      />
      <div className="post-button" onClick={updatePost}>Update</div>
    </div>
  );
}
