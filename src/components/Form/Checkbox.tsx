import styled from "@emotion/styled";

import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import * as Label from '@radix-ui/react-label';

const StyledCheckBox = styled(RadixCheckbox.Root)`
  background: var(--blue-5);
  width: 20px;
  height: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: var(--blue-7);
  }
  &:focus {
    outline: solid 2px var(--blue-7);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--space-xl);
`;


type CheckboxProps = {
  className?: string;
  id?: string;
  label: string;
}
export function Checkbox({id, className, label}: CheckboxProps) {
  return (
    <Wrapper>
      <StyledCheckBox id={id} className={className}>
        <RadixCheckbox.Indicator>
          <CheckIcon />
        </RadixCheckbox.Indicator>
      </StyledCheckBox>

      <Label.Root htmlFor={id}>{label}</Label.Root>

    </Wrapper>
  );
}
