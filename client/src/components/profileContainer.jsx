import React, { useEffect, useState } from 'react';
import EditDescription from './EditDescription';
import '../style/profileContainer.css';
import '../style/post.css';
import axios from 'axios';

export default function ProfileContainer({ visitUserName, editable }) {
  const [user, setUser] = useState({});
  const [img, setImg] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!visitUserName) return;
      try {
        const response = await axios.get(`/user/findByName/${visitUserName}`);
        setUser(response.data);
        setNotFound(!response.data.user);
      } catch (error) {
        setNotFound(true);
      }
    };

    fetchUser();
  }, [visitUserName]);

  useEffect(() => {
    if (!visitUserName) return;
    const fetchImage = async () => {
      const response = await axios.get(`/user/pictureUpload/${visitUserName}`);
      setImg(response.data.profilePicture);
    };

    fetchImage();
  }, [visitUserName, selectedImage]);

  const handleImageChange = (e) => setSelectedImage(e.target.files[0]);

  const uploadImage = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('image', selectedImage, selectedImage.name);

    try {
      const response = await axios.post(`/user/pictureUpload/${visitUserName}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImg(response.data.profilePicture);
    } catch (error) {
    }
  };

  if (notFound) {
    return <div>User does not exist</div>;
  }

  return (
    <div className="profile-container">
      <img className="profile-avatar" src={img} alt="Profile Avatar" />
      {editable && (
        <>
          <input type="file" onChange={handleImageChange} accept="image/*" />
          <button className='profile-picture-btn' onClick={uploadImage}>Upload image</button>
        </>
      )}
      <div className="profile-username">{user.user}</div>
      <div className="profile-join-time">Joined on: {new Date(user.joinTime).toLocaleDateString()}</div>
      <div className="description">
        {user.perDescr}
        {editable && <button className="edit-icon" onClick={() => setOpenEditModal(true)}>Edit</button>}
      </div>
      {openEditModal && <EditDescription setOpen={setOpenEditModal} username={visitUserName} />}
    </div>
  );
}
