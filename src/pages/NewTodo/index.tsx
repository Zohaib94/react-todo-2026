import React, { useCallback, useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import type { Todo, User } from '../../types';

const todoFormSchema = yup.object().shape({
  todo: yup.string().required('Please enter the title').min(8).max(50),
  userId: yup.number().required('Please select user'),
  completed: yup.boolean().optional().default(false),
});

type TodoFormInput = yup.InferType<typeof todoFormSchema>;

export default function NewTodoPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState<boolean>(true);
  const [isTodoCreating, setIsTodoCreating] = useState<boolean>(false);
  const [todoCreationError, setTodoCreationError] = useState<string>('');
  const [isTodoCreationSuccess, setIsTodoCreationSuccess] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormInput>({
    resolver: yupResolver(todoFormSchema),
  });

  const handleTodoCreation = async (data: TodoFormInput): Promise<void> => {
    setIsTodoCreating(true);
    setIsTodoCreationSuccess(false);
    setTodoCreationError('');

    try {
      await createTodo(data);

      setIsTodoCreationSuccess(true);
      setIsTodoCreating(false);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : JSON.stringify(err);

      setTodoCreationError(errorMessage);
      setIsTodoCreating(false);
    }
  };

  const onSubmit: SubmitHandler<TodoFormInput> = (data) => handleTodoCreation(data);

  const fetchUsers = useCallback(async (): Promise<User[]> => {
    const response = await axios.get(`https://dummyjson.com/users`);
    return response.data.users;
  }, []);

  const createTodo = useCallback(async (data: TodoFormInput): Promise<Todo> => {
    const response = await axios.post('https://dummyjson.com/todos/add', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
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
      {todoCreationError && <span>{todoCreationError}</span>}
      {isTodoCreationSuccess && <span>Todo created successfully</span>}

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

      <input type="submit" disabled={isUsersLoading || isTodoCreating} />
    </form>
  );
}
