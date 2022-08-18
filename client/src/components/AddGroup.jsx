import React from 'react';
import styled from 'styled-components';

export default function AddGroup() {
  return (
    <Component>
      <div className="addGroup-container">
        <button id="cancel-btn">Cancel</button>
        <div className="search-bar">
          <input type="text" className="search" />
          <span>
            <ion-icon name="close-outline"></ion-icon>
          </span>
        </div>
        <div className="users-list">
          <div className="user-card">
            <div className="avatar">
              <img src="" alt="" />
            </div>
            <div className="username">username</div>
            <div className="decisions">
              <div className="add-user">ADD</div>
              <div className="remove-user">Remove</div>
            </div>
          </div>
        </div>
      </div>
    </Component>
  );
}

const Component = styled.div`
  inset: 0;                                                                       
  position: absolute;
  z-index: 2;
  background-color: #00000045;
  color: white;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  .addGroup-container {
    display: flex;
    flex-direction: column;
    .cancel-btn {
      margin-left: auto;
    }
  }
  .search-bar {
    height: 3rem;
    width: 27rem;
    border-radius: 0.28rem;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 14px #ffffff44;
    .search {
      height: 100%;
      width: 100%;
      border: none;
      outline: none;
      font: 500 1rem system-ui;
      padding-left: 0.87rem;
    }
  }
`;
