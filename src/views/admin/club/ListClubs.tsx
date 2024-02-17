import { useEffect, useState } from "react";

import {ClubTable} from "./ClubTable";

import {Wrapper} from "../../../components/Wrapper";

import {Loader} from "../../../components/Loader";

import {ClubType} from "../../../types/types";

export default function ListClubs() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [clubs, setClubs] = useState<ClubType[]>([])

  const fetchClubs = async () => {
    setIsLoading(true);

    const res =  await fetch(`${import.meta.env.VITE_API_URL}/api/admin/clubs`)

    const json = await res.json();
    setIsLoading(false);

    setClubs(json.data);
  }

  useEffect( () => {
    console.log('ListClubs::useEffect');

    fetchClubs();
  }, [setClubs])

  return (
    <Wrapper>
      <h1>List clubs</h1>

      {isLoading && <Loader/>}

      {clubs.length > 0 && <ClubTable data={clubs} refresh={() => fetchClubs()}/>}
    </Wrapper>
  );
}
