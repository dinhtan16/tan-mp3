import styled from "styled-components";

export const HomeContainer = styled.div`
/* height: 550px; */
overflow: hidden scroll ;
padding: 30px 59px;
/* display: flex;
flex-direction: column;
gap:5rem; */
@media screen and (max-width:880px) {
    height: 480px; 
  }
/* @media screen and (max-width:880px) {
    height: 918px; 
  } */
@media screen and (min-width:880px) {
    height: 540px;  
  }
  @media screen and (min-height:1024px) {
    height: calc(1240px - 90px - 60px);
  }
`;
