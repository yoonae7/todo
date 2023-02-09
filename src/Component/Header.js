import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { useState, useEffect} from 'react';

export const Headerbody = styled.header`
height: 10%;
width: 100%;
background-color: rgb(75, 75, 158);
box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

export const Headernav = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
height: 100%;
width: 50%;
`;

export const Navicon = styled.i`
color: white;
font-size: 25px;
  &:hover{  
    color: rgb(255, 187, 0);
  }

  &.active{  
    color: rgb(255, 187, 0);
  }
`;


function Header({imageOnBook, setImageOnBook, imageOnRep, setImageOnRep}) {
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  let param = window.location.pathname

  useEffect(() => {
    if(imageOnBook) buttonActive2()
    setImageOnBook(false)
    if(imageOnRep) buttonActive3()
    setImageOnRep(false)
    }, [imageOnBook, imageOnRep]);

  const buttonActive = () => {
    setActive1(true);
    setActive2(false);
    setActive3(false);
    setImageOnBook(false)
    setImageOnRep(false)
  };

  const buttonActive2 = () => {
    setActive2(true);
    setActive1(false);
    setActive3(false);
  };

  const buttonActive3 = () => {
    setActive3(true);
    setActive1(false);
    setActive2(false);
  };


  return (
      <Headerbody>
        <Headernav>
          <Link to="/">
            <Navicon className={`fa-solid fa-sailboat ${param === '/' || active1 ? 'active' : null}`} onClick={buttonActive}></Navicon>
          </Link>
          <Link to="/book">
            <Navicon className={`fa-solid fa-book ${active2 || imageOnBook? 'active' : null}`} onClick={buttonActive2}></Navicon>
          </Link>
          <Link to="/repertoire">
            <Navicon className={`fa-solid fa-star ${active3 || imageOnRep? 'active' : null}`} onClick={buttonActive3}></Navicon>
          </Link>
        </Headernav>
      </Headerbody>
  );
}

export default Header;