import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';

export default function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState('');

  const handleEmojiPickerHandler = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (event, emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };
  const sendChat = (event) => {
    event.preventDefault();
    console.log(msg);
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg('');
    }
  };
  useEffect(() => {
    document.querySelector('.input__div').textContent = msg;
  }, [msg]);

  return (
    <Container>
      {/* Emoji Icon */}
      <div className="emoji">
        <ion-icon
          name="happy-outline"
          onClick={handleEmojiPickerHandler}
        ></ion-icon>
        {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
      </div>
      {/* File Share Icon */}
      <ion-icon name="attach-outline"></ion-icon>
      {/* Input Div */}
      <form className="input_container" onSubmit={(e) => sendChat(e)}>
        <div className="input">
          <div
            className="input__div"
            role="textbox"
            contentEditable="true"
            spellCheck="false"
            onKeyUp={(e) => setMsg(e.target.textContent)}
          ></div>
          <label>eg: hello user</label>
        </div>
        <button className="submit">
          <ion-icon name="paper-plane-outline"></ion-icon>
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  background: #1b0029;
  display: flex;
  align-items: flex-end;
  padding: 15px;

  .emoji {
    position: relative;
    color: aliceblue;
    display: flex;
    justify-content: center;
    align-items: center;
    .emoji-picker-react {
      position: absolute;
      top: -350px;
      left: 0;
      z-index: 2;
      box-shadow: none;
      background-color: #0a003a;
      border: none;
      border-radius: 0.5rem;
      .emoji-scroll-wrapper::-webkit-scrollbar {
        background-color: #0a003a;
        width: 5px;
        &-thumb {
          background-color: #694bff;
        }
      }
      .emoji-categories {
        button {
          filter: contrast(0);
        }
      }
      .emoji-search {
        background-color: transparent;
        border-color: #694bff;
      }
      .emoji-group::before {
        background-color: #0a003a;
      }
    }
  }
  ion-icon {
    font-size: 2rem;
    color: hsl(280 22% 73% / 0.49);
    color: #d5ccff68;
    font-weight: 700;
    cursor: pointer;
    margin-bottom: 10px;
    &:hover,
    &:active {
      color: white;
    }
  }
  ion-icon[name='attach-outline'] {
    transform: rotate(-15deg);
  }
  .input_container {
    display: flex;
    width: 100%;
    column-gap: 10px;
  }
  .input {
    flex: 1;
    width: 90%;
    border-radius: 8px;
    overflow: hidden;
    padding: 9px 12px 11px;
    background: hsl(279 70% 12%);
    color: hsl(208 22% 83%);
    word-break: break-all;
    word-wrap: break-word;
    overflow-wrap: break-word;
    position: relative;

    label {
      position: absolute;
      top: 50%;
      left: 0;
      padding-left: 19px;
      transform: translateY(-50%);
      color: #c2b9f28c;
      font: 500 1rem var(--ralewayFont);
      pointer-events: none;
    }
  }

  .input__div {
    outline: none;
    border: none;
    font: 400 1rem system-ui;
    height: 100%;
    width: 100%;
    padding: 7px;
    max-height: 100px;
    overflow-y: auto;
    flex: 1;
    &:focus ~ label,
    &:not(:empty) ~ label {
      display: none;
    }
  }

  .input__div::-webkit-scrollbar {
    width: 0.5rem;
    background-color: transparent;
    &-thumb {
      background-color: #ffffff36;
    }
  }
  .submit {
    /* align-self: flex-end; */
    background: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    ion-icon {
      margin-bottom: 0;
    }
  }
  ion-icon svg {
    color: red;
  }
`;
