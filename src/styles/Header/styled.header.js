import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0;
  gap:2rem;
  .navigate{
    display: flex;
    gap:1rem;
    cursor: pointer;

    .icon:hover{
      background-color: rgba(255,255,255,0.3);
    }
  }
`;
