import React, { useState } from "react";

const theme = {
  green: {
    default: "#618C62",
    hover: "#4C7B4D"
  },
};

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  padding: 5px 15px;
  border-radius: 25px;
  outline: 0;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: inset 0px 2px 4px #747474;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

Button.defaultProps = {
  theme: "blue"
};

function clickMe() {
  alert("You clicked me!");
}

const ButtonToggle = styled(Button)`
  opacity: 0.7;
  ${({ active }) =>
    active &&
    `
    opacity: 1; 
  `}
`;

export default function App() {
  return (
    <>
      <a href="./locations" target="_blank">
        <Button>get started -></Button>
      </a>
    </>
  );
}
