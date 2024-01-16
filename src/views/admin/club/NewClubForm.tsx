import {useForm, SubmitHandler, FormProvider} from "react-hook-form"

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';


import {Wrapper} from "../../../components/Wrapper";
import * as Input from "../../../components/Form/Input";
import {Checkbox} from "../../../components/Form/Checkbox";
import {Button} from "../../../components/Button";

const schema = z.object({
  name: z.string().min(3, { message: 'Required' }).max(255),
  isActive: z.boolean(),
});

type Inputs = {
  name: string
  isActive?: boolean;
}

export default function NewClubForm() {

  const onSubmit: SubmitHandler<Inputs> = async (data) => {

    const convert = () => {
      return {
        name: data.name,
        is_active: data.isActive,
      }
    }

    await fetch(`${import.meta.env.VITE_API_URL}/api/admin/club`, {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(convert())
    })
  }

  const methods = useForm<Inputs>({
    defaultValues: {
      name: '',
      isActive: false,
    },
    resolver: zodResolver(schema)
  })

  return (
    <div>
      <h1>New club</h1>

      <Wrapper>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>

            <Input.Text id="name" label={'Name'} name="name"/>
            <Checkbox id="is-active" label={'Is active'} name="isActive"/>

            <Button type="submit">Submit</Button>

          </form>
        </FormProvider>

      </Wrapper>
    </div>
  );
}
