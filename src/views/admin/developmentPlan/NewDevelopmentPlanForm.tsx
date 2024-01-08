
import {Wrapper} from "../../../components/Wrapper";

import {useForm, SubmitHandler, FormProvider} from "react-hook-form"

import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import {Input} from "../../../components/Form/Input";

import {Checkbox} from "../../../components/Form/Checkbox";
import {DatePicker} from "../../../components/DatePicker";
import {DateValue} from "react-aria-components";


const schema = yup
  .object({
    name: yup.string().min(3).max(255).required(),
    isActive: yup.boolean(),
    startsAt: yup.mixed().test(
     'is-date',
      'Not a valid date',
      (value) => {
       const foo = value as DateValue;

       return foo ? true : false;
      }
    )
  })

  .required()

type Inputs = {
  name: string
  isActive?: boolean;
  startsAt?: object | DateValue | undefined
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
      startsAt: undefined
    },
    resolver: yupResolver(schema)

  })
  return (
    <Wrapper>
      <h1>New development plan</h1>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Input id="name" label={'Name'} name="name"/>
          <Checkbox id="is-active" label={'Is active'}/>
          <DatePicker name="startsAt"/>

          <input type="submit"/>

        </form>
      </FormProvider>

    </Wrapper>
  );
}
