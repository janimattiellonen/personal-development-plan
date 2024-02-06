import { useEffect, useState } from "react";

import {Wrapper} from "../../../components/Wrapper";

import {Loader} from "../../../components/Loader";

import {ExerciseType} from "../../../types/types";

import{ExerciseTable} from "./ExerciseTable";

export default function ListExercises() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [exercises, setExercises] = useState<ExerciseType[]>([])

  useEffect( () => {

    const fetchExercises = async () => {
      setIsLoading(true);

      const res =  await fetch(`${import.meta.env.VITE_API_URL}/api/admin/exercises`)

      const json = await res.json();
      setIsLoading(false);

      setExercises(json.data);
    }

    fetchExercises();
  }, [setExercises])

  return (
    <Wrapper wide={true}>
      <h1>List Exercises</h1>

      {isLoading && <Loader/>}

      {exercises.length > 0 && <div>
        <ExerciseTable data={exercises} />
      </div>}
    </Wrapper>
  );
}
