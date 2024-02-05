import {ReactNode, useEffect, useState} from "react";
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
  firstName: string;
  lastName: string;
  email: string
}

type UserSelectorProps = {
  name: string;
  title?: string | ReactNode;
  type: 'student' | 'instructor';
  user?: UserType | null;
}
export function UserSelector({name, title, type, user}: UserSelectorProps) {
  const [users, setUsers] = useState<UserType[] | null>([])
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const {setValue,formState: {errors}} = useFormContext();


  const handleEvent = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const term = e.target.value;

    if (!['student', 'instructor'].includes(type)) {
      throw new Error(`Invalid type ${type}`);
    }

    const res =  await fetch(`${import.meta.env.VITE_API_URL}/api/admin/students/?term=${term}&type=${type}`)

    const json = await res.json();

    console.log(`foo: ${JSON.stringify(json,null,2)}`)

    const convert = () => {
      return json.data.map((user: any) => {
        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        }
      })

    }
    setUsers(convert());
  }

  useEffect(() => {
    if (user) {
      setSelectedUser(user);
      setUsers([user]);
      setValue(name, user.id);
    }
  }, [user]);

  return <div>
    {title != null && <h1>{title}</h1>}

    <Input.Text onChange={handleEvent} />

    {selectedUser && <SelectedUser>
        <h2>Selected user</h2>

        <div>
          {selectedUser.id}: {selectedUser.firstName} {selectedUser.lastName}({selectedUser.email})
        </div>
    </SelectedUser>}

    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => <ErrorElement><ExclamationTriangleIcon/>{message}</ErrorElement>}
    />

    {users && users.length > 0 && <UserList>
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
                <Table.Cell>{user.firstName} {user.lastName}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell><Button style={{marginLeft: 16}} onPress={
                  () => {
                    console.log(`name: ${name}`)
                    setValue(name, user.id);
                    setSelectedUser(user);
                  }}>Select</Button>
                  {selectedUser?.id === user.id && <Button className="danger" style={{marginLeft: 16}} onPress={
                    () => {
                      setValue(name, null);
                      setSelectedUser(null);
                    }}>Remove</Button>}</Table.Cell>
              </StyledRow>
            )
          })}
          </Table.Body>
        </StyledTable>

    </UserList>}
  </div>
}
