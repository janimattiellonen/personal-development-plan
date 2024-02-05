import {useEffect, useState} from "react";
import {useForm, SubmitHandler, FormProvider} from "react-hook-form"
import {useParams} from "react-router-dom";

import { zodResolver } from '@hookform/resolvers/zod';

import {Wrapper} from "../../../components/Wrapper";

import {Loader} from "../../../components/Loader";

import {schema, updateClub} from "./club";
import {ClubForm} from "./ClubForm";

type Inputs = {
  name: string;
  isActive?: boolean;
}

const defaultValues = {
  name: '',
  isActive: false
}

export default function EditClub() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams();

  const clubId = parseInt(id || '', 10);

  const methods = useForm<Inputs>({
    defaultValues,
    resolver: zodResolver(schema)
  })

  const {setError} = methods;

  useEffect(
    ()  => {
      const fetchData = async () => {
        setIsLoading(true);
        const response  =  await fetch(`${import.meta.env.VITE_API_URL}/api/admin/clubs/${id}`);

        const json = await response.json();

        if (!response.ok) {
          setError('root.serverError', {
            message: json.message || 'Server error',
          });
        }

        const data = json.data;
        setIsLoading(false);

        const convert = () => {
          return {
            name: data.name,
            isActive: data.isActive ? true : false,
          }
        }

        methods.reset(convert);
      }

      fetchData();

    }, [id])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const result = await updateClub(clubId, data);

    const json = await result.json()

    if (!result.ok) {
      setError('root.serverError', {
        message: json.message || 'Server error',
      });
    }
  }

  return (
    <div>
      <Wrapper>
        <h1>Edit club</h1>

        {isLoading && <Loader />}

        {!isLoading && <FormProvider {...methods}>
            <ClubForm onSubmit={onSubmit} errorMessage="Could not update club" successMessage="Club was successfully updated"/>
        </FormProvider>}
      </Wrapper>
    </div>
  );
}
