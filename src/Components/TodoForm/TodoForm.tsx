import React, { useState } from 'react';
import styles from './TodoForm.module.scss';

interface TodoFormProps {
  onSubmit: (text: string) => void;
  initialValue?: string;
  buttonText?: string;
}

const TodoForm: React.FC<TodoFormProps> = ({
  onSubmit,
  initialValue = '',
  buttonText = 'Save',
}) => {
  const [text, setText] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
      setText('');
    }
  };

  const isSaveDisabled = text.trim() === '';

  return (
    <form onSubmit={handleSubmit} className={styles.todoForm}>
      <div className={styles.todoForm__group}>
        <input
          type='text'
          id='todo-text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={styles.todoForm__input}
          placeholder='Enter your todo'
        />
      </div>
      <button
        type='submit'
        className={styles.todoForm__button}
        disabled={isSaveDisabled}
      >
        {buttonText}
      </button>
    </form>
  );
};

export default TodoForm;
