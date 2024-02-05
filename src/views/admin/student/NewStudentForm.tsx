import {useForm, SubmitHandler, FormProvider} from "react-hook-form"

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import * as Input from "../../../components/Form/Input";

import * as RadioGroup from '../../../components/Form/RadioGroup'

import {Wrapper} from "../../../components/Wrapper";

import {Alert} from "../../../components/Alert";
import {Loader} from "../../../components/Loader";
import {ServerError} from "../../../components/ServerError";

const schema = z
  .object({
    username: z.string().min(3).max(255),
    password: z.string().min(5).max(255),
    firstName: z.string(),
    lastName: z.string(),
    age: z.coerce.number().min(5),
    type: z.string(),
    userRole: z.string()
  })
  .required()

type Inputs = {
  username: string
  password: string
  firstName: string
  lastName: string
  age?: number | null
  type: string
  userRole: string
}

export default function NewStudentForm() {
  const methods = useForm<Inputs>({
    defaultValues: {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      age: undefined
    },
    resolver: zodResolver(schema)
  })

  const {setError, formState: { isSubmitting, isSubmitSuccessful}} = methods;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(`data: ${JSON.stringify(data,null,2)}`);
    const convert = () => {
      return {
        ...data,
        name: `${data.firstName} ${data.lastName}`,
      }
    }

    console.log(`convert(): ${JSON.stringify(convert(),null,2)}`)
    const result = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/students`, {
      method: 'post',
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

  return <Wrapper>
    <h1>Add new student</h1>

    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>

        <Input.Text id="username" label={'Username'} name="username"/>
        <Input.Text type="password" id="password" label={'password'} name="password"/>

        <Input.Text id="firstName" label={'Firstname'} name="firstName"/>
        <Input.Text id="lastName" label={'Lastname'} name="lastName"/>

        <Input.Text id="age" label={'Age'} name="age"/>
        <RadioGroup.Root fieldName={'type'} id="user-type" label="Type">
          <RadioGroup.Item id="type-student" value="student">Student</RadioGroup.Item>
          <RadioGroup.Item id="type-instructor" value="instructor">Instructor</RadioGroup.Item>
        </RadioGroup.Root>

        <RadioGroup.Root fieldName={'userRole'} id="user-role" label="Role">
          <RadioGroup.Item id="role-user" value="user">User</RadioGroup.Item>
          <RadioGroup.Item id="role-admin" value="admin">Admin</RadioGroup.Item>
        </RadioGroup.Root>

        {isSubmitting && <Loader />}

        <ServerError errorMessage="Could not create student"/>
        {isSubmitSuccessful && <Alert color="green">Student was successfully updated</Alert>}

        <input type="submit"/>
      </form>
    </FormProvider>

  </Wrapper>
}
