import { useState } from 'react';
import styled from "styled-components";

export const Maincontainer = styled.main`
position: relative;
  height: 6%;
  width: 100%;
  border-radius: 8px;
`;

export const Navicon = styled.i`
position: absolute;
top: 9px;
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



function Modal({addButton, addPracticeHandler, addTimeHandler, handleButtonClick}) {
  const [isOpen, setIsOpen] = useState(false);
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);

  const addButtonHandler = (e) => {
    addButton(e)
  };

  const inputContentHandler = (e) => {
    addPracticeHandler(e)
  };

  const inputTimeHandler = (e) => {
    addTimeHandler(e)
  };

  const buttonClick = (e) => {
    handleButtonClick(e)
    setIsOpen(!isOpen);
  }

  
  return (
    <>
      <Maincontainer>
        <Navicon
          className="fa-solid fa-plus"
          onClick={openModalHandler}></Navicon>
        {isOpen === true ? (
          <ModalBackdrop onClick={openModalHandler}>
            <ModalView onClick={e => e.stopPropagation()}>
                <Section>
                    <Button 
                      onClick={(e) => {
                        setActive1(!active1)
                        setActive2(false)
                        setActive3(false)
                        setActive4(false)
                        addButtonHandler(e);
                      }}
                      className={active1 ? 'active' : null}
                      >Drill</Button>
                    <Button
                      onClick={(e) => {
                        setActive2(!active2)
                        setActive1(false)
                        setActive3(false)
                        setActive4(false)
                        addButtonHandler(e);
                      }}
                      className={active2 ? 'active' : null}
                      >Bpm</Button>
                    <Button
                    onClick={(e) => {
                      setActive3(!active3)
                      setActive1(false)
                      setActive2(false)
                      setActive4(false)
                      addButtonHandler(e);
                    }}
                    className={active3 ? 'active' : null}>Left.h</Button>
                    <Button
                    onClick={(e) => {
                      setActive4(!active4)
                      setActive2(false)
                      setActive3(false)
                      setActive1(false)
                      addButtonHandler(e);
                    }}
                      className={active4 ? 'active' : null}>Right.h</Button>
                </Section>
                <Section>
                  <Modaltext 
                  placeholder=' 연습내용'
                  onChange={inputContentHandler}
                  ></Modaltext>
                  <TimeInput type='number' min='10' max='60' step='10' placeholder=' 연습시간'
                  onChange={inputTimeHandler}></TimeInput>
                </Section>
                <AddButton
                onClick={buttonClick}
                >추가</AddButton>
            </ModalView>
          </ModalBackdrop>
        ) : null}
      </Maincontainer>
    </>
  );
}

export default Modal;