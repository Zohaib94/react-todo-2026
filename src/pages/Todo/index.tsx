import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import type { Todo } from '../../types';
import { useParams } from 'react-router';

function TodoPage() {
  const [todo, setTodo] = useState<Todo>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const { id } = useParams();

  const fetchTodo = useCallback(async (): Promise<Todo> => {
    const response = await axios.get(`https://dummyjson.com/todos/${id}`);
    return response.data;
  }, [id]);

  useEffect(() => {
    const getTodo = async (): Promise<void> => {
      try {
        const data = await fetchTodo();
        setTodo(data);
        setIsLoading(false);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : JSON.stringify(err);
        setError(errorMessage);
        setIsLoading(false);
      }
    };

    getTodo();
  }, [fetchTodo]);

  return (
    <>
      {isLoading && <span>Loading.... please wait!</span>}
      {error && <span>{error}</span>}
      {!isLoading && !error && todo && (
        <div>
          <span>{todo.todo}</span>
          <span> - </span>
          <span>{String(todo.completed)}</span>
        </div>
      )}
    </>
  );
}

export default TodoPage;
