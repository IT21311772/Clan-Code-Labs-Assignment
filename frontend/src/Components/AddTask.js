import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../Styles/addTask.css';
import { useNavigate } from 'react-router';
import axios from 'axios';

function AddTask({ userRole}) {
  // Use of useState
  const [tasks, setTasks] = useState({
    title: '',
    description: '',
    days: ''
  });

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [daysError, setDaysError] = useState("");

  const navigate = useNavigate();

  const isValid = () => {
    let valid = true;
    
    const Title = document.getElementById('title');
    if (tasks.title === '') {
      Title.setCustomValidity('Please Enter the Title');
      setTitleError("Please Enter the Title");
      valid = false;
    } else {
      Title.setCustomValidity('');
      setTitleError("");
    }

    const Description = document.getElementById('description');
    if (tasks.description === '') {
      Description.setCustomValidity('Please Enter the Description');
      setDescriptionError("Please Enter the Description");
      valid = false;
    } else {
      Description.setCustomValidity('');
      setDescriptionError("");
    }

    const Days = document.getElementById('days');
    if (tasks.days === '') {
      Days.setCustomValidity('Please Enter the days');
      setDaysError("Please Enter the days")
      valid = false;
    } else if (isNaN(tasks.days)) {
      Days.setCustomValidity('Please Enter a valid number');
      setDaysError("Please Enter a valid number")
      valid = false;
    } else {
      Days.setCustomValidity('');
      setDaysError("")
    }

    return valid;
  }

  // handleClick function
  const handleClick = (e) => {
    e.preventDefault();

    if (isValid()) {
      axios
        .post("/api/task/add", tasks)
        .then((res) => {
          console.log('Task added successfully', res);
        })
        .catch((err) => console.log("Error adding task", err))

        axios
          .post("/api/todo/add", tasks)
          .then((res) => {
            console.log("Todo added successfully", res);
          })
          .catch((err) => console.log("Error adding todo", err));

          navigate("/todos");
    }
  }

  // handleChange function
  const handleChange = (event) => {
    const { name, value } = event.target;

    setTasks((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div className='container'>
      <div className="addTask">
        <h1>Add Task Here !</h1>
        <Form>
          <Form.Group>
            <Form.Control
              name='title'
              id='title'
              required
              value={tasks.title}
              onChange={handleChange}
              autoComplete='off'
              placeholder='Enter the task title'
            />
            { titleError && <div className='error'>{titleError}</div>}

            <Form.Control
              name='description'
              id='description'
              required
              value={tasks.description}
              onChange={handleChange}
              autoComplete='off'
              placeholder='Enter the task description'
            />
            { descriptionError && <div className='error'>{descriptionError}</div>}

            <Form.Control
              name='days'
              id='days'
              required
              value={tasks.days}
              onChange={handleChange}
              autoComplete='off'
              placeholder='Enter the number of days'
            />
            { daysError && <div className='error'>{daysError}</div>}
          </Form.Group>
        </Form>
        <Button onClick={handleClick}>Add Task</Button>
      </div>
    </div>
  )
}

export default AddTask
