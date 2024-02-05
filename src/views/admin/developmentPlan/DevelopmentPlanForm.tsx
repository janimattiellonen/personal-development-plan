import {useFormContext} from "react-hook-form";
import * as Input from "../../../components/Form/Input";
import {Checkbox} from "../../../components/Form/Checkbox";
import {Loader} from "../../../components/Loader";
import {ServerError} from "../../../components/ServerError";
import {Alert} from "../../../components/Alert";
import {Button} from "../../../components/Button";
import {DatePicker} from "../../../components/DatePicker";
import {UserSelector} from "../../../components/UserSelector";
import {TrainingSessionForm} from "../trainingSession/TrainingSessionForm";

type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string
}

type DevelopmentPlanFormProps = {
  onSubmit: any;
  errorMessage?: string;
  successMessage?: string;
  selectedStudent?: UserType | null;
  selectedInstructor?: UserType | null;
}

export function DevelopmentPlanForm({onSubmit, errorMessage, successMessage, selectedStudent, selectedInstructor}: DevelopmentPlanFormProps) {
  const { handleSubmit, formState: {isSubmitting, isSubmitSuccessful}} = useFormContext();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <Input.Text id="name" label={'Name'} name="name"/>
      <Checkbox id="is-active" label={'Is active'} name="isActive"/>
      <DatePicker id="starts-at" name="startsAt" label="Starts at"/>
      <DatePicker id="ends-at" name="endsAt" label="Ends at"/>

      <Input.Textarea id="goals" name="goals" label="Goals" />

      <UserSelector user={selectedStudent} name={'studentId'} title={'Select student'} type={'student'} />
      <UserSelector user={selectedInstructor} name={'instructorId'} title={'Select instructor'} type={'instructor'}/>

      <h2>Training sessions</h2>
      <TrainingSessionForm />

      {isSubmitting && <Loader />}

      <ServerError errorMessage={errorMessage} />
      {isSubmitSuccessful && <Alert color="green">{successMessage}</Alert>}

      <Button type="submit">Submit</Button>
    </form>
  )
}
