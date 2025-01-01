import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Checkbox,
  Button,
  TextField,
  Stack,
} from '@mui/material';
import axios from 'axios';

export default function DeleteTasks() {
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
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

    let query = `http://taskmanagerapp-backend-server2.vercel.app/tasks?username=${username}`;
    if (date) {
      query += `&created_at=${date}`;
    }

    console.log('Query:', query); // Debugging the query string

    try {
      const response = await axios.get(query);
      if (response.data && response.data.tasks) {
        setTasks(response.data.tasks);
      }
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const handleCheckboxChange = (taskId) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  const handleDelete = async () => {
    try {
      await axios.post(`${process.env.SERVER_URL2}/delete-tasks`, {
        ids: selectedTasks,
      });
      setTasks((prev) => prev.filter((task) => !selectedTasks.includes(task._id)));
      setSelectedTasks([]);
    } catch (error) {
      console.error('Error deleting tasks:', error);
    }
  };

  const handleDateChange = (e) => {
    const date = e.target.value; // yyyy-mm-dd format from date input
    if (date) {
      const [year, month, day] = date.split('-');
      const formattedDate = `${day}-${month}-${year.slice(-2)}`; // Convert to dd-mm-yy
      setSearchDate(formattedDate);
    } else {
      setSearchDate('');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Delete Tasks
      </Typography>

      {/* Search by Date */}
      <Box sx={{ mb: 2 }}>
        <TextField
          type="date"
          label="Search by Date"
          variant="outlined"
          fullWidth
          value={searchDate}
          onChange={handleDateChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>

      {/* Task List */}
      {tasks.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No tasks available for the selected date.
        </Typography>
      ) : (
        tasks.map((task) => (
          <Paper
            key={task._id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2,
              mb: 1,
              borderRadius: 2,
            }}
          >
            <Box>
              <Typography variant="h6">{task.task_name}</Typography>
              <Typography variant="body2" color="textSecondary">
                Date: {task.created_at}
              </Typography>
            </Box>
            <Checkbox
              checked={selectedTasks.includes(task._id)}
              onChange={() => handleCheckboxChange(task._id)}
            />
          </Paper>
        ))
      )}

      {/* Delete Button */}
      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="error"
          disabled={selectedTasks.length === 0}
          onClick={handleDelete}
        >
          Delete Selected Tasks
        </Button>
      </Stack>
    </Container>
  );
}
