import type {DatePickerProps, DateValue, ValidationResult} from 'react-aria-components';
import {Button, Calendar, CalendarCell, CalendarGrid, DateInput, DatePicker as RADatePicker, DateSegment, Dialog, FieldError, Group, Heading, Label, Popover, Text} from 'react-aria-components';

import {useFormContext, Controller } from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";


import styled from "@emotion/styled";
import {Error} from "./Error";
import {ExclamationTriangleIcon} from "@radix-ui/react-icons";


const Wrapper = styled.div`
  color: black;
  margin-top: 8px;
  .react-aria-Group {
    display: flex;
    width: fit-content;
    align-items: center;
  }

  .react-aria-Button {
    background: var(--blue-5);
    color: var(--blue-9);
    forced-color-adjust: none;
    border-radius: 4px;
    border: none;
    margin-left: -1.929rem;
    width: 1.429rem;
    height: 1.429rem;
    padding: 0;
    font-size: 0.857rem;
    box-sizing: content-box;
    display: flex;
    justify-content: center;
    align-items: center;

    &[data-pressed] {
      box-shadow: none;
      background: var(--blue-8);
      color: var(--blue-9);
    }

    &[data-focus-visible] {
      outline: 2px solid white;
      outline-offset: 2px;
    }

    &:focus {
      outline: solid 2px var(--blue-7);
    }
  }

  .react-aria-DateInput {
    border: solid 1px var(--gray-5);
    background: white;
    white-space: nowrap;
    border-radius: 6px;
    width: fit-content;
    min-width: 150px;
    padding: 4px;
    display: flex;

    &:focus-within {
      outline: solid 2px var(--blue-7);
    }
  }

  .react-aria-Popover {
    --background-color: var(--overlay-background);
    border: 1px solid var(--border-color);
    background: var(--background-color);
    color: var(--text-color);
    box-sizing: border-box;
    border-radius: 6px;
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
`;

interface MyDatePickerProps<T extends DateValue> extends DatePickerProps<T> {
  name: string;
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function DatePicker<T extends DateValue>(
  { name, label, description, errorMessage, ...props }: MyDatePickerProps<T>
) {
  const { control, formState: {errors}} = useFormContext();

  //  console.log(`date: ${JSON.stringify(date?.toDate('Europe/Helsinki'),null,2)}`)
  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => {
        const {onChange, ...rest} = field;
        return (
          <Wrapper>
            <RADatePicker {...props} {...rest} onChange={onChange}>
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
