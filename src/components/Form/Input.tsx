
import {useFormContext } from "react-hook-form";

import styled from "@emotion/styled";

import {TextField} from "@radix-ui/themes";
import * as Label from '@radix-ui/react-label';
import { ExclamationTriangleIcon} from '@radix-ui/react-icons'

import { ErrorMessage } from '@hookform/error-message';

import {Error} from "../Error";


const StyledTextFieldRoot = styled(TextField.Root)`
  display: flex;
  flex-direction: column;
  margin-bottom: var(--space-xl);
  

`;

const StyledLabel = styled(Label.Root)`
  //padding-left: var(--space-md);
   margin-bottom: var(--space-xs);
`;

const StyledTextField = styled(TextField.Input)`
  padding: var(--space-md);
  border: solid 1px var(--gray-5);
  border-radius: 4px;
  background: var(--gray-1);

  &:focus {
    outline: solid 2px var(--blue-7);
  }
`;


export function Input({className, label, id, name, ...rest}: any) {
  const {register, formState: {errors}} = useFormContext();

  return (
    <StyledTextFieldRoot>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <StyledTextField aria-invalid={errors[name] ? "true" : "false"} type="text" className={className} id={id} {...register(name)} {...rest} />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <Error><ExclamationTriangleIcon/>{message}</Error>}
      />
    </StyledTextFieldRoot>
  );
}


