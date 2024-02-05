import {Suspense} from "react";
import {Outlet} from "react-router-dom";
import styled from "@emotion/styled";

import {Navigation} from "../admin/Navigation";

const StyledMain = styled.main`

`;

export function Main() {
  return (
    <div>
      <Navigation />
      <StyledMain>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </StyledMain>

    </div>
  );
}
