import React, { useState, useEffect } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const EditableTaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [editMode, setEditMode] = useState({ id: null, content: '', created_at: '' });

  // Fetch tasks based on username and optionally filter by date
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const username = sessionStorage.getItem('username');
        if (!username) return;

        // Format the date to dd-mm-yy before sending to the backend
        const formattedDate = searchDate
          ? formatDateToDDMMYY(new Date(searchDate))
          : '';

        const response = await axios.get('https://taskmanagement-nu.vercel.app/tasks', {
          params: { username, created_at: formattedDate },
        });
        setTasks(response.data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [searchDate]);

  // Format a date to "dd-mm-yy"
  const formatDateToDDMMYY = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = String(d.getFullYear()).slice(-2); // Get last two digits of year
    return `${day}-${month}-${year}`;
  };

  // Handle task updates
  const handleUpdateTask = async (id, newContent, newDate) => {
    try {
      // Format the date before sending to the backend
      const formattedDate = formatDateToDDMMYY(newDate);

      const response = await axios.put(`https://taskmanagement-nu.vercel.app/update-task/${id}`, {
        task_name: newContent,
        created_at: formattedDate,
      });

      if (response.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === id
              ? { ...task, task_name: newContent, created_at: formattedDate }
              : task
          )
        );
        setEditMode({ id: null, content: '', created_at: '' });
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, p: 2, boxShadow: 3, borderRadius: 2 }}>
      {/* Filter Tasks by Date */}
      <TextField
        type="date"
        fullWidth
        label="Filter by Created Date"
        value={searchDate}
        onChange={(e) => setSearchDate(e.target.value)}
        sx={{ mb: 3 }}
        InputLabelProps={{ shrink: true }}
      />

      {/* Task List */}
      {tasks.map((task) => (
        <Box
          key={task._id}
          sx={{
            mb: 2,
            p: 2,
            border: '1px solid #ccc',
            borderRadius: 2,
            boxShadow: 1,
            bgcolor: 'background.paper',
          }}
        >
          {editMode.id === task._id ? (
            <>
              <TextField
                fullWidth
                label="Task Name"
                value={editMode.content}
                onChange={(e) =>
                  setEditMode((prev) => ({ ...prev, content: e.target.value }))
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                type="date"
                label="Modify Date"
                value={editMode.created_at}
                onChange={(e) =>
                  setEditMode((prev) => ({ ...prev, created_at: e.target.value }))
                }
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleUpdateTask(task._id, editMode.content, editMode.created_at)
                }
              >
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h6">{task.task_name}</Typography>
              <Typography variant="body2" color="textSecondary">
                Created At: {task.created_at}
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() =>
                  setEditMode({ id: task._id, content: task.task_name, created_at: task.created_at })
                }
              >
                Edit Task
              </Button>
            </>
          )}
        </Box>
      ))}
    </Container>
  );
};

export default EditableTaskList;
