import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { Todo } from '../../types';
import TodoForm from '../../components/TodoForm';
import type { TodoFormInput } from '../../schemas/todo';

function EditTodoPage() {
  const [todo, setTodo] = useState<Todo>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const { id } = useParams();

  const fetchTodo = useCallback(async (): Promise<Todo> => {
    const response = await axios.get(`https://dummyjson.com/todos/${id}`);
    return response.data;
  }, [id]);

  const updateTodo = useCallback(
    async (data: TodoFormInput): Promise<Todo> => {
      const response = await axios.put(`https://dummyjson.com/todos/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    },
    [id],
  );

  useEffect(() => {
    const getTodo = async (): Promise<void> => {
      try {
        const data = await fetchTodo();
        setTodo(data);
        setIsLoading(false);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : JSON.stringify(err);
        console.log(errorMessage);
        setIsLoading(false);
        setErrorMessage(errorMessage);
      }
    };

    getTodo();
  }, [fetchTodo]);

  return (
    <>
      {isLoading && <span>Loading....</span>}
      {errorMessage && <span>{errorMessage}</span>}
      {todo && (
        <TodoForm
          todo={{
            todo: todo.todo,
            completed: todo.completed,
            userId: todo.userId,
          }}
          formAction="update"
          formSubmissionRequest={updateTodo}
        />
      )}
    </>
  );
}

export default EditTodoPage;
