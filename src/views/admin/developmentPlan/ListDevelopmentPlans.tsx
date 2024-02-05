import {useEffect, useState} from "react";

import {Wrapper} from "../../../components/Wrapper";
import {Loader} from "../../../components/Loader";
import {DevelopmentPlanTable} from "./DevelopmentPlanTable";
/*
type DevelopmentPlan = {

}
*/

export default function ListDevelopmentPlans()
{
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [developmentPlans, setDevelopmentPlans] = useState([]);

  useEffect(() => {
    const fetchDevelopmentPlans = async () => {
      setIsLoading(true);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/development-plans`)

      const json = await res.json();
      setIsLoading(false);

      setDevelopmentPlans(json.data);
    }

    fetchDevelopmentPlans();

  }, []);

  return <Wrapper wide={true}>
    <h1>Development plans</h1>

    {isLoading && <Loader />}

    {developmentPlans.length > 0 && <DevelopmentPlanTable data={developmentPlans}/> }
  </Wrapper>
}

