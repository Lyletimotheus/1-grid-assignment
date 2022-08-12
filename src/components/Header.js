import React from "react";
import styled from "styled-components";

const Header = ({ modalStatus }) => {
  return (
    <header>
      <HeaderContainer>
        <div>
          <h1>Latest Issues</h1>
          <p>Your most recent account issues</p>
        </div>
        <h2>
          Issues<span>Q</span>
        </h2>
      </HeaderContainer>
      <Button type="button" onClick={modalStatus}>
        new issue
      </Button>
    </header>
  );
};

export default Header;

const HeaderContainer = styled.div`
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  h1 {
    font-size: 40px;
    font-weight: 200;
    color: #000;
  }

  h2 {
    font-size: 18px;
    font-weight: 600;
    color: #2f3671;

    span {
      color: #5b6bfc;
    }
  }
`;

const Button = styled.button`
  background-color: #00cb75;
  color: #f0f0f0;
  margin: 20px 20px 0 20px;
  padding: 12px 24px;
  border: none;
  border-radius: 0.25rem;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
`;
