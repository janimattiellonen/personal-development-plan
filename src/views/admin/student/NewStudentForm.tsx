import {useEffect} from "react";

import {useForm, SubmitHandler, FormProvider} from "react-hook-form"

import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import {setLocale} from 'yup';

import * as Input from "../../../components/Form/Input";

import * as RadioGroup from '../../../components/Form/RadioGroup'

import {Wrapper} from "../../../components/Wrapper";

import {Alert} from "../../../components/Alert";
import {Loader} from "../../../components/Loader";
import {ServerError} from "../../../components/ServerError";

const schema = yup
  .object({
    username: yup.string().min(3).max(255).required(),
    password: yup.string().min(5).max(255).required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    age: yup.number().integer('sss').min(2, 'Age must be at least 2').max(120, 'Age must be 120 at most').nullable().transform((v, o) => {
      return o === '' ? null : v;
    }),
    type: yup.string().required(),
    userRole: yup.string().required()
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
    resolver: yupResolver(schema)

  })

  useEffect(() => {
    setLocale({
      mixed: {
        default: 'luss',
        notType: 'sss',
        defined: 'sdfdfg'
      },
      number: {
        integer: 'ssdf',
        min: 'dsfgdfg'
      }
    })
  }, [])


  const {setError, handleSubmit, formState: { isSubmitting, isSubmitSuccessful}} = methods;


  const onSubmit: SubmitHandler<Inputs> = async (data) => {

    const convert = () => {
      return {
        email: data.username,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`,
        first_name: data.firstName,
        last_name: data.lastName,
        age: data.age,
        type: data.type,
        user_role: data.userRole,
      }
    }

   const result = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/student`, {
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
