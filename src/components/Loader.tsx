import styled from "@emotion/styled";

import {UpdateIcon} from "@radix-ui/react-icons";

const StyledLoader = styled.div`
  width: 50px;
  height: 50px;
  margin: var(--space-xl);
  color: var(--color-accent-text);
  
  
  svg {
    width: 100%;
    height: 100%;
    height: 100%;

    animation: rotateSpinner 800ms linear infinite;
  }

  @keyframes rotateSpinner {
    to {
      transform: rotate(360deg);
    }
  }
`;

export function Loader() {
  return (
    <StyledLoader><UpdateIcon /></StyledLoader>
  );
}
