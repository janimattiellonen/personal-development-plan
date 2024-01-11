

import {useForm, SubmitHandler, FormProvider} from "react-hook-form"



import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import * as Input from "../../../components/Form/Input";

import {Wrapper} from "../../../components/Wrapper";

import {Checkbox} from "../../../components/Form/Checkbox";
import {DatePicker} from "../../../components/DatePicker";
import {DateValue} from "react-aria-components";
import {UserSelector} from "../../../components/UserSelector";

import {Button} from "../../../components/Button";

const dateValidator = yup.mixed().test(
  'is-date',
  'Not a valid date',
  (value) => {
    const foo = value as DateValue;

    return foo ? true : false;
  }
);

const schema = yup
  .object({
    name: yup.string().min(3).max(255).required(),
    isActive: yup.boolean(),
    startsAt: dateValidator,
    endsAt: dateValidator,
    goals: yup.string().nullable(),
    student: yup.number().min(1).positive().required()
  })

  .required()

type Inputs = {
  name: string
  isActive?: boolean;
  startsAt?: object | DateValue | undefined
  endsAt?: object | DateValue | undefined
  goals?: string | null
  student: number
}

const onSubmit: SubmitHandler<Inputs> = (data) => {
  console.log(JSON.stringify(data, null, 2));
  const f = data?.startsAt as DateValue;
  console.log(f?.toDate('Europe/Helsinki'));
}

export function NewDevelopmentPlanForm() {
  const methods = useForm<Inputs>({
    defaultValues: {
      name: '',
      isActive: false,
      startsAt: undefined,
      endsAt: undefined,
      goals: '',
      student: undefined
    },
    resolver: yupResolver(schema)

  })

  const values = methods.getValues();

  console.log(`values: ${JSON.stringify(values,null,2)}`)

  return (
    <Wrapper>
      <h1>New development plan</h1>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Input.Text id="name" label={'Name'} name="name"/>
          <Checkbox id="is-active" label={'Is active'}/>
          <DatePicker id="starts-at" name="startsAt" label="Starts at"/>
          <DatePicker id="ends-at" name="endsAt" label="Ends at"/>

          <Input.Textarea id="goals" name="goals" label="Goals" />

          <UserSelector />

          <Button type="submit">Submit</Button>

        </form>
      </FormProvider>

    </Wrapper>
  );
}
