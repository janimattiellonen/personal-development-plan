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

const NewExercise = lazy(() =>  import("./views/admin/exercise/NewExercise"));
const EditExercise = lazy(() =>  import("./views/admin/exercise/EditExercise"));
const ListExercises = lazy(() =>  import("./views/admin/exercise/ListExercises"));
const Exercises = lazy(() =>  import("./views/admin/trainingSession/Exercises"));
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
          <Route path="exercise/new" element={<NewExercise />} />
          <Route path="exercise/:id/edit" element={<EditExercise />} />
          <Route path="exercises" element={<ListExercises />} />
          <Route path="training-session/:id/exercise/add" element={<Exercises />} />
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
