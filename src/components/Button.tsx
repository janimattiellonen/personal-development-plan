import styled from "@emotion/styled";

import {Button as RUButton} from "@radix-ui/themes";



type ButtonProperties = React.ComponentPropsWithoutRef<typeof RUButton>;


const StyledButton = styled(RUButton)`
  background: var(--button-accent-primary-default-background);
  border: solid 1px var(--button-accent-primary-default-border);
  border-radius: 8px;
  padding: var(--space-md);
  
  &:hover {
    background: var(--button-accent-primary-hover-background);
    border: solid 1px var(--button-accent-primary-hover-border);
  }

  &:focus {
    background: var(--button-accent-primary-active-background);
    outline: solid 2px var(--button-accent-primary-active-outline);
  }
`;

export function Button({children}: ButtonProperties) {
  return <StyledButton>{children}</StyledButton>
}
