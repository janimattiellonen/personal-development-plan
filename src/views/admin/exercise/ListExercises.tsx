import { useEffect, useState } from "react";

import {Wrapper} from "../../../components/Wrapper";

import {Loader} from "../../../components/Loader";

import {ExerciseType} from "../../../types/types";

import{ExerciseTable} from "./ExerciseTable";

import {deleteExercise} from "./exercise";

export default function ListExercises() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [exercises, setExercises] = useState<ExerciseType[]>([])

  const fetchExercises = async () => {
    setIsLoading(true);

    const res =  await fetch(`${import.meta.env.VITE_API_URL}/api/admin/exercises`)

    const json = await res.json();
    setIsLoading(false);

    setExercises(json.data);
  }

  useEffect( () => {
    fetchExercises();
  }, [setExercises])

  return (
    <Wrapper wide={true}>
      <h1>List Exercises</h1>

      {isLoading && <Loader/>}

      {exercises.length > 0 && <div>
        <ExerciseTable remove={deleteExercise} data={exercises} refresh={() => fetchExercises()}/>
      </div>}
    </Wrapper>
  );
}
