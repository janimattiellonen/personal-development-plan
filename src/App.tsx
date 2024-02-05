import {lazy, useMemo} from "react";
import { Route, Routes } from 'react-router-dom'

import {Index} from "./views";

// const NewClub = lazy(() => import("./views/admin/club/NewClub"));

import {NewClub} from './views/admin/club/NewClub';

const EditClub = lazy(() =>  import("./views/admin/club/EditClub"));
const ListClubs= lazy(() =>  import("./views/admin/club/ListClubs"));
const NewDevelopmentPlan= lazy(() =>  import("./views/admin/developmentPlan/NewDevelopmentPlan"));
const EditDevelopmentPlan= lazy(() =>  import("./views/admin/developmentPlan/EditDevelopmentPlan"));
const ListDevelopmentPlans = lazy(() => import("./views/admin/developmentPlan/ListDevelopmentPlans"));
const NewStudentForm= lazy(() =>  import("./views/admin/student/NewStudentForm"));

const NewExerciseForm = lazy(() =>  import("./views/admin/exercise/NewExerciseForm"));

import {Main} from "./views/layouts/Main";

function App() {
  const memoizedRoutes = useMemo(
    () => (
      <>
        <Route path="/" element={<Index/>} />

        <Route path="/admin" element={<Main />}>
          <Route path="development-plan/new" element={<NewDevelopmentPlan />} />
          <Route path="development-plan/:id/edit" element={<EditDevelopmentPlan />} />
          <Route path="development-plans" element={<ListDevelopmentPlans />} />
          <Route path="student/new" element={<NewStudentForm/>} />
          <Route path="club/new" element={<NewClub/>} />
          <Route path="club/:id/edit" element={<EditClub/>} />
          <Route path="clubs" element={<ListClubs />} />
          <Route path="exercise/new" element={<NewExerciseForm />} />
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
