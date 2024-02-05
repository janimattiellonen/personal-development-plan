import * as Input from "../../../components/Form/Input";
import {Checkbox} from "../../../components/Form/Checkbox";
import {Loader} from "../../../components/Loader";
import {ServerError} from "../../../components/ServerError";
import {Alert} from "../../../components/Alert";
import {Button} from "../../../components/Button";
import {useFormContext} from "react-hook-form";

type ClubFormProps = {
  onSubmit: any;
  errorMessage?: string;
  successMessage?: string
}
export function ClubForm({onSubmit, errorMessage, successMessage}: ClubFormProps) {
  const { handleSubmit, formState: {isSubmitting, isSubmitSuccessful}} = useFormContext();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <Input.Text id="name" label={'Name'} name="name"/>
      <Checkbox id="is-active" label={'Is active'} name="isActive"/>

      {isSubmitting && <Loader />}

      <ServerError errorMessage={errorMessage} />
      {isSubmitSuccessful && <Alert color="green">{successMessage}</Alert>}

      <Button type="submit">Submit</Button>
    </form>
  )
}
