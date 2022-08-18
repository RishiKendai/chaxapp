import React, { useState, useEffect } from 'react';
import Logo from '../assets/logo.png';

import styled from 'styled-components';
import Logout from './Logout';
import ContactsTemplate from './Templates/ContactsTemplate';

export default function Contacts({
  contacts,
  currentUser,
  changeChat,
  currentChat,
  contactsRef,
  setAddGroup,
}) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [searchUser, setSearchUser] = useState('');

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserImage(currentUser.profileImage);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    setSearchUser('');
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserName && (
        <Container ref={contactsRef}>
          {/* top bar */}
          <div className="header">
            {/* user Profile */}
            <div className="current_user">
              <img src={currentUserImage} alt="currentUserImage" />
              {/* <h1>{currentUserName}</h1> */}
            </div>
            {/* Logo */}
            <div className="logo">
              <img src={Logo} alt="Brand" />
              <h3>Chaxapp</h3>
            </div>
            <Logout />
          </div>
          {/* Search bar and add group */}
          <div className="addFeatures">
            <div className="addFeatures-search">
              {/* <form> */}
              <input
                type="text"
                spellCheck="false"
                placeholder="Search users"
                onChange={(e) => {
                  setSearchUser(e.target.value);
                }}
              />
            </div>
            <button
              className="addFeatures-addGroup"
              onClick={() => setAddGroup(true)}
            >
              <ion-icon name="people-outline"></ion-icon>
            </button>
          </div>
          {/* Contact Section */}
          <div className="contacts_section">
            {contacts.length <= 0 ? (
              <ContactsTemplate />
            ) : (
              contacts
                .filter((contact) => {
                  if (searchUser === '') return contact;
                  return (
                    searchUser.length > 0 &&
                    contact.username
                      .toLowerCase()
                      .includes(searchUser.toLowerCase())
                  );
                })
                .map((contact, index) => {
                  return (
                    <div
                      key={index}
                      className={`contact ${
                        index === currentSelected && currentChat && 'selected'
                      } `}
                      onClick={(e) => {
                        contactsRef.current.classList.add('hide');
                        changeCurrentChat(index, contact);
                      }}
                    >
                      {/* Profile Photo */}
                      <div className="avatar">
                        <img src={contact.profileImage} alt="profileImage" />
                      </div>
                      {/* Chat Details */}
                      <div className="chat_info">
                        {/* Top */}
                        <div className="top">
                          <div className="username">
                            <h3>{contact.username}</h3>
                            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, esse. */}
                          </div>
                          <div className="time">11:45PM</div>
                        </div>
                        {/* Bottom */}
                        <div className="bottom">
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Itaque?
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  flex: 1 0 35%;
  height: 100%;
  padding: 0 14px;
  background-color: #1b0029;
  display: flex;
  overflow-x: hidden;
  flex-direction: column;
  border-radius: 12px;
  .header {
    padding: 8px 0;
    flex: 0 1 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.8px solid hsl(0 0% 100% / 0.12);
    margin-bottom: 14px;

    .current_user {
      height: 60px;
      width: 60px;
      border-radius: 100%;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
    .logo {
      display: flex;
      align-items: center;
      column-gap: 10px;
      img {
        height: 40px;
        width: 40px;
      }
      h3 {
        font: 600 1.6rem var(--amitaFont);
        color: white;
      }
    }
  }
  img {
    height: 200px;
    width: 200px;
  }
  .addFeatures {
    height: 3.7rem;
    display: flex;
    margin-bottom: 0.9rem;
    gap: 0.4rem;
    &-search {
      flex: 1;
      position: relative;
      input {
        height: 100%;
        width: 100%;
        border: none;
        outline: none;
        background-color: #070029;
        border-radius: 0.35rem;
        font: 400 1rem system-ui;
        padding: 0.3rem 3.3rem 0.3rem 0.5rem;
        color: #ffffffc0;
      }
    }
    &-addGroup {
      width: 2.6rem;
      border-radius: 0.4rem;
      border: none;
      outline: none;
      transition: all 0.4s;
      cursor: pointer;
      ion-icon {
        font-size: 1.4rem;
      }
      :hover {
        background: #070029;
        color: white;
      }
    }
  }
  .contacts_section {
    flex: 0 1 95%;
    padding-right: 12px;
    overflow-y: auto;
    margin-bottom: 3px solid red;
    scroll-behavior: smooth;
    scrollbar-width: thin;
    &::-webkit-scrollbar {
      width: 0.3rem;
      background: transparent;
      &-thumb {
        background-color: #ffffff32;
      }
    }
  }
  .contact {
    height: 80px;
    width: 100%;
    display: flex;
    align-items: center;
    column-gap: 1.3rem;
    cursor: pointer;
    padding-left: 8px;
    position: relative;
    transition: 0.2s;
    background-color: #ffffff23;
    background-color: #27003a;
    border-radius: 8px;
    margin: 15px 0;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 6px;
    }
    &:hover {
      background-color: #ffffff19;
    }
    &.selected {
      background-color: #ffffff39;
    }
    .avatar {
      img {
        height: 60px;
        width: 60px;
        border-radius: 100%;
        object-fit: cover;
      }
    }
    .chat_info {
      width: 100%;
      display: flex;
      height: 60px;
      flex-direction: column;
      justify-content: center;
      min-width: 0;
      row-gap: 5px;
      padding-right: 15px;
      .top {
        display: flex;
        align-items: center;
        line-height: 2.5;
        color: hsl(280 100% 94%);
        .username {
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font: 400 1rem var(--MontserratFont);
        }
        .time {
          font: 400 0.7rem system-ui;
          padding-left: 8px;
        }
      }
      .bottom {
        p {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 20px;
          color: hsl(0 0% 100% / 0.32);
          font: 100 1rem system-ui;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    /* position: fixed; */
    z-index: 1;
    flex: 1;
    &.hide {
      display: none;
    }
  }
`;
