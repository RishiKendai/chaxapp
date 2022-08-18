import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import axios from 'axios';
import moment from 'moment';
import { getAllMessageRoute, sendMessageRoute } from '../utils/APIRoutes';
import { v4 as uuidv4 } from 'uuid';

export default function ChatContainer({
  currentChat,
  currentUser,
  socket,
  setCurrentchat,
  contactsRef,
}) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArraivalMessage] = useState(null);
  const scrollRef = useRef();
  const chatContainerRef = useRef();

  useEffect(() => {
    async function fetchMsg() {
      if (currentChat) {
        const response = await axios.post(getAllMessageRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
    }
    fetchMsg();
  }, [currentUser._id, currentChat]);

  const handleSendMsg = async (msg) => {
    const dateSent = moment().format('MMMM DD YYYY');
    const timeSent = moment().format('h:mma');
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
      dateSent: dateSent,
      timeSent: timeSent,
    });
    socket.current.emit('send-msg', {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
      dateSent: dateSent,
      timeSent: timeSent,
    });
    const msgs = [...messages];
    msgs.push({
      fromSelf: true,
      message: msg,
      dateSent: dateSent,
      timeSent: timeSent,
    });
    setMessages(msgs);
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-received', (msg, date, time) => {
        setArraivalMessage({
          fromSelf: false,
          message: msg,
          dateSent: date,
          timeSent: time,
        });
      });
    }
  }, [socket, arrivalMessage]);
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: 'smooth' });
  }, [messages]);

  return (
    <Container ref={chatContainerRef}>
      {/* Header */}
      <div className="chat_header">
        {/* User Info */}
        <div className="avatar">
          <img src={currentChat.profileImage} alt="" />
        </div>
        <div className="username">
          <h3>{currentChat.username}</h3>
        </div>
        {/* Menu's */}
        <div className="menu">
          <ion-icon name="ellipsis-vertical-outline"></ion-icon>
          <ion-icon
            name="close-outline"
            onClick={() => {
              contactsRef.current.classList.remove('hide');
              setCurrentchat(undefined);
            }}
          ></ion-icon>
        </div>
      </div>
      <div className="chat_messages">
        {messages.map((msg, index) => {
          let first = true;
          if (messages[index - 1]) {
            if (messages[index - 1].fromSelf && msg.fromSelf) first = false;
            if (!messages[index - 1].fromSelf && !msg.fromSelf) first = false;
          }
          return (
            <div key={uuidv4()} ref={scrollRef}>
              <div
                className={`message ${msg.fromSelf ? 'sender' : 'receiver'} ${
                  first && 'first'
                }`}
              >
                <div className="msg">
                  {msg.message}
                  <span>{msg.timeSent}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* <Messages /> */}
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  flex: 0 1 65%;
  background-color: #14021d;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  .chat_header {
    height: 75px;
    display: flex;
    padding: 9px;
    column-gap: 10px;
    align-items: center;
    background: #1b0029;
    color: #fff;
    img {
      height: 60px;
      width: 60px;
      border-radius: 100%;
      object-fit: cover;
    }
    .username {
      overflow: hidden;
      flex: 1;
      h3 {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font: 400 1.4rem var(--ralewayFont);
      }
    }
    .menu {
      ion-icon {
        cursor: pointer;
        font-size: 1.8em;
      }
    }
  }
  .chat_messages {
    flex: 1 1 auto;
    padding-top: 20px;
    overflow-y: auto;
    scroll-behavior: smooth;
    scrollbar-width: thin;
    &::-webkit-scrollbar {
      width: 0.3rem;
      background: transparent;
      &-thumb {
        background-color: #ffffff32;
      }
    }
    .sender,
    .receiver {
      background: linear-gradient(
        225deg,
        hsl(279, 100%, 10%),
        hsl(269, 100%, 12%)
      );
      color: hsl(208 80% 98% / 0.89);
      width: 80%;
      border-radius: 6px;
      max-width: fit-content;
      border-top-left-radius: 6px;
      margin-right: 1.5rem;
      padding: 4px;
      margin-bottom: 12px;
      margin-left: auto;
      position: relative;
      display: flex;
      font: 400 1rem system-ui;
    }
    .receiver {
      color: #ffffff80;
      margin-right: auto;
      margin-left: 1.5rem;
    }
    .receiver.first {
      border-top-left-radius: 0;
    }
    .receiver.first::before {
      content: '';
      position: absolute;
      left: -8px;
      top: 0;
      border-right: 10px solid #1e003d;
      border-bottom: 10px solid transparent;
    }
    .sender {
      background-image: linear-gradient(
        225deg,
        hsl(244, 64%, 57%),
        hsl(285, 64%, 37%)
      );
    }

    .sender.first {
      border-top-right-radius: 0;
    }
    .sender.first::after {
      content: '';
      position: absolute;
      right: -8px;
      top: 0;
      border-left: 10px solid hsl(244 64% 57%);
      border-bottom: 10px solid transparent;
    }
    .msg {
      align-items: flex-end;
      word-break: break-all;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
    .msg span {
      float: right;
      margin-left: 8px;
      margin-top: 1em;
      font-size: 0.6em;
      color: hsl(208 80% 98% / 0.54);
    }
  }

  @media screen and (max-width: 768px) {
    flex: 1;
  }  
`;

// #4f04ff21
// #9900ff20
