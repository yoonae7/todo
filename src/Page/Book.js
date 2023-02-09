import React from 'react';
import { useState, useEffect } from 'react';
import Todolist from '../Component/Todolist';
import Modal from '../Component/Modal';
import ModalEdit from '../Component/ModalEdit';
import styled from "styled-components";
import shortid from 'shortid';


const ListUp = styled.ul`
height: 90%;
overflow-x: hidden;
overflow-y: scroll;
`;

function Book({data, setData}) {

  const [buttonTag, setbuttonTag] = useState("Drill");
  const [practiceContent, setpracticeContent] = useState("");
  const [practiceTime, setpracticeTime] = useState("30");
  const [editListClicked, seteditListClicked] = useState(false);
  const [editData, setEditData] = useState({});
  const [switchOn, setswitchOn] = useState(false);
  
  useEffect(() => {
    if(editData[0]) setswitchOn(true)

    if(editData[0] && editListClicked === false) {
      setEditData({})
      setswitchOn(false)
    }
  }, [editListClicked])

  const addButton = e => {
    setbuttonTag(e.target.textContent);
  };

  const addPracticeHandler = e => {
    setpracticeContent(e.target.value);
  };

  const addTimeHandler = e => {
    setpracticeTime(e.target.value);
  };

  const handleButtonClick = e => {
    const postList = {
      id: shortid(),
      tag: buttonTag,
      content: practiceContent,
      time: practiceTime,
    };

    fetch("http://localhost:3001/books/", {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(postList)
    })
    .then(() => {
      setData([...data, postList])
    })
  .catch((error) => {
      console.error('Error', error);
  })
  };

  const removeButtonClick = e => {
      fetch(`http://localhost:3001/books/${e.target.id}`, {
        method: "DELETE",
      })
      .then(() => {
        // window.location.replace(redirect);
        setData(data.filter((ele) => {
          return ele.id !== e.target.id 
        }))
      })
      .catch((error) => {
        console.error('Error', error);
      })
  }

  const editButtonClick = (e) => {
    const newData =  data.filter(ele => ele.id === e.target.id)
    setEditData(newData)
  };

  return (
    <>
      <Modal
        addButton={addButton}
        addPracticeHandler={addPracticeHandler}
        addTimeHandler={addTimeHandler}
        handleButtonClick={handleButtonClick}
      />
      { switchOn ? 
      <ModalEdit
        addButton={addButton}
        addPracticeHandler={addPracticeHandler}
        addTimeHandler={addTimeHandler}
        handleButtonClick={handleButtonClick}
        editListClicked={editListClicked}
        seteditListClicked={seteditListClicked}
        editData={editData}
        data = {data}
        setData = {setData}
      /> : null
      }
      <ListUp>
        {data&&data.map(list => {
          return (
            <Todolist
              key={list.id}
              list={list}
              removeButtonClick={removeButtonClick}
              seteditListClicked={seteditListClicked}
              editButtonClick={editButtonClick}
            />
          );
        })}
      </ListUp>
    </>
  );
}

export default Book;