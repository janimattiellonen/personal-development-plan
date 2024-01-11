import { ReactNode } from 'react'

import styled from "@emotion/styled";
import {useFormContext, Controller } from "react-hook-form";

import * as RadixRadioGroup from '@radix-ui/react-radio-group'

import { ErrorMessage } from '@hookform/error-message';
import {ExclamationTriangleIcon} from "@radix-ui/react-icons";

import {Error} from "../Error";

const StyledRadioGroupRoot = styled(RadixRadioGroup.Root)`
  display: flex;
  flex-direction: row;
  gap: var(--space-xl);
`

const StyledRadioGroupItem = styled(RadixRadioGroup.Item)`
  background: var(--button-accent-primary-default-background);
  border: solid 1px var(--button-accent-primary-default-border);
  border-radius: 100%;
  width: 20px;
  height: 20px;

  &:hover {
    background: var(--button-accent-primary-hover-background);
    border: solid 1px var(--button-accent-primary-hover-border);
  }

  &:focus {
    background: var(--button-accent-primary-active-background);
    outline: solid 2px var(--button-accent-primary-active-outline);
  }

  &[data-state="checked"] {
    border: solid 1px var(button-accent-primary-active-border);
  }

  &[data-state="checked"]:hover {
    border: solid 1px var(--button-accent-primary-hover-border);
  }
  
  .RadioGroupIndicator {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;
  }
  
  .RadioGroupIndicator::after {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--color-accent-text-weak);
  }
`

const ItemWrapper = styled.div`
  align-items: center;
  display: flex;
  gap: var(--space-md);
`;

type RootProps = {
  label?: string;
  children: ReactNode | ReactNode[];
  fieldName: string;
  id?: string
}

function Root({ label, children, fieldName, id}: RootProps) {
  const { control, formState: {errors}} = useFormContext();
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({field}) => {
        const {onChange} = field;
        return (
          <>
            <div id={id}>{label}</div>

            <StyledRadioGroupRoot aria-labelledby={id} {...field}  onValueChange={(value) => {console.log(`Value changed: ${value}`); onChange(value);}}>{children}</StyledRadioGroupRoot><ErrorMessage
              errors={errors}
              name={fieldName}
              render={({ message }) => <Error><ExclamationTriangleIcon/>{message}</Error>}
            />
          </>
        );
      }}
    />);

}

type ItemProps = {
  id: string;
  value: string;
  children: string | ReactNode | ReactNode[];
};

function Item({ children, value, id }: ItemProps) {
  return (
    <ItemWrapper>

      <StyledRadioGroupItem value={value} id={id}>
        <RadixRadioGroup.Indicator className="RadioGroupIndicator"/>
      </StyledRadioGroupItem>
      <label htmlFor={id}>{children}</label>
    </ItemWrapper>
  )
}

export { Root, Item }
