import {useEffect, useState} from "react";

import styled from "@emotion/styled";

import{ fetchAvailableExercises, addExerciseToTrainingSession} from "./exercise";
import {Alert} from "../../../components/Alert";

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-md)
`

const Row = styled.div`
    background: gray;
    padding: var(--space-md);
`

type AvailableExercisesProps = {
  trainingSessionId: number;
  ts: number,
  refresh: () => void
}
export function AvailableExercises({trainingSessionId, ts, refresh}: AvailableExercisesProps) {
  const [exercises, setExercises] = useState<[]>([]);
  const [successfullyAdded, setSuccessfullyAdded] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchExerciseData = async () => {
    const response = await fetchAvailableExercises(trainingSessionId);
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
    fetchExerciseData();
  }, [trainingSessionId, ts]);

  return (
    <div>
      <h2>Available exercises</h2>

      <Flex>
        {exercises.map((exercise: any, i: number) => {
          return (
            <Row key={i}>
              <div>{exercise.name} <button onClick={() => onAddExercise(exercise.id)}>Add to training session</button></div>
            </Row>
          )
        })}
      </Flex>

      {successfullyAdded && <Alert color="green">Exercise successfully added</Alert>}
      {errorMessage && <Alert color="red">{errorMessage}</Alert>}
    </div>
  );
}
