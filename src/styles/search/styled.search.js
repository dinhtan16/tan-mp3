import styled from "styled-components";

export const SearchContainer = styled.div`
  /* padding-top: 0.5rem; */
  position: relative;
`;
export const Loading = styled.div`
    padding-top: inherit;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.3rem;
  padding-left: 0.4rem;
`;
export const SearchInput = styled.input`
  @media screen and (min-width: 1124px) {
    min-width: 450px;
  }
  /* width: 100%; */
  width: 190px;
  height: 40px;
  border-radius: 20px;
  border: 0;
  outline: 0;
  padding: 1rem 2.3rem;
  font-size: 0.9rem;
  background-color: ${props => props.theme.sidebar};
  font-family: inherit;
  color: ${props => props.theme.fontColor};

  &:focus {
    background-color: transparent;
    border:1px solid ${props => props.theme.buttonBgr} ;
  }
  &::placeholder {
    color: ${props => props.theme.fontColor};
  }
`;
export const SearchIcon = styled.div`
  padding-top: inherit;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.3rem;
  padding-left: 0.4rem;
`;
export const ClearIcon = styled.div`
  position: absolute;
  top: 30%;
  right: 20px;
`