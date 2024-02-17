import {useForm, SubmitHandler, FormProvider} from "react-hook-form"

import { zodResolver } from '@hookform/resolvers/zod';

import {ExerciseForm} from "./ExerciseForm";

import {createExercise, ExerciseInputs, schema} from "./exercise";
import {Wrapper} from "../../../components/Wrapper";

export default function NewExercise() {
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

  const onSubmit: SubmitHandler<ExerciseInputs> = async (data) => {
    console.log(`data: ${JSON.stringify(data)}`);

    const result = await createExercise(data);

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
        <h1>New exercise</h1>

        <FormProvider {...methods}>
          <ExerciseForm onSubmit={onSubmit} errorMessage="Could not create exercise" successMessage="Exercise was successfully created"/>
        </FormProvider>
      </Wrapper>
    </div>
  );
}
