import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <Button onClick={handleClick}>
      {/* Logout */}
      <div className="logout">
        <ion-icon name="power-outline"></ion-icon>
        {/* <ion-icon name="log-out-outline"></ion-icon> */}
      </div>
    </Button>
  );
}
const Button = styled.div`
  .logout {
    align-self: center;
    color: white;
    background-color: #070029;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.5s;
    ion-icon {
      font-size: 1.5rem;
    }
    &:hover,
    &:active {
      color: #1b0029;
      background-color: white;
    }
  }
`;
