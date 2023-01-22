import styled from "styled-components";

export const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;
export const ActionItem = styled.div`
  font-size: 1.2rem;
  position: relative;
  z-index: 999;
  cursor: pointer;
  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: "";
    width: 40px;
    height: 40px;
    background-color: ${props => props.theme.sidebar};

    z-index: -1;
    border-radius: 50%;
  }
`;
