import styled from "styled-components";

export const SliderContainer = styled.div`
  /* display: grid; */
  /* grid-template-columns: repeat(6, 325px); */
  display: flex;
  overflow: hidden;
  gap: 0.5rem;
  align-items: center;
  /* max-width:200px; */
`;

export const SliderImg = styled.div`
  min-width: 33%;
  overflow: hidden;
  cursor: pointer;
  img {
    transition: all .3s ease;
    &:hover{
      transform: scale(1.2);
    }
    width: 100%;
    object-fit: contain;
    flex: 1;
    border-radius: 0.5rem;
  }
`;
