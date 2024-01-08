import {useEffect} from "react";

import {useForm, SubmitHandler, FormProvider} from "react-hook-form"

import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import {setLocale} from 'yup';

import {Input} from "../../../components/Form/Input";

import * as RadioGroup from '../../../components/Form/RadioGroup'

import {Wrapper} from "../../../components/Wrapper";

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

export function NewStudentForm() {
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
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(JSON.stringify(data,null,2));
/*
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

    fetch('http://localhost:9100/api/admin/student', {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(convert())
    })

 */
  }

  return <Wrapper>
    <h1>Add new student</h1>

    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>

        <Input id="username" label={'Username'} name="username"/>
        <Input type="password" id="password" label={'password'} name="password"/>

        <Input id="firstName" label={'Firstname'} name="firstName"/>
        <Input id="lastName" label={'Lastname'} name="lastName"/>

        <Input id="age" label={'Age'} name="age"/>
        <RadioGroup.Root fieldName={'type'} id="user-type" label="Type">
          <RadioGroup.Item id="type-student" value="student">Student</RadioGroup.Item>
          <RadioGroup.Item id="type-instructor" value="instructor">Instructor</RadioGroup.Item>
        </RadioGroup.Root>

        <RadioGroup.Root fieldName={'userRole'} id="user-role" label="Role">
          <RadioGroup.Item id="role-user" value="user">User</RadioGroup.Item>
          <RadioGroup.Item id="role-admin" value="admin">Admin</RadioGroup.Item>
        </RadioGroup.Root>
        <input type="submit"/>
      </form>
    </FormProvider>

  </Wrapper>
}
