import React from 'react';
import Logo from '../assets/hello.gif';
import styled from 'styled-components';

export default function Welcome({ currentUser }) {
  return (
    <Component>
      <div className="gif">
        <img src={Logo} alt="" />
      </div>
      <div className="text">
        <div className="greeting">
          <h1>Welcome bacK !! </h1>
          <span>{currentUser?.username}</span>
        </div>
        <p>Select a chat to start messaging.</p>
      </div>
    </Component>
  );
}

const Component = styled.div`
  height: 100%;
  flex: 1 1 65%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 15px;
  .gif {
    overflow: hidden;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 90%;
      width: 90%;
      filter: drop-shadow(0px 2px 4px #9669ac);
    }
  }
  .text {
    margin-left: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .greeting {
      text-align: center;
      margin-bottom: 15px;
      h1 {
        color: #ffffffd1;
        font: 700 2rem var(--amitaFont);
        text-shadow: 1px 2px 4px #9669ac;
      }
      span {
        font: 500 2rem var(--MontserratFont);
        color: #a23ed3;
      }
    }
    p {
      color: #ffffff9e;
      letter-spacing: 2.3px;
      font: 300 1.2rem var(--ralewayFont);
    }
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
