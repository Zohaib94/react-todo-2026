import React from 'react';
import { useParams } from 'react-router';
import TodoForm from '../../components/TodoForm';
import type { TodoFormInput } from '../../schemas/todo';
import { useGetUsersQuery } from '../../store/api/userApi';
import { useGetTodoQuery, useUpdateTodoMutation } from '../../store/api/todoApi';

function EditTodoPage() {
  const { id } = useParams();
  const { data: users } = useGetUsersQuery();
  const { data: todo } = useGetTodoQuery(Number(id));
  const [updateTodo, { isLoading, isSuccess, isError }] = useUpdateTodoMutation();

  const handleFormSubmission = async (data: TodoFormInput): Promise<void> => {
    try {
      await updateTodo({ id: todo?.id, ...data });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : JSON.stringify(err);
      console.log(errorMessage);
    }
  };

  return (
    <>
      {isLoading && <span>Loading....</span>}
      {isError && <span>Failed....</span>}
      {todo && users && (
        <TodoForm
          todo={{
            todo: todo.todo,
            completed: todo.completed,
            userId: todo.userId,
          }}
          formStates={{ isError, isLoading, isSuccess }}
          formAction="update"
          formSubmissionHandler={handleFormSubmission}
          users={users}
        />
      )}
    </>
  );
}

export default EditTodoPage;
