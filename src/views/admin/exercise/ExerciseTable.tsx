
import {Link} from "react-router-dom";

import {Pencil2Icon} from "@radix-ui/react-icons";

import * as Table from "../../../components/Table";

import {ExerciseType} from "../../../types/types";

type ExerciseTableProps = {
  data: ExerciseType[];
}



export function ExerciseTable({data}: ExerciseTableProps) {

  return (
    <div>
      <Table.Root variant={"ghost"}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Is active</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>

          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map( (exercise: ExerciseType) => {
            return (
              <Table.Row key={exercise.id}>
                <Table.Cell>{exercise.id}</Table.Cell>
                <Table.Cell>{exercise.name}</Table.Cell>
                <Table.Cell>{exercise.isActive}</Table.Cell>
                <Table.Cell><Link to={`/admin/exercise/${exercise.id}/edit`}><Pencil2Icon /></Link> <Link to={`/admin/exercise/${exercise.id}/edit`}></Link></Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>

      </Table.Root>
    </div>
  );
}
