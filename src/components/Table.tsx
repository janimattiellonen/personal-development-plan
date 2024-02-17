import {ComponentProps} from 'react';

import {Table as RUTable} from "@radix-ui/themes";
import styled from "@emotion/styled";
import {ReactNode} from "react";

const StyledTable = styled(RUTable.Root)`
  width: 100%;
  
  table {
    width: 100%;
  }
`;

const StyledRow = styled(RUTable.Row)`
  background: var(--gray-5);

  &:nth-of-type(even) {
    background: var(--gray-3);
  }

  td {
    padding: var(--space-xs) var(--space-md);
  }
`;


const Body = RUTable.Body

const Cell = RUTable.Cell


const ActionCell = styled(Cell)`
  button {
      margin-right: var(--space-md);

  }
    
    svg {
        
        &:hover {
            color: var(--color-accent-background-strong);
        }
    }
`

const ColumnHeaderCell = RUTable.ColumnHeaderCell

const Header = RUTable.Header;

type TableProps = {
  children: ReactNode | ReactNode[];
} & ComponentProps<typeof RUTable.Root>
function Root({children, ...props}: TableProps) {
  return (
    <StyledTable {...props}>
      {children}
    </StyledTable>
  )
}

type RowProps = {
  children: ReactNode;
} & ComponentProps<typeof RUTable.Row>

function Row({children, ...props}: RowProps) {
  return (
    <StyledRow {...props}>{children}</StyledRow>
  )
}

export {ActionCell, Body, Cell, ColumnHeaderCell, Header, Root, Row}
