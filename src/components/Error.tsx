import styled from "@emotion/styled";
import {ReactNode} from "react";


const ErrorField = styled.span`
  align-items: center;
  color: var(--error-text);
  display: flex;
  gap: var(--space-md);
  justify-content: flex-start;
  margin-top: var(--space-xxs);
`;

type ErrorProps = {
  className?: string
  children: ReactNode | ReactNode[]
  style?: object
}

export function Error({className, children, style}: ErrorProps) {
  return (
    <ErrorField className={className} style={style}>{children}</ErrorField>
  )
}
