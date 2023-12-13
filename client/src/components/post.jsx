import React, { useEffect, useState } from "react";
import "../style/post.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Post({ post_id, path, user, postTime, postContent, editable, image }) {
  const navigate = useNavigate();
  const [img, setImg] = useState(null);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (user) {
        try {
          const response = await axios.get(`/user/pictureUpload/${user}`);
          setImg(response.data.profilePicture);
        } catch (error) {
        }
      }
    };

    fetchProfilePicture();
  }, [user]);

  const updatePost = () => {
    navigate('/edit', { replace: true, state: { id: post_id, path: path } });
  };

  const deletePost = async () => {
    if (!post_id) return;

    try {
      await axios.delete(`/post/${post_id}`);
      window.location.reload();
    } catch (error) {
    }
  };

  return (
    <div className="grid-container">
      <div className="post-avatar-div">
        <img className="post-avatar" src={img} alt="" />
      </div>
      <div>
        <Link to={`/profile/${user}`} className="username">
          {user}
        </Link>
        <span className="date-and-time">{new Date(postTime).toLocaleString()}</span>
        {editable && (
          <>
            <button className="delete-btn" onClick={deletePost}>Delete</button>
            <button className="update-btn" onClick={updatePost}>Edit</button>
          </>
        )}
      </div>
      <div className="content">{postContent}</div>
      <div className="content">
        <img src={image} alt="" className="post-img" />
      </div>
    </div>
  );
}
