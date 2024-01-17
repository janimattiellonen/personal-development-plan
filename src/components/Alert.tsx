import styled from "@emotion/styled";

import {Callout} from "@radix-ui/themes";
// import {CalloutRootProps} from "@radix-ui/themes/dist/esm/components/callout";

import {ExclamationTriangleIcon} from "@radix-ui/react-icons";
import {ComponentProps, ReactNode} from "react";

const StyledAlert = styled(Callout.Root)`
  align-items: center;
  border-radius: var(--radius-xs);
  gap: var(--space-xl);
  padding: var(--space-md);
`;

type AlertProps = {
  children: string | ReactNode;
} & ComponentProps<typeof Callout.Root>
export function Alert({children, ...props}: AlertProps) {
  return (
    <StyledAlert {...props}>
      <Callout.Icon>
        <ExclamationTriangleIcon />
      </Callout.Icon>
      <Callout.Text>
        {children}
      </Callout.Text>
    </StyledAlert>
  );
}
