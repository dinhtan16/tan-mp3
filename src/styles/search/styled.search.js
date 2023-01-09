import styled from "styled-components";

export const SearchContainer = styled.div`
  /* padding-top: 0.5rem; */
  position: relative;
`;

export const SearchInput = styled.input`
  max-width: 400px;
  width: 100%;
  height: 40px;
  border-radius: 20px;
  border: 0;
  outline: 0;
  padding: 1rem 2rem;
  font-size: 0.9rem;
  background-color: #d9d7d4;
  font-family: inherit;

  &:focus {
    background-color: #fff;
  }
  &::placeholder {
    color: #333;
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
