import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import axios from 'axios';

export default function TextAreaWithDate() {
  const [text, setText] = useState('');
  const [submittedText, setSubmittedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Format the current date as dd-mm-yy
  const currentDate = new Date();
  const formattedDate = `${("0" + currentDate.getDate()).slice(-2)}-${("0" + (currentDate.getMonth() + 1)).slice(-2)}-${currentDate.getFullYear().toString().slice(-2)}`;

  const handleSubmit = async () => {
    const username = sessionStorage.getItem('username'); // Retrieve username from session storage
    if (!text.trim() || !username) {
      setError('Task or username is missing.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${process.env.SERVER_URL2}/create-task`, {
        username,        // Add username to the request
        task_name: text, // Task content
        created_at: formattedDate, // Send the formatted date as a string (dd-mm-yy)
      });

      setSubmittedText(response.data.task.task_name);
      setText('');
    } catch (err) {
      setError('Failed to submit task. Please try again later.');
      console.error('Error submitting task:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, p: 2, boxShadow: 3, borderRadius: 2 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          {formattedDate} {/* Display the formatted date */}
        </Typography>
        <TextField
          label="Add Task Here...."
          multiline
          rows={4}
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          variant="outlined"
          sx={{ mb: 2, mt: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!text.trim() || loading}
        >
          {loading ? 'Submitting...' : 'Add Task'}
        </Button>
        {error && (
          <Box mt={2}>
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          </Box>
        )}
        {submittedText && (
          <Box mt={2}>
            <Typography variant="body1" color="textSecondary">
              Submitted Text:
            </Typography>
            <Typography variant="body2">{submittedText}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}
