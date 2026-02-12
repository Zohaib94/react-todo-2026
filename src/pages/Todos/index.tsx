import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import type { Todo } from '../../types';

function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchTodos = async (): Promise<Todo[]> => {
    const response = await axios.get('https://dummyjson.com/todos');
    return response.data.todos;
  };

  useEffect(() => {
    const getTodos = async (): Promise<void> => {
      try {
        const data = await fetchTodos();
        setTodos(data);
        setIsLoading(false);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : JSON.stringify(err);
        setError(errorMessage);
        setIsLoading(false);
      }
    };

    getTodos();
  }, []);

  return (
    <>
      {isLoading && <span>Loading.... please wait!</span>}
      {error && <span>{error}</span>}
      {!isLoading &&
        !error &&
        todos.map((todo: Todo) => (
          <div key={todo.id}>
            <span>
              <Link to={`/todos/${todo.id}`}>{todo.todo}</Link>
            </span>
            <span> - </span>
            <span>{String(todo.completed)}</span>
          </div>
        ))}
    </>
  );
}

export default TodosPage;
