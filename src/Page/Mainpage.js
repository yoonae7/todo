import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";



export const Bookshelf = styled.section`
position: relative;
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: flex-start;
padding-top: 50px;
height: 90%;
width: 100%;
`;

export const EachSection = styled.section`
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
width: 40%;
height: 50%;
box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
padding: 20px 20px 20px 20px;

`;

export const Score_image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
box-shadow: 5px 5px 5px rgb(112, 112, 112);
border-radius: 10%;
`;

function Mainpage({clickHandler, clickHandler2}) {
  return (
    <Bookshelf>
        <EachSection>
          <Link to="/book">
            <Score_image className="image" src="images/Bach.png" alt="bach" onClick={() => clickHandler()}/>
          </Link>
          <div>예제</div>
        </EachSection>

        <EachSection>
          <Link to="/repertoire">
            <Score_image
              className="image"
              src="images/Schumann.png"
              alt="shumann"
              onClick={() => clickHandler2()}
              />
          </Link>
          <div>레퍼토리</div>
        </EachSection>
    </Bookshelf>

  );
}

export default Mainpage;
