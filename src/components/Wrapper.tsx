import styled from "@emotion/styled";
import {ReactNode} from "react";

const StyledWrapper = styled.div`
  background: var(--component);
  padding: 16px;
  border-radius: 8px;
  border: solid 1px var(--gray-6);
`;

type WrapperProps = {
  className?: string
  children: ReactNode | ReactNode[]
  style?: object
}
export function Wrapper({className, children, style}: WrapperProps) {

  return (
    <StyledWrapper className={className} style={style}>
      {children}
    </StyledWrapper>
  );
}
