import {Routes, Route } from 'react-router';
import React, { useState } from 'react';
import Login from './Components/Login';
import Signup from './Components/Signup';
import TaskList from './Components/TaskList';
import AddTask from './Components/AddTask';
import HandleAuth from './Components/HandleAuth';
import NotFound from './Components/NotFound';
import Todos from './Components/Todos';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  return (
    <div className="App">
      <Routes>
        {/* Common Routes */}
        <Route path='/' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='signup' element={<Signup />} />

        { /* Protected Routes */}
        <Route element = {<HandleAuth isAuthenticated={isAuthenticated} />}>
          <Route path='add' element={<AddTask />} />
          <Route path='tasks' element={<TaskList />} />
          <Route path='tasks/add' element={<AddTask />} />
          <Route path='/tasks' element={<TaskList />} />
          <Route path='/todos' element={<Todos />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
}

export default App;
