/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import { setProfile } from '../utils/APIRoutes';

import avatarArr from './images';

// import '../styles/profile.css';
import styled from 'styled-components';

// Function
export default function SetProfile() {
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState();
  const [selectedProfile, setSelectedProfile] = useState(undefined);

  const profilePicture = async () => {
    if (selectedProfile === undefined)
      handleError('chax-ua-nc', 'please select an image', 'warning');
    else {
      const user = await JSON.parse(localStorage.getItem('chaxapp-xchat'));
      const { data } = await axios.post(`${setProfile}/${user._id}`, {
        image: selectedProfile,
      });
      if (data.isSet) {
        user.isProfileImageSet = true;
        user.profileImage = data.image;
        localStorage.setItem('chaxapp-xchat', JSON.stringify(user));
        navigate('/');
      } else {
        handleError('chax-ua,er', 'error in image upload', 'error');
      }
    }
  };

  const handleError = (id, txt, toastType) => {
    !toast.isActive(id) &&
      toast(txt, {
        toastId: id,
        type: toastType,
        position: 'top-right',
        autoClose: 7000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
    return false;
  };

  useEffect(() => {
    const data = [];
    for (let i = 0; i < avatarArr.length; i++) {
      const image = avatarArr[i];
      data.push(image);
    }
    setAvatars(data);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('chaxapp-xchat')) navigate('/login');
    else {
      const imageSetStatus = JSON.parse(localStorage.getItem('chaxapp-xchat'));
      if (imageSetStatus.isProfileImageSet) navigate('/');
    }
  }, []);

  // Convert image to base64
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setSelectedProfile(base64);
    setSelectedIndex(4);
    e.target.value = null;
  };
  const convertBase64 = (file) => {
    return new Promise((success, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        success(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // HTML
  return (
    <Container>
      <ToastContainer />
      {/* Title */}
      <div className="title">
        <h2>Pick an image for your profile picture</h2>
      </div>
      {/* Avatar Container */}
      <div className="avatars_container">
        {avatars.map((avatar, index) => {
          return (
            <div
              key={index}
              className={`avatar ${selectedIndex === index ? 'selected' : ''}`}
            >
              <div className="box">
                <img
                  src={avatar}
                  alt="profilePic"
                  onClick={() => {
                    setSelectedProfile(avatar);
                    setSelectedIndex(index);
                  }}
                />
              </div>
            </div>
          );
        })}
        {/* From Device */}
        <div className={` own_image ${selectedIndex === 4 ? 'selected' : ''}`}>
          <div className="box">
            {selectedIndex === 4 ? (
              <img
                src={selectedProfile}
                height="200"
                width="200"
                alt="no-img"
              />
            ) : (
              <ion-icon name="person-add-outline"></ion-icon>
            )}
          </div>
          <div className="addBtn">
            <ion-icon name="add-outline"></ion-icon>
            <input type="file" className="a" onChange={(e) => uploadImage(e)} />
          </div>
        </div>
      </div>
      {/* Set Button */}
      <button className="setProfile" onClick={() => profilePicture()}>
        Set Profile Image
      </button>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #100018;

  h2 {
    font: 600 2rem var(--openSansFont);
    color: hsl(280 100% 93%);
  }
  .avatars_container {
    display: flex;
    column-gap: 1.5rem;

    .avatar {
      border-radius: 100%;
      height: 7rem;
      width: 7rem;
      cursor: pointer;
      position: relative;
      z-index: 1;
      border: 0.2rem solid transparent;
      transition: border 0.4s;
      &.selected {
        border: 0.2rem solid hsl(280 100% 63%);
      }
    }
  }
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  .box {
    position: absolute;
    inset: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    border-radius: 100%;
    overflow: hidden;
  }

  .own_image {
    border-radius: 100%;
    height: 7rem;
    width: 7rem;
    position: relative;
    z-index: 1;
    &.selected {
      border: 0.2rem solid hsl(280 100% 63%);
    }
    .box {
      background-color: hsl(280 30% 13%);
      z-index: -1;
      ion-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2em;
        pointer-events: none;
        color: hsl(280 100% 93%);
        z-index: 3;
      }
    }
    .addBtn {
      position: absolute;
      top: 70%;
      left: 72%;
      z-index: 2;
      height: 35px;
      width: 35px;
      border-radius: 100%;
      input[type='file'],
      input[type='file']::-webkit-file-upload-button {
        height: 100%;
        width: 100%;
        border-radius: 100%;
        opacity: 0;
        cursor: pointer;
        z-index: 2;
      }
      [name='add-outline'] {
        position: absolute;
        height: 100%;
        width: 100%;
        font-size: 1.5rem;
        color: inherit;
        background-color: hsl(280 100% 93%);
        border-radius: 100%;
        pointer-events: none;
      }
    }
  }
  .setProfile {
    width: 28rem;
    border: none;
    outline: none;
    border-radius: 5px;
    color: inherit;
    font: 700 1.3em/2 var(--ralewayFont);
    letter-spacing: 2px;
    cursor: pointer;
    background-color: hsl(280 100% 95%);
    transition: all 0.4s;
    margin-bottom: 15px;
    &:hover,
    &:active {
      background-color: hsl(280 80% 55%);
      color: white;
    }
  }

  @media screen and (max-width: 768px) {
    .Toastify__toast {
      width: 50%;
    }
    h2 {
      text-align: center;
      font-size: 1.5rem;
    }
    .avatars_container {
      column-gap: 0.5rem;
      .avatar {
        border-radius: 100%;
        height: 6rem;
        width: 6rem;
        cursor: pointer;
        position: relative;
        z-index: 1;
        border: 0.2rem solid transparent;
        transition: border 0.4s;
        &.selected {
          border: 0.2rem solid hsl(280 100% 63%);
        }
      }
    }
    .own_image {
      border-radius: 100%;
      height: 6rem;
      width: 6rem;
      .addBtn {
        top: 67%;
        left: 69%;
        height: 25px;
        width: 25px;
      }
    }
    .setProfile {
      width: 22rem;
    }
  }
  @media screen and (max-width: 488px) {
    .avatars_container {
      .avatar {
        height: 5rem;
        width: 5rem;
      }
    }
    .own_image {
      height: 5rem;
      width: 5rem;
    }
    .setProfile {
      width: 17rem;
    }
  }
`;
