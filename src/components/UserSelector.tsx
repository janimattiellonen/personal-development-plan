import {useState} from "react";
import {useFormContext} from "react-hook-form";

import {Table} from "@radix-ui/themes";
import {Button} from "react-aria-components";

import * as Input from '../components/Form/Input';

import styled from "@emotion/styled";
import {Error} from "./Error";
import {ExclamationTriangleIcon} from "@radix-ui/react-icons";
import {ErrorMessage} from "@hookform/error-message";


const SelectedUser = styled.div`
  padding: var(--space-md);
  margin: var(--space-xl) 0 var(--space-xl) 0;
`;

const UserList = styled.div`
  display: flex;
  flex-display: column;
  gap: var(--space-md);
  margin-bottom: var(--space-xxl);
  padding: var(--space-md);

`;


type UserType = {
  id: number;
  name: string;
}
export function UserSelector() {
  const [users, setUsers] = useState<UserType[]>([])
  const [selectedUser, setSelectedUser] = useState<UserType | undefined>(undefined);
  const {setValue,formState: {errors}} = useFormContext();
  const handleEvent = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const term = e.target.value;

    const res =  await fetch(`${import.meta.env.VITE_API_URL}/api/admin/student/?term=${term}`)

    const json = await res.json();

    setUsers(json.data);
  }


  return <div>
    <h1>User selector</h1>

    <Input.Text onChange={handleEvent} />

    {selectedUser && <SelectedUser>
        <h2>Selected user</h2>

        <div>
          {selectedUser.id}: {selectedUser.name}
        </div>
    </SelectedUser>}

    <ErrorMessage
      errors={errors}
      name={'student'}
      render={({ message }) => <Error><ExclamationTriangleIcon/>{message}</Error>}
    />

    <Table.Root variant="ghost">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
          <Table.Cell>danilo@example.com</Table.Cell>
          <Table.Cell>Developer</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
          <Table.Cell>zahra@example.com</Table.Cell>
          <Table.Cell>Admin</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
          <Table.Cell>jasper@example.com</Table.Cell>
          <Table.Cell>Developer</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>

    <UserList>
      {users.length > 0 && users.map( (user: UserType, i: number) => {
        return <div key={i}>
          <span>{user.id}: {user.name}</span>
          <Button style={{marginLeft: 16}} onPress={
            () => {
              setValue('student', user.id);
              setSelectedUser(user);
            }}>Select</Button>
          {selectedUser?.id === user.id && <Button className="danger" style={{marginLeft: 16}} onPress={
            () => {
              setValue('student', undefined);
              setSelectedUser(undefined);
            }}>Remove</Button>}
        </div>
      })}
    </UserList>
  </div>
}
