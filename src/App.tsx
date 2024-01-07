
import { Route, Routes } from 'react-router-dom'


import {Index} from "./views";
import {Student} from "./views/admin/Student";


import {Main} from "./views/layouts/Main";

function App() {

  return (
      <Routes>
        <Route path="/" element={<Index/>} />

        <Route path="/admin" element={<Main />}>
          <Route path="student/new" element={<Student/>} />
        </Route>

      </Routes>
  )
}

export default App
