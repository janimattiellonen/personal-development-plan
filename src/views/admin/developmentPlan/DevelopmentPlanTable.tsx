import {Table} from "@radix-ui/themes";
import styled from "@emotion/styled";

import {Link} from "react-router-dom";

import {Pencil2Icon} from "@radix-ui/react-icons";

import {formatDate} from "../../../utils/date";

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

type DevelopmentPlanType = {
  id: number;
  name: string;
  startsAt: string;
  endsAt?: string;
  goals: string;
  student: UserType;
  instructor: UserType;
  isActive: boolean;
}

type UserType = {
  id: number;
  firstName: string;
  lastName: string;
}

type DevelopmentPlanTableProps = {
  data: DevelopmentPlanType[];
}

export function DevelopmentPlanTable({data}: DevelopmentPlanTableProps) {
  return (
    <div>
      <StyledTable variant={"ghost"}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Starts at</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Ends at</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Goals</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Student</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Instructor</Table.ColumnHeaderCell>

            <Table.ColumnHeaderCell>Is active</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>

          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map( (developmentPlan: DevelopmentPlanType) => {
            return (
              <StyledRow key={developmentPlan.id}>
                <Table.Cell>{developmentPlan.id}</Table.Cell>
                <Table.Cell>{developmentPlan.name}</Table.Cell>
                <Table.Cell>{formatDate(developmentPlan.startsAt)}</Table.Cell>
                <Table.Cell>{formatDate(developmentPlan.endsAt)}</Table.Cell>
                <Table.Cell>{developmentPlan.goals}</Table.Cell>
                <Table.Cell>{developmentPlan.student.firstName} {developmentPlan.student.lastName}</Table.Cell>
                <Table.Cell>{developmentPlan.instructor.firstName} {developmentPlan.instructor.lastName}</Table.Cell>
                <Table.Cell>{developmentPlan.isActive}</Table.Cell>
                <Table.Cell><Link to={`/admin/development-plan/${developmentPlan.id}/edit`}><Pencil2Icon /></Link></Table.Cell>
              </StyledRow>
            );
          })}
        </Table.Body>

      </StyledTable>
    </div>
  );
}
