/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { allUserRoute, host } from '../utils/APIRoutes';
import AddGroup from '../components/AddGroup';

import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from 'socket.io-client';

import styled from 'styled-components';

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const contactsRef = useRef();

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentchat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAddGroup, setAddGroup] = useState(false);

  // Use Effect 1
  useEffect(() => {
    async function fetchUser() {
      if (!localStorage.getItem('chaxapp-xchat')) {
        navigate('/login');
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem('chaxapp-xchat')));
        setIsLoaded(true);
      }
    }
    fetchUser();
  }, []);

  // Initializing socket.io
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host, {
        transports: ['websocket', 'polling', 'flashsocket'],
      });
      socket.current.emit('add-user', currentUser._id);
    }
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentchat(chat);
  };
  // Use Effect 2
  useEffect(() => {
    async function fetchContacts() {
      if (currentUser) {
        if (currentUser.isProfileImageSet) {
          const data = await axios.get(`${allUserRoute}/${currentUser?._id}`);
          setContacts(data?.data);
        } else {
          navigate('/setProfile');
        }
      }
    }
    fetchContacts();
  }, [currentUser]);

  //  HTML
  return (
      <Container>
        {showAddGroup && <AddGroup setAddGroup={setAddGroup} />}
        {/* Left Side */}
        <Contacts
          contactsRef={contactsRef}
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
          currentChat={currentChat}
          setAddGroup={setAddGroup}
        />
        {/* Right Side */}
        {isLoaded &&
          (currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer
              contactsRef={contactsRef}
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
              setCurrentchat={setCurrentchat}
            />
          ))}
      </Container>
  );
}

const Container = styled.div`
  background-color: #100018;
  display: flex;
  padding: 9px 12px;
  height: 100vh;
  column-gap: 10px;
  position: relative;

  @media screen and (max-width: 768px) {
    column-gap: 0;
    padding: 9px;
    width: 100%;
  }
`;
