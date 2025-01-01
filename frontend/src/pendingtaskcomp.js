import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import axios from 'axios';


function PendingTasks() {
    const [pendingTasks, setPendingTasks] = useState([]);
  
    useEffect(() => {
      const fetchPendingTasks = async () => {
        try {

            const username = sessionStorage.getItem('username');

        if (!username) {
          console.error('Username is not found in session storage.');
          return;
        }
          const response = await axios.get(`http://taskmanagerapp-backend-server2.vercel.app/pending-tasks`, {
            params: { username,isDone:false },// Fetch only pending tasks
          });
          setPendingTasks(response.data.tasks);
        } catch (error) {
          console.error('Error fetching pending tasks:', error);
        }
      };
      fetchPendingTasks();
    }, []);
  
    return (
      <Box>
        <Typography variant="h5" gutterBottom>
          Pending Tasks
        </Typography>
        {pendingTasks.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No pending tasks available.
          </Typography>
        ) : (
          pendingTasks.map((task) => (
            <Paper
              key={task._id}
              sx={{
                mb: 2,
                p: 2,
                borderRadius: 2,
                bgcolor: 'lightcoral',
              }}
            >
              <Typography variant="h6">{task.task_name}</Typography>
              <Typography variant="body2" color="textSecondary">
                Due by: {new Date(task.created_at).toLocaleString()}
              </Typography>
            </Paper>
          ))
        )}
      </Box>
    );
  }
  
  export default PendingTasks;