import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import axios from 'axios';

// CompletedTasks Component
function CompletedTasks() {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        // Get the username from session storage
        const username = sessionStorage.getItem('username');

        if (!username) {
          console.error('Username is not found in session storage.');
          return;
        }

        // Fetch completed tasks with username in query parameters
        const response = await axios.get('https://taskmanagement-nu.vercel.app/completed-tasks', {
          params: { username,isDone:true }, // Include username from session storage
        });
        setCompletedTasks(response.data.tasks);
      } catch (error) {
        console.error('Error fetching completed tasks:', error);
      }
    };
    fetchCompletedTasks();
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Completed Tasks
      </Typography>
      {completedTasks.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No completed tasks available.
        </Typography>
      ) : (
        completedTasks.map((task) => (
          <Paper
            key={task._id}
            sx={{
              mb: 2,
              p: 2,
              borderRadius: 2,
              bgcolor: 'lightgreen',
            }}
          >
            <Typography variant="h6">{task.task_name}</Typography>
            <Typography variant="body2" color="textSecondary">
              Completed on: {task.created_at}
            </Typography>
          </Paper>
        ))
      )}
    </Box>
  );
}

export default CompletedTasks;
