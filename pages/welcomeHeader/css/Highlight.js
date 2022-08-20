import styled, { css } from "styled-components";

const Highlight = styled.View`
  border-radius: 50px;
  width: 150px;
  height: 5px;
  padding: 10px;

  ${(props) =>
    props.available &&
    css`
      background-color: #00e676;
    `}

  ${(props) =>
    props.limited &&
    css`
      background-color: #dde033;
    `}

    ${(props) =>
    props.unavailable &&
    css`
      background-color: #ec241a;
    `}
`;

export default Highlight;
