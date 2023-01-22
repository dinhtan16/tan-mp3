import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0;
  gap:2rem;
  .navigate{
    display: flex;
    align-items: center;
    gap:1rem;
    cursor: pointer;
    .toggle{
      padding: 5px;
      border-radius: 9999px;
      outline: 0;
      border:1px solid ${props => props.theme.Mode};
      background-color: ${props => props.theme.Mode};
      color:${props => props.theme.colorMode};
      font-weight: bold;
      cursor: pointer;

      .flex-center{
        display: flex;
        align-items: center;
        gap:0.6rem;
      }
    }
    .icon:hover{
      background-color: rgba(255,255,255,0.3);
    }
    .icon{
      color: ${props => props.theme.fontColor};
    }
  }
`;
