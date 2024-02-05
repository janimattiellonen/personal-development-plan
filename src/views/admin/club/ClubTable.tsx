import {useState} from "react";

import {Link} from "react-router-dom";

import {Cross1Icon, Pencil2Icon} from "@radix-ui/react-icons";

import {removeClub} from "./club";

import {Alert} from "../../../components/Alert";

import * as Table from "../../../components/Table";

import {ClubType} from "../../../types/types";

type ClubTableProps = {
  data: ClubType[];
}

function createErrorMessage(response: Response): string | null {
  if (response.ok) {
    return null;
  }

  if (response.status === 403) {
    return 'Could not remove the book due to lacking permissions.'
  }

  if (response.status === 404) {
    return 'The club you tried to remove does not exist.';
  }

  if (response.status >= 400 && response.status < 500) {
    return 'Could not remove the book due to an error.'
  }

  if (response.status >= 500) {
    return 'Could not remove the book due to a server error.';
  }

  return null;
}

export function ClubTable({data}: ClubTableProps) {

  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const handleRemove = async (id: number) => {
    const response = await removeClub(id);

    if (!response.ok) {
      setErrorMessage(createErrorMessage(response));
    }
  }
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
          {data.map( (club: ClubType) => {
            return (
              <Table.Row key={club.id}>
                <Table.Cell>{club.id}</Table.Cell>
                <Table.Cell>{club.name}</Table.Cell>
                <Table.Cell>{club.isActive}</Table.Cell>
                <Table.Cell><Link to={`/admin/club/${club.id}/edit`}><Pencil2Icon /></Link> <Link to={`/admin/club/${club.id}/edit`}></Link><Cross1Icon onClick={() => handleRemove(club.id)}/></Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>

      </Table.Root>

      {errorMessage && <Alert color="red">{errorMessage}</Alert>}
    </div>
  );
}
