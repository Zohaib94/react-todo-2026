import React, { useCallback, useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import type { Todo, User } from '../../types';
import { todoFormSchema, type TodoFormInput } from '../../schemas/todo';

type FormAction = 'create' | 'update';

const formSuccessMessages: Record<FormAction, string> = {
  create: 'Form created successfully',
  update: 'Form updated successfully',
};

export default function TodoForm({
  todo,
  formSubmissionRequest,
  formAction,
}: Readonly<{
  todo?: TodoFormInput;
  formSubmissionRequest: (data: TodoFormInput) => Promise<Todo>;
  formAction: 'create' | 'update';
}>) {
  const [users, setUsers] = useState<User[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState<boolean>(true);

  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const [formSubmissionError, setFormSubmissionError] = useState<string>('');
  const [formSubmissionSuccess, setFormSubmissionSuccess] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormInput>({
    resolver: yupResolver(todoFormSchema),
    defaultValues: todo,
  });

  const handleFormSubmission = async (data: TodoFormInput): Promise<void> => {
    setIsFormSubmitting(true);
    setFormSubmissionSuccess(false);
    setFormSubmissionError('');

    try {
      await formSubmissionRequest(data);

      setFormSubmissionSuccess(true);
      setIsFormSubmitting(false);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : JSON.stringify(err);

      setFormSubmissionError(errorMessage);
      setIsFormSubmitting(false);
    }
  };

  const onSubmit: SubmitHandler<TodoFormInput> = (data) => handleFormSubmission(data);

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
      {formSubmissionError && <span>{formSubmissionError}</span>}
      {formSubmissionSuccess && <span>{formSuccessMessages[formAction]}</span>}

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

      <input type="submit" disabled={isUsersLoading || isFormSubmitting} />
    </form>
  );
}
