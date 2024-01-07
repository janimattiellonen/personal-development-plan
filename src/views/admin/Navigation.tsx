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
    </StyledNav>
  );
}
