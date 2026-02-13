import React, { useCallback } from 'react';
import axios from 'axios';
import type { Todo } from '../../types';
import TodoForm from '../../components/TodoForm';
import type { TodoFormInput } from '../../schemas/todo';

export default function NewTodoPage() {
  const createTodo = useCallback(async (data: TodoFormInput): Promise<Todo> => {
    const response = await axios.post('https://dummyjson.com/todos/add', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  }, []);

  return <TodoForm formAction="create" formSubmissionRequest={createTodo} />;
}
