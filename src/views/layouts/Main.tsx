import {Outlet} from "react-router-dom";
import styled from "@emotion/styled";

import {Navigation} from "../admin/Navigation";

const StyledMain = styled.main`
  margin: 0 auto;
  width: 100%;
  min-width: 400px;
  max-width: 700px;
`;


export function Main() {
  return (
    <div>
      <Navigation />
      <StyledMain>
        <Outlet />
      </StyledMain>

    </div>
  );
}
