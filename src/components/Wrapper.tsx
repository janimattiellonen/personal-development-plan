import styled from "@emotion/styled";
import {ReactNode} from "react";

const StyledWrapper = styled.div<{$wide?: boolean}>`
  background: var(--color-neutral-background);
  border-radius: 8px;
  border: solid 1px var(--gray-6);
  margin: 0 auto;
  max-width: ${(props) => props.$wide ? '1400px' : '700px'};
  padding: 16px;
  width: 100%;
`;

type WrapperProps = {
  className?: string
  children: ReactNode | ReactNode[]
  style?: object
  wide?: boolean
}
export function Wrapper({className, children, style, wide}: WrapperProps) {
  return (
    <StyledWrapper $wide={wide || false} className={className} style={style}>
      {children}
    </StyledWrapper>
  );
}
