import { useParams } from 'react-router';
import { useGetTodoQuery } from '../../store/api/todoApi';

function TodoPage() {
  const { id } = useParams();
  const { data: todo, isLoading, isError } = useGetTodoQuery(Number(id));

  return (
    <>
      {isLoading && <span>Loading.... please wait!</span>}
      {isError && <span>Failed to load</span>}
      {!isLoading && !isError && todo && (
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
