import { useState, useEffect, useRef} from 'react';
import styled from "styled-components";

export const Maincontainer = styled.main`
position: relative;
`;

export const Navicon = styled.i`
position: absolute;
top: 10px;
left: 20px;
cursor: pointer;
  &.fa-solid {
    color: gray;
    font-size: 25px;
    
    &:hover {
      color: rgb(255, 187, 0);
    }
  }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,0.4);
  display: grid;
  place-items: center;
`;

export const ModalView = styled.div`
    position: absolute;
    top: 350px;
    border-radius: 10px;
    background-color: #ffffff;
    width: 500px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    
`;

export const Section = styled.section`
display: flex;
flex-direction: row;
justify-content: space-around;
width: 450px;
`;

export const Button = styled.button`
display: flex;
font-size: medium;
font-weight: 500;
border: 2px solid gray;
border-radius: 100px;
background-color: white;
padding: 12px 20px 12px 20px;
cursor: pointer;
transition: 0.2s;
  &:hover { 
  transform: scale(1.1); 
  transition: 0.2s;
  background-color: rgb(255, 187, 0);
  border: 2px solid gray;
  }
  &.active { 
  transform: scale(1.1); 
  transition: 0.2s;
  background-color: rgb(255, 187, 0);
  border: 2px solid gray;
  }
`;

export const Modaltext = styled.input`
width: 250px;
height: 40px;
font-size: large;
padding-left: 10px;
`;

export const TimeInput = styled.input`
width: 100px;
font-size: large;
padding-left: 10px;
`;

export const AddButton = styled.button`
display: flex;
font-size: medium;
font-weight: bold;
border: 2px solid white;
border-radius: 10px;
background-color: rgb(255, 187, 0);
padding: 12px 30px 12px 30px;
cursor: pointer;


 &:hover { 
background-color: white;
border: 2px solid rgb(255, 187, 0);;
}
`;

function Modal({data, setData, editData, editListClicked, seteditListClicked, addButton, addPracticeHandler, addTimeHandler, handleButtonClick}) {
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);
  const [dataInput, setdataInput] = useState(editData[0])
  const inputEl = useRef(null);

  useEffect(() => {
  if(editData[0].tag === "R.C") {
    setActive4(true)
    setActive3(false)
    setActive2(false)
    setActive1(false)
  }
  if(editData[0].tag === "Artic.") {
    setActive3(true)
    setActive4(false)
    setActive2(false)
    setActive1(false)
  }
  if(editData[0].tag === "Pedal") {
    setActive2(true)
    setActive4(false)
    setActive3(false)
    setActive1(false)
  }
  if(editData[0].tag === "Phrase") {
    setActive1(true)
    setActive4(false)
    setActive3(false)
    setActive2(false)
  }
  }, [editData[0]]);

  const openModalHandler = (e) => {
    seteditListClicked(false);
  };

  const addButtonHandler = (e) => {
    addButton(e)
    setdataInput({...dataInput, tag: e.target.textContent})
  };

  const inputContentHandler = (e) => {
    addPracticeHandler(e)
    setdataInput({...dataInput, content: e.target.value})
  };
  
  const inputTimeHandler = (e) => {
    addTimeHandler(e)
    setdataInput({...dataInput, time: inputEl.current.value})
  };
  

  const buttonClick = (e) => {
    handleButtonClick(e)
      fetch(`http://localhost:3001/books/${e.target.id}`, {
        method : "PATCH",
        headers: {"Content-Type" : "Application/json"},
        body: JSON.stringify(dataInput)
      })
      .then(() => {
        setData(data.map(ele => {
          if(ele.id === dataInput.id) ele = dataInput
          return ele
        }))
      })
      .catch((error) => {
        console.error('Error', error);
      })
      seteditListClicked(false);
  }

  return (
    <>
      <Maincontainer>
        {editListClicked === true ? (
          <ModalBackdrop onClick={openModalHandler}>
            <ModalView onClick={e => e.stopPropagation()}>
                <Section>
                    <Button 
                      onClick={(e) => {
                        setActive1(true)
                        setActive2(false)
                        setActive3(false)
                        setActive4(false)
                        addButtonHandler(e);
                      }}
                      className={active1 ? 'active' : null}
                      >Phrase</Button>
                    <Button
                      onClick={(e) => {
                        setActive2(!active2)
                        setActive1(false)
                        setActive3(false)
                        setActive4(false)
                        addButtonHandler(e);
                      }}
                      className={active2 ? 'active' : null}
                      >Pedal</Button>
                    <Button
                    onClick={(e) => {
                      setActive3(!active3)
                      setActive1(false)
                      setActive2(false)
                      setActive4(false)
                      addButtonHandler(e);
                    }}
                    className={active3 ? 'active' : null}>Artic.</Button>
                    <Button
                    onClick={(e) => {
                      setActive4(!active4)
                      setActive2(false)
                      setActive3(false)
                      setActive1(false)
                      addButtonHandler(e);
                    }}
                      className={active4 ? 'active' : null}>R.C</Button>
                </Section>
                <Section>
                  <Modaltext 
                  value={dataInput.content}                
                  placeholder=' 연습내용'
                  onChange={inputContentHandler}
                  ></Modaltext>
                  <TimeInput ref={inputEl} value={dataInput.time} type='number' min='10' max='60' step='10' placeholder=' 연습시간'
                  onChange={inputTimeHandler}
                  onClick={inputTimeHandler}
                  ></TimeInput>
                </Section>
                <AddButton
                onClick={buttonClick}
                >수정</AddButton>
            </ModalView>
          </ModalBackdrop>
        ) : null}
      </Maincontainer>
    </>
  );
}

export default Modal;