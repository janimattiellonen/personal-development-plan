import {useEffect, useState} from "react";
import {useForm, SubmitHandler, FormProvider} from "react-hook-form"
import {useParams} from "react-router-dom";

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {Wrapper} from "../../../components/Wrapper";
import * as Input from "../../../components/Form/Input";
import {Checkbox} from "../../../components/Form/Checkbox";
import {Button} from "../../../components/Button";

import {Alert} from "../../../components/Alert";
import {ServerError} from "../../../components/ServerError";

import {Loader} from "../../../components/Loader";

const schema = z.object({
  name: z.string().min(3, { message: 'Required' }).max(255),
  isActive: z.boolean(),
});

type Inputs = {
  name: string;
  isActive?: boolean;
}

const defaultValues = {
  name: '',
  isActive: false
}

export default function EditClubForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams();

  const methods = useForm<Inputs>({
    defaultValues,
    resolver: zodResolver(schema)
  })

  const {setError, formState: {isSubmitting, isSubmitSuccessful}} = methods;

  useEffect(
    ()  => {
      const fetchData = async () => {
        setIsLoading(true);
        const res =  await fetch(`${import.meta.env.VITE_API_URL}/api/admin/clubs/${id}`)
        const json = await res.json();
        const data = json.data;
        setIsLoading(false);

        const convert = () => {
          return {
            name: data.name,
            isActive: data.is_active ? true : false,
          }
        }

        methods.reset(convert);
      }

      fetchData();

    }, [id])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const convert = () => {
      return {
        name: data.name,
        is_active: data.isActive,
      }
    }

    const result = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/clubs/${id}`, {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(convert())
    })

    const json = await result.json()

    if (!result.ok) {
      setError('root.serverError', {
        message: json.message || 'Server error',
      });
    }
  }

  return (
    <div>
      <h1>Edit club</h1>

      <Wrapper>
        {isLoading && <Loader />}

        {!isLoading && <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Input.Text id="name" label={'Name'} name="name"/>
            <Checkbox id="is-active" label={'Is active'} name="isActive"/>

            {isSubmitting && <Loader />}

            <ServerError errorMessage="Could not create club"/>
            {isSubmitSuccessful && <Alert color="green">Club was successfully updated</Alert>}

            <Button type="submit">Submit</Button>
          </form>
        </FormProvider>}
      </Wrapper>
    </div>
  );
}
