import styled from "@emotion/styled";

import {Callout} from "@radix-ui/themes";
// import {CalloutRootProps} from "@radix-ui/themes/dist/esm/components/callout";

import {ExclamationTriangleIcon} from "@radix-ui/react-icons";
import {ComponentProps, ReactNode} from "react";

const StyledAlert = styled(Callout.Root)`
  padding: var(--space-md);
  gap: var(--space-xl);
  align-items: center;
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
