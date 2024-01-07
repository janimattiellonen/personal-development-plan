import{Link} from "react-router-dom";

export function Index() {
  return (
    <div>
      <h1>Personal development plan</h1>

      <p><Link to={'/student/new'}>Add new student</Link></p>
    </div>
  );
}
