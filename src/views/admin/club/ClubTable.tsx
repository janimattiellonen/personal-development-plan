import {Table} from "@radix-ui/themes";
import styled from "@emotion/styled";


const StyledTable = styled(Table.Root)`
  width: 100%;
  
  table {
    width: 100%;
  }
`;

const StyledRow = styled(Table.Row)`
  background: var(--gray-5);

  &:nth-of-type(even) {
    background: var(--gray-3);
  }

  td {
    padding: var(--space-xs) var(--space-md);
  }
`;

type ClubTableProps = {
  data: ClubType[];
}
export function ClubTable({data}: ClubTableProps) {
  return (
    <div>
      <StyledTable variant={"ghost"}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Is active</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map( (club: ClubType) => {
            return (
              <StyledRow key={club.id}>
                <Table.Cell>{club.id}</Table.Cell>
                <Table.Cell>{club.name}</Table.Cell>
                <Table.Cell>{club.is_active}</Table.Cell>
              </StyledRow>
            );
          })}
        </Table.Body>

      </StyledTable>
    </div>
  );
}
