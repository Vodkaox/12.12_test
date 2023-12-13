import React, { useEffect, useState } from 'react';
import NavBar from '../components/navBar';
import PostContainer from '../components/postContainer';
import ProfileContainer from '../components/profileContainer';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Profile() {
  const { visitUserName } = useParams();
  const [userInfo, setUserInfo] = useState({ logInUserName: '', editable: false });

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await axios.get('/user');
        const isEditable = visitUserName === response.data.user;
        setUserInfo({ logInUserName: response.data.user, editable: isEditable });
      } catch (err) {
      }
    }
    fetchUserInfo();
  }, [visitUserName]);

  return (
    <div>
      <NavBar logInUserName={userInfo.logInUserName} />
      <ProfileContainer visitUserName={visitUserName} editable={userInfo.editable} />
      <PostContainer visitUserName={visitUserName} editable={userInfo.editable} />
    </div>
  );
}
