import {useForm, SubmitHandler, FormProvider} from "react-hook-form"

import { zodResolver } from '@hookform/resolvers/zod';

import {Wrapper} from "../../../components/Wrapper";


import {Loader} from "../../../components/Loader";

import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {Inputs, schema, updateDevelopmentPlan} from "./developmentPlan";

import {DevelopmentPlanForm} from "./DevelopmentPlanForm";

export type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

type TrainingSessionType = {
  id?: number;
  name: string;
  isActive: boolean;
  startsAt: any;
  endsA?: any;
}

export default function EditDevelopmentPlan() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<UserType | null>(null);
  const [selectedInstructor, setSelectedInstructor] = useState<UserType | null>(null);

  const developmentPlan = parseInt(id || '', 10);

  const methods = useForm<Inputs>({
    defaultValues: {
      name: '',
      isActive: false,
      startsAt: null,
      endsAt: null,
      goals: '',
      studentId: 0,
      instructorId: 0,
      trainingSessions: [{ id: null, name: "", isActive: false, startsAt: null, endsAt: null}]
    },
    resolver: zodResolver(schema)
  })

  useEffect(
    ()  => {
      const fetchData = async () => {
        setIsLoading(true);
        const response  =  await fetch(`${import.meta.env.VITE_API_URL}/api/admin/development-plans/${id}`);

        const json = await response.json();

        if (!response.ok) {
          setError('root.serverError', {
            message: json.message || 'Server error',
          });
        }

        const data = json.data;
        data.isActive = data.isActive ? true : false;

        if (data.trainingSessions) {
          data.trainingSessions = data.trainingSessions.map ((trainingSession: TrainingSessionType) => {
            trainingSession.isActive = trainingSession.isActive ? true : false;

            return trainingSession;
          })
        }

        setIsLoading(false);

        console.log(`data: ${JSON.stringify(data,null,2)}`)

        setSelectedStudent({
          id: data.student.id,
          firstName: data.student.firstName,
          lastName: data.student.lastName,
          email: data.student.email,
        });
        setSelectedInstructor({
          id: data.instructor.id,
          firstName: data.instructor.firstName,
          lastName: data.instructor.lastName,
          email: data.instructor.email,
        });


        methods.reset(data);
      }

      fetchData();

    }, [id])

  const {setError} = methods;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const result = await updateDevelopmentPlan(developmentPlan, data);

    const json = await result.json();

    if (!result.ok) {
      setError('root.serverError', {
        type: "" + result.status,
        message: json.message,
      });
    }
  }

  return (
    <Wrapper>
      <h1>Edit development plan</h1>

      {isLoading && <Loader />}

      {!isLoading && <FormProvider {...methods}>
          <DevelopmentPlanForm selectedStudent={selectedStudent} selectedInstructor={selectedInstructor} onSubmit={onSubmit} errorMessage="Could not create development plan" successMessage="Development plan was updated successfully"/>
      </FormProvider>}
    </Wrapper>
  );
}
