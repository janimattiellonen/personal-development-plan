import {useEffect, useState} from "react";

import styled from "@emotion/styled";

import {Heading} from "@radix-ui/themes";


import {Card} from "@radix-ui/themes";


import{ fetchAvailableExercises, addExerciseToTrainingSession} from "./exercise";
import {Alert} from "../../../components/Alert";

import {Button} from "../../../components/Button";

import {ExerciseItem} from "./ExerciseItem";

import AccordionDemo from "../../../components/AccordionDemo";

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-md)
`

const Row = styled.div`
`

type AvailableExercisesProps = {
  trainingSessionId: number;
  ts: number,
  refresh: () => void
}
export function AvailableExercises({trainingSessionId, ts, refresh}: AvailableExercisesProps) {
  const [exercises, setExercises] = useState<[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [successfullyAdded, setSuccessfullyAdded] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const arr = [0,1,2,3];
  const index = arr.findIndex((value) => value === 2)

  if (index !== -1) {
    console.log('ss');
  }

  const fetchExerciseData = async (selectedCategories: number[]) => {
    const response = await fetchAvailableExercises(trainingSessionId, selectedCategories);
    const json = await response.json();

    const data = json.data;
    setExercises(data);
  }

  const onAddExercise = async (exerciseId: number) => {
    const response = await addExerciseToTrainingSession(trainingSessionId, exerciseId);

    setErrorMessage(null);

    if (response.ok) {
      setSuccessfullyAdded(true);
      fetchExerciseData();
      refresh();
    } else {
      setErrorMessage('Failed to add exercise to training session');
    }
  }

  useEffect(() => {
    setSuccessfullyAdded(false);
    setErrorMessage(null);
    fetchExerciseData(selectedCategories);
  }, [trainingSessionId, ts, selectedCategories]);

  return (
    <div>
      <Heading as="h2">Available exercises</Heading>

      <p>Select and add exercises you find useful.</p>


      <div>
        <Button>Puttausharjoitus</Button>

        <AccordionDemo onSelectCategories={(selected) => {setSelectedCategories(selected)}}/>
      </div>

      <Flex>
        {exercises.map((exercise: any, i: number) => {
          return (
            <Card key={i}>
              <ExerciseItem exercise={exercise} />
              <div><Button onClick={() => onAddExercise(exercise.id)}>Add to training session</Button></div>
            </Card>
          )
        })}
      </Flex>

      {successfullyAdded && <Alert color="green">Exercise successfully added</Alert>}
      {errorMessage && <Alert color="red">{errorMessage}</Alert>}
    </div>
  );
}
