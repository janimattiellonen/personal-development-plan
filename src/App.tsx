
import { Route, Routes } from 'react-router-dom'


import {Index} from "./views";
import {NewStudentForm} from "./views/admin/student/NewStudentForm";


import {Main} from "./views/layouts/Main";

function App() {

  return (
      <Routes>
        <Route path="/" element={<Index/>} />

        <Route path="/admin" element={<Main />}>
          <Route path="student/new" element={<NewStudentForm/>} />
        </Route>

      </Routes>
  )
}

export default App
