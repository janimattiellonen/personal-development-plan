import { useFormContext} from 'react-hook-form';

import {ServerError} from "../../../components/ServerError";

import * as Input from "../../../components/Form/Input";
import {Checkbox} from "../../../components/Form/Checkbox";
import {Loader} from "../../../components/Loader";
import {Alert} from "../../../components/Alert";
import {Button} from "../../../components/Button";

type ExerciseFormProps = {
  onSubmit: any;
  errorMessage?: string;
  successMessage?: string
}
export function ExerciseForm({onSubmit, errorMessage, successMessage}: ExerciseFormProps) {
  const { handleSubmit, formState: {isSubmitting, isSubmitSuccessful}} = useFormContext();


  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input.Text id="name" label={'Name'} name="name"/>

        <Input.Textarea id="description" name="description" label="Description" />

        <Input.Textarea id="instructions" name="instructions" label="Instructions" />

        <Input.Text id="url" label={'Url'} name="url"/>

        <Input.Text id="youtubeUrl" label={'Youtube url'} name="youtubeUrl"/>

        <Checkbox id="is-active" label={'Is active'} name="isActive"/>

        {isSubmitting && <Loader />}

        <ServerError errorMessage={errorMessage} />
        {isSubmitSuccessful && <Alert color="green">{successMessage}</Alert>}

        <Button type="submit">Submit</Button>
      </form>
  );
};

