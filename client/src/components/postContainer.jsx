import React, { useEffect, useState } from "react";
import Post from "./post";
import "../style/postContainer.css";
import axios from "axios";

export default function PostContainer({ visitUserName, editable }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const endpoint = visitUserName ? `/post/${visitUserName}` : "/post";
        const response = await axios.get(endpoint);
        const sortedPosts = response.data.sort((a, b) => b.postTime.localeCompare(a.postTime));
        setPosts(sortedPosts);
      } catch (error) {
      }
    };

    fetchPosts();
  }, [visitUserName]);

  return (
    <ul className="grid">
      {posts.map((post) => (
        <Post
          key={post._id}
          user={post.postedBy}
          postContent={post.postContent}
          postTime={post.postTime}
          editable={editable}
          post_id={post._id}
          img={post.image}
        />
      ))}
    </ul>
  );
}
