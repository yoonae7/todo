import React from 'react';
import { useState } from 'react';
import styled from "styled-components";


export const Todo = styled.li`
cursor: pointer;
display: flex;
flex-direction: row;
/* justify-content: space-evenly; */
align-items: center;
height: 15%;
width: 100%;
background-color: white;
box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
position: relative;
`;

export const Navicon = styled.i`
position: absolute;
top: 35px;
left: 20px;
cursor: pointer;
  &.fa-regular {
    color: gray;
    font-size: 25px;
    }

  &.fa-square-check {
    color: rgb(255, 187, 0);
  }
  &.fa-solid {
    color: rgb(255, 187, 0);
    font-size: 25px;
    }
`;

export const Navicon2 = styled.i`
position: absolute;
top: 35px;
left: 340px;
cursor: pointer;
  &.fa-regular {
    color: gray;
    font-size: 25px;
    }

  &.fa-square-check {
    color: rgb(255, 187, 0);
  }
  &.fa-solid {
    color: rgb(255, 187, 0);
    font-size: 25px;
    }
`;

export const Tag = styled.div`
position: absolute;
top: 32px;
left: 60px;
font-size: 1.2rem;
color: rgb(75, 75, 158);
  &.checked {
    color: rgb(255, 187, 0);
    text-decoration: line-through;
  }

  div {
    font-weight: 500;
  }
`;

export const Text = styled.div`
position: absolute;
top: 32px;
left: 135px;
font-size: 1.2rem;
color: rgb(75, 75, 158);
  &.checked {
    color: rgb(255, 187, 0);
    text-decoration: line-through;
  }

  div {
    font-weight: 500;
  }
`;

export const Text2 = styled.div`
position: absolute;
top: 32px;
left: 280px;
font-size: 1.2rem;
color: rgb(75, 75, 158);
  &.checked {
    color: rgb(255, 187, 0);
    text-decoration: line-through;
  }

  div {
    font-weight: 500;
  }
`;

function Todolist({ list, removeButtonClick, seteditListClicked, editButtonClick }) {
  const [isChecked, setisChecked] = useState(false);
  const checkedHandler = (e) => {
    e.stopPropagation()
    setisChecked(!isChecked);
  };

  const removeHandler = (e) => {
    e.stopPropagation()
    removeButtonClick(e);
  };

  const editHandler = (e) => {
    editButtonClick(e)
    seteditListClicked(true)
  }
  return (
    <>
        <Todo id={list.id} 
        onClick={editHandler}
        >
            <Navicon
              onClick={checkedHandler}
              className={`${
                isChecked ? "fa-regular fa-square-check" : "fa-regular fa-square"
              }`}></Navicon>
            <Tag  className={`${isChecked ? "checked" : ""}`}>
              <div id={list.id}>
                [{list.tag}]
              </div>
            </Tag>
            <Text  className={`${isChecked ? "checked" : ""}`}>
              <div id={list.id}>
                {list.content}
              </div>
            </Text>
            <Text2  className={`${isChecked ? "checked" : ""}`}>
              <div id={list.id}>{list.time}분</div>
            </Text2>
            <Navicon2
              id={list.id}
              className="fa-regular fa-circle-xmark"
              onClick={removeHandler}></Navicon2>
        </Todo>
    </>
  );
}

export default Todolist;