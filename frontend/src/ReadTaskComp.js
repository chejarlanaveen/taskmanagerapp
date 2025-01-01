import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, TextField } from '@mui/material';
import axios from 'axios';

const ContentBox = () => {
  const [tasks, setTasks] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    fetchTasks(storedUsername, searchDate);
  }, [searchDate, username]);

  const fetchTasks = async (username, date) => {
    if (!username) return;

    let query = `http://localhost:5007/tasks?username=${username}`;
    if (date) {
      query += `&created_at=${date}`;
    }

    try {
      const response = await axios.get(query);
      if (response.data && response.data.tasks) {
        setTasks(response.data.tasks);
      }
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const toggleTaskStatus = async (taskId, currentStatus) => {
    try {
      const response = await axios.put(`${process.env.SERVER_URL2}/toggle-task-status/${taskId}`, {
        isDone: !currentStatus,
      });
      if (response.data && response.data.task) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, isDone: !currentStatus } : task
          )
        );
      }
    } catch (err) {
      console.error('Error toggling task status:', err);
    }
  };

  const filterTasksByDate = (task) => {
    if (!searchDate) return true;
    return task.created_at === searchDate;
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    const formattedDate = date.split('-').reverse().join('-');
    setSearchDate(formattedDate);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Task List
      </Typography>
      <TextField
        label="Search by Date"
        type="date"
        value={searchDate.split('-').reverse().join('-')}
        onChange={handleDateChange}
        fullWidth
        sx={{ mb: 3 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Grid container spacing={2}>
        {tasks.length > 0 ? (
          tasks.filter(filterTasksByDate).map((task) => (
            <Grid item xs={12} sm={6} key={task._id}>
              <Box
                onClick={() => toggleTaskStatus(task._id, task.isDone)} // Toggle status on click
                sx={{
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 2,
                  bgcolor: task.isDone ? 'green' : 'red', // Color based on status
                  color: 'white',
                  cursor: 'pointer', // Indicate clickability
                  transition: 'background-color 0.3s', // Smooth transition effect
                  '&:hover': {
                    opacity: 0.9,
                  },
                }}
              >
                <Typography variant="h6">{task.task_name}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Status: {task.isDone ? 'Completed' : 'Pending'}
                </Typography>
                <Typography variant="body2">
                  Created At: {task.created_at}
                </Typography>
              </Box>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary" sx={{ mt: 3 }}>
            No tasks found for the selected filters.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default ContentBox;
