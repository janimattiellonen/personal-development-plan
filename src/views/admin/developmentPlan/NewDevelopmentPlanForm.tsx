import {useForm, SubmitHandler, FormProvider} from "react-hook-form"

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import * as Input from "../../../components/Form/Input";

import {Wrapper} from "../../../components/Wrapper";

import {Checkbox} from "../../../components/Form/Checkbox";
import {DatePicker} from "../../../components/DatePicker";
import {DateValue} from "react-aria-components";
import {UserSelector} from "../../../components/UserSelector";

import {Button} from "../../../components/Button";

import {Alert} from "../../../components/Alert";
import {Loader} from "../../../components/Loader";
import {ServerError} from "../../../components/ServerError";


const dateValidator = z.preprocess((val) => {
  const f: DateValue = val as DateValue;

  return f  ? f.toDate('Europe/Helsinki') : null;
},z.date())

const schema = z.object({
  name: z.string().min(3, { message: 'Required' }).max(255),
  isActive: z.boolean(),
  startsAt: dateValidator,
  endsAt: dateValidator.optional().nullable(),
  goals: z.string({required_error: 'sss', invalid_type_error: 'ddf'}).min(1),
  age: z.number().min(1).optional(),
  student: z.number().min(1).positive(),
  instructor: z.number().min(1).positive()
});

type Inputs = {
  name: string
  isActive?: boolean;
  startsAt: any
  endsAt?: any
  goals?: string | null
  student: number
  instructor: number
}

export default function NewDevelopmentPlanForm() {
  const methods = useForm<Inputs>({
    defaultValues: {
      name: '',
      isActive: false,
      startsAt: null,
      endsAt: null,
      goals: '',
      student: 0,
      instructor: 0,
    },
    resolver: zodResolver(schema)
  })

  const {setError, handleSubmit, formState: { isSubmitting, isSubmitSuccessful}} = methods;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const f: Date = data?.startsAt as Date;

    const convert = () => {
      return {
        name: data.name,
        is_active: data.isActive,
        starts_at: data.startsAt,
        ends_at: data.endsAt,
        goals: data.goals,
        student_id: data.student,
        instructor_id: data.instructor
      }
    }

    const result = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/development-plan`, {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(convert())
    })

    const json = await result.json()

    if (!result.ok) {
      setError('root.serverError', {
        type: "" + result.status,
        message: json.message,
      });
    }
  }

  return (
    <Wrapper>
      <h1>New development plan</h1>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input.Text id="name" label={'Name'} name="name"/>
          <Checkbox id="is-active" label={'Is active'} name="isActive"/>
          <DatePicker id="starts-at" name="startsAt" label="Starts at"/>
          <DatePicker id="ends-at" name="endsAt" label="Ends at"/>

          <Input.Textarea id="goals" name="goals" label="Goals" />

          <UserSelector name={'student'} title={'Select student'} type={'student'} />
          <UserSelector name={'instructor'} title={'Select instructor'} type={'instructor'}/>

          {isSubmitting && <Loader />}

          <ServerError errorMessage="Could not create development plan"/>
          {isSubmitSuccessful && <Alert color="green">Development plan was successfully updated</Alert>}

          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    </Wrapper>
  );
}
