import React from 'react';
import styled from 'styled-components';

const Template = () => {
  return (
    <Component>
      {
        <div className="contact">
          <div className="avatar"></div>
          <div className="chat-info">
            <div className="top"></div>
            <div className="bottom"></div>
          </div>
        </div>
      }
    </Component>
  );
};

function ContactsTemplate() {
  return (
    <>
      <Template />
      <Template />
      <Template />
      <Template />
      <Template />
    </>
  );
}

export default ContactsTemplate;

const Component = styled.div`
  margin-bottom: 15px;
  .contact {
    height: 80px;
    width: 300px;
    display: flex;
    align-items: center;
    column-gap: 1.3rem;
    cursor: pointer;
    padding-left: 8px;
    position: relative;
    background-color: #27003a;
    border-radius: 8px;
    margin: 15px 0 90px;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 6px;
    }
    .avatar {
      height: 60px;
      min-width: 60px;
      border-radius: 100%;
      background-color: #c4c4c4;
    }
    .chat-info {
      width: 100%;
      display: flex;
      height: 60px;
      flex-direction: column;
      justify-content: center;
      gap: 0.75rem;
      padding-right: 15px;
      .top {
        display: flex;
        height: 1rem;
        width: 100%;
        background-color: #c4c4c4;
        border-radius: 3px;
      }
      .bottom {
        height: 1rem;
        background: #c4c4c4;
        border-radius: 3px;
      }
    }
    .avatar,
    .top,
    .bottom {
      position: relative;
      overflow: hidden;
    }

    .avatar::before,
    .top::before,
    .bottom::before {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      background-image: linear-gradient(
        to right,
        #c4c4c4 0%,
        hsl(0 0% 0% / 0.22) 20%,
        #c4c4c4 40%,
        #c4c4c4 100%
      );
      background-size: 450px 400px;
      background-repeat: no-repeat;
      animation: shimmer 1s linear infinite;
    }
    .avatar::before {
      animation-delay: 0.3s;
    }
    .bottom::before {
      animation-delay: 0.2s;
    }
    @keyframes shimmer {
      0% {
        background-position: -450px 0;
      }
      100% {
        background-position: 450px 0;
      }
    }
  }
`;
