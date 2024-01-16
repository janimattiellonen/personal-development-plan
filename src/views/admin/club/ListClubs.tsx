import { useEffect, useState } from "react";

import {ClubTable} from "./ClubTable";

import {Wrapper} from "../../../components/Wrapper";


export default function ListClubs() {
  const [clubs, setClubs] = useState<ClubType[]>([])

  useEffect( () => {

    const fetchClubs = async () => {
      const res =  await fetch(`${import.meta.env.VITE_API_URL}/api/admin/clubs`)

      const json = await res.json();

      setClubs(json.data);
    }

    fetchClubs();
  }, [setClubs])

  return (
    <Wrapper>
      <h1>List clubs</h1>

      {clubs && <ClubTable data={clubs} />}

    </Wrapper>
  );
}
