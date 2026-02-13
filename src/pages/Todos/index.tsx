import { Link } from 'react-router';
import type { Todo } from '../../types';
import { useGetTodosQuery } from '../../store/api/todoApi';

function TodosPage() {
  const { data, isLoading, isError } = useGetTodosQuery();

  return (
    <>
      {isLoading && <span>Loading.... please wait!</span>}
      {isError && <span>Failed to load todos</span>}
      {data?.map((todo: Todo) => (
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
