import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Link,
  Avatar,
  Divider,
} from '@mui/material';
import { Visibility, VisibilityOff, AccountCircle } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';

const usernameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-zA-Z]).{8,}$/;

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const validateInputs = () => {
    const newErrors = { username: '', password: '' };
    if (!usernameRegex.test(username)) {
      newErrors.username = 'Please enter a valid email.';
    }
    if (!passwordRegex.test(password)) {
      newErrors.password = 'Password must be at least 8 characters.';
    }
    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    setLoginError('');

    try {
      const response = await axios.post(`http://localhost:5006/login`, {
        username,
        password,
      });
      console.log('Login successful:', response.data);
      alert('Login successful!');

      // Store token and username
      localStorage.setItem('token', response.data.token);
      sessionStorage.setItem('username', username);

      navigate('/mainpage');
    } catch (err) {
      setLoginError(err.response?.data?.message || 'Login failed');
      console.error('Login failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleThirdPartyLogin = (provider) => {
    alert(`Sign in with ${provider} clicked!`);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FF7E5F, #FEB47B)',
        p: 2,
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          p: 4,
          boxShadow: 3,
          borderRadius: 3,
          textAlign: 'center',
          bgcolor: 'white',
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              margin: '0 auto',
              bgcolor: 'secondary.main',
            }}
          >
            <AccountCircle sx={{ fontSize: 80, color: '#fff' }} />
          </Avatar>
          <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
            Welcome Back!
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: 'gray' }}>
            Please log in to your account
          </Typography>
        </Box>

        <TextField
          fullWidth
          label="Email"
          variant="filled"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!errors.username}
          helperText={errors.username}
          sx={{ mb: 3, bgcolor: 'rgba(0, 0, 0, 0.03)', borderRadius: 1 }}
        />

        <TextField
          fullWidth
          label="Password"
          variant="filled"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          sx={{ mb: 3, bgcolor: 'rgba(0, 0, 0, 0.03)', borderRadius: 1 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {loginError && (
          <Typography color="error" sx={{ mb: 2 }}>
            {loginError}
          </Typography>
        )}

        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          disabled={loading || !username || !password}
          sx={{
            mb: 2,
            p: 1.5,
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #FF416C, #FF4B2B)',
            boxShadow: 2,
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>

        <Divider sx={{ my: 2 }}>OR</Divider>

        <Button
          variant="outlined"
          fullWidth
          onClick={() => navigate('/')}
          sx={{
            p: 1.5,
            fontWeight: 'bold',
            borderColor: '#FF7E5F',
            color: '#FF7E5F',
            '&:hover': {
              backgroundColor: '#FF7E5F',
              color: 'white',
              boxShadow: 2,
            },
          }}
        >
          Sign Up
        </Button>
      </Container>
    </Box>
  );
}
