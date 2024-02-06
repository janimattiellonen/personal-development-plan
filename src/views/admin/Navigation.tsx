import styled from "@emotion/styled";

import {Link} from "react-router-dom";

const StyledNav = styled.nav`
  display: flex;
  gap: var(--space-xl);
  margin-bottom: var(--space-xxl);
`;

export function Navigation() {
  return (
    <StyledNav>
      <Link to={'/admin/student/new'} >Add new student</Link>
      <Link to={'/admin/development-plan/new'} >Add new development plan</Link>
      <Link to={'/admin/development-plans'} >List development plans</Link>
      <Link to={'/admin/club/new'} >Add new club</Link>
      <Link to={'/admin/clubs'} >List clubs</Link>
      <Link to={'/admin/exercise/new'} >Add new exercise</Link>
      <Link to={'/admin/exercises'} >List exercises</Link>
    </StyledNav>
  );
}
