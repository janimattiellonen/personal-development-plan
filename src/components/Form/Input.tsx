
import {useFormContext } from "react-hook-form";

import styled from "@emotion/styled";
import { css } from '@emotion/react';

import {TextField, TextArea as RUTextArea} from "@radix-ui/themes";

import {TextFieldRootProps} from "@radix-ui/themes/dist/cjs/components/text-field";

import * as Label from '@radix-ui/react-label';
import { ExclamationTriangleIcon} from '@radix-ui/react-icons'

import { ErrorMessage } from '@hookform/error-message';

import {Error} from "../Error";
import {InputHTMLAttributes} from "react";


const StyledTextFieldRoot = styled(TextField.Root)`
  display: flex;
  flex-direction: column;
  margin-bottom: var(--space-xl);
  

`;

const StyledLabel = styled(Label.Root)`
  //padding-left: var(--space-md);
   margin-bottom: var(--space-xs);
`;

export const baseTextFieldStyles = css`
  padding: var(--space-md);
  border: solid 1px var(--color-neutral-border-weak);
  border-radius: 4px;
  background: var(--color-neutral-background-weak);

  &:focus {
    outline: solid 2px var(--color-neutral-border-focus);
  }

  &:hover {
    border: solid 1px var(--color-neutral-border-hover);
  }
  
`;



const StyledTextField = styled(TextField.Input)`
  ${baseTextFieldStyles}
`;

const StyledTextArea = styled(RUTextArea)`
  textarea {
    width: 100%;

    ${baseTextFieldStyles}
  }
`;

type TextProps = {
  className?: string;
  label?: string;
  id?: string;
  name?: string;
  type?: string;
}  & InputHTMLAttributes<HTMLInputElement> & TextFieldRootProps

function Text({className, label, id, name, type, ...rest}: TextProps) {
  const {register, formState: {errors}} = useFormContext();

  const fieldName = name ? name : '';

  const stuff = fieldName ? register(fieldName) : null

  return (
    <StyledTextFieldRoot>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <StyledTextField aria-invalid={errors[fieldName] ? "true" : "false"} type={type || 'text'} className={className} id={id} {...stuff} {...rest} />
      <ErrorMessage
        errors={errors}
        name={fieldName}
        render={({ message }) => <Error><ExclamationTriangleIcon/>{message}</Error>}
      />
    </StyledTextFieldRoot>
  );
}

function Textarea({className, label, id, name, ...rest}: any) {
  const {register, formState: {errors}} = useFormContext();

  return (
    <>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <StyledTextArea id={id} className={className} {...register(name)} {...rest} />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <Error><ExclamationTriangleIcon/>{message}</Error>}
      />
    </>
  );
}

export {Text, Textarea}

