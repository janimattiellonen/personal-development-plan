import {ReactNode, useState} from "react";
import {useFormContext} from "react-hook-form";

import {Table} from "@radix-ui/themes";
import {Button} from "react-aria-components";

import * as Input from '../components/Form/Input';

import styled from "@emotion/styled";
import {Error as ErrorElement} from "./Error";
import {ExclamationTriangleIcon} from "@radix-ui/react-icons";
import {ErrorMessage} from "@hookform/error-message";

const SelectedUser = styled.div`
  padding: var(--space-md);
  margin: var(--space-xl) 0 var(--space-xl) 0;
`;

const StyledTable = styled(Table.Root)`
  width: 100%;
  
  table {
    width: 100%;
  }
`;

const UserList = styled.div`
  display: flex;
  flex-display: column;
  gap: var(--space-md);
  margin-bottom: var(--space-xxl);
  padding: var(--space-md);
`;


const StyledRow = styled(Table.Row)`
  background: var(--gray-5);
  
  &:nth-of-type(even) {
    background: var(--gray-3);
  }
  
  td {
    padding: var(--space-xs) var(--space-md);
  }
`;

type UserType = {
  id: number;
  name: string;
  email: string
}

type UserSelectorProps = {
  name: string;
  title?: string | ReactNode;
  type: 'student' | 'instructor';
}
export function UserSelector({name, title, type}: UserSelectorProps) {
  const [users, setUsers] = useState<UserType[]>([])
  const [selectedUser, setSelectedUser] = useState<UserType | undefined>(undefined);
  const {setValue,formState: {errors}} = useFormContext();
  const handleEvent = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const term = e.target.value;

    if (!['student', 'instructor'].includes(type)) {
      throw new Error(`Invalid type ${type}`);
    }

    const res =  await fetch(`${import.meta.env.VITE_API_URL}/api/admin/student/?term=${term}&type=${type}`)

    const json = await res.json();

    setUsers(json.data);
  }


  return <div>
    {title != null && <h1>{title}</h1>}

    <Input.Text onChange={handleEvent} />

    {selectedUser && <SelectedUser>
        <h2>Selected user</h2>

        <div>
          {selectedUser.id}: {selectedUser.name} ({selectedUser.email})
        </div>
    </SelectedUser>}

    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => <ErrorElement><ExclamationTriangleIcon/>{message}</ErrorElement>}
    />

    {users.length > 0 && <UserList>
        <StyledTable variant="ghost">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>#</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          {users.map( (user: UserType) => {
            return (
              <StyledRow key={user.id}>
                <Table.Cell>{user.id}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell><Button style={{marginLeft: 16}} onPress={
                  () => {
                    setValue(name, user.id);
                    setSelectedUser(user);
                  }}>Select</Button>
                  {selectedUser?.id === user.id && <Button className="danger" style={{marginLeft: 16}} onPress={
                    () => {
                      setValue(name, undefined);
                      setSelectedUser(undefined);
                    }}>Remove</Button>}</Table.Cell>
              </StyledRow>
            )
          })}
          </Table.Body>
        </StyledTable>

    </UserList>}
  </div>
}
