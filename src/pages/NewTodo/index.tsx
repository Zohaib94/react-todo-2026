import React, { useCallback, useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import type { User } from '../../types';

const todoFormSchema = yup.object().shape({
  todo: yup.string().required('Please enter the title').min(8).max(50),
  userId: yup.number().required('Please select user'),
  completed: yup.boolean().optional().default(false),
});

type TodoFormInput = yup.InferType<typeof todoFormSchema>;

export default function NewTodoPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormInput>({
    resolver: yupResolver(todoFormSchema),
  });
  const onSubmit: SubmitHandler<TodoFormInput> = (data) => console.log(data);

  const fetchUsers = useCallback(async (): Promise<User[]> => {
    const response = await axios.get(`https://dummyjson.com/users`);
    return response.data.users;
  }, []);

  useEffect(() => {
    const getUsers = async (): Promise<void> => {
      try {
        const data = await fetchUsers();
        setUsers(data);
        setIsUsersLoading(false);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : JSON.stringify(err);
        console.log(errorMessage);
        setUsers([]);
        setIsUsersLoading(false);
      }
    };

    getUsers();
  }, [fetchUsers]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Todo Title <input {...register('todo')} />
      </label>
      {errors.todo && <span>{errors.todo.message}</span>}

      <label>
        Completed <input {...register('completed')} type="checkbox" />
      </label>
      {errors.completed && <span>{errors.completed.message}</span>}

      <label>
        Users{' '}
        <select {...register('userId', { setValueAs: Number })}>
          {users.map((user) => {
            return (
              <option key={user.id} value={user.id}>
                {user.firstName}
              </option>
            );
          })}
        </select>
      </label>
      {errors.userId && <span>{errors.userId.message}</span>}

      <input type="submit" disabled={isUsersLoading} />
    </form>
  );
}
