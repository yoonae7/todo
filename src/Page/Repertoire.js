import React from 'react';
import { useState, useEffect } from 'react';
import Todolist from '../Component/Todolist';
import Modal2 from '../Component/Modal2';
import ModalEdit2 from '../Component/ModalEdit2';
import styled from "styled-components";
import shortid from 'shortid';

const ListUp = styled.ul`
height: 90%;
overflow-x:hidden;
overflow-y:scroll;
`;

function Repertoire({data2, setData2}) {
  const [buttonTag, setbuttonTag] = useState('Phrase');
  const [practiceContent, setpracticeContent] = useState('');
  const [practiceTime, setpracticeTime] = useState('30');
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

  const addButton = (e) => {
    setbuttonTag(e.target.textContent)
  };

  const addPracticeHandler = (e) => {
    setpracticeContent(e.target.value)
  };

  const addTimeHandler = (e) => {
    setpracticeTime(e.target.value)
  }

  const handleButtonClick = (e) => {
    const postList = {
      id: shortid(),
      tag: buttonTag,
      content: practiceContent,
      time: practiceTime,
    };

    fetch("http://localhost:3001/repertoire", {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(postList)
    })
    .then(() => {
      setData2([...data2, postList])
    })
  .catch((error) => {
      console.error('Error', error);
  })

  };

  const removeButtonClick = (e) => {
    fetch(`http://localhost:3001/repertoire/${e.target.id}`, {
      method: "DELETE",
    })
    .then(() => {
      // window.location.replace(redirect);
      setData2(data2.filter((ele) => {
        return ele.id !== e.target.id 
      }))
    })
    .catch((error) => {
      console.error('Error', error);
    })
  }

  const editButtonClick = (e) => {
    const newData =  data2.filter(ele => ele.id === e.target.id)
    setEditData(newData)
  };


  return(
      <>
      <Modal2 
        addButton={addButton}
        addPracticeHandler={addPracticeHandler}
        addTimeHandler={addTimeHandler}
        handleButtonClick={handleButtonClick}
        />
        { switchOn ? 
      <ModalEdit2
        addButton={addButton}
        addPracticeHandler={addPracticeHandler}
        addTimeHandler={addTimeHandler}
        handleButtonClick={handleButtonClick}
        editListClicked={editListClicked}
        seteditListClicked={seteditListClicked}
        editData={editData}
        data = {data2}
        setData = {setData2}
      /> : null
      }
      <ListUp>
        {data2&&data2.map(list => {
          return <Todolist key={list.id} list={list} 
          removeButtonClick={removeButtonClick}
          seteditListClicked={seteditListClicked}
          editButtonClick={editButtonClick}          
          />
        })}
      </ListUp>

      </>
  )
}

export default Repertoire;