import styled from "styled-components";

export const HomeContainer = styled.div`
/* height: 550px; */
overflow: hidden scroll ;
padding: 30px 59px;
::-webkit-scrollbar {
    width: 3px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
/* display: flex;
flex-direction: column;
gap:5rem; */

/* @media screen and (max-width:880px) {
    height: 918px; 
  } */
@media screen and (min-width:910px) {
    height: 80vh;  
  }
  @media screen and (max-width:910px) {
    height: 78vh;  
  }
 
`;
