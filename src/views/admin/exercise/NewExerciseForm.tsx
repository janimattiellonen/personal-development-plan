import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {ServerError} from "../../../components/ServerError";

import * as Input from "../../../components/Form/Input";
import {Checkbox} from "../../../components/Form/Checkbox";
import {Loader} from "../../../components/Loader";
import {Alert} from "../../../components/Alert";
import {Button} from "../../../components/Button";


// Define your schema using Zod
const schema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(5).max(200),
  instructions: z.string().min(5).max(200),
  url: z.string(),
  youtubeUrl: z.string(),
  isActive: z.boolean(),
}).required();

type Inputs = {
  name: string;
  description: string;
  instructions: string;
  url: string;
  youtubeUrl: string;
  isActive: boolean;
}



export default function NewExerciseForm() {
  const methods = useForm({
    defaultValues: {
      name: '',
      description: '',
      instructions: '',
      url: '',
      youtubeUrl: '',
      isActive: false,
    },
    resolver: zodResolver(schema),
  });

  const {
    setError,
    formState: {
      isSubmitting,
      isSubmitSuccessful
    }} = methods;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(`data: ${JSON.stringify(data)}`);

    const result = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/exercises`, {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })

    const json = await result.json()

    if (!result.ok) {
      setError('root.serverError', {
        message: json.message || 'Server error',
      });
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Input.Text id="name" label={'Name'} name="name"/>

        <Input.Textarea id="description" name="description" label="Description" />

        <Input.Textarea id="instructions" name="instructions" label="Instructions" />

        <Input.Text id="url" label={'Url'} name="url"/>

        <Input.Text id="youtubeUrl" label={'Youtube url'} name="youtubeUrl"/>

        <Checkbox id="is-active" label={'Is active'} name="isActive"/>

        {isSubmitting && <Loader />}
        <ServerError errorMessage="Could not create exercise"/>

        {isSubmitSuccessful && <Alert color="green">Exercise was successfully created</Alert>}

        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
};

