import React from 'react';
import TodoForm from '../../components/TodoForm';
import type { TodoFormInput } from '../../schemas/todo';
import { useGetUsersQuery } from '../../store/api/userApi';
import { useCreateTodoMutation } from '../../store/api/todoApi';

export default function NewTodoPage() {
  const { data: users } = useGetUsersQuery();
  const [createTodo, { isLoading, isSuccess, isError }] = useCreateTodoMutation();

  const handleFormSubmission = async (data: TodoFormInput): Promise<void> => {
    try {
      await createTodo(data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : JSON.stringify(err);
      console.log(errorMessage);
    }
  };

  return (
    <>
      {users ? (
        <TodoForm
          formAction="create"
          users={users}
          formSubmissionHandler={handleFormSubmission}
          formStates={{
            isError,
            isLoading,
            isSuccess,
          }}
        />
      ) : (
        <span>Loading...</span>
      )}
    </>
  );
}
