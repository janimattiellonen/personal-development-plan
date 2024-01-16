import {lazy, useMemo} from "react";
import { Route, Routes } from 'react-router-dom'

import {Index} from "./views";

const NewClubForm = lazy(() => import("./views/admin/club/NewClubForm"));
const EditClubForm = lazy(() =>  import("./views/admin/club/EditClubForm"));
const ListClubs= lazy(() =>  import("./views/admin/club/ListClubs"));
const NewDevelopmentPlanForm= lazy(() =>  import("./views/admin/developmentPlan/NewDevelopmentPlanForm"));
const NewStudentForm= lazy(() =>  import("./views/admin/student/NewStudentForm"))

import {Main} from "./views/layouts/Main";

function App() {
  const memoizedRoutes = useMemo(
    () => (
      <>
        <Route path="/" element={<Index/>} />

        <Route path="/admin" element={<Main />}>
          <Route path="development-plan/new" element={<NewDevelopmentPlanForm />} />
          <Route path="student/new" element={<NewStudentForm/>} />
          <Route path="club/new" element={<NewClubForm/>} />
          <Route path="club/:id/edit" element={<EditClubForm/>} />
          <Route path="clubs" element={<ListClubs />} />
        </Route>
      </>
    ), []
  );

  return (
      <Routes>
        {memoizedRoutes}
      </Routes>
  )
}

export default App
