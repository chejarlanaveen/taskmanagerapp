import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, InputAdornment, CircularProgress } from '@mui/material';
import axios from 'axios';
import { AccountCircle, Lock, Login } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${process.env.SERVER_URL1}/signup`, { username, password });

      alert(response.data.message);

      sessionStorage.setItem('username', username);

      if (response.status === 201) {
        navigate('/login'); // Navigate to login page
      }

      setUsername('');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f6d234 0%, #fda085 100%)',
        borderRadius:4
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <Login sx={{ fontSize: 50, color: '#3f51b5', marginBottom: '20px' }} />

        <Typography variant="h5" sx={{ marginBottom: '20px', color: '#3f51b5', fontWeight: 'bold' }}>
          Sign Up
        </Typography>

        {error && <Typography color="error">{error}</Typography>}

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              marginTop: '20px',
              background: 'linear-gradient(45deg, #3f51b5 30%, #1e88e5 90%)',
              color: 'white',
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Sign Up'}
          </Button>
        </form>

        <Button
          variant="text"
          fullWidth
          sx={{
            marginTop: '15px',
            color: '#3f51b5',
            textDecoration: 'underline',
            '&:hover': { textDecoration: 'none', backgroundColor: 'rgba(63, 81, 181, 0.1)' },
          }}
          onClick={() => navigate('/login')} // Navigate to login page
        >
          Already have an account? Login
        </Button>
      </Box>
    </Container>
  );
};

export default Signup;
