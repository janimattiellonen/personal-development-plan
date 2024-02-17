
import {useNavigate} from "react-router-dom";

import {Cross1Icon, Pencil2Icon} from "@radix-ui/react-icons";

import * as Table from "../../../components/Table";

import {ExerciseType} from "../../../types/types";
import {AlertDialog} from "../../../components/AlertDialog";
import {useEffect, useState} from "react";
import {deleteExercise} from "./exercise";
import {Alert} from "../../../components/Alert";

import {useErrorMessage} from "../../../types/error";
import {IconButton} from "@radix-ui/themes";

type ExerciseTableProps = {
  data: ExerciseType[];
  refresh: () => void
  remove: (id: any) => Promise<Response>
}

export function ExerciseTable({data, refresh, remove}: ExerciseTableProps) {
  const navigate = useNavigate();
  const {createErrorMessage} = useErrorMessage('exercise');

  const [isDialogVisible, showDialog] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [selectedExercise, setSelectedExercise] = useState<ExerciseType | null>(null);

  const handleRemove = async (id: number) => {
    const response = await remove(id);

    if (response.ok) {
      refresh();
      setSuccessMessage('Successfully removed');
    } else {
      refresh();
      setErrorMessage(createErrorMessage(response));
    }
  }

  useEffect(() => {
    setErrorMessage(null);
    setSuccessMessage(null);
  }, []);

  return (
    <div>
      <AlertDialog
        open={isDialogVisible}
        title={`Delete exercise ${selectedExercise?.name}?`}
        onCancel={() => {
          setSelectedExercise(null)
          showDialog(false);
        }}
        onConfirm={() => {
          if (selectedExercise?.id) {
            handleRemove(selectedExercise?.id)
          }

          showDialog(false);
        }}
      />
      <Table.Root variant={"ghost"}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Instructions</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Url</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Youtube url</Table.ColumnHeaderCell>

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
                <Table.Cell>{exercise.description}</Table.Cell>
                <Table.Cell>{exercise.instructions}</Table.Cell>
                <Table.Cell>{exercise.url}</Table.Cell>
                <Table.Cell>{exercise.youtubeUrl}</Table.Cell>
                <Table.Cell>{exercise.isActive}</Table.Cell>
                <Table.ActionCell>
                  <IconButton size={'1'} onClick={() => navigate(`/admin/exercise/${exercise.id}/edit`)}><Pencil2Icon /></IconButton>
                  <IconButton size={'1'} color={'red'} onClick={() => {
                    setSelectedExercise(exercise);
                    showDialog(true);
                  }}><Cross1Icon /></IconButton>

                </Table.ActionCell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
      {successMessage && <Alert color="green">{successMessage}</Alert>}
      {errorMessage && <Alert color="red">{errorMessage}</Alert>}

    </div>
  );
}
