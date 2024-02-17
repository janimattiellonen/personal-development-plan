import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ExerciseInputs, schema, updateExercise} from "../exercise/exercise";
import {Wrapper} from "../../../components/Wrapper";
import {Loader} from "../../../components/Loader";
import {ExerciseForm} from "./ExerciseForm";

export default function EditExerciseForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams();

  const exerciseId = parseInt(id || '', 10);

  const methods = useForm<ExerciseInputs>({
    defaultValues: {
      name: '',
      description: '',
      instructions: '',
      url: '',
      youtubeUrl: '',
      isActive: false,
    },
    resolver: zodResolver(schema)
  })

  const {setError} = methods;

  useEffect(()  => {
    const fetchData = async () => {
      setIsLoading(true);
      const response  =  await fetch(`${import.meta.env.VITE_API_URL}/api/admin/exercises/${id}`);

      const json = await response.json();

      if (!response.ok) {
        setError('root.serverError', {
          message: json.message || 'Server error',
        });
      }

      const data = json.data;

      setIsLoading(false);

      methods.reset(data);
    }

    fetchData();

  }, [id])

  const onSubmit: SubmitHandler<ExerciseInputs> = async (data) => {
    console.log(`Updating exercise: ${JSON.stringify(data,null,2)}`)
    const result = await updateExercise(exerciseId, data);

    const json = await result.json()

    if (!result.ok) {
      setError('root.serverError', {
        message: json.message || 'Server error',
      });
    }
  }

  return (
    <div>
      <Wrapper>
        <h1>Edit exercise</h1>

        {isLoading && <Loader />}

        {!isLoading && <FormProvider {...methods}>
            <ExerciseForm onSubmit={onSubmit} errorMessage="Could not update exercise" successMessage="Exercise was successfully updated"/>
        </FormProvider>}
      </Wrapper>
    </div>
  );
}
