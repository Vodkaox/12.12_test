import React, { useState } from "react";
import "../style/NewPost.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NewPost() {
  const [postContent, setPostContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => setSelectedImage(e.target.files[0]);

  const submitPost = async (imageData = null) => {
    try {
      let formData = new FormData();
      formData.append('postContent', postContent.toString());
      if (imageData) {
        formData.append('image', imageData, imageData.name);
      }

      await axios.post(
        "/post/new-post",
        {postContent},
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      navigate(-1);
    } catch (err) {
    }
  };

  const post = async () => {
    await submitPost(selectedImage);
  };

  return (
    <div className="container">
      <div className="title">Create new post</div>
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
      <div style={{ textAlign: "end" }}>
        <button className="btn" onClick={post}>Post</button>
      </div>
    </div>
  );
}
