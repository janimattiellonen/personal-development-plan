import type {DatePickerProps, DateValue, ValidationResult} from 'react-aria-components';
import {Button, Calendar, CalendarCell, CalendarGrid, DateInput, DatePicker as RADatePicker, DateSegment, Dialog, FieldError, Group, Heading, Label, Popover, Text} from 'react-aria-components';

import { parseDate} from "@internationalized/date";

import {useFormContext, Controller } from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {ExclamationTriangleIcon} from "@radix-ui/react-icons";

import styled from "@emotion/styled";

import {Error} from "./Error";

const Wrapper = styled.div`
  color: black;
  margin-top: 8px;
  .react-aria-Group {
    display: flex;
    width: fit-content;
    align-items: center;
  }

  .react-aria-Button {
    background: var(--button-accent-primary-default-background);
    border: solid 1px var(--button-accent-primary-default-border);
    color: var(--color-accent-text-weak);
    forced-color-adjust: none;
    border-radius: 4px;
    margin-left: -1.929rem;
    width: 20px;
    height: 18px;
    padding: 0;
    font-size: 10px;
    box-sizing: content-box;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 15px;
    padding-top: 2px;

    &[data-pressed] {
      box-shadow: none;
      background: var(--color-accent-component);
      color: var(--color-accent-text-weak);
    }

    &[data-focus-visible] {
      outline: 2px solid white;
      outline-offset: 2px;
    }

    &:hover {
      background: var(--button-accent-primary-hover-background);
      border: solid 1px var(--button-accent-primary-hover-border);
    }
    
    &:focus {
      background: var(--button-accent-primary-active-background);
      outline: solid 2px var(--button-accent-primary-active-outline);
    }
  }

  .react-aria-DateInput {
    border: solid 1px var(--color-neutral-border-weak);
    background: white;
    white-space: nowrap;
    border-radius: 6px;
    width: fit-content;
    min-width: 150px;
    display: flex;
    padding: var(--space-md);


    &:focus-within {
      outline: solid 2px var(--blue-7);
    }
  }

  .react-aria-Popover {
    --background-color: var(--overlay-background);
    border: solid 1px var(--color-neutral-border-weak);
    background: var(--background-color);
    color: var(--text-color);
    box-sizing: border-box;
    border-radius: var(--space-xs);
    outline: none;
    max-width: 250px;
    box-shadow: 0 8px 20px #0000001a;
    
    header {
      display: flex;
    }
  }
  
  .react-aria-Popover[data-trigger=DatePicker] {
    max-width: unset;
  }

  .react-aria-Input[hidden] {
    display: none;
  }
`;

interface MyDatePickerProps<T extends DateValue> extends DatePickerProps<T> {
  name: string;
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function DatePicker(
  { name, label, description, errorMessage, ...props }: MyDatePickerProps<DateValue>
) {
  const { control, formState: {errors}} = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => {
        const {onChange, value, ...rest} = field;
        console.log(`value A: ${value}`);
        return (
          <Wrapper>
            <RADatePicker value={value ? parseDate(value)  : null} {...props} {...rest} onChange={(value) => onChange(value && value.toString())}>
              <Label>{label}</Label>
              <Group>
                <DateInput>
                  {(segment) => <DateSegment segment={segment} />}
                </DateInput>
                <Button>▼</Button>
              </Group>
              {description && <Text slot="description">{description}</Text>}
              <FieldError>{errorMessage}</FieldError>
              <Popover>
                <Dialog>
                  <Calendar>
                    <header>
                      <Button slot="previous">◀</Button>
                      <Heading />
                      <Button slot="next">▶</Button>
                    </header>
                    <CalendarGrid>
                      {(date) => <CalendarCell date={date} />}
                    </CalendarGrid>
                  </Calendar>
                </Dialog>
              </Popover>
            </RADatePicker>
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ message }) => <Error><ExclamationTriangleIcon/>{message}</Error>}
            />
          </Wrapper>
        )

      }}
      />


  );
}
