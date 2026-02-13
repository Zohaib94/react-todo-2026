import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { User } from '../../types';
import { todoFormSchema, type TodoFormInput } from '../../schemas/todo';

type FormAction = 'create' | 'update';

const formSuccessMessages: Record<FormAction, string> = {
  create: 'Form created successfully',
  update: 'Form updated successfully',
};

export default function TodoForm({
  todo,
  formSubmissionHandler,
  formAction,
  users,
  formStates,
}: Readonly<{
  todo?: TodoFormInput;
  formSubmissionHandler: (data: TodoFormInput) => Promise<void>;
  users: User[];
  formAction: 'create' | 'update';
  formStates: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
  };
}>) {
  const { isSuccess, isError, isLoading } = formStates;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormInput>({
    resolver: yupResolver(todoFormSchema),
    defaultValues: todo,
  });

  const onSubmit: SubmitHandler<TodoFormInput> = (data) => formSubmissionHandler(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isError && <span>Failed....</span>}
      {isSuccess && <span>{formSuccessMessages[formAction]}</span>}

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

      <input type="submit" disabled={isLoading} />
    </form>
  );
}
