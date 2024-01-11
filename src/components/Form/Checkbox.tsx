import styled from "@emotion/styled";

import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import * as Label from '@radix-ui/react-label';

const StyledCheckBox = styled(RadixCheckbox.Root)`
  background: var(--button-accent-primary-default-background);
  border: solid 1px var(--button-accent-primary-default-border);
  width: 20px;
  height: 20px;
  border-radius: var(--radius-xs);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent-text-weak);

  &:hover {
    background: var(--button-accent-primary-hover-background);
    border: solid 1px var(--button-accent-primary-hover-border);  
  }
  
  &:focus {
    background: var(--button-accent-primary-active-background);
    outline: solid 2px var(--button-accent-primary-active-outline);
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
