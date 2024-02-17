import {ComponentProps, forwardRef} from "react";
import styled from "@emotion/styled";

import {Button as RUButton} from "@radix-ui/themes";

type ButtonProperties = {
  $variant?: string;
} & ComponentProps<typeof RUButton>;

const StyledButton = styled(RUButton)<{$variant?: string}>`
    background: ${(props) => `var(--button-${props.$variant || 'accent'}-primary-default-background)`};
    border: solid 1px ${(props) => `var(--button-${props.$variant || 'accent'}-primary-default-border)`};
    color: ${(props) => `var(--button-${props.$variant || 'accent'}-primary-default-text)`};
    border-radius: 8px;
    padding: var(--space-md);
    
    &:hover {
        background: ${(props) => `var(--button-${props.$variant || 'accent'}-primary-hover-background)`};
        border: solid 1px ${(props) => `var(--button-${props.$variant || 'accent'}-primary-hover-border)`};
    }
  
    &:focus {
        background: var(--button-accent-primary-active-background);
        background: ${(props) => `var(--button-${props.$variant || 'accent'}-primary-active-background)`};
        outline: solid 2px var(--button-accent-primary-active-outline);
        outline: solid 2px ${(props) => `var(--button-${props.$variant || 'accent'}-primary-active-outline)`};
    }
`;

export const Button = forwardRef<HTMLButtonElement, ButtonProperties>(({children, ...props}: ButtonProperties, forwardedRef) => {
  return <StyledButton {...props} ref={forwardedRef}>{children}</StyledButton>
});

