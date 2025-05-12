import { useAddTodo } from '@/Hooks/useAddTodo';
import { useDeleteTodo } from '@/Hooks/useDeleteTodo';
import { useUpdateTodo } from '@/Hooks/useUpdateTodo';
import { useRef, useState } from 'react';
import { useGetInfiniteTodos } from '@/Hooks/useGetInfiniteTodos';
import { useIntersectionObserver } from '@/Hooks/useIntersectionObserver';
import Dialog from '@/Components/Dialog/Dialog';
import TodoForm from '@/Components/TodoForm/TodoForm';
import styles from './TodoList.module.scss';
import { Page, Todo } from '@/Types/todo';
import { BarLoader, ClipLoader } from 'react-spinners';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetInfiniteTodos();

  const addTodoMutation = useAddTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const observerRef = useIntersectionObserver(() => {
    if (hasNextPage) fetchNextPage();
  });

  const titleRef = useRef<HTMLInputElement>(null);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodoMutation.mutate(newTodo);
      setIsDialogOpen(false);
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsDialogOpen(true);
  };

  const handleUpdateTodo = (newTitle: string) => {
    if (selectedTodo && newTitle.trim()) {
      updateTodoMutation.mutate({
        id: selectedTodo.id,
        title: newTitle,
        completed: selectedTodo.completed,
        date: selectedTodo.date,
      });
      setIsDialogOpen(false);
      setSelectedTodo(null);
    }
  };

  const handleToggleTodo = (todo: Todo) => {
    updateTodoMutation.mutate({
      id: todo.id,
      title: todo.title,
      completed: !todo.completed,
      date: todo.date ?? new Date().toISOString(),
    });
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodoMutation.mutate(id);
  };

  return (
    <>
      <h1>Let’s Get Things Done!</h1>
      <h2>One Step Closer to Your Goals</h2>
      <div className={styles.container}>
        <div className={styles.searchAddBar}>
          <input
            ref={titleRef}
            type='text'
            placeholder='Create New Task'
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleAddTodo();
                setNewTodo('');
              }
            }}
          />
          <button className={styles.addTodoButton} onClick={handleAddTodo}>
            Add
          </button>
        </div>
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BarLoader color='#8e44ad' />
          </div>
        ) : (
          <ul>
            {data?.pages.map((page: Page) =>
              page.todos.map((todo: Todo) => (
                <li key={todo.id} className={styles.todoItem}>
                  <input
                    type='checkbox'
                    className={styles.checkBox}
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo)}
                  />
                  <span
                    className={`${styles.todoText} ${
                      todo.completed ? styles.completed : ''
                    }`}
                    onClick={() => handleEditTodo(todo)}
                  >
                    {todo.title}
                  </span>
                  <button onClick={() => handleDeleteTodo(todo.id)}>
                    <img src='./src/assets/svg/delete1.svg' />
                  </button>
                </li>
              ))
            )}
          </ul>
        )}
        <div ref={observerRef} />
        {isFetchingNextPage && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ClipLoader color='#8e44ad' size={35} />
          </div>
        )}
      </div>

      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title={'Edit Task'}
      >
        <TodoForm
          onSubmit={handleUpdateTodo}
          initialValue={selectedTodo?.title || ''}
          buttonText={'Save'}
        />
      </Dialog>
    </>
  );
};

export default TodoList;
