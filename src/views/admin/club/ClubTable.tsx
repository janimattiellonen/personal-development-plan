import {useState} from "react";

import {IconButton} from "@radix-ui/themes";

import {useNavigate} from "react-router-dom";

import {Cross1Icon, Pencil2Icon} from "@radix-ui/react-icons";

import {removeClub} from "./club";

import {Alert} from "../../../components/Alert";

import {AlertDialog} from "../../../components/AlertDialog";

import * as Table from "../../../components/Table";

import {ClubType} from "../../../types/types";

import {useErrorMessage} from "../../../types/error";

type ClubTableProps = {
  data: ClubType[];
  refresh: () => void
}

export function ClubTable({data, refresh}: ClubTableProps) {
  const navigate = useNavigate();

  const {createErrorMessage} = useErrorMessage('exercise');

  const [isDialogVisible, showDialog] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedClub, setSelectedClub] = useState<ClubType | null>(null);

  const handleRemove = async (id: number) => {
    const response = await removeClub(id);

    if (response.ok) {
      refresh();
    } else {
      refresh();

      setErrorMessage(createErrorMessage(response));
    }
  }

  return (
    <div>
      <AlertDialog
        open={isDialogVisible}
        title={`Delete club ${selectedClub?.name}?`}
        onCancel={() => {
          setSelectedClub(null)
          showDialog(false);
        }}
        onConfirm={() => {
          if (selectedClub?.id) {
            handleRemove(selectedClub?.id)
          }

          showDialog(false);
        }}
      />
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
                <Table.ActionCell>
                  <IconButton size={'1'} onClick={() => navigate(`/admin/club/${club.id}/edit`)}><Pencil2Icon /></IconButton>
                  <IconButton size={'1'} color={'red'} onClick={() => {
                    setSelectedClub(club);
                    showDialog(true);
                  }}><Cross1Icon /></IconButton>
                </Table.ActionCell>
              </Table.Row>
            );
          })}
        </Table.Body>

      </Table.Root>

      {errorMessage && <Alert color="red">{errorMessage}</Alert>}
    </div>
  );
}
