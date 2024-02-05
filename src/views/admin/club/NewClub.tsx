import {useForm, SubmitHandler, FormProvider} from "react-hook-form"

import { zodResolver } from '@hookform/resolvers/zod';

import {Wrapper} from "../../../components/Wrapper";

import {createClub, ClubInputs, schema} from "./club";

import {ClubForm} from "./ClubForm";

export function NewClub() {
  const methods = useForm<ClubInputs>({
    defaultValues: {
      name: '',
      isActive: false,
    },
    resolver: zodResolver(schema)
  })

  const {setError} = methods;

  const onSubmit: SubmitHandler<ClubInputs> = async (data) => {
    const result = await createClub(data);

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
        <h1>New club</h1>

        <FormProvider {...methods}>
          <ClubForm onSubmit={onSubmit} errorMessage="Could not create club" successMessage="Club was successfully created"/>
        </FormProvider>
      </Wrapper>
    </div>
  );
}
