import {useAsyncList} from 'react-stately';
import {Button, ComboBox, ListBox, Input, ListBoxItem, Popover} from "react-aria-components";

import styled from "@emotion/styled";

import {baseTextFieldStyles} from "./Input";
import {useFormContext, Controller} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {Error} from "../Error";
import {ExclamationTriangleIcon} from "@radix-ui/react-icons";

const StyledInput = styled(Input)`
  ${baseTextFieldStyles}
`;

type Student = {
  id: number;
  name: string;
}
export function AutoComplete() {
  const {setValue, control, register, formState: {errors}} = useFormContext();

  const list = useAsyncList<Student>({
    async load({ signal, filterText }) {
      console.log("URL: " + import.meta.env.VITE_API_URL)

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/students/?term=${filterText}`,
        //`https://swapi.py4e.com/api/people/?search=${filterText}`,

        { signal }
      );
      console.log('foppa');
      const json = await res.json();
      return {
        items: json.data
      };
    }
  });

  return (
    <Controller
      name={'student'}
      control={control}
      render={({field}) => {
        console.log(`list.filterText: ${list.filterText}`)
        return (
          <ComboBox
            items={list.items}
            inputValue={list.filterText}
            onInputChange={
              (value:string) => {
                list.setFilterText(value);
                setValue('student', value);
              }
            }
            {...field}
          >
            <div>
              <label>Select student</label>

              <StyledInput type={"text"} id="character" />
              <Button>▼</Button>
            </div>
            <Popover>
              <ListBox>
                {(item: Student) => <ListBoxItem id={item.name}>{item.name}</ListBoxItem>}
              </ListBox>
            </Popover>
            <ErrorMessage
              errors={errors}
              name={'student'}
              render={({ message }) => <Error><ExclamationTriangleIcon/>{message}</Error>}
            />
          </ComboBox>
        )
      }}
    />

  );
}
