import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import TodoList from '@/Pages/TodoList/TodoList';

export const Home: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<TodoList />} />
      </Routes>
    </Router>
  );
};
