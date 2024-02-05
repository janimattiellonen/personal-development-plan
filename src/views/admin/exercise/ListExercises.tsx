import { useEffect, useState } from "react";

import {Wrapper} from "../../../components/Wrapper";

import {Loader} from "../../../components/Loader";


export default function ListExercises() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [clubs, setClubs] = useState<ClubType[]>([])

  useEffect( () => {

    const fetchClubs = async () => {
      setIsLoading(true);

      const res =  await fetch(`${import.meta.env.VITE_API_URL}/api/admin/exercises`)

      const json = await res.json();
      setIsLoading(false);

      setClubs(json.data);
    }

    fetchClubs();
  }, [setClubs])

  return (
    <Wrapper>
      <h1>List Exercises</h1>

      {isLoading && <Loader/>}

      {clubs.length > 0 && <div></div>}
    </Wrapper>
  );
}
