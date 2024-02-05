import {useForm, SubmitHandler, FormProvider} from "react-hook-form"

import { zodResolver } from '@hookform/resolvers/zod';

import {Wrapper} from "../../../components/Wrapper";

import {DevelopmentPlanForm} from "./DevelopmentPlanForm";
import {createDevelopmentPlan, Inputs, schema} from "./developmentPlan";

export default function NewDevelopmentPlan() {

  const methods = useForm<Inputs>({
    defaultValues: {
      name: '',
      isActive: false,
      startsAt: null,
      endsAt: null,
      goals: '',
      studentId: 0,
      instructorId: 0,
      trainingSessions: [{ name: "", isActive: false, startsAt: null, endsAt: null}]
    },
    resolver: zodResolver(schema)
  })

  const {setError} = methods;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const result = await createDevelopmentPlan(data);

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
        <DevelopmentPlanForm onSubmit={onSubmit} errorMessage="Could not create development plan" successMessage="Development plan was successfully created"/>
      </FormProvider>
    </Wrapper>
  );
}
